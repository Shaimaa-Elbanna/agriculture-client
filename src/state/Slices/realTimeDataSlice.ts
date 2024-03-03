// features/deviceData/deviceDataSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  ChartData } from '../../components/LineChart/types'; // Adjust the import paths as necessary

export type DeviceData = {
  [parameter: string]: ChartData;
};
interface DeviceDataState {
  byId: {
    [deviceName: string]: DeviceData;
  };
}

const initialState: DeviceDataState = {
  byId: {},
};

const deviceDataSlice = createSlice({
  name: 'deviceData',
  initialState,
  reducers: {
    // Action to add/update data for a specific device
    addDeviceData: (state, action: PayloadAction<{ deviceName: string; data: DeviceData }>) => {
      const { deviceName, data } = action.payload;
      // If the device already exists, update its data, otherwise add new device entry
      if (state.byId[deviceName]) {
        Object.keys((parameter: string | number) => {
          if (state.byId[deviceName][parameter]) {
            state.byId[deviceName][parameter] = { ...state.byId[deviceName][parameter],...data[parameter]};
          }
          else{
            state.byId[deviceName][parameter] =data[parameter]
          }
        });
        state.byId[deviceName] = { ...state.byId[deviceName], ...data };
      }
       else {
        state.byId[deviceName] = data;
      }


    },
  },
});

export const { addDeviceData } = deviceDataSlice.actions;

export default deviceDataSlice.reducer;
