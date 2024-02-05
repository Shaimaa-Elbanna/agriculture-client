import { configureStore } from '@reduxjs/toolkit';
import { api } from '../api';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: getDefault => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);
