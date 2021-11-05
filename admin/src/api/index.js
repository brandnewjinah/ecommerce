import axios from "axios";

const url = "http://localhost:5000/products";

export const getProducts = () => axios.get(url);
export const addProduct = (newProduct) => axios.post(url, newProduct);
export const updateProduct = (id, updatedProduct) =>
  axios.patch(`${url}/${id}`, updatedProduct);
export const deleteProduct = (id) => axios.delete(`${url}/${id}`);
export const deleteManyProducts = (id) => axios.patch(url, id);
