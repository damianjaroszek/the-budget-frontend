import React, {ChangeEvent, useEffect, useState} from 'react';
import {Header} from "../components/Header";
import {TableOutput} from "../components/TableOutput";
import {fetchData} from "../utils/fetch-data";
import {constHostAddress} from "../utils/global-const";
import {DeleteButtonForTable} from "../components/DeleteButtonForTable";
import {RecipeEntityWithAction} from "./Receipt";
import {InputDateForm} from "../components/InputDateForm";


export const History = () => {

    type DateRange = {
        firstDate: Date;
        secondDate: Date;
    }

    const [recipesFromDb, setRecipesFromDb] = useState<RecipeEntityWithAction[] | null>(null);
    const [isDataSet, setIsDataSet] = useState<boolean>(false);
    const [dateRange, setDateRange] = useState<DateRange>({
        firstDate: new Date,
        secondDate: new Date,
    })

    const updateForm = (key: string, value: string | number | Date | null) => {
        setDateRange(prevDateRange => ({
            ...prevDateRange,
            [key]: value,
        }));
    };

    const sumPricesFromRange = () => (recipesFromDb?.reduce((prevValue, currentValue) => Number(prevValue) + Number(currentValue.price), 0).toFixed(2));

    const removeRecipeFromDb = async (id: string) => {
        const recipe = await fetchData(constHostAddress, '/recipe', id, {method: 'DELETE'});
        if (recipe[0].affectedRows === 1) {
            setIsDataSet(true);
        }
    }

    const getRecipesFromDbByDateRange = async (dateRange: DateRange) => {
        const recipes = (await fetchData(constHostAddress, `/recipe/getDateRange/${(dateRange.firstDate).toISOString().slice(0, 10)}/${dateRange.secondDate.toISOString().slice(0, 10)}`) as RecipeEntityWithAction[]);

        recipes.map((obj: RecipeEntityWithAction) => {
            return obj.action = <DeleteButtonForTable id={obj.id} removeRecipeFromDb={removeRecipeFromDb}/>
        })
        return recipes;
    }


    const getRecipesFromDb = async (e: ChangeEvent) => {
        e.preventDefault();
        setRecipesFromDb(null);
        const recipes = getRecipesFromDbByDateRange(dateRange);
        setRecipesFromDb(await recipes);
    }


    useEffect(() => {

        setRecipesFromDb(null);
        const getRecipesFromDb = async () => {
            const recipes = getRecipesFromDbByDateRange(dateRange);
            setRecipesFromDb(await recipes);
        }
        getRecipesFromDb().catch(console.error);

    }, [isDataSet]);


    return (<>
            <div className="mt-20 md:pr-10 md:pl-10 pr-3 pl-3">
                <Header category={"page"} title={"History"}/>
                {/*<div className="mb-7">*/}
                {/*    <form>*/}
                {/*        <label htmlFor="default-search"*/}
                {/*               className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>*/}
                {/*        <div className="relative">*/}
                {/*            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">*/}
                {/*                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"*/}
                {/*                     stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">*/}
                {/*                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"*/}
                {/*                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>*/}
                {/*                </svg>*/}
                {/*            </div>*/}
                {/*            <input type="search" id="default-search"*/}
                {/*                   className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"*/}
                {/*                   placeholder="Search Mockups, Logos..." required/>*/}
                {/*            <button type="submit"*/}
                {/*                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*    </form>*/}
                {/*</div>*/}

                <div className="mt-1 mb-10 ">
                    <InputDateForm dateRange={dateRange} updateForm={updateForm} getRecipesFromDb={getRecipesFromDb}/>
                </div>
                <div className="mt-1 ">
                    {recipesFromDb ? <TableOutput rows={recipesFromDb}
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
