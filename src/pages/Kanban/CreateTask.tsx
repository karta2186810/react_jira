import { useEffect, useState } from "react";
import { useAddTask } from "../../utils/task";
import { useProjectIdInUrl, useTasksQueryKey } from "./util";
import { Card, Input } from "antd";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  // 輸入框的內容
  const [name, setName] = useState("");
  // 標示現在是否為輸入狀態
  const [inputMode, setInputMode] = useState(false);

  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());
  // 獲取projectId
  const projectId = useProjectIdInUrl();

  // 發送添加task的請求
  const submit = async () => {
    await addTask({ projectId, name, kanbanId });
    setInputMode(false);
    setName("");
  };

  const toggle = () => setInputMode((mode) => !mode);

  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);

  if (!inputMode) {
    return (
      <div onClick={toggle} style={{ fontWeight: "bold" }}>
        +創建事務
      </div>
    );
  }

  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder={"需要做些什麼"}
        autoFocus={true}
        onPressEnter={submit}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Card>
  );
};
