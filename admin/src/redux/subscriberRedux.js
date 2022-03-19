import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getAllSubscribers = createAsyncThunk(
  "subscribers/getAllSubscribers",
  async (page) => {
    try {
      const { data } = await api.getSubscribers(page);
      return data;
    } catch (error) {
      return error;
    }
  }
);

const subscribersSlice = createSlice({
  name: "subscribers",
  initialState: {
    subscribers: [],
    loading: false,
  },
  extraReducers: {
    [getAllSubscribers.pending]: (state) => {
      state.loading = true;
    },
    [getAllSubscribers.fulfilled]: (state, action) => {
      state.loading = false;
      state.subscribers = action.payload;
    },
    [getAllSubscribers.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default subscribersSlice.reducer;
