import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import { setupListeners } from '@reduxjs/toolkit/query';
import alertReducer from './Slices/alertSlice';
import deviceDataReducer from './Slices/realTimeDataSlice';
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    alerts: alertReducer,
    realtimeDeviceData: deviceDataReducer,
  },

  middleware: getDefault => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);
