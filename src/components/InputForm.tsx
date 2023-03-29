import React, {SyntheticEvent} from 'react';
import {InputAutocompleteField} from "./InputAutocompleteField";
import {InputField} from "./InputField";
import {Button as ButtonComponent} from "./Button";
import {ProductEntity, ShopEntity} from 'types';
import {DatePickerInput} from "./DatePickerInput";


interface Props {
    productsFromDb: ProductEntity[];
    shopsFromDb: ShopEntity[];
    updateForm: (key: string, value: string | number | Date | null) => void;
    saveRecipeToDb: (e: SyntheticEvent) => Promise<void>;
}

export const InputForm = ({productsFromDb, shopsFromDb, updateForm, saveRecipeToDb}: Props) => {
    return (
        <>
            <form onSubmit={saveRecipeToDb}>
                <div className="flex justify-start">

                    <label>
                        <span className="text-gray-400">Pick expense date: </span>
                        <DatePickerInput updateForm={updateForm} propertyNameOfObjToSet="date"/>
                    </label>
                </div>


                <div className="flex flex-wrap justify-start pt-5 pr-3">

                    <div className="pr-3 pb-3">
                        <InputAutocompleteField fieldName="Product" width={300} data={productsFromDb}
                                                updateForm={updateForm} propertyNameOfObjToSet="productId"/>
                    </div>

                    <div className="pr-3 pb-3">
                        <InputField fieldName="Price" width={300} type="number" updateForm={updateForm}
                                    propertyNameOfObjToSet="price"
                                    rangeInputNumber={{min: 0.00, step: 0.01, max: 9999999.99}} required={true}/>
                    </div>

                    <div className="pr-3 pb-3">
                        <InputAutocompleteField fieldName="Shop" width={300} data={shopsFromDb} updateForm={updateForm}
                                                propertyNameOfObjToSet="shopId"/>
                    </div>

                    <div className="pt-3 self-center">
                        <ButtonComponent color="white" bgColor="blue" text="Add" borderRadius="1px"
                                         type="submit" paddingRight={3} paddingLeft={3} paddingBottom={3}
                                         paddingTop={3}/>
                    </div>
                </div>
            </form>
        </>
    );
};
