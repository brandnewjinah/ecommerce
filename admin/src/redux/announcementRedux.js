import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getAnnouncements = createAsyncThunk(
  "announcement/getAnnouncements",
  async () => {
    try {
      const { data } = await api.getAnnouncements();
      return data;
    } catch (error) {
      return error;
    }
  }
);

const announcementSlice = createSlice({
  name: "announcement",
  initialState: {
    announcements: [],
    loading: true,
  },
  extraReducers: {
    [getAnnouncements.pending]: (state) => {
      state.loading = true;
    },
    [getAnnouncements.fulfilled]: (state, action) => {
      state.loading = false;
      state.announcements = action.payload;
    },
    [getAnnouncements.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default announcementSlice.reducer;
