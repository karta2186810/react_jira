/*
 * 控制登入註冊的context和操作該context的hook
 * */
import React, { useContext, useState, ReactNode } from "react";
import * as auth from "auth-prodiver";
import { User } from "../pages/ProjectList/SearchPanel";
import { http } from "../utils/http";
import { useMount } from "../utils";
// 表單內容的interface
interface AuthForm {
  username: string;
  password: string;
}
// 創建 context
const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

// 嘗試從localStorage中獲取token，並攜帶token發送請求取得user數據
const boostrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

// AuthProvider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  // point free
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    boostrapUser().then(setUser);
  });
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

// Auth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必須在AuthProvider中使用");
  }
  return context;
};
