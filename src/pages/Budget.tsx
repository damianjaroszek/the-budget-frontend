import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from 'react';
import {DiffBar} from "../components/Charts/DiffBar";
import {Pie} from "../components/Charts/Pie";
import {Button} from "../components/Button";
import {fetchData} from "../utils/fetch-data";
import {constHostAddress} from "../utils/global-const";
import {BudgetEntity, StatsFromBudget} from 'types';
import {getKeyOfObject} from "../utils/get-key-of-object";


const budgetInitialValue = {
    budget: 0,
    expense: 0,
}


const currentDate = new Date().toLocaleString('en-us', {month: 'long', year: 'numeric'})


export const Budget = () => {
    const [getBudget, setGetBudget] = useState<BudgetEntity>(budgetInitialValue);
    const [stats, setStats] = useState<StatsFromBudget[] | null>(null);
    const [isDataSet, setIsDataSet] = useState<boolean>(false);
    const [statementUpdateBudget, setStatementUpdateBudget] = useState<boolean>(false)

    const legendLabelsForDiffBar = getKeyOfObject(getBudget); // ["Budget", "Expense"];
    const compareTwoValuesForDiffBar = [getBudget.budget, getBudget.expense];

    const legendLabelsForPie = ["Expense per category in percentage"];
    // const dataForPie: [string, number][] = [
    //     ["Food", 30],
    //     ["Transport", 10],
    //     ["Commute", 14],
    //     ["Watch TV", 11],
    //     ["Sleep", 30],
    // ];


    const updateBudgetToDb = async (e: SyntheticEvent) => {
        e.preventDefault();
        const data = await fetchData(constHostAddress, '/budget', '', {
            method: 'PUT',
            body: JSON.stringify(
                getBudget
            ),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (data === 1) {
            setStatementUpdateBudget(true);
        }

        setIsDataSet(prevState => !prevState);


        setGetBudget(budgetInitialValue);
    }

    useEffect(() => {
        //setGetBudget(budgetInitialValue);
        const getBudgetFromDb = async () => {
            const budget = await fetchData(constHostAddress, '/budget/showBudgetExpense');
            setGetBudget(budget[0])

        }
        getBudgetFromDb().catch(console.error);
        setIsDataSet(true);

    }, [isDataSet]);//isDataSet

    useEffect(() => {
        //setGetBudget(budgetInitialValue);
        const getStatsFromDb = async () => {
            const stats = await fetchData(constHostAddress, '/budget/getStatsPerCategory');
            setStats(stats)
        }
        getStatsFromDb().catch(console.error);
        setIsDataSet(true);

    }, []);//isDataSet


    useEffect(() => {
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            setStatementUpdateBudget(false)
        }, 3000)

        return () => {
            clearTimeout(timeId)
        }
    }, [getBudget]);


    const arr: any[] = [];
    stats && [...stats].map(stat => arr.push(stat.categoryName) && arr.push(stat.expenseSum));

    const size: number = 2;
    const dataForPie: [string, number][] = arr?.reduce((acc, curr: string | number, i: number) => {
        if (!(i % size)) {    // if index is 0 or can be divided by the `size`...
            acc.push(arr?.slice(i, i + size));   // ..push a chunk of the original array to the accumulator
        }
        return acc;
    }, []);

    // const prepareDataPieChart = (statsObj: ) => {
    // const arr: any[] = [];
    // stats && [...stats].map(stat => arr.push(stat.categoryName) && arr.push(stat.expenseSum));
    //
    // const size: number = 2;
    // const dataForPie: [string, number][] = arr?.reduce((acc, curr: string | number, i: number) => {
    //     if (!(i % size)) {    // if index is 0 or can be divided by the `size`...
    //         acc.push(arr?.slice(i, i + size));   // ..push a chunk of the original array to the accumulator
    //     }
    //     return acc;
    // }, []);
    //
    // return dataForPie;
    // }

//{stats && console.log(stats[0])}

    return (<>
            {console.log(stats)}
            <div className="mt-24">
                <div className="flex flex-wrap justify-center">
                    <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
                        <div className="flex flex-wrap justify-between">
                            <p className="text-3xl font-semibold">Budget vs Expense</p>
                            <p className="text-xl text-gray-400 font-thin">{currentDate}</p>
                        </div>

                        <div className="flex justify-between pt-10">
                            <div className="text-xl font-semibold" style={{color: '#2952A3'}}>Budget
                                [PLN]: {statementUpdateBudget && <span className="text-green-500">Saved</span>}
                                <form className="flex justify-start" onSubmit={updateBudgetToDb}>
                                    <input
                                        style={{width: '250px', color: '#2952A3'}}
                                        className="pl-2 text-4xl"
                                        type={"number"}
                                        min={0}
                                        maxLength={10}
                                        size={10}
                                        max={999999999.99}
                                        value={getBudget.budget.toFixed(2)}
                                        step={0.01}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setGetBudget(getBudget => ({
                                            ...getBudget,
                                            budget: Number(e.target.value),
                                        }))}

                                    >
                                    </input>
                                    <div className="self-center">
                                        <Button color="white" bgColor="blue" text="Update" borderRadius="1px"
                                                type="submit" paddingRight={3} paddingLeft={3} paddingBottom={3}
                                                paddingTop={3}/>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="flex justify-between pt-5">
                            <p className="text-xl font-semibold" style={{color: '#B02E0E'}}>Expense [PLN]:
                                {getBudget && <input
                                    style={{width: '300px', color: '#B02E0E'}}
                                    className="pl-2 text-4xl"
                                    type={"number"}
                                    min={0}
                                    value={(getBudget.expense).toFixed(2)}
                                    step={0.1}
                                    disabled={true}
                                >
                                </input>}
                            </p>
                        </div>

                        <div className="mt-1 ">

                        </div>

                    </div>

                    <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
                        <div className="flex justify-between">
                            <p className="text-xl font-semibold">Monthly Stats</p>
                        </div>

                        <div className="mt-1 ">
                            <DiffBar
                                title="Budget vs Expense - current month"
                                widthPercentage={100}
                                heightPixels={250}
                                legendPosition="bottom"
                                chartAreaWidthPercentage={100}
                                legendLabels={legendLabelsForDiffBar}
                                compareTwoValues={compareTwoValuesForDiffBar}
                            />
                        </div>

                    </div>

                    <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
                        <div className="flex justify-between">
                            <p className="text-xl font-semibold">Structure of expense</p>
                        </div>

                        <div className="mt-1 ">
                            <Pie
                                title={legendLabelsForPie}
                                pieHole={0.3}
                                widthPercentage={100}
                                heightPixels={250}
                                legendPosition={"left"}
                                data={dataForPie}
                            />
                        </div>

                    </div>


                </div>

            </div>
        </>
    );
};
