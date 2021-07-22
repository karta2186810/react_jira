import React from "react";
import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { Kanban } from "../../types/kanban";
import { useTasks } from "../../utils/task";
import {
  useKanbansQueryKey,
  useTasksModal,
  useTasksSearchParams,
} from "./util";
import { useTaskTypes } from "../../utils/task-type";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import { CreateTask } from "./CreateTask";
import { Task } from "../../types/task";
import { Mark } from "../../components/Mark";
import { useDeleteKanban } from "../../utils/kanban";
import { Row } from "../../components/lib";
import { Drag, Drop, DropChild } from "../../components/DragAndDrop";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;

  if (!name) return null;

  return <img alt={"task-icon"} src={name === "task" ? taskIcon : bugIcon} />;
};

const TaskCard = ({ task }: { task: Task }) => {
  const { name: keyword } = useTasksSearchParams();
  const { startEdit } = useTasksModal();

  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: "0.5rem" }}
      key={task.id}
    >
      <Mark name={task.name} keyword={keyword} />
      <br />
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync: deleteKanban } = useDeleteKanban(useKanbansQueryKey());
  const startDelete = () => {
    Modal.confirm({
      okText: "確定",
      cancelText: "取消",
      title: "確定刪除看板嗎?",
      onOk() {
        return deleteKanban({ id: kanban.id });
      },
    });
  };

  const overlay = (
    <Menu>
      <Menu.Item>
        <Button type={"link"} onClick={startDelete}>
          刪除
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={overlay}>
      <Button type={"link"}>...</Button>
    </Dropdown>
  );
};

export const KanbanColumn = React.forwardRef<
  HTMLDivElement,
  { kanban: Kanban }
>(({ kanban, ...props }, ref) => {
  // 取得URL中的參數並發送AJAX
  const { data: allTasks } = useTasks(useTasksSearchParams());
  // 篩選對應看板的task
  const tasks = allTasks?.filter((tasks) => tasks.kanbanId === kanban.id);

  return (
    <Container ref={ref} {...props}>
      <Row between={true}>
        <h3 style={{ fontWeight: "bold" }}>{kanban.name}</h3>
        <More kanban={kanban} key={kanban.id} />
      </Row>
      <TasksContainer>
        <Drop
          type={"ROW"}
          direction={"vertical"}
          droppableId={String(kanban.id)}
        >
          <DropChild style={{ minHeight: "16px" }}>
            {tasks?.map((task, index) => (
              <Drag key={task.id} index={index} draggableId={"task" + task.id}>
                <div>
                  <TaskCard task={task} key={task.id} />
                </div>
              </Drag>
            ))}
          </DropChild>
        </Drop>
        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </Container>
  );
});

/* CSS */
export const Container = styled.div`
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
