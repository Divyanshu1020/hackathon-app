// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import hackathonsReducer from './hackathonsSlice';

const store = configureStore({
  reducer: {
    hackathons: hackathonsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
