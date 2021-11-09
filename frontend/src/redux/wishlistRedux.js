import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import axios from "axios";

export const saveProduct = createAsyncThunk(
  "wishlist/saveProduct",
  async (productId, { getState }) => {
    try {
      console.log(productId);
      //   const {
      //     auth: { currentUser },
      //   } = getState();
      //   const { data } = await axios.post(
      //     `http://localhost:5000/wishlist/${currentUser._id}`,
      //     productId,
      //     {
      //       headers: {
      //         authorization: `Bearer ${currentUser.token}`,
      //       },
      //     }
      //   );
      //   console.log(data);
    } catch (error) {
      return error;
    }
  }
);

const initialState = {};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  extraReducers: {
    [saveProduct.pending]: (state) => {
      state.loading = true;
    },
    [saveProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.orderDetail = action.payload.order;
    },
    [saveProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default wishlistSlice.reducer;
