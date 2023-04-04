export const getValueOfObject = (objects: any) => {
    const arrValueOfObj = [];
    for (const object of objects) {
        arrValueOfObj.push(Object.values(object));
    }
    return arrValueOfObj;
}
