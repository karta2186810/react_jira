/*
 * 用於獲取ProjectList中的user數據的鉤子
 * */

import { User } from "../types/user";
import { useQuery } from "react-query";
import { useHttp } from "./http";

export const useUsers = (params?: Partial<User>) => {
  const client = useHttp();
  return useQuery<User[]>(["users", params], () =>
    client("users", { data: params })
  );
};
