import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (order, { getState }) => {
    try {
      const {
        auth: { currentUser },
      } = getState();
      const { data } = await axios.post("http://localhost:5000/orders", order, {
        headers: {
          authorization: `Bearer ${currentUser.token}`,
        },
      });
      return data;
    } catch (error) {
      return error;
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    shipping: {},
    delivery: {},
    payment: {},
  },
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
    resetOrder: (state) => {
      state.shipping = {};
      state.delivery = {};
      state.payment = {};
    },
  },
  extraReducers: {
    [placeOrder.pending]: (state) => {
      state.loading = true;
    },
    [placeOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.orderDetail = action.payload.order;
    },
    [placeOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { resetOrder, saveShipping, saveDelivery, savePayment } =
  orderSlice.actions;
export default orderSlice.reducer;
