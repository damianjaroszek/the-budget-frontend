import React from 'react';
import {TiDelete} from "react-icons/ti";

interface Props {
    id: string | undefined;
    removeItem: (id: string) => Promise<void>;
}

export const DeleteButton = ({id, removeItem}: Props) => {
    const handleRemoveRecipe = async () => {
        await removeItem(`${id}`);
        console.log(id);
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
