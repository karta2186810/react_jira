import React from "react";
import { IdSelect } from "./IdSelect";
import { useTaskTypes } from "../utils/task-type";

export const TaskTypeSelect = (
  props: React.ComponentProps<typeof IdSelect>
) => {
  const { data: TaskTypes } = useTaskTypes();
  return <IdSelect options={TaskTypes || []} {...props} />;
};
