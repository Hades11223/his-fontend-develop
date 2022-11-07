import React, { useEffect } from "react";
import { Main } from "./styled";
/**
 * Line
 *
 */

const Line = (props) => {
  return (
    <Main data-type="line" className="layout-line-item line-style">
      {props.children}
    </Main>
  );
};

export default Line;
