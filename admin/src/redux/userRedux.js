import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  try {
    const { data } = await api.getUsers();
    return data;
  } catch (error) {
    return error;
  }
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    loading: true,
  },
  extraReducers: {
    [getAllUsers.pending]: (state) => {
      state.loading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
