import { configureStore } from '@reduxjs/toolkit';
import ticketsReducer from './slices/tickets';

const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
