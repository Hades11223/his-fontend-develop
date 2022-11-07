import React, { memo } from "react";
import { connect } from "react-redux";
import { SIZE } from "utils/vital-signs/constants";
import { Main } from "./styled";
const ColumnState = (props, refs) => {
  const values = props.values;
  let index = props.currentCol;
  if (index === -1) index = values.length - 1;
  return (
    <Main>
      {values.map((item, i) => {
        if (i === props.currentCol)
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                backgroundColor: "green",
                height: 3,
                left: SIZE.columnWidth * i,
                top: 0,
                width: SIZE.columnWidth,
              }}
            />
          );
        return null;
      })}
    </Main>
  );
};

export default connect((state) => {
  return {
    values: state.vitalSigns.values || [],
    currentCol: state.vitalSigns.currentCol,
  };
}, null)(memo(ColumnState));
