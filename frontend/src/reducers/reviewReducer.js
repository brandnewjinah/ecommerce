// import * as api from "../api";

// // Action types
// const AUTH = "AUTH";

// // Action creators
// export const reviewProduct = (value, sku) => async (dispatch) => {
//   try {
//     const { data } = await api.review(value, sku);
//     dispatch({ type: AUTH, data });
//     history.push("/home");
//   } catch (error) {
//     console.log(error);
//   }
// };

// // State
// const initialState = {
//   authData: null,
// };

// // Reducer
// const reducer = (state = initialState, action) => {
//   if (action.type === AUTH) {
//     localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
//     return { ...state, authData: action?.data };
//   }
//   if (action.type === LOGOUT) {
//     localStorage.clear();
//     return { ...state, authData: null };
//   }
//   return state;
// };

// export default reducer;
