import { useForm } from "antd/es/form/Form";
import { useTasksModal, useTasksQueryKey, useTasksSearchParams } from "./util";
import { useDeleteTask, useEditTask } from "../../utils/task";
import { useEffect } from "react";
import { Button, Form, Input, Modal } from "antd";
import { UserSelect } from "../../components/UserSelect";
import { TaskTypeSelect } from "../../components/TaskTypeSelect";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const TaskModal = () => {
  const [form] = useForm();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );
  const { editingTaskId, editingTask, close } = useTasksModal();
  const { mutateAsync: deleteTask } = useDeleteTask(useTasksQueryKey());

  const onCancel = () => {
    close();
    form.resetFields();
  };
  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };

  const startDelete = () => {
    close();
    Modal.confirm({
      okText: "確定",
      cancelText: "取消",
      title: "確定刪除任務嗎?",
      onOk() {
        return deleteTask({ id: Number(editingTaskId) });
      },
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  return (
    <Modal
      forceRender={true}
      okText={"確認"}
      cancelText={"取消"}
      confirmLoading={editLoading}
      title={"編輯任務"}
      visible={!!editingTaskId}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form {...layout} form={form} initialValues={editingTask}>
        <Form.Item
          label={"任務名"}
          name={"name"}
          rules={[{ required: true, message: "請輸入任務名稱" }]}
        >
          <Input placeholder={"請輸入任務名"} />
        </Form.Item>
        <Form.Item label={"經辦人"} name={"processorId"}>
          <UserSelect defaultOptionName={"經辦人"} />
        </Form.Item>
        <Form.Item label={"類型"} name={"typeId"}>
          <TaskTypeSelect />
        </Form.Item>
      </Form>
      <div style={{ textAlign: "right" }}>
        <Button
          onClick={startDelete}
          style={{ fontSize: "14px" }}
          size={"small"}
        >
          刪除
        </Button>
      </div>
    </Modal>
  );
};
