import React, {ChangeEvent} from 'react';
import {TextField} from "@mui/material";

interface Props {
    fieldName: string;
    type: "number" | "string";
    width: number;
    updateForm: (key: string, value: string | number) => void;
    propertyNameOfObjToSet: string;
}

export const InputField = ({fieldName, type, width, updateForm, propertyNameOfObjToSet}: Props) => {

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
                        InputProps={{inputProps: {min: 0.00, max: 40.00}}}
                        required
                    />
                </div>
            </label>
        </React.Fragment>
    );
};
