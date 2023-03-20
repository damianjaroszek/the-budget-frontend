import * as React from 'react';
import {Autocomplete, Stack, TextField} from "@mui/material";

// interface FilmOptionType {
//     name: string;
//     year: number;
// }

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    {name: 'Lunchbox', weight: 255, symbol: 'g', category: 'Jedzenie'},
    {name: 'Bułka poranna', weight: 60, symbol: 'g', category: 'Jedzenie'},
    // { title: 'The Godfather: Part II', year: 1974 },

];

interface Product {
    name: string;
    weight: number;
    symbol: string;
    category: string;
}

interface Props {
    fieldName: string;
    width: number;
}

export const InputAutocompleteField = ({fieldName, width}: Props) => {


    const defaultProps = {
        options: top100Films,
        getOptionLabel: (option: Product) => option.name,
    };
    const [value, setValue] = React.useState<Product | null>(null);


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
                        onChange={(event: any, newValue: Product | null) => {
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
