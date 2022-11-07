import React from "react";
import { DatePicker as DatePick } from "antd";

const DatePicker = (props) => {
  const { picker } = props;

  return (
    <DatePick
      inputRender={(p) => {
        const splitData = p.value.split("/");
        const pickerValue =
          "Quý " +
          (Math.floor((Number.parseInt(splitData[1]) - 1) / 3) + 1) +
          "/" +
          splitData[2];

        return (
          <input {...p} value={picker === "quarter" ? pickerValue : p.value} />
        );
      }}
      onFocus={() => {
        const cellInner = document.getElementsByClassName(
          "ant-picker-cell-inner"
        );

        if (cellInner && picker === "quarter")
          Array.from(cellInner).forEach((e, idx) => {
            e.innerText = "Quý " + (idx + 1);
          });
      }}
      {...props}
    />
  );
};

DatePicker.propTypes = {};

export default DatePicker;
