import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateRequest } from "../api";
import { Status } from "../interfaces/baseInterface";
import { Products } from "../interfaces/productInterface";

interface WishlistResponse extends Status {
  products: Products;
}

interface State extends WishlistResponse {
  isLoading: Boolean;
}

const initialState: State = {
  isLoading: false,
  status: 0,
  message: "",
  products: [],
};


export const getWishlist = createAsyncThunk<
WishlistResponse,
  {
    rejectValue: Status;
  }
>(
  "wishlist/getWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const res = await privateRequest.get(`/wishlist`);
      return {
        status: res.status,
        products: res.data,
        message: res.statusText,
      } as WishlistResponse;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId) => {
    try {
      const { data } = await privateRequest.get(
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
      const { data } = await privateRequest.get(
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
 initialState,
  reducers: {
    clearWishlist: (state) => {
      state.products = [];
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWishlist.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getWishlist.fulfilled, (state, action) => {
      state.isLoading = true;
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.products = action.payload.products;
    });
    builder.addCase(getWishlist.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload!.status;
      state.message = action.payload!.message;
      state.products = [];
    });
    builder.addCase(addToWishlist.pending, (state) => {
      state.isLoading = true;
    });
    [addToWishlist.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
    },
    [addToWishlist.rejected]: (state, action) => {
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
