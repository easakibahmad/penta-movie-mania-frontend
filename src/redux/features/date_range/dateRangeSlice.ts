import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  twoMonthsAgoFormatted,
  yesterdayFormatted,
} from "../../../shared/nav_components/NavUtils";

type TDateRange = {
  startDate: string;
  endDate: string;
};

type TInitialState = {
  dateRange: TDateRange;
};

const initialState: TInitialState = {
  dateRange: {
    startDate: twoMonthsAgoFormatted,
    endDate: yesterdayFormatted,
  },
};

const dateRangeSlice = createSlice({
  name: "dateRange",
  initialState,
  reducers: {
    setDateRange: (state, action: PayloadAction<TDateRange>) => {
      state.dateRange = action.payload;
    },
    clearDateRange: (state) => {
      state.dateRange = initialState.dateRange;
    },
  },
});

export const { setDateRange, clearDateRange } = dateRangeSlice.actions;
export default dateRangeSlice.reducer;
