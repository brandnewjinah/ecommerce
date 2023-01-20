import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { Status } from "../interfaces/baseInterface";
import {
  CategoryIF,
  CategoryWithSubCategoryIF,
} from "../interfaces/settingsInterface";

export interface ParamsIF {
  id?: string;
  category: CategoryWithSubCategoryIF;
}

export interface SubParamsIF {
  id?: string;
  sub: CategoryIF;
}

export interface CategoryResponse extends Status {
  categoryDetails: {
    _id: string;
  };
}

export interface Category {
  isLoading: boolean;
  categoryAdded: CategoryResponse;
  categoryUpdated: CategoryResponse;
  subAdded: CategoryResponse;
}

const initialState: Category = {
  isLoading: false,
  categoryAdded: {
    status: 0,
    message: "",
    categoryDetails: {
      _id: "",
    },
  },
  subAdded: {
    status: 0,
    message: "",
    categoryDetails: {
      _id: "",
    },
  },
  categoryUpdated: {
    status: 0,
    message: "",
    categoryDetails: {
      _id: "",
    },
  },
};

export const addCategory = createAsyncThunk<
  CategoryResponse,
  CategoryIF,
  {
    rejectValue: Status;
  }
>(
  "settingsActions/addCategory",
  async (category: CategoryIF, { rejectWithValue }) => {
    try {
      const res = await api.privateRequest.post(`/settings/category`, category);
      return {
        status: res.status,
        message: res.statusText,
        categoryDetails: { _id: res.data._id },
      } as CategoryResponse;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
  }
);

export const updateCategory = createAsyncThunk<
  CategoryResponse,
  ParamsIF,
  {
    rejectValue: Status;
  }
>(
  "settingsActions/updateCategory",
  async (obj: ParamsIF, { rejectWithValue }) => {
    try {
      const res = await api.privateRequest.patch(
        `/settings/category/${obj.id}`,
        obj.category
      );
      return {
        status: res.status,
        message: res.statusText,
        categoryDetails: { _id: res.data._id },
      } as CategoryResponse;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
  }
);

export const addSubCategory = createAsyncThunk<
  CategoryResponse,
  SubParamsIF,
  {
    rejectValue: Status;
  }
>(
  "settingsActions/addSubCategory",
  async (obj: SubParamsIF, { rejectWithValue }) => {
    try {
      const res = await api.privateRequest.patch(
        `/settings/category/add/${obj.id}`,
        obj.sub
      );
      return {
        status: res.status,
        message: res.statusText,
        categoryDetails: { _id: res.data._id },
      } as CategoryResponse;
    } catch (error: any) {
      return rejectWithValue({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
  }
);

const settingsActionsSlice = createSlice({
  name: "settingsActions",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.categoryAdded = {
        status: 0,
        message: "",
        categoryDetails: {
          _id: "",
        },
      };
      state.categoryUpdated = {
        status: 0,
        message: "",
        categoryDetails: {
          _id: "",
        },
      };
      state.subAdded = {
        status: 0,
        message: "",
        categoryDetails: {
          _id: "",
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categoryAdded.status = action.payload.status;
      state.categoryAdded.message = action.payload.message;
      state.categoryAdded.categoryDetails = action.payload.categoryDetails;
    });
    builder.addCase(addCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.categoryAdded.status = action.payload!.status;
      state.categoryAdded.message = action.payload!.message;
      state.categoryAdded.categoryDetails = {
        _id: "",
      };
    });
    builder.addCase(updateCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categoryUpdated.status = action.payload.status;
      state.categoryUpdated.message = action.payload.message;
      state.categoryUpdated.categoryDetails = action.payload.categoryDetails;
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.categoryUpdated.status = action.payload!.status;
      state.categoryUpdated.message = action.payload!.message;
      state.categoryUpdated.categoryDetails = {
        _id: "",
      };
    });
    builder.addCase(addSubCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addSubCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.subAdded.status = action.payload.status;
      state.subAdded.message = action.payload.message;
      state.subAdded.categoryDetails = action.payload.categoryDetails;
    });
    builder.addCase(addSubCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.subAdded.status = action.payload!.status;
      state.subAdded.message = action.payload!.message;
      state.subAdded.categoryDetails = {
        _id: "",
      };
    });
  },
});

export const { reset } = settingsActionsSlice.actions;

export default settingsActionsSlice.reducer;
