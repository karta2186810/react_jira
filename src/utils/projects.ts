/* 與project相關的工具函數 */
import { useAsync } from "./use-async";
import { Project } from "../pages/ProjectList/List";
import { useHttp } from "./http";
import { useMutation, useQuery, useQueryClient } from "react-query";

/* 取得project的數據 */
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );
};

/* 發送添加project的請求 */
export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        method: "POST",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

/* 發送編輯project的請求 */
export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project[]>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: Boolean(id),
    }
  );
};
