import styled from "@emotion/styled";
import { Dropdown, Menu, Button } from "antd";
import {
  Navigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Row } from "components/lib";
import { useAuth } from "./context/AuthContext";
import { ProjectListPage } from "./pages/ProjectList";
import { ProjectPage } from "./pages/Project";
import { resetRoute } from "./utils";

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <Router>
          <Routes>
            <Route path={"/projects"} element={<ProjectListPage />} />
            <Route path={"/projects/:projectId/*"} element={<ProjectPage />} />
            <Navigate to={"/projects"} />
          </Routes>
        </Router>
      </Main>
    </Container>
  );
};

const PageHeader = () => {
  const { user, logout } = useAuth();

  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type={"link"} onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </Button>
        <h3>項目</h3>
        <h3>用戶</h3>
      </HeaderLeft>
      <HeaderRight>
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
      </HeaderRight>
    </Header>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;
