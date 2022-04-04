import axios from "axios";

export const URL = "http://localhost:5000";

const user = JSON.parse(localStorage.getItem("persist:root"))?.auth;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.token;

export const publicRequest = axios.create({
  baseURL: URL,
});

export const adminRequest = axios.create({
  baseURL: URL,
  headers: { authorization: `Bearer ${TOKEN}` },
});

//auth
export const signin = (values) => axios.post(`${URL}/auth/signin`, values);

//products
export const getProducts = (category, page) =>
  axios.get(`${URL}/products?category=${category}&page=${page}`);

export const getNewProducts = () => axios.get(`${URL}/products?new=true`);

export const getProductDetail = (id) => axios.get(`${URL}/products/${id}`);

export const addProduct = async (product) => {
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

//announcements
export const getAnnouncements = () => axios.post(`${URL}/announcements`);
