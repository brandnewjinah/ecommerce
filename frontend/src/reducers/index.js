import { combineReducers } from "redux";
import collectionReducer from "./collectionReducer";
import productReducer from "./productReducer";
import productDetailReducer from "./productDetailReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";
import authReducer from "./authReducer";
import reviewReducer from "./reviewReducer";

export default combineReducers({
  collection: collectionReducer,
  productlist: productReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  order: orderReducer,
  auth: authReducer,
  review: reviewReducer,
});
