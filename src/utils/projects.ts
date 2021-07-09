/*
 * 用於獲取ProjectList中的project數據的鉤子
 * */
import { useAsync } from "./use-async";
import { Project } from "../pages/ProjectList/List";
import { useEffect } from "react";
import { cleanObj } from "./index";
import { useHttp } from "./http";

export const useProjects = (param: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  // 發送請求
  useEffect(() => {
    run(client("projects", { data: cleanObj(param) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return result;
};
