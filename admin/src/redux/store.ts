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

import authReducer from "./authReducer";
import productsReducer from "./productReducer";
import productActionsReducer from "./productActionsReducer";
import productDetailsReducer from "./productDetailsReducer";
import ordersReducer from "./orderReducer";
import dashboardReducer from "./dashboardReducer";
import settingsActionsReducer from "./settingsActionsReducer";
import settingsReducer from "./settingsReducer";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  productActions: productActionsReducer,
  productDetails: productDetailsReducer,
  orders: ordersReducer,
  dashboard: dashboardReducer,
  settingsActions: settingsActionsReducer,
  settings: settingsReducer,
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
