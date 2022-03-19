import {
  createAsyncThunk,
  createSlice,
  rejectWithValue,
} from "@reduxjs/toolkit";
import { publicRequest } from "../api";

export const addSubscriber = createAsyncThunk(
  "subscribers/addSubscriber",
  async (value, { rejectWithValue }) => {
    try {
      const { data } = await publicRequest.post("/subscribers", value);
      return data;
    } catch (error) {
      const message = error.response.data;
      return rejectWithValue(message);
    }
  }
);

const subscriberSlice = createSlice({
  name: "subscribers",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    email: "",
    message: "",
  },
  reducers: {
    reset: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.email = "";
      state.message = "";
    },
  },
  extraReducers: {
    [addSubscriber.pending]: (state) => {
      state.isLoading = true;
    },
    [addSubscriber.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.email = action.payload;
    },
    [addSubscriber.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload;
    },
  },
});

export const { reset } = subscriberSlice.actions;
export default subscriberSlice.reducer;
