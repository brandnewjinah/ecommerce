import { combineReducers } from "redux";

import { orderDetailReducer, orderUserReducer } from "./orderGetReducer";

export default combineReducers({
  orderDetail: orderDetailReducer,
  orderUserList: orderUserReducer,
});
