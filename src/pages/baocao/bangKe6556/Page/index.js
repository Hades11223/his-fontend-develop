import React, { useEffect } from "react";
import { pageType } from "../../../../utils/editor-utils";
import { Main } from "./styled";
/**
 * Line
 *
 */

const Page = ({
  layout = pageType.A4.v,
  top,
  left,
  right,
  bottom,
  ...props
}) => {
  return (
    <Main
      layout={layout}
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      data-page-top={top || 0}
      data-page-bottom={bottom || 0}
      className="form-content"
    >
      {props.children}
    </Main>
  );
};

export default Page;
