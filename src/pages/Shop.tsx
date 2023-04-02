import React, {SyntheticEvent, useEffect, useState} from 'react';
import {NewShopEntity, ShopEntity} from 'types';
import {Header} from "../components/Header";
import {fetchData} from "../utils/fetch-data";
import {constHostAddress} from "../utils/global-const";
import {OutputList} from "../components/OutputList";
import {InputFormShop} from "../components/InputFormShop";


export const Shop = () => {

    const shopInitValues = {
        name: '',
    }
    const [shopsFromDb, setShopsFromDb] = useState<ShopEntity[] | null>(null);
    const [isDataSet, setIsDataSet] = useState<boolean>(false);
    const [newShopFromForm, setNewShopFromForm] = useState<NewShopEntity>(shopInitValues);
    const [nameExist, setNameExist] = useState<boolean>(false);

    const isNameExist = () => {
        return shopsFromDb?.map(shop => shop.name).includes(newShopFromForm.name);
    };

    const saveShopToDb = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (!isNameExist()) {
            const data = await fetchData(constHostAddress, '/shop', '', {
                method: 'POST',
                body: JSON.stringify(
                    newShopFromForm
                ),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setIsDataSet(prevState => !prevState);
        } else {
            setNameExist(true);
        }
    }

    const updateForm = (key: string, value: string) => {
        setNewShopFromForm(newShopFromForm => ({
            ...newShopFromForm,
            [key]: value,
        }));
        setNameExist(false);


    };

    const removeShopFromDb = async (id: string) => {
        const shop = await fetchData(constHostAddress, '/shop', id, {method: 'DELETE'}); //@todo zrobić endpoint do usuwania sklepu
        //if (shop[0].affectedRows === 1) {
        setIsDataSet(prevState => !prevState);
        //}
    }

    useEffect(() => {
        setShopsFromDb(null);
        const getShopsFromDb = async () => {
            const shops = await fetchData(constHostAddress, '/shop/listAll');
            setShopsFromDb(shops);
        }
        getShopsFromDb().catch(console.error);
        setIsDataSet(false);

    }, [isDataSet]);

    return (
        <>{console.log(newShopFromForm)}
            <div className="mt-20 md:pr-10 md:pl-10 pr-3 pl-3">
                <Header category={'page'} title={'Shop'}/>

                <div className="mt-1 mb-10 ">
                    <div className="w-96 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6">
                        {shopsFromDb &&
                            <OutputList data={shopsFromDb} sortParameter={'name'} removeItem={removeShopFromDb}/>}
                    </div>
                </div>
            </div>

            <div className="md:pr-10 md:pl-10 pr-3 pl-3">
                <div className="w-96 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6">
                    <InputFormShop updateForm={updateForm} saveShopToDb={saveShopToDb}/>
                    {nameExist && <p className="text-rose-600">The shop is already exist in database.</p>}
                </div>
            </div>
        </>

    );
};
