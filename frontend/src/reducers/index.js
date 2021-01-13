import { combineReducers } from "redux";
import collectionReducer from "./collectionReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";
import authReducer from "./authReducer";

export default combineReducers({
  collection: collectionReducer,
  products: productReducer,
  cart: cartReducer,
  order: orderReducer,
  auth: authReducer,
});
