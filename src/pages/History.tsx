import React, {ChangeEvent, useEffect, useState} from 'react';
import {Header} from "../components/Header";
import {OutputTable} from "../components/OutputTable";
import {fetchData} from "../utils/fetch-data";
import {apiUrl} from "../config/api";
import {DeleteButton} from "../components/DeleteButton";
import {RecipeEntityWithAction} from "./Receipt";
import {InputDateForm} from "../components/InputDateForm";


export const History = () => {

    type DateRange = {
        firstDate: Date;
        secondDate: Date;
    }

    const [recipesFromDb, setRecipesFromDb] = useState<RecipeEntityWithAction[] | null>(null); // getting recipes from db
    const [isDataSet, setIsDataSet] = useState<boolean>(false); // checking if the data has changed (loaded from backend)
    const [dateRange, setDateRange] = useState<DateRange>({ // date range from InputDateForm
        firstDate: new Date(),
        secondDate: new Date(),
    });
// getting data from form - new date range - updating dateRange state
    const updateForm = (key: string, value: string | number | Date | null) => {
        setDateRange(prevDateRange => ({
            ...prevDateRange,
            [key]: value,
        }));
    };

    // The function showing total expense in data range
    const sumPricesFromRange = () => (recipesFromDb?.reduce((prevValue, currentValue) => Number(prevValue) + Number(currentValue.price), 0).toFixed(2));

    // removing recipe from db
    const removeRecipeFromDb = async (id: string) => {
        await fetchData(apiUrl, '/recipe', id, {method: 'DELETE'});
        setIsDataSet(prevState => !prevState);
    }

    // getting recipes from db by data range
    const getRecipesFromDbByDateRange = async (dateRange: DateRange) => {
        const recipes = (await fetchData(apiUrl, `/recipe/getDateRange/${(dateRange.firstDate).toISOString().slice(0, 10)}/${dateRange.secondDate.toISOString().slice(0, 10)}`) as RecipeEntityWithAction[]);

        recipes.map((obj: RecipeEntityWithAction) => {
            // inject to OutputTable component button to the column action for deleting position
            return obj.action = <DeleteButton id={obj.id} removeItem={removeRecipeFromDb}/>
        })
        return recipes;
    }

    // getting recipes from db (loading data after clicking search button) - is it possible to refactor?
    const getRecipesFromDb = async (e: ChangeEvent) => {
        e.preventDefault();
        setRecipesFromDb(null);
        const recipes = await getRecipesFromDbByDateRange(dateRange);
        setRecipesFromDb(recipes);
    }

    // getting recipes from db (loading data after load history page) - is it possible to refactor?
    useEffect(() => {
        setRecipesFromDb(null);
        const getRecipesFromDb = async () => {
            const recipes = await getRecipesFromDbByDateRange(dateRange);
            setRecipesFromDb(recipes);
        }
        getRecipesFromDb().catch(console.error);
    }, [isDataSet]);


    return (<>
            <div className="mt-20 md:pr-10 md:pl-10 pr-3 pl-3">
                <Header category={"page"} title={"History"}/>
                <div className="mt-1 mb-10 ">
                    <InputDateForm updateForm={updateForm} getRecipesFromDb={getRecipesFromDb}/>
                </div>
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
                <div className="flex justify-end pt-5">
                    <span>Total costs in data range: <strong>{sumPricesFromRange()}</strong> PLN</span>
                </div>
            </div>
        </>

    );
}
