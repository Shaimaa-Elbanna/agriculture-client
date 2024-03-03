import { useEffect } from 'react';
import { AdjustData } from './types';
import { useDispatch } from 'react-redux';
import { checkLimits } from '../../state/Slices/alertSlice';

interface LineChartProps {
    data: AdjustData;
}

const LIMITS = {
    T: 30, // Example limit for Temperature
    S: 50, // Example limit for Solidity
    PH: 10, // Example limit for pH
    N: 20, // Example limit for Nitrogen
    H: 80, // Example limit for Humidity
    PHO: 20, // Example limit for Phosphate
    POT: 40, // Example limit for Potassium
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

