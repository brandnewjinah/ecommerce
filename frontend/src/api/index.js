import axios from "axios";

const url = "http://localhost:5000";

export const signin = (values) => axios.post(`${url}/auth/signin`, values);
export const signup = (values) => axios.post(`${url}/auth/signup`, values);

export const getProducts = (category) =>
  category === "bakery" || category === "beverage" || category === "snacks"
    ? axios.get(`${url}/products?category=${category}`)
    : axios.get(`${url}/products`);
export const getProductDetail = (id) => axios.get(`${url}/products/${id}`);
export const getSimilarProducts = (id, category2) =>
  axios.get(`${url}/products/similar/${id}?similar=${category2}`);
