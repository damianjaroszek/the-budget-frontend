import React, {SyntheticEvent} from 'react';
import {InputField} from "./InputField";
import {Button as ButtonComponent} from "./Button";


interface Props {

    updateForm: (key: string, value: string) => void;
    saveShopToDb: (e: SyntheticEvent) => Promise<void>;
}

const data = [{categoryId: 'categoryExapme', name: 'Jakas kategoria1'}, {
    categoryId: 'categoryExapme2',
    name: 'Jakas kategoria2'
}];
//@todo zaciągać kategorie z bazy przygotować category record i końcówkę do wyświetlania kategorii, póki co kategoria jest wpisana na sztywno do initProduct

export const InputFormProduct = ({updateForm, saveShopToDb}: Props) => {
    return (
        <>
            <form onSubmit={saveShopToDb}>
                <div className="flex flex-wrap justify-start pt-5 pr-3">


                    <div className="pr-3 pb-3">
                        <InputField fieldName="Add new product" width={275} type="text" updateForm={updateForm}
                                    propertyNameOfObjToSet="name" required={true}/>
                    </div>

                    {/*<InputAutocompleteField fieldName="category" width={275} data={data} updateForm={updateForm}*/}
                    {/*                        propertyNameOfObjToSet="categoryId"/>*/}


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
