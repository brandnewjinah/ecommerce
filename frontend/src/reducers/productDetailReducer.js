import * as api from "../api";

// Action types
const PRODUCT_DETAIL_REQUEST = "PRODUCT_DETAIL_REQUEST";
const PRODUCT_DETAIL_SUCCESS = "PRODUCT_DETAIL_SUCCESS";
const PRODUCT_DETAIL_FAIL = "PRODUCT_DETAIL_FAIL";

// Action creators
export const getProductDetail = (id) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAIL_REQUEST, payload: id });
  try {
    const { data } = await api.getProductDetail(id);
    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// State
const initialState = {
  loading: true,
  product: {},
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return { loading: true };
    case PRODUCT_DETAIL_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
