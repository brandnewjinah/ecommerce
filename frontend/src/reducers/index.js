import { combineReducers } from "redux";
import collectionReducer from "./collectionReducer";
import fashionReducer from "./fashionReducer";

export default combineReducers({
  fashion: fashionReducer,
  collection: collectionReducer,
});
