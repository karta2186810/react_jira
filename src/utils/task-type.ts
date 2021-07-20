import { useHttp } from "./http";
import { useQuery } from "react-query";
import { TaskType } from "../types/task-type";

// AJAX，取得所有taskType的hook
export const useTaskTypes = () => {
  const client = useHttp();

  return useQuery<TaskType[]>(["taskTypes"], () => client("taskTypes"));
};
