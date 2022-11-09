import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateRequest, publicRequest } from "../api";
import { Status } from "../interfaces/baseInterface";
import { Products } from "../interfaces/productInterface";

interface WishlistResponse extends Status {
  products: Products;
}

interface State extends WishlistResponse {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false,
  status: 0,
  message: "",
  products: [],
};

export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async () => {
    try {
      const res = await privateRequest.get(`/wishlist`);
      return {
        status: res.status,
        message: res.statusText,
        products: res.data,
      };
    } catch (error) {}
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWishlist.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getWishlist.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload!.status;
      state.message = action.payload!.message;
      state.products = action.payload!.products;
    });
  },
});

export default wishlistSlice.reducer;
