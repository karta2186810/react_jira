import { Kanban } from "../types/kanban";
import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import {
  useAddConfig,
  useDeleteConfig,
  useReorderKanbanConfig,
} from "./useOptimisticOptions";

// 獲取看板列表的hook
export const useKanbans = (params?: Partial<Kanban>) => {
  const client = useHttp();
  return useQuery<Kanban[]>(["kanbans", params], () =>
    client("kanbans", { data: params })
  );
};

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Kanban>) =>
      client("kanbans", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`kanbans/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export interface SortProps {
  fromId: number; // 要重新排序的item
  referenceId: number; // 目標item
  type: "before" | "after"; // 排在目標item的前面或是後面
  fromKanbanId?: number;
  toKanbanId?: number;
}

export const useReorderKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: SortProps) =>
      client("kanbans/reorder", {
        data: params,
        method: "POST",
      }),
    useReorderKanbanConfig(queryKey)
  );
};
