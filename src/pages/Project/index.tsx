import styled from "@emotion/styled";
import { Link, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { KanbanPage } from "../Kanban";
import { EpicPage } from "../Epic";
import { Menu } from "antd";

// 獲取現在的路由位置
const useRouteType = () => {
  const unit = useLocation().pathname.split("/");
  return unit[unit.length - 1];
};

export const ProjectPage = () => {
  const routeType = useRouteType();

  return (
    <Container>
      <Aside>
        <Menu mode={"inline"} selectedKeys={[routeType]}>
          <Menu.Item key={"kanban"}>
            <Link to={"kanban"}>看板</Link>
          </Menu.Item>
          <Menu.Item key={"epic"}>
            <Link to={"epic"}>任務列表</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={"/kanban"} element={<KanbanPage />} />
          <Route path={"/epic"} element={<EpicPage />} />
          <Navigate to={window.location.pathname + "/kanban"} replace={true} />
        </Routes>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
`;

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;
const Main = styled.main`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
`;
