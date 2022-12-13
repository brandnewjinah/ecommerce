import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { Status } from "../interfaces/baseInterface";
import { OrderIF } from "../interfaces/orderInterface";

const user = JSON.parse(localStorage.getItem("persist:root")!)?.auth;
const currentUser = user && JSON.parse(user).currentUser;
const userId = currentUser?._id;

export interface OrderResponse extends Status {
  orderDetails: OrderIF;
}

export interface UserOrdersResponse extends Status {
  orders: OrderIF[];
}

interface State {
  isLoading: boolean;
  order: OrderResponse;
  userOrders: UserOrdersResponse;
}

const initialState: State = {
  isLoading: false,
  order: {
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
  },
  userOrders: {
    status: 0,
    message: "",
    orders: [],
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
    const res = await api.privateRequest.get(`/orders/order/${userId}/${id}`);
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

export const getUserOrders = createAsyncThunk<
  UserOrdersResponse,
  string,
  {
    rejectValue: Status;
  }
>("order/getUserOrders", async (userId: string, { rejectWithValue }) => {
  try {
    const res = await api.privateRequest.get(`/orders/user/${userId}`);
    return {
      status: res.status,
      message: res.statusText,
      orders: res.data,
    } as UserOrdersResponse;
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
      state.order.status = action.payload!.status;
      state.order.message = action.payload!.message;
      state.order.orderDetails = action.payload.orderDetails;
    });
    builder.addCase(getOneOrderDetail.rejected, (state, action) => {
      state.isLoading = false;
      state.order.status = action.payload!.status;
      state.order.message = action.payload!.message;
      state.order.orderDetails = {
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
    builder.addCase(getUserOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userOrders.status = action.payload!.status;
      state.userOrders.message = action.payload!.message;
      state.userOrders.orders = action.payload.orders;
    });
    builder.addCase(getUserOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.userOrders.status = action.payload!.status;
      state.userOrders.message = action.payload!.message;
      state.userOrders.orders = [];
    });
  },
});

export default orderSlice.reducer;
