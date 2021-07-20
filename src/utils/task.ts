import { useHttp } from "./http";
import { useQuery } from "react-query";
import { Task } from "../types/task";

// AJAX，取得task列表的hook
export const useTasks = (params?: Partial<Task>) => {
  const client = useHttp();
  return useQuery<Task[]>(["tasks", params], () =>
    client("tasks", { data: params })
  );
};
