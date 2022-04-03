import axios from "axios";

export const URL = "http://localhost:5000";

const user = JSON.parse(localStorage.getItem("persist:root"))?.auth;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.token;

export const publicRequest = axios.create({
  baseURL: URL,
});

//auth
export const signin = (values) => axios.post(`${URL}/auth/signin`, values);

//products
export const getProducts = (category, page) =>
  axios.get(`${URL}/products?category=${category}&page=${page}`);

export const getNewProducts = () => axios.get(`${URL}/products?new=true`);

export const getProductDetail = (id) => axios.get(`${URL}/products/${id}`);

export const addProduct = (product) => {
  axios.post(`${URL}/products`, product, {
    headers: {
      authorization: `Bearer ${TOKEN}`,
    },
  });
};

export const updateProduct = (id, updatedProduct) => {
  axios.patch(`${URL}/products/${id}`, updatedProduct, {
    headers: {
      authorization: `Bearer ${TOKEN}`,
    },
  });
};

export const deleteProduct = (id) => {
  axios.delete(`${URL}/products/${id}`, {
    headers: {
      authorization: `Bearer ${TOKEN}`,
    },
  });
};

export const deleteManyProducts = (id) => axios.patch(`${URL}/products`, id);

//users
export const getUsers = (page) => axios.get(`${URL}/users?page=${page}`);
export const getUserDetail = (id) => axios.get(`${URL}/users/${id}`);

//orders
export const getAllOrders = (page) => axios.get(`${URL}/orders?page=${page}`);
export const getOrderDetail = (id) => axios.get(`${URL}/orders/${id}`);

//announcements
export const getAnnouncements = () => axios.post(`${URL}/announcements`);

//subscribers
export const getSubscribers = (page) =>
  axios.get(`${URL}/subscribers?page=${page}`);
