import axios from "axios";
import { message } from "antd";
import router from "@/router";
import { useAppDispatch } from "@/hook";
import { logout } from "@/store/modules/authSlice";

const service = axios.create({
  baseURL: "/api", // 相对路径
  timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

service.interceptors.response.use(
  (response) => {
    // 请求成功进行的操作
    return response.data;
  },
  (error) => {
    // 请求失败进行的操作
    if (error.response?.status === 401) {
      const dispatch = useAppDispatch();
      message.error("登录已过期，请重新登录");
      dispatch(logout());
      router.navigate("/login");
    } else {
      message.error(error.response?.data?.message || "请求失败");
    }
    return error;
  }
);

export default service;
