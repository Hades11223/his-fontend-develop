import React from "react";
import { useSelector } from "react-redux";
import { Main } from "./styled";
const Badge = (props) => {
  const { serverState } = useSelector((state) => state.application);
  return <Main status={serverState}></Main>;
};

export default Badge;
