import React, { FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { Form, Input, Button } from "antd";
import { LongButton } from "./index";
export const LoginPage = () => {
  const { user, login } = useAuth();
  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
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
      <Form.Item>
        <LongButton htmlType={"submit"} type={"primary"}>
          登入
        </LongButton>
      </Form.Item>
    </Form>
  );
};
