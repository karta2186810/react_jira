import styled from "@emotion/styled";
import { SearchPanel } from "./SearchPanel";
import { List } from "./List";
// import { useState } from "react";
import { useDebounce, useDocumentTitle } from "../../utils";
import { Typography } from "antd";
import { useProjects } from "../../utils/projects";
import { useUsers } from "../../utils/user";
import { useUrlQueryParam } from "../../utils/url";

export const ProjectListPage = () => {
  // 獲取URL中的參數，和改變URL參數的方法
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  // 防抖
  const debounceParam = useDebounce(param, 200);

  // 發送AJAX請求，獲取users 和 list 數據
  const { data: list, isLoading, error } = useProjects(debounceParam);
  const { data: users } = useUsers();

  // 變更title
  useDocumentTitle("項目列表", false);

  return (
    <Container>
      <h1>項目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

// ProjectListPage.whyDidYouRender = true

/* CSS */
const Container = styled.div`
  padding: 3.2rem;
`;
