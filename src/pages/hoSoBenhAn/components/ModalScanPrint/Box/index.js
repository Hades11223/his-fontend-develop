import React, { forwardRef } from "react";
import { Main } from "./styled";

const Box = ({ title, subTitle, children, className, ...props }, ref) => {
  return (
    <Main noPadding={true} className={`${className} mn-box`}>
      <div className="header">
        <div className="title">{title}</div>
        {subTitle}
      </div>
      <div className="container">{children}</div>
    </Main>
  );
};

export default forwardRef(Box);
