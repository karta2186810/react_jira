import styled from "@emotion/styled";
import { useDocumentTitle } from "../../utils";
import { useKanbans, useReorderKanban } from "../../utils/kanban";
import {
  useKanbanSearchParams,
  useKanbansQueryKey,
  useProjectInUrl,
  useTasksQueryKey,
  useTasksSearchParams,
} from "./util";
import { KanbanColumn } from "./KanbanColumn";
import { SearchPanel } from "./SearchPanel";
import { PageContainer } from "../../components/lib";
import { useReorderTask, useTasks } from "../../utils/task";
import { Spin } from "antd";
import { CreateKanban } from "./CreateKanban";
import { TaskModal } from "./TaskModal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "../../components/DragAndDrop";
import { useCallback } from "react";

export const KanbanPage = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  // 獲取kanban的loading狀態
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbanSearchParams()
  );
  // 獲取tasks的loading狀態
  const { isLoading: tasksIsLoading } = useTasks(useTasksSearchParams());
  // 只要tasks或kanban為loading狀態，本page就是loading狀態
  const isLoading = kanbanIsLoading || tasksIsLoading;
  const onDragEnd = useDropEnd();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <PageContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <ColumnsContainer>
            <Drop
              type={"COLUMN"}
              direction={"horizontal"}
              droppableId={"kanban"}
            >
              <DropChild style={{ display: "flex" }}>
                {kanbans?.map((kanban, index) => (
                  <Drag
                    key={kanban.id}
                    draggableId={"kanban" + kanban.id}
                    index={index}
                  >
                    <KanbanColumn kanban={kanban} key={kanban.id} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateKanban />
          </ColumnsContainer>
        )}
        <TaskModal />
      </PageContainer>
    </DragDropContext>
  );
};

export const useDropEnd = () => {
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { data: allTasks = [] } = useTasks(useTasksSearchParams());
  const { mutate: reorderKanban } = useReorderKanban(useKanbansQueryKey());
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());

  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) return;

      // COLUMN時，代表為看板排序
      if (type === "COLUMN") {
        const fromId = kanbans?.[source.index].id;
        const toId = kanbans?.[destination.index].id;

        if (!fromId || !toId || fromId === toId) return;

        const type = destination.index > source.index ? "after" : "before";

        reorderKanban({ fromId, referenceId: toId, type });
      }

      // ROW時代表，為task排序
      if (type === "ROW") {
        const fromKanbanId = +source.droppableId;
        const toKanbanId = +destination.droppableId;
        const fromTask = allTasks.filter(
          (task) => task.kanbanId === fromKanbanId
        )[source.index];
        const toTask = allTasks.filter((task) => task.kanbanId === toKanbanId)[
          destination.index
        ];

        if (fromTask?.id === toTask?.id) return;

        const type =
          fromKanbanId === toKanbanId && destination.index > source.index
            ? "after"
            : "before";

        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId,
          toKanbanId,
          type,
        });
      }
    },
    [allTasks, kanbans, reorderKanban, reorderTask]
  );
};

/* CSS */
export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
