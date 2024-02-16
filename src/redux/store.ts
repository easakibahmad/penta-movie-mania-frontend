import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/api";
import dateRangeReducer from "../redux/features/date_range/dateRangeSlice"; // Import the dateRangeSlice reducer
import watchlistReducer from "../redux/features/watchlist/watchListSlice"; // Import the dateRangeSlice reducer

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    dateRange: dateRangeReducer,
    watchList: watchlistReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
