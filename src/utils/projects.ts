/* 與project相關的工具函數 */
import { useAsync } from "./use-async";
import { Project } from "../pages/ProjectList/List";
import { useEffect } from "react";
import { cleanObj } from "./index";
import { useHttp } from "./http";

/* 取得project的數據 */
export const useProjects = (param: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  const fetchProjects = () => client("projects", { data: cleanObj(param) });

  // 發送請求
  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return result;
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
