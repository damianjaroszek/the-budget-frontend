import React, {ChangeEvent, useEffect, useState} from 'react';
import {DiffBar} from "../components/Charts/DiffBar";
import {Pie} from "../components/Charts/Pie";
import {Button} from "../components/Button";
import {fetchData} from "../utils/fetch-data";
import {constHostAddress} from "../utils/global-const";
import {BudgetEntity} from 'types';

const legendLabelsForDiffBar = ["Budget", "Expense"];
const compareTwoValuesForDiffBar = [11300, 3675];

const legendLabelsForPie = ["Expense per category in percentage"];


const dataForPie: [string, number][] = [
    ["Food", 30],
    ["Transport", 10],
    ["Commute", 14],
    ["Watch TV", 11],
    ["Sleep", 30],
];

const budgetInitialValue = {
    budget: 0,
    expense: 0,
}

export const Budget = () => {
    const [getBudget, setGetBudget] = useState<BudgetEntity>(budgetInitialValue);
    const [isDataSet, setIsDataSet] = useState<boolean>(false);

    // const saveShopToDb = async (e: SyntheticEvent) => {
    //     e.preventDefault();
    //         const data = await fetchData(constHostAddress, '/product', '', {
    //             method: 'POST',
    //             body: JSON.stringify(
    //                 newProductFromForm
    //             ),
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //
    //         setIsDataSet(prevState => !prevState);
    //
    //
    //     setNewProductFromForm(shopInitValues);
    // }

    useEffect(() => {
        //setGetBudget(budgetInitialValue);
        const getBudgetFromDb = async () => {
            const budget = await fetchData(constHostAddress, '/budget/showBudgetExpense');
            setGetBudget(budget[0])
        }
        getBudgetFromDb().catch(console.error);
        setIsDataSet(true);

    }, []);//isDataSet


    return (<>
            <div className="mt-24">
                <div className="flex flex-wrap justify-center">
                    <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
                        <div className="flex justify-between">
                            <p className="text-3xl font-semibold">Budget vs Expense</p>
                        </div>

                        <div className="flex justify-between pt-10">
                            <div className="text-xl font-semibold">Budget [PLN]:
                                <form className="flex justify-start" onSubmit={() => {
                                }}>
                                    <input
                                        style={{width: '250px'}}
                                        className="pl-2 text-4xl"
                                        type={"number"}
                                        min={0}
                                        maxLength={9}
                                        size={9}
                                        value={getBudget.budget.toFixed(2)}
                                        step={0.1}
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
                            <p className="text-xl font-semibold">Expense [PLN]:
                                {getBudget && <input
                                    style={{width: '300px'}}
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
