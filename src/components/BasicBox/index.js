import React from "react";
import { Main } from "./styled";

const BasicBox = ({ title, children, className, headerRight }) => {
  return (
    <>
      <Main className={`box ${className || ""}`}>
        <div className="header-box">
          <div className="header-box__left">{title}</div>
          {!!headerRight && (
            <div className="header-box__right">{headerRight}</div>
          )}
        </div>
        <div className="content-box">{children}</div>
      </Main>
    </>
  );
};

export default BasicBox;
