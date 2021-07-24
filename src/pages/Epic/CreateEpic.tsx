import { Button, Drawer, DrawerProps, Form, Input, Spin } from "antd";
import styled from "@emotion/styled";
import { ErrorBox } from "../../components/lib";
import { useAddEpic } from "../../utils/epic";
import { useEpicsQueryKey } from "./util";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { useProjectIdInUrl } from "../Kanban/util";

export const CreateEpic = (
  props: Pick<DrawerProps, "visible"> & { onClose: () => void }
) => {
  const projectId = useProjectIdInUrl();
  const { mutate: addEpic, isLoading, error } = useAddEpic(useEpicsQueryKey());
  const [form] = useForm();

  const onFinish = async (values: any) => {
    await addEpic({ ...values, projectId });
    props.onClose();
  };

  useEffect(() => {
    form.resetFields();
  }, [form, props.visible]);

  return (
    <Drawer
      forceRender={true}
      destroyOnClose={true}
      width={"100%"}
      visible={props.visible}
      onClose={props.onClose}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>創建任務列表</h1>
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
                rules={[{ required: true, message: "請輸入任務列表名稱" }]}
              >
                <Input placeholder={"請輸入任務列表名稱"} />
              </Form.Item>
              <Form.Item style={{ textAlign: "center" }}>
                <Button
                  loading={isLoading}
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
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
