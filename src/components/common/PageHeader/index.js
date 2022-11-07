import React from "react";
import { Main } from "./styled";

const PageHeader = (props) => {
  return (
    <Main>
      <div className="header">
        <div className="left-area">{props.leftArea}</div>
        <div className="right-area">{props.rightArea}</div>
      </div>
    </Main>
  );
};

export default PageHeader;
