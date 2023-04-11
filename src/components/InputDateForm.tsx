import React from 'react';
import {Button as ButtonComponent} from "./Button";
import {DatePickerInput} from "./DatePickerInput";

interface Props {
    updateForm: (key: string, value: string | number | Date | null) => void;
    getRecipesFromDb: any;
}

export const InputDateForm = ({
                                  updateForm,
                                  getRecipesFromDb
                              }: Props) => {

    return (
        <>
            <form>
                <div className="pb-3">
                    <span className="text-gray-400">Select a date range:</span>
                </div>
                <div className="flex flex-wrap justify-start">
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
