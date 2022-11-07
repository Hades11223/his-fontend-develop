import React from "react";
import { Main } from "./styled";

const Box = ({ title, titleRight, children, className, ...props }) => {
  return (
    <Main className={`box ${className || ""}`}>
      <div className="box-header">
        <div className="title-left">{title}</div>
        <div className="title-right">{titleRight}</div>
      </div>
      <div className="box-content">{children}</div>
    </Main>
  );
};

export default Box;
