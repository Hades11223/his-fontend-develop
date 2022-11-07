import React from "react";
import { Main } from "./styled";

const Card = ({
  title,
  children,
  noPadding,
  top,
  bottom,
  className,
  ...props
}) => {
  return (
    <Main
      noPadding={noPadding}
      top={top}
      bottom={bottom}
      className={`mn-card ${className || ""}`}
    >
      {children}
    </Main>
  );
};

export default Card;
