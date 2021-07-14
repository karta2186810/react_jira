import { Dropdown, Menu, Table, TableProps, Button } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { User } from "./SearchPanel";
import { Pin } from "../../components/Pin";
import { useEditProject } from "../../utils/projects";
import { ButtonNoPadding } from "../../components/lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "./ProjectList.slice";

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}
interface ListProps extends TableProps<Project> {
  users: User[];
  refresh: () => void;
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(props.refresh);
  const dispatch = useDispatch();

  return (
    <Table
      {...props}
      pagination={false}
      rowKey={"id"}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名稱",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
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
        {
          title: "操作",
          render() {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Button
                      type={"link"}
                      onClick={() =>
                        dispatch(projectListActions.openProjectModal())
                      }
                    >
                      編輯
                    </Button>
                  </Menu>
                }
              >
                <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
    />
  );
};
