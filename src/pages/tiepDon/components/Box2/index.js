import React from "react";
import { Main } from "./styled";

const Box2 = ({
  title,
  className,
  children,
  headerRight,
  noPadding = false,
  ...props
}) => {
  return (
    <Main className={className} noPadding={noPadding}>
      <div className="header">
        <div className="_title">{title}</div>
        {!!headerRight && <div className="_right_btn">{headerRight}</div>}
      </div>
      <div className="wrapper">{children}</div>
    </Main>
  );
};

export default Box2;
