import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../api";

export const addToCart = createAsyncThunk(
  "cart/getProductDetail",
  async (product) => {
    try {
      const { data } = await publicRequest.get(`/products/${product._id}`);
      return {
        name: data.name,
        brand: data.brand,
        price: data.price,
        img: data.img,
        productId: data._id,
        qty: product.qty,
      };
    } catch (error) {
      return error;
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    totalQty: 0,
  },
  reducers: {
    increaseQty: (state, action) => {
      const newProducts = state.products.map((item) => {
        if (item.productId === action.payload.productId) {
          item = { ...item, qty: item.qty + 1 };
        }
        return item;
      });
      state.products = newProducts;
      state.totalQty += 1;
    },
    decreaseQty: (state, action) => {
      const newProducts = state.products.map((item) => {
        if (item.productId === action.payload.productId && item.qty > 1) {
          item = { ...item, qty: item.qty - 1 };
        }
        return item;
      });
      state.products = newProducts;
      state.totalQty = state.products.reduce((total, item) => {
        return (total += item.qty);
      }, 0);
    },
    removeFromCart: (state, action) => {
      const newProducts = state.products.filter(
        (item) => item.productId !== action.payload.productId
      );
      state.products = newProducts;
      state.totalQty = state.totalQty - action.payload.qty;
    },
    clearCart: (state, action) => {
      state.products = [];
      state.totalQty = 0;
    },
  },
  extraReducers: {
    [addToCart.pending]: (state) => {
      state.loading = true;
    },
    [addToCart.fulfilled]: (state, action) => {
      let newProducts = [...state.products];
      const existingProduct = newProducts.find(
        (item) => item.productId === action.payload.productId
      );

      if (existingProduct) {
        let index = newProducts.findIndex(
          (item) => item.productId === action.payload.productId
        );
        newProducts[index].qty += action.payload.qty;
        state.products = newProducts;
        state.totalQty += action.payload.qty;
      } else {
        state.loading = false;
        state.products = [...newProducts, action.payload];
        state.totalQty += action.payload.qty;
      }
    },
    [addToCart.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { increaseQty, decreaseQty, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
