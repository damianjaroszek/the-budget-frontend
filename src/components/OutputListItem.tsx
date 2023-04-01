import React from "react";
import {DeleteButton} from "./DeleteButton";


interface Props {
    name: string | number;
    id: string | undefined;
    isDeletable: number;
    removeItem: (id: string) => Promise<void>;
}

export const OutputListItem = ({name, id, removeItem, isDeletable}: Props) => {
    //
    // const personLiClicked = () => {
    //     props.onRemoveItem(props.user.username);
    // }


    return (<>
            {/*{console.log(isAbleToDelete)}*/}
            <li className="pb-3 sm:pb-4" key={id} /*onClick={personLiClicked}*/>

                <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white pt-5">
                            {name}
                        </p>
                    </div>
                    <div
                        className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white pt-5">
                        {isDeletable === 1 && <DeleteButton id={id} removeItem={removeItem}/>}
                    </div>
                </div>
            </li>
        </>
    );
};
