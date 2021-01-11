import { combineReducers } from "redux";
import collectionReducer from "./collectionReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";

export default combineReducers({
  collection: collectionReducer,
  products: productReducer,
  cart: cartReducer,
  order: orderReducer,
});
