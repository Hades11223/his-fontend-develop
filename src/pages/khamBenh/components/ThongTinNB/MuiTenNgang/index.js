import React, { useMemo, useState, useEffect } from "react";
import { Main } from "./styled";
import OIcon from "assets/svg/kham-benh/o.svg";
import XIcon from "assets/svg/kham-benh/x.svg";
export const MuiTen = ({
  item,
  level = 1,
  direction,
  leftNode,
  rightNode,
  ...props
}) => {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const getPositionAtCenter = (element, right) => {
    const { top, left, width, height } = element.getBoundingClientRect();
    if (right) return left + width;
    return left;
  };

  useEffect(() => {
    const eleftNode = window.document.getElementById(leftNode + "_item");
    const erightNode = window.document.getElementById(rightNode + "_item");
    if (eleftNode && erightNode) {
      const pointa = getPositionAtCenter(eleftNode, true);
      const pointb = getPositionAtCenter(erightNode);
      setState({
        width: Math.abs(pointa - pointb),
        elementWidth: eleftNode.clientWidth,
      });
    }
  }, []);
  const colors = ["#1e88e5", "#66bb6a", "#d81b60", "#ab47bc", "#512da8"];
  return (
    <Main
      className={
        direction == "left"
          ? `arrow-left`
          : direction == "right"
          ? `arrow-right`
          : direction == "up"
          ? `arrow-up`
          : `arrow-down`
      }
      width={state.width}
      elementWidth={state.elementWidth}
    >
      <OIcon className="left" />
      <div />
      <XIcon className="right" />
    </Main>
  );
};

export default MuiTen;
