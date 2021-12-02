import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../api";
import axios from "axios";

export const signin = createAsyncThunk("auth/signin", async (values) => {
  try {
    const { data } = await publicRequest.post("/auth/signin", values);
    return data;
  } catch (error) {
    return error;
  }
});

export const signup = createAsyncThunk("auth/signup", async (values) => {
  try {
    const { data } = await publicRequest.post("/auth/signup", values);
    return data;
  } catch (error) {
    return error;
  }
});

export const editUser = createAsyncThunk(
  "users/edit",
  async (values, { getState }) => {
    const {
      auth: { currentUser },
    } = getState();
    try {
      const { data } = await axios.put(
        `http://localhost:5000/users/edit`,
        values,
        {
          headers: {
            authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      return data;
    } catch (error) {
      return error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
  },
  reducers: {
    signout: (state, action) => {
      localStorage.removeItem("currentUser");
      state.currentUser = null;
    },
  },
  extraReducers: {
    [signin.pending]: (state) => {
      state.loading = true;
    },
    [signin.fulfilled]: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    [signin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [signup.pending]: (state) => {
      state.loading = true;
    },
    [signup.fulfilled]: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    [signup.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [editUser.pending]: (state) => {
      state.loading = true;
    },
    [editUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    [editUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signout } = authSlice.actions;
export default authSlice.reducer;
