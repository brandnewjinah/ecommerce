import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (page) => {
    try {
      const { data } = await api.adminRequest.get(`/users?page=${page}`);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const getOneUser = createAsyncThunk("users/getOneUser", async (id) => {
  try {
    const { data } = await api.adminRequest.get(`users/${id}`);
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
    usersLoading: false,
    userDetailLoading: false,
  },
  extraReducers: {
    [getAllUsers.pending]: (state) => {
      state.usersLoading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.usersLoading = false;
      state.users = action.payload;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.usersLoading = false;
      state.error = true;
    },
    [getOneUser.pending]: (state) => {
      state.userDetailLoading = true;
    },
    [getOneUser.fulfilled]: (state, action) => {
      state.userDetailLoading = false;
      state.userDetail = action.payload;
    },
    [getOneUser.rejected]: (state, action) => {
      state.userDetailLoading = false;
      state.error = true;
    },
  },
});

export default userSlice.reducer;
