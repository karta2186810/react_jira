import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { cleanObj } from "./index";

/*
 * 獲取URL中的參數，返回帶有該參數作為key的物件，和設置URL參數的方法
 * */

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  // 獲取URL中的參數
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      // fromEntries方法
      const o = cleanObj({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParam(o);
    },
  ] as const;
};
