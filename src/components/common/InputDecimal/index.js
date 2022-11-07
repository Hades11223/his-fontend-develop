import React from "react";
import { InputNumber } from "antd";
import { formatNumberInput } from "utils";
function Index({ value, ...rest }) {
  return (
    <InputNumber
      formatter={(value) => {
        if (!value) return;
        if (value && /\D*/.test(value)) {
          value = value.replace(/\D*/g, "");
        }
        if (value && /^0*/.test(value)) {
          value = formatNumberInput(value);
        }
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }}
      parser={(value) => value.replace(".", "")}
      className="input-option"
      style={{ width: "100%" }}
      value={value}
      {...rest}
    />
  );
}
export default Index;
