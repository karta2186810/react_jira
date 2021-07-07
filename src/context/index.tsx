/*
 * 統一各個context的組件
 * */
import { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
