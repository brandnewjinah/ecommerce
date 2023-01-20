import axios from "axios";

const URL = "http://localhost:4000";
// const URL = "https://jinah-ecomm.herokuapp.com";

const user = JSON.parse(localStorage.getItem("persist:root"))?.auth;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser && currentUser.token;

export const publicRequest = axios.create({
  baseURL: URL,
});

export const privateRequest = axios.create({
  baseURL: URL,
  headers: { authorization: `Bearer ${TOKEN}` },
});

export const placeOrder = (order) => {
  axios.post(`${URL}/orders`, order);
};
