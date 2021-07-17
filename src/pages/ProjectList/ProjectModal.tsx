import { Drawer, Button, Spin, Form, Input } from "antd";
import { useEffect } from "react";
import styled from "@emotion/styled";
import { useProjectModal } from "./util";
import { UserSelect } from "../../components/UserSelect";
import { useAddProject, useEditProject } from "../../utils/projects";
import useForm from "antd/es/form/hooks/useForm";
import { ErrorBox } from "../../components/lib";

export const ProjectModal = () => {
  const { projectCreate, close, editingProject, isLoading } = useProjectModal();
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject();

  const [form] = useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  const title = editingProject ? "編輯項目" : "創建項目";

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [form, editingProject]);

  return (
    <Drawer
      forceRender={true}
      onClose={close}
      visible={projectCreate}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                name={"name"}
                label={"名稱"}
                rules={[{ required: true, message: "請輸入項目名稱" }]}
              >
                <Input placeholder={"請輸入項目名稱"} />
              </Form.Item>
              <Form.Item
                name={"organization"}
                label={"部門"}
                rules={[{ required: true, message: "請輸入部門名稱" }]}
              >
                <Input placeholder={"請輸入部門名稱"} />
              </Form.Item>
              <Form.Item name={"personId"} label={"負責人"}>
                <UserSelect defaultOptionName={"負責人"} />
              </Form.Item>
              <Form.Item style={{ textAlign: "center" }}>
                <Button
                  loading={mutateLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;
