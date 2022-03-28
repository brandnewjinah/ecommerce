import {
  createSlice,
  createAsyncThunk,
  rejectWithValue,
} from "@reduxjs/toolkit";
import { publicRequest } from "../api";

export const signin = createAsyncThunk(
  "auth/signin",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await publicRequest.post("/auth/signin", values);
      return data;
    } catch (error) {
      const message = error.response.data;
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  reducers: {
    signout: (state, action) => {
      localStorage.removeItem("currentUser");
      state.isLoading = false;
      state.currentUser = null;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: {
    [signin.pending]: (state) => {
      state.isLoading = true;
    },
    [signin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.currentUser = action.payload;
    },
    [signin.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    },
  },
});

export const { signout } = authSlice.actions;
export default authSlice.reducer;
