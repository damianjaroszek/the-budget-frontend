import React, {SyntheticEvent, useEffect, useState} from 'react';
import {Header} from "../components/Header";
import {OutputTable} from "../components/OutputTable";
import {NewRecipe, ProductEntity, RecipeEntity, ShopEntity} from 'types';
import {apiUrl} from "../config/api";
import {InputFormRecipe} from "../components/InputFormRecipe";
import {fetchData} from "../utils/fetch-data";
import {DeleteButton} from "../components/DeleteButton";

export interface RecipeEntityWithAction extends RecipeEntity {
    action: JSX.Element;
}

// Receipt page

export const Receipt = () => {

    const recipeInitValues = {
        date: null,
        price: 0,
        productId: '',
        shopId: '',
    }


    const [recipesFromDb, setRecipesFromDb] = useState<RecipeEntityWithAction[] | null>(null); // getting recipes from db
    const [productsFromDb, setProductsFromDb] = useState<ProductEntity[] | null>(null); // getting products from db
    const [shopsFromDb, setShopsFromDb] = useState<ShopEntity[] | null>(null); // getting shops from db
    const [isDataSet, setIsDataSet] = useState<boolean>(false);  // checking if the data has changed (loaded from backend)
    const [newRecipeFromForm, setNewRecipeFromForm] = useState<NewRecipe>(recipeInitValues); // getting recipe from form

    // removing recipe from db
    const removeRecipeFromDb = async (id: string) => {
        await fetchData(apiUrl, '/recipe', id, {method: 'DELETE'});
        setIsDataSet(true);

    }
    // getting data from form - new recipe position - updating newRecipeFromForm state
    const updateForm = (key: string, value: string | number | Date | null) => {
        setNewRecipeFromForm(newRecipeFromForm => ({
            ...newRecipeFromForm,
            [key]: value,
        }));
    };

    const saveRecipeToDb = async (e: SyntheticEvent) => { /// insert new shop to db
        e.preventDefault();

        const data = await fetchData(apiUrl, '/recipe', '', {
            method: 'POST',
            body: JSON.stringify(
                newRecipeFromForm
            ),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        data.length === 36 && typeof data === 'string' ? setIsDataSet(true) : setIsDataSet(false); // if response is uuid setIsDataSet = true
    }

    // getting recipes from db - data from the latest week and showing it in table
    useEffect(() => {
        setRecipesFromDb(null);

        const getRecipesFromDb = async () => {
            const recipes = await fetchData(apiUrl, '/recipe/listLatestWeek');

            // inject to OutputTable component button to the column action for deleting position
            recipes.map((obj: RecipeEntityWithAction) => {
                return obj.action = <DeleteButton id={obj.id} removeItem={removeRecipeFromDb}/>
            })
            setRecipesFromDb(recipes);
        }
        if (isDataSet) {
            getRecipesFromDb().catch(console.error);
            setIsDataSet(false);
        }

    }, [isDataSet]);

    // getting products from db - listing it in autocomplete field
    useEffect(() => {
        setProductsFromDb(null);

        const getProductsFromDb = async () => {
            const products = await fetchData(apiUrl, '/product/listAll');
            setProductsFromDb(products);
        };

        getProductsFromDb().catch(console.error);
        setIsDataSet(true);
    }, []);

    // getting shops from db - listing it in autocomplete field
    useEffect(() => {
        setShopsFromDb(null);

        const getShopsFromDb = async () => {
            const shops = await fetchData(apiUrl, '/shop/listAll');
            setShopsFromDb(shops);
        };

        getShopsFromDb().catch(console.error);
    }, [isDataSet]);


    return (
        <>
            <div className="mt-20 md:pr-10 md:pl-10 pr-3 pl-3">
                <Header category="page" title="Receipt"/>
                <div className="flex flex-wrap justify-center">
                    <div className="w-full bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl pb-6 mb-3">
                        <div className="mt-1 ">
                            {recipesFromDb ? <OutputTable rows={recipesFromDb}
                                                          columns={
                                                              [{id: 'name', label: 'name', minWidth: 80},
                                                                  {id: 'date', label: 'date', minWidth: 20},
                                                                  {id: 'price', label: 'price [PLN]', minWidth: 10},
                                                                  {id: 'shopName', label: 'shop', minWidth: 10},
                                                                  {id: 'categoryName', label: 'category', minWidth: 10},
                                                                  {id: 'action', label: 'action', minWidth: 10},]
                                                          }
                            /> : <span>Loading...</span>}

                        </div>
                    </div>

                    <div className="w-full bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6">


                        {
                            productsFromDb && shopsFromDb &&
                            <InputFormRecipe productsFromDb={productsFromDb} shopsFromDb={shopsFromDb}
                                             updateForm={updateForm}
                                             saveRecipeToDb={saveRecipeToDb}/>
                        }

                    </div>
                </div>
            </div>
        </>
    );
};
