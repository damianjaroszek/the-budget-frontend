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
    const [productsFromDb, setProductsFromDb] = useState<ShopEntity[] | null>(null); // getting products from db
    const [isDataSet, setIsDataSet] = useState<boolean>(false); // checking if the data has changed (loaded from backend)
    const [newProductFromForm, setNewProductFromForm] = useState<NewShopEntity>(shopInitValues); // getting product from form
    const [nameExist, setNameExist] = useState<boolean>(false); // if given product name from form exist set value to true (for displaying statement if true - product is already exist)
    const [categoriesFromDb, setCategoriesFromDb] = useState<CategoryEntity[] | null>(null); // getting categories from db

    const isNameExist = () => {
        return productsFromDb?.map(shop => shop.name).includes(newProductFromForm.name); // checking if the given name from form is already exist in database (preventing duplication products)
    };

    const saveShopToDb = async (e: SyntheticEvent) => { // insert new shop to db
        e.preventDefault();
        if (!isNameExist()) {
            await fetchData(constHostAddress, '/product', '', {
                method: 'POST',
                body: JSON.stringify(
                    newProductFromForm
                ),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setIsDataSet(prevState => !prevState); // doing changes in state for communicate it to other useEffect (setProductsFromDb) - providing actual data
        } else {
            setNameExist(true); // if the negation of the isNameExist function returns true do fetch if return false setNameExist with true value
        }

        setNewProductFromForm(shopInitValues); // set init values
    }

    // getting data from form - new product name - updating newProductFromForm state
    const updateForm = (key: string, value: string) => {
        setNewProductFromForm(newShopFromForm => ({
            ...newShopFromForm,
            [key]: value,
        }));
        setNameExist(false);


    };
// removing product from db
    const removeShopFromDb = async (id: string) => {
        await fetchData(constHostAddress, '/product', id, {method: 'DELETE'});
        setIsDataSet(prevState => !prevState);
    }
// getting shops from db
    useEffect(() => {
        setProductsFromDb(null);
        const getShopsFromDb = async () => {
            const products = await fetchData(constHostAddress, '/product/listAll');
            setProductsFromDb(products);
        }
        getShopsFromDb().catch(console.error);
        setIsDataSet(false);

    }, [isDataSet]);

    //  getting categories from db
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
