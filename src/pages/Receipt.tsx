import React, {SyntheticEvent, useEffect, useState} from 'react';
import {Header} from "../components/Header";
import {TableOutput} from "../components/TableOutput";
import {NewRecipe, ProductEntity, RecipeEntity, ShopEntity} from 'types';
import {constHostAddress} from "../utils/global-const";
import {InputForm} from "../components/InputForm";
import {fetchData} from "../utils/fetch-data";

export const Receipt = () => {

    const recipeInitValues = {
        date: null,
        price: 0,
        productId: '',
        shopId: '',
    }

    const [recipesFromDb, setRecipesFromDb] = useState<RecipeEntity[] | null>(null);
    const [productsFromDb, setProductsFromDb] = useState<ProductEntity[] | null>(null);
    const [shopsFromDb, setShopsFromDb] = useState<ShopEntity[] | null>(null);
    const [isDataSet, setIsDataSet] = useState<boolean>(false);
    const [newRecipeFromForm, setNewRecipeFromForm] = useState<NewRecipe>(recipeInitValues);


    const updateForm = (key: string, value: string | number | Date | null) => {
        setNewRecipeFromForm(newRecipeFromForm => ({
            ...newRecipeFromForm,
            [key]: value,
        }));
    };

    const saveRecipeToDb = async (e: SyntheticEvent) => {
        e.preventDefault();
        //setLoading(true)
        setIsDataSet(prevValue => !prevValue);
        console.log('If wish to have an endpoint which can insert data to db...', newRecipeFromForm);
        //@todo dodać powiązany stan - [isDataSet, setIsDataSet] = useState<boolean>(false) i jeżeli będzie wykonana funkcja saveRecipeToDb
        //@todo to setIsDataSet(prevValue=>!prevValue) i dodać isDataSet do tablicy zależności:
        /*
        * useEffect(() => {
    setRecipesFromDb(null);

    const getRecipesFromDb = async () => {
        const recipes = await fetchDataGet(constHostAddress, '/recipe/listLatestWeek');
        setRecipesFromDb(recipes);
    };

    getRecipesFromDb();
}, [isDataSet]); --> dzięki temu po każdym uderzeniu do bazy z wysyłką danych odświeży nam widok tabelki i dane będą aktualne*/


        const res = await fetchData(constHostAddress, '/recipe', {
            method: 'POST',
            body: JSON.stringify(
                newRecipeFromForm
            ),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(res);
        setNewRecipeFromForm(recipeInitValues);
    }


//@todo --- a może wrzucić to wszystko w global store i wyodębnić z inputów odrębny komponent form?
//@todo dodać komunikację z tego poziomu z polem AutocompleteInput dla Products, Places, Price + zatwierdzenie formularza
//@todo z tego poziomu, ponieważ tu jest rodzic dla wszyskich Inputów i komponentu Table. W momencie zatwierdzenia formularza
//@todo useEffect(()=>{ma lecieć strzał do backendu z insertem do bazy},[tablica zależności - reaguj newRecipeFromForm a to ma się zaktualizować po kliknięciu w ADD formularza])
//@todo dodać funkcję fetch-data-post albo przebudować fetch-data-get tak aby oprócz ścieżki jeszcze przyjmował parametr z obiektem {method: 'POST', headers, body)

    useEffect(() => {
        setRecipesFromDb(null);

        const getRecipesFromDb = async () => {
            const recipes = await fetchData(constHostAddress, '/recipe/listLatestWeek');
            setRecipesFromDb(recipes);
        };

        getRecipesFromDb();
    }, [isDataSet]);

    useEffect(() => {
        setProductsFromDb(null);

        const getProductsFromDb = async () => {
            const products = await fetchData(constHostAddress, '/product/listAll');
            setProductsFromDb(products);
        };

        getProductsFromDb();
    }, [isDataSet]);

    useEffect(() => {
        setShopsFromDb(null);

        const getShopsFromDb = async () => {
            const shops = await fetchData(constHostAddress, '/shop/listAll');
            setShopsFromDb(shops);
        };

        getShopsFromDb();
    }, [isDataSet]);


    return (
        <>{console.log(newRecipeFromForm)}
            <div className="mt-20 md:pr-10 md:pl-10 pr-3 pl-3">
                <Header category="page" title="Receipt"/>
                <div className="flex flex-wrap justify-center">
                    <div className="w-full bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl pb-6 mb-3">
                        <div className="mt-1 ">
                            {recipesFromDb ? <TableOutput rows={recipesFromDb}
                                                          columns={
                                                              [{id: 'name', label: 'name', minWidth: 80},
                                                                  {id: 'date', label: 'date', minWidth: 20},
                                                                  {id: 'price', label: 'price [PLN]', minWidth: 10},
                                                                  {id: 'shopName', label: 'shop', minWidth: 10},
                                                                  {
                                                                      id: 'categoryName',
                                                                      label: 'category',
                                                                      minWidth: 10
                                                                  },]
                                                          }
                            /> : 'No data to display'}

                        </div>
                    </div>

                    <div className="w-full bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6">


                        {
                            productsFromDb && shopsFromDb &&
                            <InputForm productsFromDb={productsFromDb} shopsFromDb={shopsFromDb} updateForm={updateForm}
                                       saveRecipeToDb={saveRecipeToDb}/>
                        }

                    </div>
                </div>
            </div>
        </>
    );
};
