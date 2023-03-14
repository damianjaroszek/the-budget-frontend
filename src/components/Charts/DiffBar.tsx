import React from 'react';

import {Chart} from "react-google-charts";

type legendLabels = string[];
type compareTwoValues = (string | number)[];

interface Props {
    title: string;
    widthPercentage: number;
    heightPixels: number;
    legendPosition: "top" | "right" | "bottom" | "left";
    chartAreaWidthPercentage: number;
    legendLabels: legendLabels;
    compareTwoValues: compareTwoValues[];
}

export const DiffBar = ({
                            title,
                            widthPercentage,
                            heightPixels,
                            legendPosition,
                            chartAreaWidthPercentage,
                            legendLabels,
                            compareTwoValues
                        }: Props) => {

    // Prepare data to display DiffBar Chart - it requires first element of array
    // in string it is a side describe of chart but on my case
    // I am going to never use it (it looks bad for me) that is why first element is empty string
    // Correct data = ["", "Budget", "Expense"]; but for better typing and better management I am getting ["Budget", "Expense"];
    // and first empty string is adding by unshift
    const legendLabelsWithFirstEmptyString = [...legendLabels]; // ["Budget", "Expense"]
    legendLabelsWithFirstEmptyString.unshift(""); // ["", "Budget", "Expense"] --> correct input data for chart

    // [[11300, 3675],];    =>  [11300, 3675]
    const compareTwoValuesToFlat = [...compareTwoValues].flat(1);
    compareTwoValuesToFlat.unshift(""); // ["", 11300, 3675] --> correct input data for chart

    return (
        <Chart
            chartType="BarChart"
            width={`${widthPercentage}%`}
            height={`${heightPixels}px`}
            data={[legendLabelsWithFirstEmptyString, compareTwoValuesToFlat]}
            options={{
                title,
                legend: {
                    position: legendPosition,
                },
                chartArea: {
                    width: `${chartAreaWidthPercentage}%`,
                },
                hAxis: {
                    minValue: 0,
                },
            }}
        />
    );
}
