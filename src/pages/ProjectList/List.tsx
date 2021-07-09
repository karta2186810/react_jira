import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { User } from "./SearchPanel";

export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}
interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      {...props}
      pagination={false}
      rowKey={"id"}
      columns={[
        {
          title: "名稱",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "部門",
          dataIndex: "organization",
        },
        {
          title: "負責人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "創建時間",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "無"}
              </span>
            );
          },
        },
      ]}
    />
  );
};
