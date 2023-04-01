import React, {useEffect, useState} from 'react';
import {ShopEntity} from 'types';
import {Header} from "../components/Header";
import {fetchData} from "../utils/fetch-data";
import {constHostAddress} from "../utils/global-const";
import {OutputList} from "../components/OutputList";


export const Shop = () => {
    const [shopsFromDb, setShopsFromDb] = useState<ShopEntity[] | null>(null);
    const [isDataSet, setIsDataSet] = useState<boolean>(false);

    const removeShopFromDb = async (id: string) => {


        const shop = await fetchData(constHostAddress, '/shop', id, {method: 'DELETE'}); //@todo zrobić endpoint do usuwania sklepu
        if (shop[0].affectedRows === 1) {
            setIsDataSet(true);
        }

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
        <>{console.log(shopsFromDb)}
            <div className="mt-20 md:pr-10 md:pl-10 pr-3 pl-3">
                <Header category={'shop'} title={'shop'}/>

                <div className="mt-1 mb-10 ">
                    <div className="w-80 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6">
                        {shopsFromDb &&
                            <OutputList data={shopsFromDb} sortParameter={'name'} removeItem={removeShopFromDb}/>}


                        {/*{*/}
                        {/*    productsFromDb && shopsFromDb &&*/}
                        {/*    <InputForm productsFromDb={productsFromDb} shopsFromDb={shopsFromDb} updateForm={updateForm}*/}
                        {/*               saveRecipeToDb={saveRecipeToDb}/>*/}
                        {/*}*/}

                    </div>
                </div>
            </div>
        </>

    );
};
