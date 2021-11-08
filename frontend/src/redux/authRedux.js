import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const signin = createAsyncThunk("auth/signin", async (values) => {
  try {
    const { data } = await api.signin(values);
    localStorage.setItem("currentUser", JSON.stringify(data));

    return data;
  } catch (error) {
    return error;
  }
});

export const signup = createAsyncThunk("auth/signup", async (values) => {
  try {
    const { data } = await api.signup(values);
    localStorage.setItem("currentUser", JSON.stringify(data));
    return data;
  } catch (error) {
    return error;
  }
});

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
  },
});

export const { signout } = authSlice.actions;
export default authSlice.reducer;
