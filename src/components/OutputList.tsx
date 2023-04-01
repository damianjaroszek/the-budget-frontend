import React from 'react';
import {OutputListItem} from "./OutputListItem";

type Data = { [k: string]: any; }

interface Props {
    data: Data[];
    sortParameter: string;
    removeItem: (id: string) => Promise<void>;
}

export const OutputList = ({data, sortParameter, removeItem}: Props) => {

    return (<>
            {/*{console.log({data})}*/}
            <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                {
                    [...data]
                        .sort((a, b) => a[sortParameter].localeCompare(b[sortParameter]))
                        .map(dataObj =>
                            // <SingleItem
                            //     user={userObj}
                            //     key={userObj.username}
                            //     onRemoveItem={removeItem}
                            // />
                            <OutputListItem key={dataObj.id} name={dataObj[sortParameter]} id={dataObj.id}
                                            isDeletable={dataObj.isDeletable} removeItem={removeItem}/>
                        )
                }
            </ul>
        </>
    )

};
