import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { ProductFullIF } from "../interfaces/productInterface";
import { Status } from "../interfaces/baseInterface";

export interface ProductResponse extends Status {
  productDetails: {
    _id: string;
  };
}

export interface Product {
  isLoading: boolean;
  productAdded: ProductResponse;
}

const initialState: Product = {
  isLoading: false,
  productAdded: {
    status: 0,
    message: "",
    productDetails: {
      _id: "",
    },
  },
};

export const addProduct = createAsyncThunk<
  ProductResponse,
  ProductFullIF,
  {
    rejectValue: Status;
  }
>("product/addProduct", async (product: ProductFullIF, { rejectWithValue }) => {
  try {
    const res = await api.privateRequest.post(`/products`, product);
    return {
      status: res.status,
      productDetails: { _id: res.data._id },
      message: res.statusText,
    } as ProductResponse;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.productAdded = {
        status: 0,
        message: "",
        productDetails: {
          _id: "",
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productAdded.status = action.payload.status;
      state.productAdded.message = action.payload.message;
      state.productAdded.productDetails = action.payload.productDetails;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.productAdded.status = action.payload!.status;
      state.productAdded.message = action.payload!.message;
      state.productAdded.productDetails = {
        _id: "",
      };
    });
  },
});

export const { reset } = productSlice.actions;

export default productSlice.reducer;
