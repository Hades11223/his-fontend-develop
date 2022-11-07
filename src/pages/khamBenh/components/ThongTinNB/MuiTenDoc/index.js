import React, { useMemo, useState, useEffect } from "react";
import { Main } from "./styled";
import OIcon from "assets/svg/kham-benh/o.svg";
import XIcon from "assets/svg/kham-benh/x.svg";
export const MuiTenDoc = ({
  item,
  level = 1,
  totalLevel,
  direction,
  fromNode,
  toNode,
  ...props
}) => {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const getPositionAtCenter = (element, from) => {
    const { top, left, width, height } = element.getBoundingClientRect();
    if (from) return top + height;
    return top;
  };

  useEffect(() => {
    if (direction == "result") {
      setTimeout(() => {
        const efromNode = window.document.getElementById(fromNode);
        const etoNode = window.document.getElementById(toNode);
        if (efromNode && etoNode) {
          const pointa = getPositionAtCenter(efromNode, true);
          const pointb = getPositionAtCenter(etoNode);
          setState({
            height: Math.abs(pointa - pointb),
          });
        }
      }, 1000);
    }
  }, [direction]);

  useEffect(() => {}, []);
  return (
    <Main
      height={
        direction == "top"
          ? "30"
          : direction == "result"
          ? state.height
          : "calc(100% - 0px)"
        // : (totalLevel - level) * 8 + 12
      }
      direction={direction}
      elementWidth={state.elementWidth}
      className={direction == "result" ? "result" : ""}
    >
      <OIcon className="left" />
      <div />
      <XIcon className="right" />
    </Main>
  );
};

export default MuiTenDoc;
