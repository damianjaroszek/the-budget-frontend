import React, {useEffect, useState} from 'react';
import {Header} from "../components/Header";
import {Button as ButtonComponent} from "../components/Button"
import {DatePickerInput} from "../components/DatePickerInput";
import {InputAutocompleteField} from "../components/InputAutocompleteField";
import {InputField} from "../components/InputField";
import {TableOutput} from "../components/TableOutput";
import {RecipeEntity} from 'types';


interface Place {
    id: number;
    name: string;
}


// --- AUTOCOMPLETE INPUT DATA
//@TODO Add fetch to list all (only) products from database
//@TODO Add fetch to list all (only) shops from database
const productsFromDb: RecipeEntity[] = [
    {
        "id": "uuid-id-11111111",
        "name": "Makaron Spaghetti Pastani 500.00g",
        "date": "2023-03-20",
        "price": 0.65,
        "shopName": "Biedronka",
        "categoryName": "Jedzenie"
    },
    {
        "id": "uuid-id-12998329",
        "name": "Lunchbox 225.00g",
        "date": "2023-03-01",
        "price": 9.41,
        "shopName": "Biedronka",
        "categoryName": "Jedzenie"
    }];


const places: Place[] = [
    {id: 1, name: 'Biedronka'},
];


export const Receipt = () => {

    const [recipesFromDb, setRecipesFromDb] = useState<RecipeEntity[] | null>(null);

    const getRecipesFromDb = async () => {
        setRecipesFromDb(null);
        const res = await fetch(`http://localhost:3001/api/recipe//listLatestWeek`);
        const data = await res.json();
        setRecipesFromDb(data);
    }

    useEffect(() => {
        getRecipesFromDb();
    }, []);


    return (
        <>
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
                        <div className="flex justify-start">

                            <label>
                                <span className="text-gray-400">Pick expense date: </span>
                                <DatePickerInput/>
                            </label>
                        </div>

                        <div>
                            <form className="flex flex-wrap justify-start pt-5 pr-3">

                                <div className="pr-3 pb-3">
                                    <InputAutocompleteField fieldName="Product" width={300} data={productsFromDb}/>
                                </div>

                                <div className="pr-3 pb-3">
                                    <InputField fieldName="Price" width={300} type="number"/>
                                </div>


                                <div className="pr-3 pb-3">
                                    <InputAutocompleteField fieldName="Shop" width={300} data={places}/>
                                </div>


                                <div className="pt-3 self-center">
                                    <ButtonComponent color="white" bgColor="blue" text="Add" borderRadius="1px"
                                                     type="submit"/>
                                </div>
                            </form>
                        </div>


                    </div>


                </div>

            </div>
        </>
    );
};
