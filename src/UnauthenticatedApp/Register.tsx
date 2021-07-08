import React, { FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, Form, Input } from "antd";
import { LongButton } from "./index";
export const RegisterPage = () => {
  const { user, register } = useAuth();
  const handleSubmit = (values: { username: string; password: string }) => {
    register(values);
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
          註冊
        </LongButton>
      </Form.Item>
    </Form>
  );
};
