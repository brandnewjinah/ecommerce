import axios from "axios";

const url = "http://localhost:5000";

//products
export const addProduct = (newProduct) =>
  axios.post(`${url}/products`, newProduct);

export const getProducts = (category, page) =>
  axios.get(`${url}/products?category=${category}&page=${page}`);

export const getNewProducts = () => axios.get(`${url}/products?new=true`);

export const getProductDetail = (id) => axios.get(`${url}/products/${id}`);

export const updateProduct = (id, updatedProduct) =>
  axios.patch(`${url}/products/${id}`, updatedProduct);

export const deleteProduct = (id) => axios.delete(`${url}/products/${id}`);

export const deleteManyProducts = (id) => axios.patch(`${url}/products`, id);

//announcements
export const getAnnouncements = () => axios.get(`${url}/announcements`);

//users
export const getUsers = () => axios.get(`${url}/users`);

//orders
export const getAllOrders = () => axios.get(`${url}/orders`);
