import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from 'react';
import {DiffBar} from "../components/Charts/DiffBar";
import {Pie} from "../components/Charts/Pie";
import {Button} from "../components/Button";
import {fetchData} from "../utils/fetch-data";
import {constHostAddress} from "../utils/global-host-address";
import {BudgetEntity, StatsFromBudget} from 'types';
import {getKeyOfObject} from "../utils/get-key-of-object";
import {prepareDataPieChart} from "../utils/prepare-data-pie-chart";


const budgetInitialValue = {
    budget: 0,
    expense: 0,
}


const currentDate = new Date().toLocaleString('en-us', {month: 'long', year: 'numeric'}) // getting current date

// Budget page

export const Budget = () => {
    const [getBudget, setGetBudget] = useState<BudgetEntity>(budgetInitialValue); // getting budget and expense data from db
    const [stats, setStats] = useState<StatsFromBudget[] | null>(null); // getting statistic data from db - array of objects -
    // [{categoryName: 'Chemistry', expenseSum: 20}, {categoryName: 'Food', expenseSum: 39}, {categoryName: 'Transport', expenseSum: 229}]


    const [isDataSet, setIsDataSet] = useState<boolean>(false); // checking if the data has changed (loaded from backend)
    const [statementUpdateBudget, setStatementUpdateBudget] = useState<boolean>(false) // if statementUpdateBudget is true show "Saved" statement

    const legendLabelsForDiffBar = getKeyOfObject(getBudget); // ["Budget", "Expense"];
    const compareTwoValuesForDiffBar = [getBudget.budget, getBudget.expense]; // values to compare in Diff Chart

    const legendLabelsForPie = ["Expense per category in percentage"]; // description of Pie Chart

    // update budget values after clicking "Update" button
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
            setStatementUpdateBudget(true); // when backend response is OK set statementUpdateBudget for true to showing "saved" statement
        }

        setIsDataSet(prevState => !prevState); // doing changes in state for communicate it to other useEffect (setShopsFromDb) - providing actual data


        setGetBudget(budgetInitialValue); // cleaning getBudget
    }

    // getting budget and expense from db for diff chart
    useEffect(() => {
        const getBudgetFromDb = async () => {
            const budget = await fetchData(constHostAddress, '/budget/showBudgetExpense');
            setGetBudget(budget[0])

        }
        getBudgetFromDb().catch(console.error);
        setIsDataSet(true);

    }, [isDataSet]); // it does this every time isDataSet changes

    // getting statistic for pie chart
    useEffect(() => {
        const getStatsFromDb = async () => {
            const stats = await fetchData(constHostAddress, '/budget/getStatsPerCategory');
            setStats(stats)
        }
        getStatsFromDb().catch(console.error);
        setIsDataSet(true);

    }, []);


    // show statement saved per 3 seconds
    useEffect(() => {
        const timeId = setTimeout(() => {
            setStatementUpdateBudget(false) // After 3 seconds set the statementUpdateBudget value to false
        }, 3000)

        return () => {
            clearTimeout(timeId)
        }
    }, [getBudget]);


// prepared data from array of objects
// [{categoryName: 'Chemistry', expenseSum: 20}, {categoryName: 'Food', expenseSum: 39},{categoryName: 'Transport', expenseSum: 229}]
// to array of arrays [['Chemistry', 20], ['Food', 39], ['Transport', 229]] is required format of data for pie chart
    const dataForPie = prepareDataPieChart(stats);


    return (<>
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
