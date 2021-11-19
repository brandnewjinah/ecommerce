import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getProductDetail = createAsyncThunk(
  "productDetails/getProductDetail",
  async (_id) => {
    try {
      const { data } = await api.getProductDetail(_id);
      return data;
    } catch (error) {
      return error;
    }
  }
);

const productDetailSlice = createSlice({
  name: "productDetails",
  initialState: {
    product: {},
    loading: true,
  },
  extraReducers: {
    [getProductDetail.pending]: (state) => {
      state.loading = true;
    },
    [getProductDetail.fulfilled]: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    [getProductDetail.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// export const { getProductDetail, getProductDetail, getProductDetail } =
//   productDetailSlice.actions;
export default productDetailSlice.reducer;
