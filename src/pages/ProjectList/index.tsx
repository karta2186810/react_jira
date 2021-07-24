import { SearchPanel } from "./SearchPanel";
import { List } from "./List";
import { useDebounce, useDocumentTitle } from "../../utils";
import { useProjects } from "../../utils/projects";
import { useUsers } from "../../utils/user";
import { useProjectModal, useProjectsSearchParams } from "./util";
import {
  ButtonNoPadding,
  ErrorBox,
  PageContainer,
  Row,
} from "../../components/lib";

export const ProjectListPage = () => {
  // 變更title
  useDocumentTitle("項目列表", false);
  const { open } = useProjectModal();
  // 通過url獲取狀態參數，並將返回物件中的personId轉換成數字
  const [param, setParam] = useProjectsSearchParams();
  // 發送AJAX請求，獲取users 和 list 數據
  const { data: list, isLoading, error } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();

  return (
    <PageContainer>
      <Row between={true}>
        <h1>項目列表</h1>
        <ButtonNoPadding onClick={open} type={"link"}>
          創建項目
        </ButtonNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <ErrorBox error={error} />
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </PageContainer>
  );
};
