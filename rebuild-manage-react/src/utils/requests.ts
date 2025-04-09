import axios from "axios";

const request = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

request.interceptors.request.use((config) => {
  // 可添加 token 等
  return config;
});

request.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err)
);

export default request;
