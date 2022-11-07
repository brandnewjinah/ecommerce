import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../api";
import { Status } from "../interfaces/baseInterface";
import { SubscriberIF } from "../interfaces/subscriberInterface";

interface State extends Status {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false,
  status: 0,
  message: "",
};

export const addSubscriber = createAsyncThunk<
  Status,
  SubscriberIF,
  {
    rejectValue: Status;
  }
>(
  "subscribers/addSubscriber",
  async (email: SubscriberIF, { rejectWithValue }) => {
    try {
      const res = await publicRequest.post("/subscribers", email);
      return {
        status: res.status,
        email: res.data,
        message: res.statusText,
      } as Status;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
  }
);

const subscriberSlice = createSlice({
  name: "subscribers",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.status = 0;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addSubscriber.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addSubscriber.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.status;
      state.message = action.payload.message;
    });
    builder.addCase(addSubscriber.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload!.status;
      state.message = action.payload!.message;
    });
  },
});

export const { reset } = subscriberSlice.actions;
export default subscriberSlice.reducer;
