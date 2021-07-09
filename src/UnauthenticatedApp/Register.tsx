import React from "react";
import { useAuth } from "../context/AuthContext";
import { Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "../utils/use-async";

export const RegisterPage = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("密碼與確認密碼不相同"));
      return;
    }
    try {
      await run(register(values));
    } catch (e) {
      onError(e);
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "用戶名不能為空" }]}
      >
        <Input type="text" id={"username"} placeholder={"用戶名"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "密碼不能為空" }]}
      >
        <Input type="text" id={"password"} placeholder={"密碼"} />
      </Form.Item>
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "請輸入確認密碼" }]}
      >
        <Input type="text" id={"cpassword"} placeholder={"確認密碼"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          註冊
        </LongButton>
      </Form.Item>
    </Form>
  );
};
