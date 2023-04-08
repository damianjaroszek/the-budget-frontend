// prepared data from array of objects
// [{categoryName: 'Chemistry', expenseSum: 20}, {categoryName: 'Food', expenseSum: 39},{categoryName: 'Transport', expenseSum: 229}]
// to array of arrays [['Chemistry', 20], ['Food', 39], ['Transport', 229]] is required format of data for pie chart
import {StatsFromBudget} from "types";

export const prepareDataPieChart = (stats: StatsFromBudget[] | null) => {
    const arr: any[] = [];
    stats && [...stats].map(stat => arr.push(stat.categoryName) && arr.push(stat.expenseSum));

    const size: number = 2;
    const dataForPie: [string, number][] = arr?.reduce((acc, curr: string | number, i: number) => {
        if (!(i % size)) {    // if index is 0 or can be divided by the `size`...
            acc.push(arr?.slice(i, i + size));   // push a chunk of the original array to the accumulator
        }
        return acc;
    }, []);

    return dataForPie;
}
