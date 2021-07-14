/*
 * 控制登入註冊的context和操作該context的hook
 * */
import React, { useContext, ReactNode, useCallback } from "react";
import * as auth from "auth-prodiver";
import { User } from "../pages/ProjectList/SearchPanel";
import { http } from "../utils/http";
import { useMount } from "../utils";
import { useAsync } from "../utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "../components/lib";
import { DevTools } from "jira-dev-tool";
import * as authStore from "store/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { bootstrap, selectUser } from "store/auth.slice";

// 表單內容的interface
export interface AuthForm {
  username: string;
  password: string;
}

// 嘗試從localStorage中獲取token，並攜帶token發送請求取得user數據
export const boostrapUser = async () => {
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
  const { error, isError, isLoading, isIdle, run } = useAsync<User | null>();

  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();

  // 嘗試從localStorage取得token，並向 '/me' 發送請求
  useMount(() => {
    run(dispatch(bootstrap()));
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

  return <div>{children}</div>;
};

// 取得 AuthContext 的 hook
export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();

  const user = useSelector(selectUser);
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);

  return {
    user,
    login,
    register,
    logout,
  };
};
