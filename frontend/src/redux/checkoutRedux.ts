import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { Status } from "../interfaces/baseInterface";
import {
  DeliveryIF,
  PaymentIF,
  ShippingIF,
  OrderIF,
} from "../interfaces/checkoutInterface";

export interface OrderResponse extends Status {
  _id: string;
}

interface State {
  isLoading: boolean;
  orderAdded: OrderResponse;
  shipping: ShippingIF;
  delivery: DeliveryIF;
  payment: PaymentIF;
}

const initialState: State = {
  isLoading: false,
  orderAdded: {
    status: 0,
    message: "",
    _id: "",
  },
  shipping: {},
  delivery: {},
  payment: {},
};

export const placeOrder = createAsyncThunk<
  OrderResponse,
  OrderIF,
  {
    rejectValue: Status;
  }
>("order/placeOrder", async (order: OrderIF, { rejectWithValue }) => {
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

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    saveShipping: (state, action) => {
      state.shipping = action.payload;
    },
    saveDelivery: (state, action) => {
      state.delivery = action.payload;
    },
    savePayment: (state, action) => {
      state.payment = action.payload;
    },
    reset: (state) => {
      state.isLoading = false;
      state.orderAdded = {
        status: 0,
        message: "",
        _id: "",
      };
      state.shipping = {};
      state.delivery = {};
      state.payment = {};
    },
  },
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

export const { saveShipping, saveDelivery, savePayment, reset } =
  orderSlice.actions;
export default orderSlice.reducer;
