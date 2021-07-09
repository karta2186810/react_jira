import { useState } from "react";
import { RegisterPage } from "./Register";
import { LoginPage } from "./Login";
import { Button, Card, Divider, Typography } from "antd";
import styled from "@emotion/styled";
import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";

/* Component */
export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  return (
    <Container>
      <Background />
      <Header />
      <ShadowCard>
        <Title>{isRegister ? "註冊" : "登入"}</Title>
        {error ? (
          <Typography.Text type={"danger"}>{error.message}</Typography.Text>
        ) : null}
        {isRegister ? (
          <RegisterPage onError={setError} />
        ) : (
          <LoginPage onError={setError} />
        )}
        <Divider />
        {isRegister ? "已經有帳號?" : "還沒有帳號?"} &nbsp;
        <Button
          onClick={() => {
            setIsRegister(!isRegister);
            setError(null);
          }}
          type={"link"}
          style={{ userSelect: "none" }}
        >
          {isRegister ? "直接登入" : "註冊新帳號"}
        </Button>
      </ShadowCard>
    </Container>
  );
};

/* CSS */
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: 0.2s;
  &:hover {
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
  }
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem;
  background-size: 8rem;
  width: 100%;
`;
const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgba(94, 108, 132);
  font-weight: bold;
`;
export const LongButton = styled(Button)`
  width: 100%;
`;
