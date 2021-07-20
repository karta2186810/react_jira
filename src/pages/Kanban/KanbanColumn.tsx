import styled from "@emotion/styled";
import { Card } from "antd";
import { Kanban } from "../../types/kanban";
import { useTasks } from "../../utils/task";
import { useTasksSearchParams } from "./util";
import { useTaskTypes } from "../../utils/task-type";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;

  if (!name) return null;

  return <img src={name === "task" ? taskIcon : bugIcon} />;
};

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  // 取得URL中的參數並發送AJAX
  const { data: allTasks } = useTasks(useTasksSearchParams());
  // 篩選對應看板的task
  const tasks = allTasks?.filter((tasks) => tasks.kanbanId === kanban.id);

  return (
    <Container>
      <h3 style={{ fontWeight: "bold" }}>{kanban.name}</h3>
      <TasksContainer>
        {tasks?.map((task) => (
          <Card style={{ marginBottom: "0.5rem" }} key={task.id}>
            <div>{task.name}</div>
            <TaskTypeIcon id={task.typeId} />
          </Card>
        ))}
      </TasksContainer>
    </Container>
  );
};

const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgba(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
