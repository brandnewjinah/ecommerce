import { combineReducers } from "redux";
import collectionReducer from "./collectionReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
  collection: collectionReducer,
  products: productReducer,
  cart: cartReducer,
});
