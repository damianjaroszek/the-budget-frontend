import React, {ChangeEvent} from 'react';
import {TextField} from "@mui/material";

type RangeInputNumber = {
    min: number,
    step: number,
    max: number,
}

interface Props {
    fieldName: string;
    type: "number" | "string";
    width: number;
    updateForm: (key: string, value: string | number) => void;
    propertyNameOfObjToSet: string;
    rangeInputNumber: RangeInputNumber;
    required: boolean;
}

export const InputField = ({
                               fieldName,
                               type,
                               width,
                               updateForm,
                               propertyNameOfObjToSet,
                               rangeInputNumber,
                               required
                           }: Props) => {

    const handleUpdateForm = (e: ChangeEvent<HTMLInputElement>) => {
        updateForm(propertyNameOfObjToSet, Number(e.target.value));
    }

    return (
        <React.Fragment>
            <label>
                <span className="text-gray-400">{fieldName}: </span>
                <div className="flex">
                    <TextField
                        type={type}
                        sx={{width}}
                        onChange={handleUpdateForm}
                        InputProps={{inputProps: rangeInputNumber}}
                        required={required}
                    />
                </div>
            </label>
        </React.Fragment>
    );
};
