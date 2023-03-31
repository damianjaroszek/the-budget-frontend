import React from 'react';
import {Button as ButtonComponent} from "./Button";
import {DatePickerInput} from "./DatePickerInput";

type DateRange = {
    firstDate: Date;
    secondDate: Date;
}


interface Props {
    dateRange: DateRange;
    updateForm: (key: string, value: string | number | Date | null) => void;
    getRecipesFromDb: any;
}

export const InputDateForm = (/*{updateForm, saveRecipeToDb}: Props*/ {
    dateRange,
    updateForm,
    getRecipesFromDb
}: Props) => {

    return (
        <>{console.log(dateRange)}
            <form /*onSubmit={saveRecipeToDb}*/>
                <div className="pb-3">
                    <span className="text-gray-400">Select a date range:</span>
                </div>
                <div className="flex justify-start">
                    <label>
                        <DatePickerInput updateForm={updateForm} propertyNameOfObjToSet="firstDate"/>
                    </label>

                    <label>
                        <DatePickerInput updateForm={updateForm} propertyNameOfObjToSet="secondDate"/>
                    </label>
                    <div className="h-1">
                        <ButtonComponent color={"white"} bgColor={"blue"} text={"Search"} borderRadius={"5px"}
                                         paddingLeft={3} paddingRight={3}
                                         type="submit"
                                         onClickFunction={getRecipesFromDb}/>
                    </div>
                </div>
            </form>
        </>
    );
};
