import React, {useState} from 'react';
import {Button as ButtonComponent} from "./Button";
import {DatePickerInput} from "./DatePickerInput";


// interface Props {
//     productsFromDb: ProductEntity[];
//     shopsFromDb: ShopEntity[];
//     updateForm: (key: string, value: string | number | Date | null) => void;
//     saveRecipeToDb: (e: SyntheticEvent) => Promise<void>;
// }

export const InputDateForm = (/*{updateForm, saveRecipeToDb}: Props*/) => {

    type DateRange = {
        firstDate: Date;
        secondDate: Date;
    }

    const [dateRange, setDateRange] = useState<DateRange>({
        firstDate: new Date,
        secondDate: new Date,
    })

    const updateForm = (key: string, value: string | number | Date | null) => {
        setDateRange(prevDateRange => ({
            ...prevDateRange,
            [key]: value,
        }));
        //@todo domyślnie zapytanie z historią z dzisiaj
    };
    return (
        <>{console.log(dateRange)}
            <form /*onSubmit={saveRecipeToDb}*/>
                <span className="text-gray-400">Select a date range:</span>
                <div className="flex justify-start">

                    <label>
                        <DatePickerInput updateForm={updateForm} propertyNameOfObjToSet="firstDate"/>
                    </label>

                    <label>
                        <DatePickerInput updateForm={updateForm} propertyNameOfObjToSet="secondDate"/>
                    </label>
                    <div className="h-1">
                        <ButtonComponent color={"white"} bgColor={"blue"} text={"Search"} borderRadius={"5px"}
                                         type="submit"/>
                    </div>
                </div>
            </form>
        </>
    );
};
