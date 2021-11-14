import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId, { getState }) => {
    const {
      auth: { currentUser },
    } = getState();
    try {
      const { data } = await axios.get(
        `http://localhost:5000/wishlist/addToWishlist?productId=${productId}`,
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

export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (arg, { getState }) => {
    const {
      auth: { currentUser },
    } = getState();
    try {
      const { data } = await axios.get(`http://localhost:5000/wishlist`, {
        headers: {
          authorization: `Bearer ${currentUser.token}`,
        },
      });
      console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId, { getState }) => {
    const {
      auth: { currentUser },
    } = getState();
    try {
      const { data } = await axios.get(
        `http://localhost:5000/wishlist/removeFromWishlist?productId=${productId}`,
        {
          headers: {
            authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      return data;
    } catch (error) {}
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
      state.products = action.payload;
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
