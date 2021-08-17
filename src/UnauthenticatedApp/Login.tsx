import React from "react";
import { useAuth } from "../context/AuthContext";
import { Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "../utils/use-async";

export const LoginPage = ({ onError }: { onError: (error: Error) => void }) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values));
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
        <Input type="password" id={"password"} placeholder={"密碼"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          登入
        </LongButton>
      </Form.Item>
    </Form>
  );
};
