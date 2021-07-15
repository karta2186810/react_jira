import { useUrlQueryParam } from "../../utils/url";
import { useCallback, useMemo } from "react";
import { set } from "husky";

// 從URL獲取projectList中需要的參數
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const open = useCallback(
    () => setProjectCreate({ projectCreate: true }),
    [setProjectCreate]
  );
  const close = useCallback(
    () => setProjectCreate({ projectCreate: undefined }),
    [setProjectCreate]
  );

  return {
    projectCreate: projectCreate === "true",
    open,
    close,
  };
};
