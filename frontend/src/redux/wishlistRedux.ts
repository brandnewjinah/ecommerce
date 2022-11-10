import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateRequest } from "../api";
import { Status } from "../interfaces/baseInterface";
import { Wishlist } from "../interfaces/wishlistInterface";

interface WishlistResponse extends Status {
  products: Wishlist;
}

interface State {
  isLoading: boolean;
  wishlist: WishlistResponse;
}

const initialState: State = {
  isLoading: false,
  wishlist: {
    status: 0,
    message: "",
    products: [],
  },
};

export const getWishlist = createAsyncThunk<
  WishlistResponse,
  string,
  {
    rejectValue: Status;
  }
>("wishlist/getWishlist", async (value: string, { rejectWithValue }) => {
  try {
    const res = await privateRequest.get("/wishlist");
    return {
      status: res.status,
      message: res.statusText,
      products: res.data.products,
    } as WishlistResponse;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
});

export const addToWishlist = createAsyncThunk<
  WishlistResponse,
  string,
  {
    rejectValue: Status;
  }
>("wishlist/addToWishlist", async (productId: string, { rejectWithValue }) => {
  try {
    const res = await privateRequest.get(
      `/wishlist/addToWishlist?productId=${productId}`
    );
    return {
      status: res.status,
      message: res.statusText,
      products: res.data.products,
    } as WishlistResponse;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
});

export const removeFromWishlist = createAsyncThunk<
  WishlistResponse,
  string,
  {
    rejectValue: Status;
  }
>(
  "wishlist/removeFromWishlist",
  async (productId: string, { rejectWithValue }) => {
    try {
      const res = await privateRequest.get(
        `/wishlist/removeFromWishlist?productId=${productId}`
      );
      return {
        status: res.status,
        message: res.statusText,
        products: res.data.products,
      } as WishlistResponse;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
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
      state.wishlist.status = action.payload.status;
      state.wishlist.message = action.payload.message;
      state.wishlist.products = action.payload.products;
    });
    builder.addCase(getWishlist.rejected, (state, action) => {
      state.isLoading = false;
      state.wishlist.status = action.payload!.status;
      state.wishlist.message = action.payload!.message;
      state.wishlist.products = [];
    });
    builder.addCase(addToWishlist.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addToWishlist.fulfilled, (state, action) => {
      state.isLoading = false;
      state.wishlist.status = action.payload.status;
      state.wishlist.message = action.payload.message;
      state.wishlist.products = action.payload.products;
    });
    builder.addCase(addToWishlist.rejected, (state, action) => {
      state.isLoading = false;
      state.wishlist.status = action.payload!.status;
      state.wishlist.message = action.payload!.message;
      state.wishlist.products = [];
    });
    builder.addCase(removeFromWishlist.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeFromWishlist.fulfilled, (state, action) => {
      state.isLoading = false;
      state.wishlist.status = action.payload.status;
      state.wishlist.message = action.payload.message;
      state.wishlist.products = action.payload.products;
    });
    builder.addCase(removeFromWishlist.rejected, (state, action) => {
      state.isLoading = false;
      state.wishlist.status = action.payload!.status;
      state.wishlist.message = action.payload!.message;
      state.wishlist.products = [];
    });
  },
});

export default wishlistSlice.reducer;
