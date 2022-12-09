import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { Status } from "../interfaces/baseInterface";
import { OrderIF } from "../interfaces/orderInterface";

const user = JSON.parse(localStorage.getItem("persist:root")!).auth;
const currentUser = user && JSON.parse(user).currentUser;
const userId = currentUser?._id;

export interface OrderResponse extends Status {
  orderDetails: OrderIF;
}

interface State extends OrderResponse {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false,
  status: 0,
  message: "",
  orderDetails: {
    _id: "",
    orderStatus: "",
    shipping: {},
    payment: {},
    delivery: {},
    orderItems: [],
    total: 0,
    createdAt: "",
  },
};

export const getOneOrderDetail = createAsyncThunk<
  OrderResponse,
  string,
  {
    rejectValue: Status;
  }
>("order/getOneOrderDetail", async (id: string, { rejectWithValue }) => {
  try {
    const res = await api.privateRequest.get(`/orders/${userId}/${id}`);
    return {
      status: res.status,
      message: res.statusText,
      orderDetails: res.data,
    } as OrderResponse;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOneOrderDetail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOneOrderDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload!.status;
      state.message = action.payload!.message;
      state.orderDetails = action.payload.orderDetails;
    });
    builder.addCase(getOneOrderDetail.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload!.status;
      state.message = action.payload!.message;
      state.orderDetails = {
        _id: "",
        orderStatus: "",
        shipping: {},
        payment: {},
        delivery: {},
        orderItems: [],
        total: 0,
        createdAt: "",
      };
    });
  },
});

export default orderSlice.reducer;
