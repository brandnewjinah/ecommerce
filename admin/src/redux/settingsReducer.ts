import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { Status } from "../interfaces/baseInterface";
import {
  BrandIF,
  CategoryWithSubCategoryIF,
} from "../interfaces/settingsInterface";
import { CategoryIF } from "../interfaces/productInterface";

interface Categories {
  status: string;
  data: CategoryIF[];
}

interface CategoryDetails {
  status: string;
  data: CategoryWithSubCategoryIF;
}

interface BrandDetails {
  status: string;
  data: BrandIF;
}

interface State extends Status {
  isLoading: boolean;
  categories: Categories;
  categoryDetails: CategoryDetails;
  brands: Categories;
  brandDetails: BrandDetails;
}

const initialState: State = {
  isLoading: false,
  status: 0,
  message: "",
  categories: {
    status: "",
    data: [],
  },
  categoryDetails: {
    status: "",
    data: {},
  },
  brands: {
    status: "",
    data: [],
  },
  brandDetails: {
    status: "",
    data: {},
  },
};

export const getCategories = createAsyncThunk<
  State,
  String,
  {
    rejectValue: Status;
  }
>("settings/getCategories", async (_, { rejectWithValue }) => {
  try {
    const res = await api.privateRequest.get(`/settings/category`);
    return {
      isLoading: false,
      status: res.status,
      message: res.statusText,
      categories: res.data,
    } as State;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
});

export const getACategory = createAsyncThunk<
  State,
  String,
  {
    rejectValue: Status;
  }
>("settings/getACategory", async (id: String, { rejectWithValue }) => {
  try {
    const res = await api.privateRequest.get(`/settings/category/${id}`);
    return {
      isLoading: false,
      status: res.status,
      message: res.statusText,
      categoryDetails: res.data,
    } as State;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
});

export const getBrands = createAsyncThunk<
  State,
  String,
  {
    rejectValue: Status;
  }
>("settings/getBrands", async (_, { rejectWithValue }) => {
  try {
    const res = await api.privateRequest.get(`/settings/brand`);
    return {
      isLoading: false,
      status: res.status,
      message: res.statusText,
      brands: res.data,
    } as State;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
});

export const getABrand = createAsyncThunk<
  State,
  String,
  {
    rejectValue: Status;
  }
>("settings/getABrand", async (id: String, { rejectWithValue }) => {
  try {
    const res = await api.privateRequest.get(`/settings/brand/${id}`);
    return {
      isLoading: false,
      status: res.status,
      message: res.statusText,
      brandDetails: res.data,
    } as State;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
});

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.categories = action.payload.categories;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload!.status;
      state.message = action.payload!.message;
    });
    builder.addCase(getACategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getACategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.categoryDetails = action.payload.categoryDetails;
    });
    builder.addCase(getACategory.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload!.status;
      state.message = action.payload!.message;
    });
    builder.addCase(getBrands.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBrands.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.brands = action.payload.brands;
    });
    builder.addCase(getBrands.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload!.status;
      state.message = action.payload!.message;
    });
    builder.addCase(getABrand.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getABrand.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.brandDetails = action.payload.brandDetails;
    });
    builder.addCase(getABrand.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload!.status;
      state.message = action.payload!.message;
    });
  },
});

export default settingsSlice.reducer;
