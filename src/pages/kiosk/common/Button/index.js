import React from "react";
import { ButtonWrapper } from "./style";

const Button = ({
  className,
  context,
  color,
  type,
  onClick,
  style,
  children,
  rounded,
  size,
  disabled,
  needWait,
  ...otherProps
}) => {
  return (
    <ButtonWrapper
      className={className}
      context={context}
      color={color}
      type={type}
      style={style}
      rounded={rounded}
      onClick={onClick}
      disabled={disabled}
      size={size}
      {...otherProps}
    >
      {children}
    </ButtonWrapper>
  );
};

export default Button;