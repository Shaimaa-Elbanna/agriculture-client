import { useEffect } from 'react';
import { AdjustData } from './types';
import { useDispatch } from 'react-redux';
import { checkLimits } from '../../state/Slices/alertSlice';

interface LineChartProps {
    data: AdjustData;
}

const LIMITS = {
    T: 100, // Example limit for Temperature
    S: 80, // Example limit for Solidity
    PH: 10, // Example limit for pH
    N: 90, // Example limit for Nitrogen
    H: 100, // Example limit for Humidity
    PHO: 20, // Example limit for Phosphate
    POT: 60, // Example limit for Potassium
};







export default function AlertData({ data }: LineChartProps) {

    const dispatch = useDispatch()
    useEffect(() => {

        if (data) {
            dispatch(checkLimits({ data, LIMITS }))
        }
    }, [data])

    return (
        <div>

        </div>
    );
}

