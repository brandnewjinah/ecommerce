import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../api";
import { Status } from "../interfaces/baseInterface";
import { AuthIF, CurrentUserIF } from "../interfaces/authInterface";

export interface CurrentUserResponse extends Status {
  currentUser: CurrentUserIF;
}

export interface State extends CurrentUserResponse {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false,
  status: 0,
  message: "",
  currentUser: {
    _id: "",
    name: "",
    email: "",
    token: "",
    isAdmin: false,
  },
};

export const signin = createAsyncThunk<
  CurrentUserResponse,
  AuthIF,
  {
    rejectValue: Status;
  }
>("auth/signin", async (value: AuthIF, { rejectWithValue }) => {
  try {
    const res = await publicRequest.post(`/auth/signin`, value);
    return {
      status: res.status,
      message: res.statusText,
      currentUser: res.data,
    } as CurrentUserResponse;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signout: (state) => {
      localStorage.removeItem("currentUser");
      state.isLoading = false;
      state.currentUser = {
        _id: "",
        name: "",
        email: "",
        token: "",
        isAdmin: false,
      };
      state.message = "";
      state.status = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.currentUser = action.payload.currentUser;
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.isLoading = false;
      state.status = action.payload!.status;
      state.message = action.payload!.message;
      state.currentUser = {
        _id: "",
        name: "",
        email: "",
        token: "",
        isAdmin: false,
      };
    });
  },
});

export const { signout } = authSlice.actions;
export default authSlice.reducer;
