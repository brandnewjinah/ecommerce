import axios from "axios";

const URL = "http://localhost:5000";
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).auth)
//   .currentUser.token;

export const publicRequest = axios.create({
  baseURL: URL,
});

// export const privateRequest = axios.create({
//   baseURL: URL,
//   headers: { authorization: `Bearer ${TOKEN}` },
// });

export const placeOrder = (order) => {
  axios.post(`${URL}/orders`, order);
};
