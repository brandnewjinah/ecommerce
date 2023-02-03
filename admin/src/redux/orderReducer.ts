import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Status } from "../interfaces/baseInterface";
import { OrderIF } from "../interfaces/orderInterface";
import * as api from "../api";

interface Orders {
  status: string;
  totalCount: number;
  page: number;
  totalPages: number;
  data: OrderIF[];
}

interface State extends Status {
  isLoading: boolean;
  orders: Orders;
}

const initialState: State = {
  isLoading: false,
  status: 0,
  message: "",
  orders: {
    status: "",
    totalCount: 0,
    page: 1,
    totalPages: 1,
    data: [],
  },
};

export const getOrders = createAsyncThunk<
  State,
  String,
  {
    rejectValue: Status;
  }
>("orders/getOrders", async (_, { rejectWithValue }) => {
  try {
    const res = await api.privateRequest.get(`/orders`);
    return {
      isLoading: false,
      status: res.status,
      message: res.statusText,
      orders: res.data,
    } as State;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
});

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.orders = action.payload.orders;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload!.status;
      state.message = action.payload!.message;
    });
  },
});

export default ordersSlice.reducer;
