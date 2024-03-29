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
import productReducer from "./productReducer";
import announcementReducer from "./announcementRedux";
import subscriberReducer from "./subscriberReducer";
import wishlistReducer from "./wishlistRedux";
import cartReducer from "./cartReducer";
import categoryReducer from "./categoryReducer";
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
  product: productReducer,
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
