import { PageContainer, Row } from "../../components/lib";
import { useProjectInUrl } from "../Kanban/util";
import { useDeleteEpic, useEpics } from "../../utils/epic";
import { Button, List, Modal } from "antd";
import dayjs from "dayjs";
import { useTasks } from "../../utils/task";
import { Link } from "react-router-dom";
import { useEpicSearchParams, useEpicsQueryKey } from "./util";
import { CreateEpic } from "./CreateEpic";
import { useState } from "react";
import styled from "@emotion/styled";
import { ListProps } from "antd/lib/list";
import { Epic } from "../../types/epic";

export const EpicPage = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey());
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);

  const startDelete = (id: number) => {
    Modal.confirm({
      okText: "確定",
      cancelText: "取消",
      title: epics
        ? `確定刪除 ${epics?.find((epic) => epic.id === id)?.name} 任務列表嗎?`
        : "確定刪除任務列表嗎?",
      onOk() {
        return deleteEpic({ id });
      },
    });
  };

  return (
    <PageContainer>
      <Row between={true}>
        <h1>{currentProject?.name}任務列表</h1>
        <Button onClick={() => setEpicCreateOpen(true)}>創建任務列表</Button>
      </Row>
      <ScrollList
        dataSource={epics}
        itemLayout={"vertical"}
        renderItem={(epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row between={true}>
                  <span>{epic.name}</span>
                  <Button type={"link"} onClick={() => startDelete(epic.id)}>
                    刪除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>開始時間: {dayjs(epic.start).format("YYYY-MM-DD")}</div>
                  <div>結束時間: {dayjs(epic.end).format("YYYY-MM-DD")}</div>
                </div>
              }
            />
            <div>
              {tasks
                ?.filter((task) => task.epicId === epic.id)
                .map((task) => (
                  <div>
                    <Link
                      key={task.id}
                      to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                    >
                      {task.name}
                    </Link>
                  </div>
                ))}
            </div>
          </List.Item>
        )}
      />
      <CreateEpic
        onClose={() => setEpicCreateOpen(false)}
        visible={epicCreateOpen}
      />
    </PageContainer>
  );
};

const ScrollList = styled((props: ListProps<Epic>) => <List {...props} />)`
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
