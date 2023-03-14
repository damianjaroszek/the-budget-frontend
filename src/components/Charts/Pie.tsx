import React from 'react';
import {Chart} from "react-google-charts";

export const data = [
    ["Expense", "Expense per category in percentage"],
    ["Food", 30],
    ["Transport", 10],
    ["Commute", 14],
    ["Watch TV", 11],
    ["Sleep", 30], // CSS-style declaration
];

export const options = {
    title: "Expense per category in percentage",
    pieHole: 0.3,
    is3D: false,

    chartArea: {
        height: '85%',
        top: '13%',
        width: '100%'
    },
    legend: {position: "left"},
};

export const Pie = () => {
    return (
        <Chart
            chartType="PieChart"
            width="100%"
            height="250px"
            data={data}
            options={options}
        />
    );
};
