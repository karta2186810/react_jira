import { useLocation, useParams } from "react-router-dom";
import { useProject } from "../../utils/projects";
import { useUrlQueryParam } from "../../utils/url";
import { useCallback, useMemo } from "react";
import { useTask } from "../../utils/task";

// 從URL中取得projectId
export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};
// 取得當前看板所在的project的數據
export const useProjectInUrl = () => useProject(useProjectIdInUrl());
export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });
// 標示kanban數據的key
export const useKanbansQueryKey = () => ["kanbans", useKanbanSearchParams()];

// 取得URL中tasks需要的參數
export const useTasksSearchParams = () => {
  const [params] = useUrlQueryParam(["name", "typeId", "processorId", "tagId"]);
  const projectId = useProjectIdInUrl();

  return useMemo(
    () => ({
      projectId,
      typeId: Number(params.typeId) || undefined,
      processorId: Number(params.processorId) || undefined,
      tagId: Number(params.tagId) || undefined,
      name: params.name,
    }),
    [projectId, params]
  );
};
// 標示tasks數據的key
export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];

export const useTasksModal = () => {
  // 從URL中獲取當前編輯的task的ID
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
    "editingTaskId",
  ]);
  // 取得當前要編輯的task的數據
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));
  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId]
  );
  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: "" });
  }, [setEditingTaskId]);

  return {
    editingTaskId,
    editingTask,
    startEdit,
    close,
    isLoading,
  };
};
