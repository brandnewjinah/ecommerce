import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Status } from "../interfaces/baseInterface";

const initialState = {};

export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async () => {
    try {
    } catch (error) {}
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWishlist.pending, (state) => {});
    builder.addCase(getWishlist.fulfilled, (state, action) => {});
    builder.addCase(getWishlist.rejected, (state, action) => {});
  },
});

export default wishlistSlice.reducer;
