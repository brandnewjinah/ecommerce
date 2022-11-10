import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../api";
import { Status } from "../interfaces/baseInterface";
import { AddToCart, CartProductInfo } from "../interfaces/cartInterface";

interface State {
  isLoading: boolean;
  products: CartProductInfo[];
  totalQty: number;
}

const initialState: State = {
  isLoading: false,
  products: [],
  totalQty: 0,
};

export const addToCart = createAsyncThunk<
  CartProductInfo,
  AddToCart,
  {
    rejectValue: Status;
  }
>("cart/addToCart", async (product: AddToCart, { rejectWithValue }) => {
  try {
    const res = await publicRequest.get(`/products/${product.productId}`);
    return {
      name: res.data.name,
      brand: res.data.brand,
      price: res.data.price,
      img: res.data.img,
      productId: res.data._id,
      qty: product.qty,
    } as CartProductInfo;
  } catch (error: any) {
    return rejectWithValue({
      status: error.response.status,
      message: error.response.data.message,
    });
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      let newProducts = [...state.products];
      const existingProduct = newProducts.find(
        (item) => item.productId === action.payload.productId
      );

      if (existingProduct) {
        let index = newProducts.findIndex(
          (item) => item.productId === action.payload.productId
        );
        newProducts[index].qty! += action.payload.qty!;
        state.products = newProducts;
        state.totalQty += action.payload.qty!;
      } else {
        state.isLoading = false;
        state.products = [...newProducts, action.payload];
        state.totalQty += action.payload.qty!;
      }
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default cartSlice.reducer;
