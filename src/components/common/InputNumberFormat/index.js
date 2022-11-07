import React from "react";
import NumberFormat from "react-number-format";
import { Input } from "antd";
function Index({ value, ...rest }) {
  return (
    <NumberFormat
      customInput={Input}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      value={value || ""}
      {...rest}
    />
  );
}
export default Index;
