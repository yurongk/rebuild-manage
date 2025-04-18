import {
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
} from "axios";
import request from "./requests.ts";

export const http = {
  get(
    url: string,
    params?: AxiosRequestConfig["params"],
    headers?: RawAxiosRequestHeaders
  ) {
    const config: AxiosRequestConfig = {
      method: "GET",
      url,
      params: params || {},
      headers: headers || {},
    };
    return request(config);
  },

  post(url: string, data?: unknown, headers?: RawAxiosRequestHeaders) {
    const config: AxiosRequestConfig = {
      method: "POST",
      url,
      data: data || {},
      headers: headers || {},
    };
    return request(config);
  },

  delete(
    url: string,
    params?: AxiosRequestConfig["params"],
    headers?: RawAxiosRequestHeaders
  ) {
    const config: AxiosRequestConfig = {
      method: "DELETE",
      url,
      params: params || {},
      headers: headers || {},
    };
    return request(config);
  },

  patch(url: string, data?: unknown, headers?: RawAxiosRequestHeaders) {
    const config: AxiosRequestConfig = {
      method: "PATCH",
      url,
      data: data || {},
      headers: headers || {},
    };
    return request(config);
  },
};
