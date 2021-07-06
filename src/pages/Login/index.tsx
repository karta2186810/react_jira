import React, { FormEvent } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

console.log(apiUrl);
export const LoginPage = () => {
  const login = (param: { username: string; password: string }) => {
    fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(param),
    }).then(async (res) => {
      if (res.ok) {
      }
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password });
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
      <button type={"submit"}>登入</button>
    </form>
  );
};
