// getting key from object to array - is required for diffbar labels
// {budget: 7725.42, expense: 288} --> ['Budget', 'Expense']
export const getKeyOfObject = (obj: any) => {
    const arrKeysOfObj = [];
    const keys = Object.keys(obj);
    for (const key of keys) {
        arrKeysOfObj.push(key.charAt(0).toUpperCase() + key.slice(1));
    }
    return arrKeysOfObj;
};
