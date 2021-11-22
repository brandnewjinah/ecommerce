import axios from "axios";

const URL = "http://localhost:5000";
const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth)
  .currentUser.token;

export const publicRequest = axios.create({
  baseURL: URL,
});

export const privateRequest = axios.create({
  baseURL: URL,
  headers: { authorization: `Bearer ${TOKEN}` },
});

//auth
export const signin = (values) => axios.post(`${URL}/auth/signin`, values);

//products
export const addProduct = (newProduct) =>
  axios.post(`${URL}/products`, newProduct);

export const getProducts = (category, page) =>
  axios.get(`${URL}/products?category=${category}&page=${page}`);

export const getNewProducts = () => axios.get(`${URL}/products?new=true`);

export const getProductDetail = (id) => axios.get(`${URL}/products/${id}`);

export const updateProduct = (id, updatedProduct) =>
  axios.patch(`${URL}/products/${id}`, updatedProduct);

export const deleteProduct = (id) => axios.delete(`${URL}/products/${id}`);

export const deleteManyProducts = (id) => axios.patch(`${URL}/products`, id);

//announcements
export const getAnnouncements = () => axios.get(`${URL}/announcements`);

//users
export const getUsers = (page) => axios.get(`${URL}/users?page=${page}`);

//orders
export const getAllOrders = (page) => axios.get(`${URL}/orders?page=${page}`);
export const getOrderDetail = (id) => axios.get(`${URL}/orders/${id}`);
