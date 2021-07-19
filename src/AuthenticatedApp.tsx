import styled from "@emotion/styled";
import { Dropdown, Menu, Button } from "antd";
import {
  Navigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { ButtonNoPadding, Row } from "components/lib";
import { useAuth } from "./context/AuthContext";
import { ProjectListPage } from "./pages/ProjectList";
import { ProjectPage } from "./pages/Project";
import { resetRoute } from "./utils";
import { useState } from "react";
import { ProjectModal } from "./pages/ProjectList/ProjectModal";
import { ProjectPopover } from "./components/ProjectPopover";

export const AuthenticatedApp = () => {
  return (
    <Container>
      <Router>
        <PageHeader />
        <Main>
          <Routes>
            <Route path={"/projects"} element={<ProjectListPage />} />
            <Route path={"/projects/:projectId/*"} element={<ProjectPage />} />
            <Navigate to={"/projects"} />
          </Routes>
        </Main>
        <ProjectModal />
      </Router>
    </Container>
  );
};

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={"link"} onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </ButtonNoPadding>
        <ProjectPopover />
        <span style={{ fontWeight: "bold" }}>用戶</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { user, logout } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button type={"link"} onClick={logout}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

AuthenticatedApp.whyDidYouRender = true;

/* CSS */
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
  span {
    cursor: pointer;
    user-select: none;
    transition: all 0.3s;
    &:hover {
      color: rgb(38, 132, 255);
    }
  }
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;
