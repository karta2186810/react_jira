/* 與project相關的工具函數 */
import { useAsync } from "./use-async";
import { Project } from "../pages/ProjectList/List";
import { useHttp } from "./http";
import { useQuery } from "react-query";

/* 取得project的數據 */
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  console.log(param);
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );
};

/* 發送添加project的請求 */
export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};

/* 發送編輯project的請求 */
export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
