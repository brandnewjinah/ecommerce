import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Status } from "../interfaces/baseInterface";
import { ProductWithCategoryIF } from "../interfaces/productInterface";
import { DashboardIF } from "../interfaces/dashboardInterface";
import * as api from "../api";

interface Param {
  year?: number;
  month?: number;
}

interface State extends Status {
  isLoading: boolean;
  dashboard: DashboardIF;
}

const initialState: State = {
  isLoading: false,
  status: 0,
  message: "",
  dashboard: {
    totalSales: 0,
    totalOrders: 0,
    recentOrders: [],
  },
};

export const getTotalSales = createAsyncThunk<
  State,
  Param,
  {
    rejectValue: Status;
  }
>("dashboard/getTotalSales", async (obj: Param, { rejectWithValue }) => {
  try {
    const res = await api.privateRequest.get(
      `/dashboard?year=${obj.year}&month=${obj.month}`
    );
    return {
      isLoading: false,
      status: res.status,
      message: res.statusText,
      dashboard: res.data,
    } as State;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTotalSales.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTotalSales.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.dashboard = action.payload.dashboard;
    });
    builder.addCase(getTotalSales.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload!.status;
      state.message = action.payload!.message;
    });
  },
});

export default dashboardSlice.reducer;
