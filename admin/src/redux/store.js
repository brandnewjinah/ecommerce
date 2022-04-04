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
import productActionsReducer from "./productActionsRedux";
import announcementsReducer from "./announcementRedux";
import usersReducer from "./userRedux";
import ordersReducer from "./orderRedux";
import orderDetailReducer from "./orderDetailRedux";
import authReducer from "./authRedux";
import subscribersReducer from "./subscriberRedux";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  products: productReducer,
  productDetail: productDetailReducer,
  productActions: productActionsReducer,
  announcement: announcementsReducer,
  users: usersReducer,
  orders: ordersReducer,
  orderDetail: orderDetailReducer,
  auth: authReducer,
  subscribers: subscribersReducer,
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
