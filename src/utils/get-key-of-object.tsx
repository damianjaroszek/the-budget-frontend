export const getKeyOfObject = (obj: any) => {
    const arrKeysOfObj = [];
    const keys = Object.keys(obj);
    for (const key of keys) {
        arrKeysOfObj.push(key.charAt(0).toUpperCase() + key.slice(1));
    }
    return arrKeysOfObj;
};
