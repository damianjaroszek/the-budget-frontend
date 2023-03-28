import React from 'react';
import {TiDelete} from "react-icons/ti";

interface Props {
    id: string | undefined;
    removeRecipeFromDb: (id: string) => Promise<void>;
}

export const DeleteButtonForTable = ({id, removeRecipeFromDb}: Props) => {
    const handleRemoveRecipe = async () => {
        await removeRecipeFromDb(`${id}`);
    }

    return <>
        <button
            type="button"
            onClick={handleRemoveRecipe}
        >
            <TiDelete/>
        </button>


    </>
}
