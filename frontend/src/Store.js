import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage,
};

const initialState = {};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// const composeEnhancer = window.navigator.userAgent.includes("Chrome")
//   ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   : compose;

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = () => {
  const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
  );
  let persistor = persistStore(store);
  return { store, persistor };
};

export default store;
