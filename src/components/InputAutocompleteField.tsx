import * as React from 'react';
import {useEffect} from 'react';
import {Autocomplete, Stack, TextField} from "@mui/material";


interface Props {
    fieldName: string;
    width: number;
    data: any;
    updateForm: (key: string, value: string) => void;
    propertyNameOfObjToSet: string;
}

export const InputAutocompleteField = ({fieldName, width, data, updateForm, propertyNameOfObjToSet}: Props) => {

    const defaultProps = {
        options: data,
        getOptionLabel: (option: any) => option.name,

    };
    const [value, setValue] = React.useState<any | null>(null);

    useEffect(() => {
        {
            value ? updateForm(propertyNameOfObjToSet, value.id) : <span>Loading data</span>
        }
        ;
    }, [value]);


    return (
        <>
            <Stack spacing={1}>
                <label>
                    <span className="text-gray-400">{fieldName}: </span>
                    <div className="flex">
                        <Autocomplete
                            sx={{width}}
                            {...defaultProps}
                            id="controlled-demo"
                            value={value}
                            onChange={(event: any, newValue: number | string | null) => {
                                setValue(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} required/>
                            )}
                        />
                    </div>
                </label>
            </Stack>
        </>
    );

}
