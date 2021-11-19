import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAnnouncements = createAsyncThunk(
  "announcement/getAnnouncements",
  async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/announcements?active=true`
      );
      console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }
);

const announcementSlice = createSlice({
  name: "announcement",
  initialState: {},
  extraReducers: {
    [getAnnouncements.pending]: (state) => {
      state.loading = true;
    },
    [getAnnouncements.fulfilled]: (state, action) => {
      state.loading = false;
      state.announcement = action.payload;
    },
    [getAnnouncements.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default announcementSlice.reducer;
