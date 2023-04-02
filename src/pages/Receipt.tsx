import React, {SyntheticEvent, useEffect, useState} from 'react';
import {Header} from "../components/Header";
import {OutputTable} from "../components/OutputTable";
import {NewRecipe, ProductEntity, RecipeEntity, ShopEntity} from 'types';
import {constHostAddress} from "../utils/global-const";
import {InputFormRecipe} from "../components/InputFormRecipe";
import {fetchData} from "../utils/fetch-data";
import {DeleteButton} from "../components/DeleteButton";

export interface RecipeEntityWithAction extends RecipeEntity {
    action: JSX.Element;
}

export const Receipt = () => {

    const recipeInitValues = {
        date: null,
        price: 0,
        productId: '',
        shopId: '',
        //categoryName: '',
    }


    const [recipesFromDb, setRecipesFromDb] = useState<RecipeEntityWithAction[] | null>(null);
    const [productsFromDb, setProductsFromDb] = useState<ProductEntity[] | null>(null);
    const [shopsFromDb, setShopsFromDb] = useState<ShopEntity[] | null>(null);
    const [isDataSet, setIsDataSet] = useState<boolean>(false);
    const [newRecipeFromForm, setNewRecipeFromForm] = useState<NewRecipe>(recipeInitValues);


    const removeRecipeFromDb = async (id: string) => {
        const recipe = await fetchData(constHostAddress, '/recipe', id, {method: 'DELETE'});
        if (recipe[0].affectedRows === 1) {
            setIsDataSet(true);
        }
    }

    const updateForm = (key: string, value: string | number | Date | null) => {
        setNewRecipeFromForm(newRecipeFromForm => ({
            ...newRecipeFromForm,
            [key]: value,
        }));
    };

    const saveRecipeToDb = async (e: SyntheticEvent) => {
        e.preventDefault();
        //setIsDataSet(prevState => !prevState); // false


        const data = await fetchData(constHostAddress, '/recipe', '', {
            method: 'POST',
            body: JSON.stringify(
                newRecipeFromForm
            ),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        data.length === 36 && typeof data === 'string' ? setIsDataSet(true) : setIsDataSet(false);
    }


    useEffect(() => {
        setRecipesFromDb(null);

        const getRecipesFromDb = async () => {
            const recipes = await fetchData(constHostAddress, '/recipe/listLatestWeek');

            recipes.map((obj: RecipeEntityWithAction) => {
                return obj.action = <DeleteButton id={obj.id} removeItem={removeRecipeFromDb}/>
            })
            setRecipesFromDb(recipes);
        }
        if (isDataSet) {
            getRecipesFromDb().catch(console.error);
            setIsDataSet(false);
        }

    }, [isDataSet]); //isDataSet

    useEffect(() => {
        setProductsFromDb(null);

        const getProductsFromDb = async () => {
            const products = await fetchData(constHostAddress, '/product/listAll');
            setProductsFromDb(products);
        };

        getProductsFromDb().catch(console.error);
        setIsDataSet(true);
    }, []); //isDataSet

    useEffect(() => {
        setShopsFromDb(null);

        const getShopsFromDb = async () => {
            const shops = await fetchData(constHostAddress, '/shop/listAll');
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
