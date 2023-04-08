import React, {SyntheticEvent, useEffect, useState} from 'react';
import {CategoryEntity, NewCategoryEntity} from 'types';
import {Header} from "../components/Header";
import {fetchData} from "../utils/fetch-data";
import {constHostAddress} from "../utils/global-host-address";
import {OutputList} from "../components/OutputList";
import {InputFormSingleField} from "../components/InputFormSingleField";


export const Category = () => {

    const categoryInitValues = {
        name: '',
    }
    const [categoriesFromDb, setCategoriesFromDb] = useState<CategoryEntity[] | null>(null); // getting categories from db
    const [isDataSet, setIsDataSet] = useState<boolean>(false); // checking if the data has changed (loaded from backend)
    const [newCategoryFromForm, setNewCategoryFromForm] = useState<NewCategoryEntity>(categoryInitValues); // getting categories from form
    const [categoryExist, setCategoryExist] = useState<boolean>(false); // if given category name from form exist set value to true (for displaying statement if true - category is already exist)

    const isCategoryExist = () => {
        return categoriesFromDb?.map(category => category.name).includes(newCategoryFromForm.name); // checking if the given name from form is already exist in database (preventing duplication category)
    };

    // insert new category to db
    const saveCategoryToDb = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (!isCategoryExist()) {
            await fetchData(constHostAddress, '/category', '', {
                method: 'POST',
                body: JSON.stringify(
                    newCategoryFromForm
                ),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setIsDataSet(prevState => !prevState); // doing changes in state for communicate it to other useEffect (setShopsFromDb) - providing actual data
        } else {
            setCategoryExist(true); // if the negation of the isNameExist function returns true do fetch if return false setNameExist with true value
        }
    }
    // getting data from form - new category name - updating newCategoryFromForm state
    const updateForm = (key: string, value: string) => {
        setNewCategoryFromForm(newCategoryFromForm => ({
            ...newCategoryFromForm,
            [key]: value,
        }));
        setCategoryExist(false);


    };

    // removing category from db
    const removeCategoryFromDb = async (id: string) => {
        await fetchData(constHostAddress, '/category', id, {method: 'DELETE'});
        setIsDataSet(prevState => !prevState);
    }

    // getting categories from db
    useEffect(() => {
        setCategoriesFromDb(null);
        const getCategoriesFromDb = async () => {
            const categories = await fetchData(constHostAddress, '/category/listAll');
            setCategoriesFromDb(categories);
        }
        getCategoriesFromDb().catch(console.error);
        setIsDataSet(false);

    }, [isDataSet]); // it does this every time isDataSet changes

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
                    <InputFormSingleField updateForm={updateForm}
                                          saveToDb={saveCategoryToDb}/>
                    {categoryExist && <p className="text-rose-600">The category is already exist in database.</p>}
                </div>
            </div>
        </>

    );
};
