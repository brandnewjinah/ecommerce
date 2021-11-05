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
  products: [],
  qty: 0,
};

// Reducer
const reducer = (state = initialState, action) => {
  if (action.type === ADD_CART) {
    let added = action.payload.item;
    let newProducts = [...state.products];
    let totalqty = state.qty;

    //look for duplicate first
    let duplicate = newProducts.find((item) => item.sku === added.sku);

    if (duplicate) {
      let index = newProducts.findIndex((item) => item.sku === added.sku);
      newProducts[index].qty += added.qty;
      return { ...state, products: newProducts, qty: totalqty + added.qty };
    } else {
      newProducts = [...newProducts, added];
      return { ...state, products: newProducts, qty: totalqty + added.qty };
    }
  }
  if (action.type === INCREASE) {
    let added = action.payload.item;
    let newProducts = state.products.map((item) => {
      if (item.sku === added.sku) {
        item = { ...item, qty: item.qty + 1 };
      }
      return item;
    });
    const { qty } = state;
    return { ...state, products: newProducts, qty: qty + 1 };
  }
  if (action.type === DECREASE) {
    let added = action.payload.item;
    let newProducts = state.products.map((item) => {
      if (item.sku === added.sku) {
        item = { ...item, qty: item.qty - 1 };
      }
      return item;
    });
    const { qty } = state;
    return { ...state, products: newProducts, qty: qty - 1 };
  }
  if (action.type === DELETE_CARTITEM) {
    let item = action.payload.item;
    let newProducts = [...state.products];
    let totalqty = state.qty;

    newProducts = newProducts.filter((c) => c.sku !== item.sku);

    return { ...state, products: newProducts, qty: totalqty - item.qty };
  }

  if (action.type === CLEAR_CART) {
    return { products: [], qty: 0 };
  }

  return state;
};

export default reducer;
