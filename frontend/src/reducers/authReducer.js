import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../util/setAuthToken";
import isEmpty from "../util/isEmpty";

// Action types
const GET_ERRORS = "GET_ERRORS";
const SET_CURRENT_USER = "SET_CURRENT_USER";


// Action creators
export const registerUser = (user) => {
  return (dispatch) => {
    axios
      .post("http://localhost:5000/user/signup", user)
      .then((res) => {
        if (res.status === 200) {
          alert("Registered successfully. Please login");
          window.location.reload();
        }
      })
      // .catch((err) => {
      //   alert(err);
      // });
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  };
};

export const loginUser = (user) => {
  return (dispatch) => {
    axios
      .post("http://localhost:5000/user/login", user)
      .then((res) => {
        const { token } = res.data;

        //set token to localstorage
        localStorage.setItem("token", token);

        //set token to auth header
        setAuthToken(token);

        //decode token to get user data
        const decoded = jwt_decode(token);

        //set current user
        dispatch(setCurrentUser(decoded));

        window.location.reload();
      })
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  };
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  };
};

// State
const initialState = {
  isAuthenticated: false,
  user: {},
};

// Reducer
const reducer = (state = initialState, action) => {
  if (action.type === SET_CURRENT_USER) {
    return {
      ...state,
      isAuthenticated: !isEmpty(action.payload),
      user: action.payload,
    };
  }

  return state;
};

export default reducer;
