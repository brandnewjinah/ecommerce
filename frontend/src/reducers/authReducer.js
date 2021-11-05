import * as api from "../api";

// Action types
const AUTH = "AUTH";
const LOGOUT = "LOGOUT";

// Action creators
export const signin = (values, history, path) => async (dispatch) => {
  try {
    const { data } = await api.signin(values);
    dispatch({ type: AUTH, data });
    path === "/cart" ? history.push("/checkout") : history.push("/home");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (values, history, path) => async (dispatch) => {
  try {
    const { data } = await api.signup(values);
    dispatch({ type: AUTH, data });
    path === "/cart" ? history.push("/checkout") : history.push("/home");
  } catch (error) {
    console.log(error);
  }
};

// State
const initialState = {
  authData: null,
};

// Reducer
const reducer = (state = initialState, action) => {
  if (action.type === AUTH) {
    localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
    return { ...state, authData: action?.data };
  }
  if (action.type === LOGOUT) {
    localStorage.clear();
    return { ...state, authData: null };
  }
  return state;
};

export default reducer;
