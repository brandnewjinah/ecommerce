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

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    products: [],
    loading: true,
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
  },
});

export default wishlistSlice.reducer;
