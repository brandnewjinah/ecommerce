import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Status } from "../interfaces/baseInterface";
import { ProductWithCategoryIF } from "../interfaces/productInterface";
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
  data: ProductWithCategoryIF[];
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

export const getProducts = createAsyncThunk<
  State,
  Param,
  {
    rejectValue: Status;
  }
>("products/getProducts", async (obj: Param, { rejectWithValue }) => {
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

export const searchProducts = createAsyncThunk<
  State,
  string,
  {
    rejectValue: Status;
  }
>("products/searchProducts", async (query: string, { rejectWithValue }) => {
  try {
    const res = await api.publicRequest.get(`/search?query=${query}`);
    return {
      isLoading: false,
      status: res.status,
      message: res.statusText,
      products: res.data,
    } as State;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.products = action.payload.products;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload!.status;
      state.message = action.payload!.message;
    });
    builder.addCase(searchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.products = action.payload.products;
    });
    builder.addCase(searchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload!.status;
      state.message = action.payload!.message;
    });
  },
});

export default productsSlice.reducer;
