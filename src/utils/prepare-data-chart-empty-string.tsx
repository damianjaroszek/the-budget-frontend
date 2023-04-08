// added empty string at first position in array - is required format for charts

export const prepareDataChartEmptyString = (arrData: (number | string)[]) => {
    const dataWithFirstEmptyString = [...arrData]; // ["Budget", "Expense"]
    dataWithFirstEmptyString.unshift(""); // ["", "Budget", "Expense"] --> correct input data for chart
    return dataWithFirstEmptyString;
};
