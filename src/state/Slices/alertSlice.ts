import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { ChartData } from '../../components/LineChart/types';

interface CheckLimitsActionPayload {
  data: { [key: string]: ChartData[] };
  LIMITS: { [key: string]: number };
}


// for array of data 
// interface AlertState {
//   exceededLimits: { measurement: string; exceededValues: ChartData[] }[];
// }

// const initialState: AlertState = {
//   exceededLimits: [],
// };


// array of alerts 
// const AlertSlice = createSlice({
//   name: 'alert',
//   initialState,
//   reducers: {
//     checkLimits: (state, action: PayloadAction<CheckLimitsActionPayload>) => {
//       const { data, LIMITS } = action.payload;
//       const entries = Object.entries(data);
//       entries.pop();
//       let exceeded: { measurement: string; exceededValues: ChartData[] }[] = [];
//       entries.forEach(([measurement, values]) => {
//         const limit = LIMITS[measurement] || 0;
//         const exceededValues = values.filter(value => {
//          return value.value > limit;
//         });
//         if (exceededValues.length > 0) {
//           exceeded.push({ measurement, exceededValues });
//           // Triggering toast here for each exceeded limit
//           toast.error(
//             `Limit exceeded for ${measurement}: ${exceededValues
//               .map(v => `${v.value} at ${v.time}`)
//               .join(', ')}`,
//             {
//               position: 'top-right',
//               autoClose: 5000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//             },
//           );
//         }
//       });
//       state.exceededLimits = exceeded;
//     },
//   },
// });


interface AlertState {
  exceededLimits: { [measurement: string]: string };
}

const initialState: AlertState = {
  exceededLimits: {},
};

const AlertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    checkLimits: (state, action: PayloadAction<CheckLimitsActionPayload>) => {
      const { data, LIMITS } = action.payload;
      const alertData= Object.entries(data)
      alertData.pop()
      alertData.forEach(([measurement, values]) => {
        const limit = LIMITS[measurement] || 0;
        const lastExceededValue = values.slice().reverse().find(value => value.value > limit);

        if (lastExceededValue) {
          // Constructing the alert string
          const alertString = `Limit exceeded for ${measurement}: ${lastExceededValue.value} at ${lastExceededValue.time}`;
          state.exceededLimits[measurement] = alertString;

          // Triggering toast here for the exceeded limit
          toast.error(alertString, {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
    },
  },
});

export const { checkLimits } = AlertSlice.actions;
export default AlertSlice.reducer;





