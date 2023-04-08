import React, {SyntheticEvent, useEffect, useState} from 'react';
import {NewShopEntity, ShopEntity} from 'types';
import {Header} from "../components/Header";
import {fetchData} from "../utils/fetch-data";
import {constHostAddress} from "../utils/global-host-address";
import {OutputList} from "../components/OutputList";
import {InputFormSingleField} from "../components/InputFormSingleField";

// Shop page

export const Shop = () => {

    const shopInitValues = {
        name: '',
    }
    const [shopsFromDb, setShopsFromDb] = useState<ShopEntity[] | null>(null); // getting shops from db
    const [isDataSet, setIsDataSet] = useState<boolean>(false); // checking if the data has changed (loaded from backend)
    const [newShopFromForm, setNewShopFromForm] = useState<NewShopEntity>(shopInitValues); // getting shop from form
    const [nameExist, setNameExist] = useState<boolean>(false); // if given shop name from form exist set value to true (for displaying statement if true - shop is already exist)

    const isNameExist = () => {
        return shopsFromDb?.map(shop => shop.name).includes(newShopFromForm.name);  // checking if the given name from form is already exist in database (preventing duplication shops)
    };

    // insert new shop to db
    const saveShopToDb = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (!isNameExist()) {
            await fetchData(constHostAddress, '/shop', '', {
                method: 'POST',
                body: JSON.stringify(
                    newShopFromForm
                ),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setIsDataSet(prevState => !prevState); // doing changes in state for communicate it to other useEffect (setShopsFromDb) - providing actual data
        } else {
            setNameExist(true); // if the negation of the isNameExist function returns true do fetch if return false setNameExist with true value
        }
    }
    // getting data from form - new shop name - updating newShopFromForm state
    const updateForm = (key: string, value: string) => {
        setNewShopFromForm(newShopFromForm => ({
            ...newShopFromForm,
            [key]: value,
        }));
        setNameExist(false); // for cleaning statement shop is already exist in db


    };

    // removing shop from db
    const removeShopFromDb = async (id: string) => {
        await fetchData(constHostAddress, '/shop', id, {method: 'DELETE'});
        setIsDataSet(prevState => !prevState); // doing changes in state for communicate it to other useEffect (setShopsFromDb) - providing actual data
    }

    // getting shops from db
    useEffect(() => {
        setShopsFromDb(null);
        const getShopsFromDb = async () => {
            const shops = await fetchData(constHostAddress, '/shop/listAll');
            setShopsFromDb(shops);
        }
        getShopsFromDb().catch(console.error);
        setIsDataSet(false);

    }, [isDataSet]); // it does this every time isDataSet changes

    return (
        <>
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
                    <InputFormSingleField updateForm={updateForm} saveToDb={saveShopToDb}/>
                    {nameExist && <p className="text-rose-600">The shop is already exist in
                        database.</p>} {/*if nameExist is true show statement*/}
                </div>
            </div>
        </>

    );
};
