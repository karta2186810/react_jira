import { useEffect, useState } from "react";
import { useAddTask } from "../../utils/task";
import { useProjectIdInUrl, useTasksQueryKey } from "./util";
import { Card, Input } from "antd";
import styled from "@emotion/styled";

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
    if (!name.trim()) {
      setInputMode(false);
      return;
    }
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
    return <CreateButton onClick={toggle}>創建事務</CreateButton>;
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

const CreateButton = styled.div`
  text-align: center;
  padding: 0 1.6rem;
  border-radius: 2px;
  color: rgb(38, 132, 255);
  border: 1px solid rgb(38, 132, 255);
  width: 16rem;
  margin: 1.6rem auto;
  cursor: pointer;
`;
