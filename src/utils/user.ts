/*
 * 用於獲取ProjectList中的user數據的鉤子
 * */

import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { useEffect } from "react";
import { cleanObj } from "./index";
import { User } from "../types/user";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();

  useEffect(() => {
    run(client("users", { data: cleanObj(param || {}) }));
  }, [param, run, client]);

  return result;
};
