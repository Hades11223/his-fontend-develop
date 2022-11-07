import React, { useEffect } from "react";
import { Main } from "./styled";
import { Col } from "antd";
import Notification from "./Notification";
import SubLogin from "./SubLogin";
import { useScale } from "hook";

const Login = (props) => {
  const { onScale, onUnscale } = useScale();
  useEffect(() => {
    onUnscale();
    return () => {
      onScale();
    };
  }, []);
  return (
    <Main className="page-home">
      <SubLogin />
      <Notification />
    </Main>
  );
};

export default Login;
