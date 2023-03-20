import React from 'react';
import {TextField} from "@mui/material";

interface Props {
    fieldName: string;
    type: "number" | "string";
    width: number;
}

export const InputField = ({fieldName, type, width}: Props) => {
    return (
        <React.Fragment>
            <label>
                <span className="text-gray-400">{fieldName}: </span>
                <div className="flex">
                    <TextField
                        type={type}
                        sx={{width}}/>
                </div>
            </label>
        </React.Fragment>
    );
};
