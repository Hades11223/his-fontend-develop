import React, { forwardRef } from "react";
import { Main } from "./styled";

const Checkbox = ({ checked, onChange, children, style, ...props }, ref) => {
  return (
    <Main
      checked={checked}
      onChange={onChange}
      {...props}
      style={style}
      ref={ref}
    >
      {children}
    </Main>
  );
};

export default forwardRef(Checkbox);
