import React from 'react';
import {Chart} from "react-google-charts";
import {prepareDataChartEmptyString} from "../../utils/prepare-data-chart-empty-string";

interface Props {
    title: string[];
    pieHole: 1 | 0.9 | 0.8 | 0.7 | 0.6 | 0.5 | 0.4 | 0.3 | 0.2 | 0.1;
    widthPercentage: number;
    heightPixels: number;
    legendPosition: "top" | "right" | "bottom" | "left";
    data: [string, number][];
}

// example final structure data input to chart:
// const data = [
//     ["", "Title"],
//     ["Food", 30],
//     ["Transport", 10],
//     ["Commute", 14],
//     ["Watch TV", 11],
//     ["Sleep", 30],
// ];


export const Pie = ({title, pieHole, widthPercentage, heightPixels, legendPosition, data}: Props) => {

    return (
        <Chart
            chartType="PieChart"
            width={`${widthPercentage}%`}
            height={`${heightPixels}px`}
            data={[[prepareDataChartEmptyString(title)], data].flat(1)}
            options={{
                title: title[0],
                pieHole,
                is3D: false,

                chartArea: {
                    height: '85%',
                    top: '13%',
                    width: '100%'
                },
                legend: {position: legendPosition},
            }}
        />
    );
};
