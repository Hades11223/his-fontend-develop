import React from "react";
import { Main } from "./styled";
export default function Index(props) {
  let title = props.title;
  const click = () => {
    if (props.onClick) {
      let value = "";
      if (props.dataSort == 2) {
        value = 0;
      } else {
        if (props.dataSort == 1) {
          value = 2;
        } else {
          value = 1;
        }
      }
      props.onClick(props.sort_key, value);
    }
  };
  return (
    <Main>
      <div
        className={`title-box ${props.className} ${
          props.showSort ? "mn-sortable" : ""
        }`}
        onClick={click}
        style={{ ...props.style }}
      >
        {title} {props.require && <span style={{ color: "red" }}>*</span>}
        {props.showSort && (
          <div className="icon">
            {props.dataSort != 1 && (
              <img
                src={require("assets/images/his-core/sort-up.png")}
                className="sort-asc"
                alt=""
              />
            )}
            {props.dataSort != 2 && (
              <img
                src={require("assets/images/his-core/sort-down.png")}
                className="sort-desc"
                alt=""
              />
            )}
          </div>
        )}
      </div>
    </Main>
  );
}
