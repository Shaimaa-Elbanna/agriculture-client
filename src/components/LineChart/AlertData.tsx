import React from 'react';
import { AdjustData, ChartData } from './types';

interface LineChartProps {
    data: AdjustData;
}

const LIMITS = {
    T: 30, // Example limit for Temperature
    S: 50, // Example limit for Solidity
    PH: 7, // Example limit for pH
    N: 20, // Example limit for Nitrogen
    H: 80, // Example limit for Humidity
    PHO: 5, // Example limit for Phosphate
    POT: 10, // Example limit for Potassium
};

interface Measurements {
    measurement: string;
    value: ChartData[]; // Adjusted to accept an array of ChartData objects
}

function MeasurementDisplay({ measurement, value }: Measurements) {
    // Checks if a value exceeds the limit for its measurement
    const exceedsLimit = (chartDataValue: number) =>
        chartDataValue > (LIMITS[measurement as keyof typeof LIMITS] || 0);
    const exceededValues = value.filter(chartData => exceedsLimit(chartData.value));

    return (
        <div className='box'>
            <h3>{measurement}</h3>
            {exceededValues.length > 0 ? (
                exceededValues.map((chartData, index) => (
                    <span key={index} style={{ color: 'red' }}>
                        {chartData.value}{index < exceededValues.length - 1 ? ', ' : ''}
                        <span style={{ color: "green" }}>   at {chartData.time}</span>
                    </span>


                ))
            ) : (
                <span>No values exceeded the limit.</span>
            )}
        </div>
    );
}

export default function AlertData({ data }: LineChartProps) {
    const entries = Object.entries(data);
    entries.pop(); // Remove the last key-value pair

    return (
        <div>
            {entries.map(([measurement, values]) => (
                // Only render MeasurementDisplay if values array has elements that exceed limits
                values.some(value => value.value > (LIMITS[measurement as keyof typeof LIMITS] || 0)) ? (
                    <MeasurementDisplay key={measurement} measurement={measurement} value={values} />
                ) : null
            ))}
        </div>
    );
}

