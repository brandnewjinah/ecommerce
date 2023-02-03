import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Status } from "../interfaces/baseInterface";
import { ProductFullIF } from "../interfaces/productInterface";
import * as api from "../api";

interface State extends Status {
  isLoading: boolean;
  product: ProductFullIF;
}

const initialState: State = {
  isLoading: false,
  status: 0,
  message: "",
  product: {
    _id: "",
    name: "",
    brand: {
      _id: "",
      name: "",
      value: "",
    },
    image: "",
    size: "",
    description: "",
    category1: {
      _id: "",
      name: "",
      value: "",
      subCategory: [],
    },
    category2: {
      _id: "",
      name: "",
      value: "",
    },
  },
};

export const getProductDetails = createAsyncThunk<
  State,
  String,
  {
    rejectValue: Status;
  }
>(
  "productDetails/getProductDetails",
  async (id: String, { rejectWithValue }) => {
    try {
      const res = await api.publicRequest.get(`/products/${id}`);
      return {
        isLoading: false,
        status: res.status,
        message: res.statusText,
        product: res.data,
      } as State;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
  }
);

const proudctDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.product = action.payload.product;
    });
    builder.addCase(getProductDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload!.status;
      state.message = action.payload!.message;
    });
  },
});

export default proudctDetailsSlice.reducer;
