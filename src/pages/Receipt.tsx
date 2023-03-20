import React from 'react';
import {Header} from "../components/Header";
import {Button as ButtonComponent} from "../components/Button"
import {DatePickerInput} from "../components/DatePickerInput";
import {InputAutocompleteField} from "../components/InputAutocompleteField";
import {InputField} from "../components/InputField";
import {TableOutput} from "../components/TableOutput";

interface Product {
    id: number;
    name: string;
    weight: number;
    symbol: string;
    category: string;
}

interface Place {
    id: number;
    name: string;
}


// --- AUTOCOMPLETE INPUT DATA
const productsFromDb: Product[] = [
    {id: 8, name: 'Lunchbox 225g', weight: 255, symbol: 'g', category: 'Jedzenie'},
    {id: 9, name: 'Bułka poranna 60g', weight: 60, symbol: 'g', category: 'Jedzenie'},
];

const places: Place[] = [
    {id: 1, name: 'Biedronka'},
];


export const Receipt = () => {


    return (
        <div className="mt-20 md:pr-10 md:pl-10 pr-3 pl-3">
            <Header category="page" title="Receipt"/>
            <div className="flex flex-wrap justify-center">
                <div className="w-full bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl pb-6 mb-3">
                    <div className="mt-1 ">
                        <TableOutput/>
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
                                <InputAutocompleteField fieldName="Place" width={300} data={places}/>
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

    );
};
