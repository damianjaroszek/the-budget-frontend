import React from 'react';
import {
    AccumulationChartComponent,
    AccumulationSeriesCollectionDirective,
    AccumulationSeriesDirective
} from '@syncfusion/ej2-react-charts';

//import { useStateContext } from '../../contexts/ContextProvider';

type ecomPieChartData =
    {
        x: string,
        y: number,
        text: string;
    }

interface Props {
    id: string;
    data: ecomPieChartData[];
    legendVisiblity: boolean;
    height: string;
}

export const PieChart = ({id, data, legendVisiblity, height}: Props) => {
    //const { currentMode } = useStateContext();

    return (
        // <AccumulationChartComponent
        //     id={id}
        //     legendSettings={{ visible: legendVisiblity, background: 'white' }}
        //     height={height}
        //     background={'#fff'}
        //     tooltip={{ enable: true }}
        // >
        //     <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip]} />
        //     <AccumulationSeriesCollectionDirective>
        //         <AccumulationSeriesDirective
        //             name="Sale"
        //             dataSource={data}
        //             xName="x"
        //             yName="y"
        //             innerRadius="40%"
        //             startAngle={0}
        //             endAngle={360}
        //             radius="70%"
        //             explode
        //             explodeOffset="10%"
        //             explodeIndex={2}
        //             dataLabel={{
        //                 visible: true,
        //                 name: 'text',
        //                 position: 'Inside',
        //                 font: {
        //                     fontWeight: '600',
        //                     color: '#fff',
        //                 },
        //             }}
        //         />
        //     </AccumulationSeriesCollectionDirective>
        // </AccumulationChartComponent>

        <AccumulationChartComponent id='charts'>
            <AccumulationSeriesCollectionDirective>
                <AccumulationSeriesDirective
                    dataSource={data}
                    type="Pie"
                />
            </AccumulationSeriesCollectionDirective>
        </AccumulationChartComponent>

    );
};
