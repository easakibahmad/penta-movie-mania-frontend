/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialWatchlist = localStorage.getItem("watchlist")
  ? JSON.parse(localStorage.getItem("watchlist")!)
  : [];

const addAndRemoveWatchlist = createSlice({
  name: "watchlistAddAndRemove",
  initialState: {
    watchlistAddAndRemove: initialWatchlist,
  },
  reducers: {
    addToWatchlist(state, action) {
      const newItem = action.payload;
      state.watchlistAddAndRemove = [...state.watchlistAddAndRemove, newItem]; // Concatenate the new item with existing watchlist
      localStorage.setItem(
        "watchlist",
        JSON.stringify(state.watchlistAddAndRemove)
      );
    },
    removeFromWatchlist(state, action) {
      const itemIdToRemove = action.payload;
      state.watchlistAddAndRemove = state.watchlistAddAndRemove.filter(
        (item: any) => item.movieId !== itemIdToRemove
      );
      localStorage.setItem(
        "watchlist",
        JSON.stringify(state.watchlistAddAndRemove)
      );
    },
  },
});

export const { addToWatchlist, removeFromWatchlist } =
  addAndRemoveWatchlist.actions;

export default addAndRemoveWatchlist.reducer;
