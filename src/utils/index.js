// 判斷是否為 0
import { useEffect } from "react";

export const isTruesy = (value) => (value === 0 ? true : !!value);

// 清除物件中值為空的鍵
export const cleanObj = (obj) => {
  // immutable
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (!isTruesy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (cb) => {
  useEffect(() => {
    cb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
