import { useEffect, useRef, useState } from "react";

// 判斷是否為 0
export const isFalsy = (value: unknown) => (value === 0 ? true : !value);
// 判斷是否為無意義的值
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

// 清除物件中無意義值的鍵，以便於qs進行轉換
export const cleanObj = (obj: { [key: string]: unknown }) => {
  // immutable
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

// 模擬onmount的hook
export const useMount = (cb: () => void) => {
  useEffect(() => {
    cb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// debounce hook
export const useDebounce = <V>(value: V, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounceValue;
};

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      setValue(copy.splice(index, 1));
    },
  };
};

// 用於動態變更title的hook
export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  // 使用ref將原始的路徑儲存
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

// 用於重製路由狀態的函數
export const resetRoute = () => (window.location.href = window.location.origin);
