/*
 * 用於異步獲取數據，並返回數據和請求狀態的鉤子
 * */
import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "./index";

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

// 根據組件狀態判斷是否執行dispatch的鉤子
const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  // 用於判斷組件狀態的鉤子
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [mountedRef, dispatch]
  );
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
  // 使用useReducer，reducer設置成將當前狀態與新傳入的狀態合併
  const [state, dispatch] = useReducer(
    (state: State<T>, action: Partial<State<T>>) => ({ ...state, ...action }),
    {
      // 初始化狀態
      ...defaultInitialState,
      ...initialState,
    }
  );

  const safeDispatch = useSafeDispatch(dispatch);

  const [retry, setRetry] = useState(() => () => {});

  // 請求成功時，設置data
  const setData = useCallback(
    (data: T) =>
      safeDispatch({
        data,
        status: "success",
        error: null,
      }),
    [safeDispatch]
  );

  // 請求失敗時，設置error
  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        data: null,
        status: "error",
      }),
    [safeDispatch]
  );

  // 異步請求，並根據情況改變狀態
  const run = useCallback(
    (promise: Promise<T>, runConfig?: { retry: () => Promise<T> }) => {
      // 如果沒有傳入參數，或參數不是Promise物件，返回警告
      if (!promise || !promise.then) {
        throw new Error("請傳入 Promise 類型的數據");
      }
      // 設置狀態為loading
      safeDispatch({ status: "loading" });

      // 每次執行run時，就將這次的請求函數設置給retry
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });

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
    },
    [config.throwOnError, setData, setError]
  );

  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    run,
    setData,
    setError,
    retry,
    ...state,
  };
};
