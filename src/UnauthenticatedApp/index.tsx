import { useState } from "react";
import { RegisterPage } from "./Register";
import { LoginPage } from "./Login";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div>
      {isRegister ? <RegisterPage /> : <LoginPage />}
      <button onClick={() => setIsRegister(!isRegister)}>
        切換到{isRegister ? "登入" : "註冊"}
      </button>
    </div>
  );
};
