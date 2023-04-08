import React, {SyntheticEvent, useEffect, useState} from 'react';
import {CategoryEntity, NewShopEntity, ShopEntity} from 'types';
import {Header} from "../components/Header";
import {fetchData} from "../utils/fetch-data";
import {constHostAddress} from "../utils/global-host-address";
import {OutputList} from "../components/OutputList";
import {InputFormProduct} from "../components/InputFormProduct";

export const Product = () => {

    const shopInitValues = {
        name: '',
        categoryId: '',
    }
    const [productsFromDb, setProductsFromDb] = useState<ShopEntity[] | null>(null);
    const [isDataSet, setIsDataSet] = useState<boolean>(false);
    const [newProductFromForm, setNewProductFromForm] = useState<NewShopEntity>(shopInitValues);
    const [nameExist, setNameExist] = useState<boolean>(false);
    const [categoriesFromDb, setCategoriesFromDb] = useState<CategoryEntity[] | null>(null);

    const isNameExist = () => {
        return productsFromDb?.map(shop => shop.name).includes(newProductFromForm.name);
    };

    const saveShopToDb = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (!isNameExist()) {
            const data = await fetchData(constHostAddress, '/product', '', {
                method: 'POST',
                body: JSON.stringify(
                    newProductFromForm
                ),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setIsDataSet(prevState => !prevState);
        } else {
            setNameExist(true);
        }

        setNewProductFromForm(shopInitValues);
    }

    const updateForm = (key: string, value: string) => {
        setNewProductFromForm(newShopFromForm => ({
            ...newShopFromForm,
            [key]: value,
        }));
        setNameExist(false);


    };

    const removeShopFromDb = async (id: string) => {
        const product = await fetchData(constHostAddress, '/product', id, {method: 'DELETE'});
        //if (product[0].affectedRows === 1) {
        setIsDataSet(prevState => !prevState);
        //}
    }

    useEffect(() => {
        setProductsFromDb(null);
        const getShopsFromDb = async () => {
            const products = await fetchData(constHostAddress, '/product/listAll');
            setProductsFromDb(products);
        }
        getShopsFromDb().catch(console.error);
        setIsDataSet(false);

    }, [isDataSet]);

    useEffect(() => {
        setCategoriesFromDb(null);
        const getCategoriesFromDb = async () => {
            const categories = await fetchData(constHostAddress, '/category/listAll');
            setCategoriesFromDb(categories);
        }
        getCategoriesFromDb().catch(console.error);
        setIsDataSet(false);

    }, []);

    return (
        <>
            <div className="mt-20 md:pr-10 md:pl-10 pr-3 pl-3">
                <Header category={'page'} title={'Product'}/>

                <div className="mt-1 mb-10 ">
                    <div className="w-3/5 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6">
                        {productsFromDb &&
                            <OutputList data={productsFromDb} sortParameter={'name'} removeItem={removeShopFromDb}/>}
                    </div>
                </div>
            </div>

            <div className="md:pr-10 md:pl-10 pr-3 pl-3 pb-10">
                <div className="w-3/5 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6">
                    <InputFormProduct updateForm={updateForm} saveShopToDb={saveShopToDb}
                                      categoriesFromDb={categoriesFromDb}/>
                    {nameExist && <p className="text-rose-600">The product is already exist in database.</p>}
                </div>
            </div>
        </>

    );
};
