import React, { FormEvent } from "react";
import { useAuth } from "../context/AuthContext";

export const RegisterPage = () => {
  const { user, register } = useAuth();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    register({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用戶名</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密碼</label>
        <input type="text" id={"password"} />
      </div>
      <button type={"submit"}>註冊</button>
    </form>
  );
};
