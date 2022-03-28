import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (page) => {
    try {
      const { data } = await api.getUsers(page);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const getOneUser = createAsyncThunk("users/getOneUser", async (id) => {
  try {
    const { data } = await api.getUserDetail(id);
    return data;
  } catch (error) {
    return error;
  }
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    userDetail: {},
    loading: false,
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
      state.error = true;
    },
    [getOneUser.pending]: (state) => {
      state.loading = true;
    },
    [getOneUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userDetail = action.payload;
    },
    [getOneUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default userSlice.reducer;
