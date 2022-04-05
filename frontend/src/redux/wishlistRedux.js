import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async () => {
    try {
      const { data } = await api.privateRequest.get(`/wishlist`);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId) => {
    try {
      const { data } = await api.privateRequest.get(
        `/wishlist/addToWishlist?productId=${productId}`
      );

      return data;
    } catch (error) {
      return error;
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId) => {
    try {
      const { data } = await api.privateRequest.get(
        `/wishlist/removeFromWishlist?productId=${productId}`
      );
      return data;
    } catch (error) {
      return error;
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    products: [],
    loading: true,
  },
  reducers: {
    clearWishlist: (state) => {
      state.products = [];
      state.loading = false;
    },
  },
  extraReducers: {
    [addToWishlist.pending]: (state) => {
      state.loading = true;
    },
    [addToWishlist.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
    },
    [addToWishlist.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getWishlist.pending]: (state) => {
      state.loading = true;
    },
    [getWishlist.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
    },
    [getWishlist.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [removeFromWishlist.pending]: (state) => {
      state.loading = true;
    },
    [removeFromWishlist.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    [removeFromWishlist.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
