import React, {SyntheticEvent} from 'react';
import {InputField} from "./InputField";
import {Button as ButtonComponent} from "./Button";
import {CategoryEntity} from 'types';
import {InputAutocompleteField} from "./InputAutocompleteField";


interface Props {

    updateForm: (key: string, value: string) => void;
    saveShopToDb: (e: SyntheticEvent) => Promise<void>;
    categoriesFromDb: CategoryEntity[] | null;
}

export const InputFormProduct = ({updateForm, saveShopToDb, categoriesFromDb}: Props) => {
    return (
        <>
            <form onSubmit={saveShopToDb}>
                <div className="flex justify-start pt-3 pr-3">


                    <div className="pr-5 pb-3">
                        <InputField fieldName="Add new product" width={275} type="text" updateForm={updateForm}
                                    propertyNameOfObjToSet="name" required={true}/>
                    </div>

                    <div className="pr-3 pb-3">
                        <InputAutocompleteField fieldName="Set category of product" width={275} data={categoriesFromDb}
                                                updateForm={updateForm}
                                                propertyNameOfObjToSet="categoryId"/>
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
