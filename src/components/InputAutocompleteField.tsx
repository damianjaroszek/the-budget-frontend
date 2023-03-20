import * as React from 'react';
import {Autocomplete, Stack, TextField} from "@mui/material";

interface Props {
    fieldName: string;
    width: number;
    data: any;
}

export const InputAutocompleteField = ({fieldName, width, data}: Props) => {

    const defaultProps = {
        options: data,
        getOptionLabel: (option: any) => option.name,
    };
    const [value, setValue] = React.useState<any | null>(null);


    return (

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
                        renderInput={(params) => (
                            <TextField {...params} />
                        )}
                    />
                </div>
            </label>
        </Stack>

    );

}
