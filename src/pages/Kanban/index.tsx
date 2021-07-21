import styled from "@emotion/styled";
import { useDocumentTitle } from "../../utils";
import { useKanban } from "../../utils/kanban";
import {
  useKanbanSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from "./util";
import { KanbanColumn } from "./KanbanColumn";
import { SearchPanel } from "./SearchPanel";
import { PageContainer } from "../../components/lib";
import { useTasks } from "../../utils/task";
import { Spin } from "antd";
import { CreateKanban } from "./CreateKanban";
import { TaskModal } from "./TaskModal";

export const KanbanPage = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  // 獲取kanban的loading狀態
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanban(
    useKanbanSearchParams()
  );
  // 獲取tasks的loading狀態
  const { isLoading: tasksIsLoading } = useTasks(useTasksSearchParams());
  // 只要tasks或kanban為loading狀態，本page就是loading狀態
  const isLoading = kanbanIsLoading || tasksIsLoading;

  return (
    <PageContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <ColumnsContainer>
          {kanbans?.map((kanban) => (
            <KanbanColumn kanban={kanban} key={kanban.id} />
          ))}
          <CreateKanban />
        </ColumnsContainer>
      )}
      <TaskModal />
    </PageContainer>
  );
};

export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
