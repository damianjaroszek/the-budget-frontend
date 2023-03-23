import * as React from 'react';
import {useEffect} from 'react';
import {Autocomplete, Stack, TextField} from "@mui/material";


interface Props {
    fieldName: string;
    width: number;
    data: any;
    updateForm: (key: string, value: string | number) => void;
    propertyNameOfObjToSet: string;
}

export const InputAutocompleteField = ({fieldName, width, data, updateForm, propertyNameOfObjToSet}: Props) => {

    const defaultProps = {
        options: data,
        getOptionLabel: (option: any) => option.name,
    };
    const [value, setValue] = React.useState<any | null>(null);

    useEffect(() => {
        value && console.log('I see changes in value: ' + value.id);
        value && updateForm(propertyNameOfObjToSet, value.id);
    }, [value]);


    return (
        <>{value && console.log(value.id)}

            <Stack spacing={1}>
                {/*<div>{`${value?.name}`}</div>*/}
                <label>
                    <span className="text-gray-400">{fieldName}: </span>
                    <div className="flex">
                        <Autocomplete
                            sx={{width}}
                            {...defaultProps}
                            id="controlled-demo"
                            value={value}

                            onChange={(event: any, newValue: any | null) => {
                                setValue(newValue);
                            }}
                            // onChange={(e: SyntheticEvent) => {
                            //     updateForm('Product', (e.target as HTMLInputElement).value)
                            // }}
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
