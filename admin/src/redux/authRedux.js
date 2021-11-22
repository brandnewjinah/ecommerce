import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../api";

export const signin = createAsyncThunk("auth/signin", async (values) => {
  try {
    const { data } = await publicRequest.post("/auth/signin", values);
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
  },
});

export const { signout } = authSlice.actions;
export default authSlice.reducer;
