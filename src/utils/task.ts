import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "../types/task";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
  useReorderTaskConfig,
} from "./useOptimisticOptions";
import { useDebounce } from "./index";
import { SortProps } from "./kanban";

// AJAX，取得task列表的hook
export const useTasks = (params?: Partial<Task>) => {
  const client = useHttp();
  const debounceParams = { ...params, name: useDebounce(params?.name, 200) };
  return useQuery<Task[]>(["tasks", debounceParams], () =>
    client("tasks", { data: debounceParams })
  );
};
// AJAX，添加task的hook
export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      client("tasks", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};
// AJAX，獲取單個task數據的hook
export const useTask = (id?: number) => {
  const client = useHttp();

  return useQuery(["task", { id }], () => client(`tasks/${id}`), {
    enabled: Boolean(id),
  });
};

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`tasks/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useReorderTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: SortProps) =>
      client("tasks/reorder", {
        method: "POST",
        data: params,
      }),
    useReorderTaskConfig(queryKey)
  );
};
