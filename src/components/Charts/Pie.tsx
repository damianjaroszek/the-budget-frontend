import React from 'react';
import {Chart} from "react-google-charts";

// interface Props {
//     title: string;
//     pieHole: 1 | 0.9 | 0.8 | 0.7 | 0.6 | 0.5 | 0.4 | 0.3 | 0.2 | 0.1;
//     widthPercentage: number;
//     heightPixels: number;
//     legendPosition: "top" | "right" | "bottom" | "left";
//     chartAreaWidthPercentage: number;
//     legendLabels: legendLabels;
//     compareTwoValues: compareTwoValues[];
// }

const data = [
    ["", "Expense per category in percentage"],
    ["Food", 30],
    ["Transport", 10],
    ["Commute", 14],
    ["Watch TV", 11],
    ["Sleep", 30], // CSS-style declaration
];


export const Pie = () => {
    return (
        <Chart
            chartType="PieChart"
            width="100%"
            height="250px"
            data={data}
            options={{
                title: "Expense per category in percentage",
                pieHole: 0.3,
                is3D: false,

                chartArea: {
                    height: '85%',
                    top: '13%',
                    width: '100%'
                },
                legend: {position: "left"},
            }}
        />
    );
};
