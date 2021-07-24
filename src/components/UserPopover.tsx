import { Popover, Typography, List, Divider } from "antd";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "./lib";
import { useUsers } from "../utils/user";

export const UserPopover = () => {
  const { refetch, data: users } = useUsers();

  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"} style={{ fontWeight: "bold" }}>
        組員列表
      </Typography.Text>
      <List>
        {users?.map((user) => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
    </ContentContainer>
  );

  return (
    <Popover
      onVisibleChange={() => refetch()}
      placement={"bottom"}
      content={content}
    >
      <span style={{ fontWeight: "bold" }}>組員</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
