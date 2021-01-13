// Action types
const ADD_CART = "ADD_CART";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const DELETE_CARTITEM = "DELETE_CARTITEM";
const CLEAR_CART = "CLEAR_CART";

// Action creators
export const addCart = (item) => {
  return (dispatch) => {
    dispatch({
      type: ADD_CART,
      payload: {
        item,
      },
    });
  };
};

export const increase = (item) => {
  return (dispatch) => {
    dispatch({
      type: INCREASE,
      payload: {
        item,
      },
    });
  };
};

export const decrease = (item) => {
  return (dispatch) => {
    dispatch({
      type: DECREASE,
      payload: {
        item,
      },
    });
  };
};

export const deleteCartItem = (item) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_CARTITEM,
      payload: {
        item,
      },
    });
  };
};

export const clearCart = (item) => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_CART,
      payload: {
        item,
      },
    });
  };
};

// State
const initialState = {
  cart: [],
  qty: 0,
};

// Reducer
const reducer = (state = initialState, action) => {
  if (action.type === ADD_CART) {
    let added = action.payload.item;
    let newCart = [...state.cart];
    let totalqty = state.qty;

    //look for duplicate first
    let duplicate = newCart.find((item) => item.sku === added.sku);

    if (duplicate) {
      let index = newCart.findIndex((item) => item.sku === added.sku);
      newCart[index].qty += added.qty;
      return { ...state, cart: newCart, qty: totalqty + added.qty };
    } else {
      newCart = [...newCart, added];
      return { ...state, cart: newCart, qty: totalqty + added.qty };
    }
  }
  if (action.type === INCREASE) {
    let added = action.payload.item;
    let newCart = state.cart.map((item) => {
      if (item.sku === added.sku) {
        item = { ...item, qty: item.qty + 1 };
      }
      return item;
    });
    const { qty } = state;
    return { ...state, cart: newCart, qty: qty + 1 };
  }
  if (action.type === DECREASE) {
    let added = action.payload.item;
    let newCart = state.cart.map((item) => {
      if (item.sku === added.sku) {
        item = { ...item, qty: item.qty - 1 };
      }
      return item;
    });
    const { qty } = state;
    return { ...state, cart: newCart, qty: qty - 1 };
  }
  if (action.type === DELETE_CARTITEM) {
    let item = action.payload.item;
    let newCart = [...state.cart];
    let totalqty = state.qty;

    newCart = newCart.filter((c) => c.sku !== item.sku);

    return { ...state, cart: newCart, qty: totalqty - item.qty };
  }

  if (action.type === CLEAR_CART) {
    return { cart: [], qty: 0 };
  }

  return state;
};

export default reducer;
