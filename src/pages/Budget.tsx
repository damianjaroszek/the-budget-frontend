import React from 'react';
import {DiffBar} from "../components/Charts/DiffBar";
import {Pie} from "../components/Charts/Pie";
// export const data = [
//     ["", "Budget", "Expense"],
//     ["", 11300, 3675],
// ];

const legendLabelsForDiffBar = ["Budget", "Expense"];

const compareTwoValuesForDiffBar = [11300, 3675];


// const data = [
//     ["", "Expense per category in percentage"],
//     ["Food", 30],
//     ["Transport", 10],
//     ["Commute", 14],
//     ["Watch TV", 11],
//     ["Sleep", 30], // CSS-style declaration
// ];

export const Budget = () => {

    return (
        <div className="mt-24">
            <div className="flex flex-wrap justify-center">
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
                        <Pie/>
                    </div>

                </div>
            </div>

        </div>
    );
};
