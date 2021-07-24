import { QueryKey, useMutation, useQuery } from "react-query";
import { Epic } from "../types/epic";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig } from "./useOptimisticOptions";

export const useEpics = (params?: Partial<Epic>) => {
  const client = useHttp();

  return useQuery<Epic[]>(["epics", params], () =>
    client("epics", { data: params })
  );
};

export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Epic>) =>
      client("epics", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`epics/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};
