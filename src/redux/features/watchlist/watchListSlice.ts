import { createSlice } from "@reduxjs/toolkit";
const initialWatchlistLength = localStorage.getItem("watchlist")
  ? JSON.parse(localStorage.getItem("watchlist")!)?.length
  : 0;
type TInitialState = {
  watchlist: number;
};

const initialState: TInitialState = {
  watchlist: initialWatchlistLength,
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    setWatchlist: (state, action) => {
      state.watchlist = action.payload;
    },
  },
});

export const { setWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
