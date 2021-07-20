import styled from "@emotion/styled";
import { useDocumentTitle } from "../../utils";
import { useKanban } from "../../utils/kanban";
import { useKanbanSearchParams, useProjectInUrl } from "./util";
import { KanbanColumn } from "./KanbanColumn";
import { SearchPanel } from "./SearchPanel";
import { PageContainer } from "../../components/lib";

export const KanbanPage = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = useKanban(useKanbanSearchParams());

  return (
    <PageContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnsContainer>
    </PageContainer>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
