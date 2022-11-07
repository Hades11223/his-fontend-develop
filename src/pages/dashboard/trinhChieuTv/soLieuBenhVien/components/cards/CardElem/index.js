import React from "react";
import Loading from "@components/common/loading";
import { StyledCardElem } from "./styled";

const CardElem = ({ title, loading, miniLoading, children }) => {
  return (
    <StyledCardElem>
      {title && <div className="title">{title}</div>}
      {loading && <Loading isAbsolute type="chart" whiteLoading noSub />}
      {miniLoading && <Loading isAbsolute type="card" alignTop={true} />}
      {!loading && <div className="card-content">{children}</div>}
    </StyledCardElem>
  );
};

CardElem.propTypes = {};

export default CardElem;
