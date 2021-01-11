// Action types
const PLACE_ORDER = "PLACE_ORDER";
const DELETE_ORDERS = "DELETE_ORDERS";

// Action creators
export const placeOrder = (item) => {
  return (dispatch) => {
    dispatch({
      type: PLACE_ORDER,
      payload: {
        item,
      },
    });
  };
};

export const deleteOrders = (item) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_ORDERS,
      payload: {
        item,
      },
    });
  };
};

// State
const initialState = {
  orders: [],
};

// Reducer
const reducer = (state = initialState, action) => {
  if (action.type === PLACE_ORDER) {
    let added = action.payload.item;
    let newOrders = [...state.orders];

    newOrders = [...newOrders, added];
    return { ...state, orders: newOrders };
  }

  if (action.type === DELETE_ORDERS) {
    return { orders: [] };
  }

  return state;
};

export default reducer;
