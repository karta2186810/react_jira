import styled from "@emotion/styled";
import { SearchPanel } from "./SearchPanel";
import { List } from "./List";
// import { useState } from "react";
import { useDebounce, useDocumentTitle } from "../../utils";
import { Button, Typography } from "antd";
import { useProjects } from "../../utils/projects";
import { useUsers } from "../../utils/user";
import { useProjectsSearchParams } from "./util";

export const ProjectListPage = () => {
  // 變更title
  useDocumentTitle("項目列表", false);

  // 通過url獲取狀態參數，並將返回物件中的personId轉換成數字
  const [param, setParam] = useProjectsSearchParams();

  // 發送AJAX請求，獲取users 和 list 數據
  const {
    data: list,
    retry,
    isLoading,
    error,
  } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();

  return (
    <Container>
      <Button onClick={retry}>retry</Button>
      <h1>項目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      />
    </Container>
  );
};

ProjectListPage.whyDidYouRender = true;

/* CSS */
const Container = styled.div`
  padding: 3.2rem;
`;
