import axios from "axios";

const url = "http://localhost:5000";

export const signin = (values) => axios.post(`${url}/auth/signin`, values);
export const signup = (values) => axios.post(`${url}/auth/signup`, values);

export const getProducts = (category, page) =>
  axios.get(`${url}/products?category=${category}&page=${page}`);

export const getNewProducts = () => axios.get(`${url}/products?new=true`);

export const getProductDetail = (id) => axios.get(`${url}/products/${id}`);
export const getSimilarProducts = (id, category2) =>
  axios.get(`${url}/products/similar/${id}?similar=${category2}`);

export const placeOrder = (order) => {
  axios.post(`${url}/orders`, order);
};
