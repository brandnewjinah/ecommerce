import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const signIn = (values) => API.post("/users/login", values);
export const signUp = (values) => API.post("/users/signup", values);
