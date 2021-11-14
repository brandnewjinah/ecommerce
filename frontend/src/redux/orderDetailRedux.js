import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getOrderDetail = createAsyncThunk(
  "orderDetails/getOrderDetail",
  async (id, { getState }) => {
    try {
      const {
        auth: { currentUser },
      } = getState();
      const { data } = await axios.get(`http://localhost:5000/orders/${id}`, {
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

export const getUserOrders = createAsyncThunk(
  "orderDetails/getUserOrders",
  async (userId, { getState }) => {
    try {
      const {
        auth: { currentUser },
      } = getState();

      const { data } = await axios.get(
        `http://localhost:5000/orders/user/${userId}`,
        {
          headers: {
            authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return error;
    }
  }
);

const orderDetailSlice = createSlice({
  name: "orderDetails",
  initialState: {},
  extraReducers: {
    [getOrderDetail.pending]: (state) => {
      state.loading = true;
    },
    [getOrderDetail.fulfilled]: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    [getOrderDetail.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getUserOrders.pending]: (state) => {
      state.loading = true;
    },
    [getUserOrders.fulfilled]: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    [getUserOrders.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default orderDetailSlice.reducer;
