import { Popover, Typography, List, Divider, Button } from "antd";
import styled from "@emotion/styled";
import { useProjects } from "../utils/projects";
import { ButtonNoPadding } from "./lib";
import { useProjectModal } from "../pages/ProjectList/util";

export const ProjectPopover = () => {
  const { isLoading, data: projects } = useProjects();
  const pinProjects = projects?.filter((project) => project.pin);
  const { open } = useProjectModal();

  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"} style={{ fontWeight: "bold" }}>
        收藏項目
      </Typography.Text>
      <List>
        {pinProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding onClick={open} type={"link"}>
        創建項目
      </ButtonNoPadding>
    </ContentContainer>
  );

  return (
    <Popover placement={"bottom"} content={content}>
      <span>項目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
