import React from "react";
import { TwoCardInfoMiniStyled } from "./styled";

const TwoCardInfoMini = ({
  children,
  isVertical = true,
  numCard = 7,
  margin,
  style = {},
}) => {
  return (
    <TwoCardInfoMiniStyled
      margin={margin}
      isVertical={isVertical}
      numCard={numCard}
      style={{ ...style }}
    >
      <div className="two-card-content">{children}</div>
    </TwoCardInfoMiniStyled>
  );
};

export default React.memo(TwoCardInfoMini);
