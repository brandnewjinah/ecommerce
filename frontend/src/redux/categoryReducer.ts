import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Status } from "../interfaces/baseInterface";
import { Product } from "../interfaces/productInterface";
import * as api from "../api";

interface Param {
  category?: string;
  page?: number;
  sub?: string;
  sort?: string;
}

interface Products {
  status: string;
  totalCount: number;
  page: number;
  totalPages: number;
  data: Product[];
}

interface State extends Status {
  isLoading: boolean;
  products: Products;
}

const initialState: State = {
  isLoading: false,
  status: 0,
  message: "",
  products: {
    status: "",
    totalCount: 0,
    page: 1,
    totalPages: 1,
    data: [],
  },
};

export const getCategory = createAsyncThunk<
  State,
  Param,
  {
    rejectValue: Status;
  }
>("category/getCategory", async (obj: Param, { rejectWithValue }) => {
  try {
    if (obj.sub === undefined) {
      const res = await api.publicRequest.get(
        `/products?category=${obj.category}&sort=${obj.sort}&page=${obj.page}`
      );
      return {
        isLoading: false,
        status: res.status,
        message: res.statusText,
        products: res.data,
      } as State;
    } else {
      const res = await api.publicRequest.get(
        `/products?category=${obj.category}&sub=${obj.sub}&sort=${obj.sort}&page=${obj.page}`
      );
      return {
        isLoading: false,
        status: res.status,
        message: res.statusText,
        products: res.data,
      } as State;
    }
  } catch (error: any) {
    return rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.products = action.payload.products;
    });
    builder.addCase(getCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload!.status;
      state.message = action.payload!.message;
    });
  },
});

export default categorySlice.reducer;
