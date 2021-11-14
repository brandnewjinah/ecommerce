import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authRedux";
import cartReducer from "./cartRedux";
import orderReducer from "./orderRedux";
import orderDetailReducer from "./orderDetailRedux";
import productReducer from "./productRedux";
import productDetailReducer from "./productDetailRedux";
import wishlistReducer from "./wishlistRedux";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  productList: productReducer,
  productDetail: productDetailReducer,
  order: orderReducer,
  orderDetail: orderDetailReducer,
  wishlist: wishlistReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
