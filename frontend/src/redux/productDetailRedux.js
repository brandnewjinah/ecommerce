import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../api";

export const getProductDetail = createAsyncThunk(
  "productDetails/getProductDetail",
  async (_id) => {
    try {
      const { data } = await publicRequest.get(`/products/${_id}`);
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
    isLoading: false,
    isSuccess: false,
    isError: false,
  },
  extraReducers: {
    [getProductDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.product = action.payload;
    },
    [getProductDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

// export const { getProductDetail, getProductDetail, getProductDetail } =
//   productDetailSlice.actions;
export default productDetailSlice.reducer;
