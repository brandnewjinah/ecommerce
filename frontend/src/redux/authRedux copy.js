import {
  createSlice,
  createAsyncThunk,
  rejectWithValue,
} from "@reduxjs/toolkit";
import { publicRequest } from "../api";
import * as api from "../api";

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

export const signup = createAsyncThunk(
  "auth/signup",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await publicRequest.post("/auth/signup", values);
      return data;
    } catch (error) {
      const message = error.response.data;
      return rejectWithValue(message);
    }
  }
);

export const editUser = createAsyncThunk("users/edit", async (values) => {
  try {
    const { data } = await api.privateRequest.put(`/users/edit`, values);
    return data;
  } catch (error) {
    return error;
  }
});

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
    [signup.pending]: (state) => {
      state.isLoading = true;
    },
    [signup.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.currentUser = action.payload;
      state.message = "";
    },
    [signup.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    },
    [editUser.pending]: (state) => {
      state.isLoading = true;
    },
    [editUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.currentUser = action.payload;
    },
    [editUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});

export const { signout } = authSlice.actions;
export default authSlice.reducer;
