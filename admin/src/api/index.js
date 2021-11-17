// import axios from "axios";

// const url = "http://localhost:5000/products";

// export const getProducts = () => axios.get(url);
// export const addProduct = (newProduct) => axios.post(url, newProduct);
// export const updateProduct = (id, updatedProduct) =>
//   axios.patch(`${url}/${id}`, updatedProduct);
// export const deleteProduct = (id) => axios.delete(`${url}/${id}`);
// export const deleteManyProducts = (id) => axios.patch(url, id);

import axios from "axios";

const url = "http://localhost:5000";

export const addProduct = (newProduct) =>
  axios.post(`${url}/products`, newProduct);

export const getProducts = (category) =>
  axios.get(`${url}/products?category=${category}`);

export const getNewProducts = () => axios.get(`${url}/products?new=true`);

export const getProductDetail = (id) => axios.get(`${url}/products/${id}`);

export const updateProduct = (id, updatedProduct) =>
  axios.patch(`${url}/products/${id}`, updatedProduct);

export const deleteProduct = (id) => axios.delete(`${url}/products/${id}`);

export const deleteManyProducts = (id) => axios.patch(`${url}/products`, id);

export const getAnnouncements = () => axios.get(`${url}/announcements`);
