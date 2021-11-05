import * as api from "../api";

// Action types
const PRODUCTS_REQUEST = "PRODUCTS_REQUEST";
const PRODUCTS_SUCCESS = "PRODUCTS_SUCCESS";
const PRODUCTS_FAIL = "PRODUCTS_FAIL";

// Action creators
export const getProducts = (category) => async (dispatch) => {
  dispatch({
    type: PRODUCTS_REQUEST,
  });
  try {
    const { data } = await api.getProducts(category);
    dispatch({ type: PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCTS_FAIL, payload: error.message });
  }
};

// State
const initialState = {
  loading: true,
  products: [],
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_REQUEST:
      return { loading: true };
    case PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
