//Action types
const ADD_TO_CART = "ADD_TO_CART";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const DELETE_CARTITEM = "DELETE_CARTITEM";

//Action creators
export const addToCart = (product) => (dispatch) => {
  dispatch({ type: ADD_TO_CART, payload: product });
};

export const increase = (product) => (dispatch) => {
  dispatch({ type: INCREASE, payload: product });
};

export const decrease = (product) => (dispatch) => {
  dispatch({ type: DECREASE, payload: product });
};

export const deleteCartItem = (product) => (dispatch) => {
  dispatch({ type: DELETE_CARTITEM, payload: product });
};

// Initial State
const initialState = {
  products: [],
  qty: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      let newProducts = [...state.products];
      let totalQty = state.qty;

      //duplicate item in the cart? then just increase qty
      let existingProduct = newProducts.find(
        (item) => item._id === action.payload._id
      );
      if (existingProduct) {
        let index = newProducts.findIndex(
          (item) => item._id === action.payload._id
        );
        return {
          products: (newProducts[index].qty += action.payload.qty),
          qty: (totalQty += action.payload.qty),
        };
      } else {
        return {
          products: [...newProducts, action.payload],
          qty: totalQty + action.payload.qty,
        };
      }
    }
    case INCREASE: {
      let newProducts = state.products.map((item) => {
        if (item._id === action.payload._id) {
          item = { ...item, qty: item.qty + 1 };
        }
        return item;
      });
      return { products: newProducts, qty: state.qty + 1 };
    }
    case DECREASE: {
      let newProducts = state.products.map((item) => {
        if (item._id === action.payload._id && item.qty > 1) {
          item = { ...item, qty: item.qty - 1 };
        }
        return item;
      });
      return { products: newProducts, qty: state.qty - 1 };
    }
    case DELETE_CARTITEM: {
      let newProducts = state.products.filter(
        (item) => item._id !== action.payload._id
      );
      return { products: newProducts, qty: state.qty - action.payload.qty };
    }
    default:
      return state;
  }
};

export default reducer;
