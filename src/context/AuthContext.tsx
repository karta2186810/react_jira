/*
 * 控制登入註冊的context和操作該context的hook
 * */
import React, { useContext, ReactNode } from "react";
import * as auth from "auth-prodiver";
import { http } from "../utils/http";
import { useMount } from "../utils";
import { useAsync } from "../utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "../components/lib";
import { DevTools } from "jira-dev-tool";
import { useQueryClient } from "react-query";
import { User } from "../types/user";

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
  // 初始化含有loading、error、data訊息的狀態
  const {
    data: user,
    setData: setUser,
    error,
    isError,
    isLoading,
    isIdle,
    run,
  } = useAsync<User | null>();

  const queryClient = useQueryClient();
  // 發送Auth有關的請求，並設置AuthContext的狀態
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () =>
    auth.logout().then(() => {
      setUser(null); // 重製user
      queryClient.clear(); // 清除 react-query 的 cache
    });

  // 嘗試從localStorage取得token，並向 '/me' 發送請求
  useMount(() => {
    run(boostrapUser());
  });

  // 在請求成功返回之前，返回全畫面Loading組件
  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  // 如果出錯，返回錯誤頁面
  if (isError) {
    return (
      <div>
        <DevTools />
        <FullPageErrorFallback error={error} />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

// 取得 AuthContext 的 hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必須在AuthProvider中使用");
  }
  return context;
};
