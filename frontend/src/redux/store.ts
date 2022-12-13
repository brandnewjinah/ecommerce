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
import checkoutReducer from "./checkoutRedux";
import orderDetailReducer from "./orderDetailRedux";
import productDetailReducer from "./productDetailRedux";
import announcementReducer from "./announcementRedux";
import subscriberReducer from "./subscriberRedux";
import wishlistReducer from "./wishlistRedux";
import cartReducer from "./cartRedux";
import categoryReducer from "./categoryRedux";
import orderReducer from "./orderRedux";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  category: categoryReducer,
  productDetail: productDetailReducer,
  checkout: checkoutReducer,
  orderDetail: orderDetailReducer,
  announce: announcementReducer,
  subscriber: subscriberReducer,
  wishlist: wishlistReducer,
  order: orderReducer,
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
export type RootState = ReturnType<typeof store.getState>;
