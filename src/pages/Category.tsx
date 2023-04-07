import React, {SyntheticEvent, useEffect, useState} from 'react';
import {CategoryEntity, NewCategoryEntity} from 'types';
import {Header} from "../components/Header";
import {fetchData} from "../utils/fetch-data";
import {constHostAddress} from "../utils/global-const";
import {OutputList} from "../components/OutputList";
import {InputFormShop} from "../components/InputFormShop";


export const Category = () => {

    const categoryInitValues = {
        name: '',
    }
    const [categoriesFromDb, setCategoriesFromDb] = useState<CategoryEntity[] | null>(null);
    const [isDataSet, setIsDataSet] = useState<boolean>(false);
    const [newCategoryFromForm, setNewCategoryFromForm] = useState<NewCategoryEntity>(categoryInitValues);
    const [categoryExist, setCategoryExist] = useState<boolean>(false);

    const isCategoryExist = () => {
        return categoriesFromDb?.map(category => category.name).includes(newCategoryFromForm.name);
    };

    const saveCategoryToDb = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (!isCategoryExist()) {
            const data = await fetchData(constHostAddress, '/category', '', {
                method: 'POST',
                body: JSON.stringify(
                    newCategoryFromForm
                ),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setIsDataSet(prevState => !prevState);
        } else {
            setCategoryExist(true);
        }
    }

    const updateForm = (key: string, value: string) => {
        setNewCategoryFromForm(newCategoryFromForm => ({
            ...newCategoryFromForm,
            [key]: value,
        }));
        setCategoryExist(false);


    };

    const removeCategoryFromDb = async (id: string) => {
        const category = await fetchData(constHostAddress, '/category', id, {method: 'DELETE'}); //@todo zrobić endpoint do usuwania sklepu
        //if (shop[0].affectedRows === 1) {
        setIsDataSet(prevState => !prevState);
        //}
    }

    useEffect(() => {
        setCategoriesFromDb(null);
        const getCategoriesFromDb = async () => {
            const categories = await fetchData(constHostAddress, '/category/listAll');
            setCategoriesFromDb(categories);
        }
        getCategoriesFromDb().catch(console.error);
        setIsDataSet(false);

    }, [isDataSet]);

    return (
        <>{console.log(newCategoryFromForm)}
            <div className="mt-20 md:pr-10 md:pl-10 pr-3 pl-3">
                <Header category={'page'} title={'Category'}/>

                <div className="mt-1 mb-10 ">
                    <div className="w-96 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6">
                        {categoriesFromDb &&
                            <OutputList data={categoriesFromDb} sortParameter={'name'}
                                        removeItem={removeCategoryFromDb}/>}
                    </div>
                </div>
            </div>

            <div className="md:pr-10 md:pl-10 pr-3 pl-3">
                <div className="w-96 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6">
                    <InputFormShop updateForm={updateForm}
                                   saveShopToDb={saveCategoryToDb}/> {/*@todo zmienić nazwę InputFormShop na coś bardziej uniwersalnego*/}
                    {categoryExist && <p className="text-rose-600">The category is already exist in database.</p>}
                </div>
            </div>
        </>

    );
};
