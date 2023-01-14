import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { Status } from "../interfaces/baseInterface";
import { CategoryIF } from "../interfaces/settingsInterface";

export interface CategoryResponse extends Status {
  categoryDetails: {
    _id: string;
  };
}

export interface Category {
  isLoading: boolean;
  categoryAdded: CategoryResponse;
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
  },
});

export const { reset } = settingsActionsSlice.actions;

export default settingsActionsSlice.reducer;
