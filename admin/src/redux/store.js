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

import productReducer from "./productRedux";
import productDetailReducer from "./productDetailRedux";
import announcementsReducer from "./announcementRedux";
import usersReducer from "./userRedux";
import ordersReducer from "./orderRedux";
import orderDetailReducer from "./orderDetailRedux";
import authReducer from "./authRedux";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  productList: productReducer,
  productDetail: productDetailReducer,
  announcement: announcementsReducer,
  users: usersReducer,
  orders: ordersReducer,
  orderDetail: orderDetailReducer,
  auth: authReducer,
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
