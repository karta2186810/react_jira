import { Kanban } from "../types/kanban";
import { useHttp } from "./http";
import { useQuery } from "react-query";

// 獲取看板列表的hook
export const useKanban = (params?: Partial<Kanban>) => {
  const client = useHttp();
  return useQuery<Kanban[]>(["kanbans", params], () =>
    client("kanbans", { data: params })
  );
};
