import * as api from "../api";

// Action types
const GET_PRODUCT = "GET_PRODUCT";
const ADD_PRODUCT = "ADD_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const DELETE_PRODUCTS = "DELETE_PRODUCTS";

// Action creators
export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await api.getProducts();
    dispatch({ type: GET_PRODUCT, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const addProduct = (product) => async (dispatch) => {
  try {
    const { data } = await api.addProduct(product);
    dispatch({ type: ADD_PRODUCT, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProduct = (id, product) => async (dispatch) => {
  try {
    const { data } = await api.updateProduct(id, product);
    dispatch({ type: UPDATE_PRODUCT, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await api.deleteProduct(id);
    dispatch({ type: DELETE_PRODUCT, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteManyProducts = (id) => async (dispatch) => {
  try {
    await api.deleteManyProducts(id);
    dispatch({ type: DELETE_PRODUCTS, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

// Reducer
const reducer = (products = [], action) => {
  switch (action.type) {
    case "GET_PRODUCT":
      return action.payload;
    case "ADD_PRODUCT":
      return [...products, action.payload];
    case "UPDATE_PRODUCT":
      return products.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
    case "DELETE_PRODUCT":
      return products.filter((product) => product._id !== action.payload);
    case "DELETE_PRODUCTS":
      return products.filter(
        (product) => !action.payload.includes(product._id)
      );
    default:
      return products;
  }
};

export default reducer;
