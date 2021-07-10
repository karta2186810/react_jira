import styled from "@emotion/styled";
import { SearchPanel } from "./SearchPanel";
import { List } from "./List";
import { useState } from "react";
import { useDebounce, useDocumentTitle } from "../../utils";
import { Typography } from "antd";
import { useProjects } from "../../utils/projects";
import { useUsers } from "../../utils/user";

export const ProjectListPage = () => {
  // SearchPanel輸入的搜尋參數
  const [param, setParam] = useState({ name: "", personId: "" });
  const debounceParam = useDebounce(param, 200);

  // 獲取 users 和 list 數據
  const { data: list, isLoading, error } = useProjects(debounceParam);
  const { data: users } = useUsers();

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

/* CSS */
const Container = styled.div`
  padding: 3.2rem;
`;
