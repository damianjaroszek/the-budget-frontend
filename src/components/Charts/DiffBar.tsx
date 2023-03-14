import React from 'react';

import {Chart} from "react-google-charts";
import {prepareDataChartEmptyString} from "../../utils/prepare-data-chart-empty-string";


interface Props {
    title: string;
    widthPercentage: number;
    heightPixels: number;
    legendPosition: "top" | "right" | "bottom" | "left";
    chartAreaWidthPercentage: number;
    legendLabels: string[];
    compareTwoValues: (number | string)[];
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
    // and first empty string is adding by unshift - prepareDataChartEmptyString(legendLabels)


    return (
        <Chart
            chartType="BarChart"
            width={`${widthPercentage}%`}
            height={`${heightPixels}px`}
            data={[prepareDataChartEmptyString(legendLabels), prepareDataChartEmptyString(compareTwoValues)]}
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
