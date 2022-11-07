import React, { useEffect } from "react";
import { Main } from "./styled";
/**
 * Grid
 *
 */

const Grid = (props) => {
  return <Main data-type="grid">{props.children}</Main>;
};

export default Grid;
