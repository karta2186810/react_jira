/*
 * 用於異步獲取數據，並返回數據和請求狀態的鉤子
 * */
import { useState } from "react";

// 狀態的介面
interface State<T> {
  error: Error | null;
  data: T | null;
  status: "idle" | "loading" | "error" | "success";
}

// 默認狀態
const defaultInitialState: State<null> = {
  status: "idle",
  data: null,
  error: null,
};
// 默認設定，使拋出異常為可選的
const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <T>(
  initialState?: State<T>,
  initialConfig?: typeof defaultConfig
) => {
  // 初始化設定
  const config = {
    ...defaultConfig,
    ...initialConfig,
  };

  // 初始化狀態
  const [state, setState] = useState<State<T>>({
    ...defaultInitialState,
    ...initialState,
  });

  // 請求成功時，設置data
  const setData = (data: T) =>
    setState({
      data,
      status: "success",
      error: null,
    });

  // 請求失敗時，設置error
  const setError = (error: Error) =>
    setState({
      error,
      data: null,
      status: "error",
    });

  // run函數，用來觸發異步請求
  const run = (promise: Promise<T>) => {
    // 如果沒有傳入參數，或參數不是Promise物件，返回警告
    if (!promise || !promise.then) {
      throw new Error("請傳入 Promise 類型的數據");
    }
    // 設置狀態為loading
    setState({ ...state, status: "loading" });

    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        // catch會消化異常，如果需要外部也可以接收到異常，需手動拋出
        if (config.throwOnError) return Promise.reject(error);
        return error;
      });
  };

  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    run,
    setData,
    setError,
    ...state,
  };
};