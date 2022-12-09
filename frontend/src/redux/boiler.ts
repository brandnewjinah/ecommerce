import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { Status } from "../interfaces/baseInterface";

export interface OrderResponse extends Status {
  _id: string;
}

interface State {
  isLoading: boolean;
  orderAdded: OrderResponse;
}

const initialState: State = {
  isLoading: false,
  orderAdded: {
    status: 0,
    message: "",
    _id: "",
  },
};

export const placeOrder = createAsyncThunk<
  OrderResponse,
  string,
  {
    rejectValue: Status;
  }
>("order/placeOrder", async (order: string, { rejectWithValue }) => {
  try {
    const res = await api.privateRequest.post(`/orders`, order);

    return {
      status: res.status,
      message: res.statusText,
      _id: res.data._id,
    } as OrderResponse;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
});

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(placeOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orderAdded.status = action.payload!.status;
      state.orderAdded.message = action.payload!.message;
      state.orderAdded._id = action.payload._id;
    });
    builder.addCase(placeOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.orderAdded.status = action.payload!.status;
      state.orderAdded.message = action.payload!.message;
      state.orderAdded._id = "";
    });
  },
});

export default wishlistSlice.reducer;
