/** AJAX的util函數 */

import qs from "qs";
import * as auth from "auth-prodiver";
import { useAuth } from "../context/AuthContext";
const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

// 接收地址及參數發送AJAX請求的函數
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  // 判斷method是否為GET，對data進行不同處理
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  // 返回請求的結果
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      // 如果請求不通過
      if (response.status === 401) {
        await auth.logout();
        window.location.reload(); // 刷新網頁，確保所有狀態都被清理
        return Promise.reject({ message: "請重新登入" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data); // fetch需要手動拋出異常
      }
    });
};

// useHttp根據user中的狀態，返回含有token的AJAX函數
export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
