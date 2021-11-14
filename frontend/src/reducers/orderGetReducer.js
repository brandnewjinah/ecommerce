import axios from "axios";

// Action types
const ORDER_DETAIL_REQUEST = "ORDER_DETAIL_REQUEST";
const ORDER_DETAIL_SUCCESS = "ORDER_DETAIL_SUCCESS";
const ORDER_DETAIL_FAIL = "ORDER_DETAIL_FAIL";

const ORDER_USER_REQUEST = "ORDER_USER_REQUEST";
const ORDER_USER_SUCCESS = "ORDER_USER_SUCCESS";
const ORDER_USER_FAIL = "ORDER_USER_FAIL";

// Action creators

export const getOrderDetail = (id) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAIL_REQUEST, payload: id });
  const {
    auth: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`http://localhost:5000/orders/${id}`, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DETAIL_FAIL, payload: message });
  }
};

export const getUserOrder = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_USER_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get("http://localhost:5000/orders/user", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_USER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_USER_FAIL, payload: message });
  }
};

// Reducer
export const orderDetailReducer = (
  state = {
    loading: true,
    order: {},
  },
  action
) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return { loading: true };
    case ORDER_DETAIL_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderUserReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_USER_REQUEST:
      return { loading: true };
    case ORDER_USER_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
