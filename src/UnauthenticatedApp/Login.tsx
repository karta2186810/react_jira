import React, { FormEvent } from "react";
import { useAuth } from "../context/AuthContext";

export const LoginPage = () => {
  const { user, login } = useAuth();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      {user ? (
        <div>
          登入成功，用戶名 {user?.name} <br /> token: {user?.token}
        </div>
      ) : null}
      <div>
        <label htmlFor="username">用戶名</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密碼</label>
        <input type="text" id={"password"} />
      </div>
      <button type={"submit"}>登入</button>
    </form>
  );
};
