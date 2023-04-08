import React, {SyntheticEvent} from 'react';
import {InputField} from "./InputField";
import {Button as ButtonComponent} from "./Button";


interface Props {

    updateForm: (key: string, value: string) => void;
    saveToDb: (e: SyntheticEvent) => Promise<void>;
}

export const InputFormSingleField = ({updateForm, saveToDb}: Props) => {
    return (
        <>
            <form onSubmit={saveToDb}>
                <div className="flex justify-start pt-5 pr-3">


                    <div className="pr-3 pb-3">
                        <InputField fieldName="Add new position" width={275} type="text" updateForm={updateForm}
                                    propertyNameOfObjToSet="name" required={true}/>
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
