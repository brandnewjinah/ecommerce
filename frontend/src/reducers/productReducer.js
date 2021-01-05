// Action types
const ADD_ITEM = "ADD_ITEM";
const DELETE_ITEM = "DELETE_ITEM";
const DELETE_ALL = "DELETE_ALL";

// Action creators
export const addItem = (item) => {
  return (dispatch) => {
    dispatch({
      type: ADD_ITEM,
      payload: {
        item,
      },
    });
  };
};

export const deleteItem = (item) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_ITEM,
      payload: {
        item,
      },
    });
  };
};

export const deleteAll = (item) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_ALL,
      payload: {
        item,
      },
    });
  };
};

// State
const initialState = {
  products: [],
};

// Reducer
const reducer = (state = initialState, action) => {
  if (action.type === ADD_ITEM) {
    let added = action.payload.item;
    let newProducts = [...state.products];

    //look for duplicate first
    let duplicate = newProducts.find((item) => item.sku === added.sku);

    if (duplicate) {
      newProducts = newProducts.filter((f) => f.sku !== added.sku);
    } else {
      newProducts = [...newProducts, added];
    }
    return { ...state, products: newProducts };
  }

  if (action.type === DELETE_ITEM) {
    let item = action.payload.item;
    let newProducts = [...state.products];
    newProducts = newProducts.filter((c) => c.sku !== item.sku);

    return { ...state, products: newProducts };
  }

  if (action.type === DELETE_ALL) {
    return { products: [] };
  }

  return state;
};

export default reducer;
