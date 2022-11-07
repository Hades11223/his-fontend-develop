import React from "react";
import { InputNumber } from "antd";
import { handleBlurInput, handleKeypressInput } from "utils";
function Index({ value, defaultValue, ...rest }) {
  return defaultValue ? (
    <InputNumber
      min={0}
      type="number"
      defaultValue={defaultValue}
      onKeyDown={handleKeypressInput}
      onBlur={handleBlurInput}
      {...rest}
    />
  ) : (
    <InputNumber
      min={0}
      type="number"
      value={value}
      onKeyDown={handleKeypressInput}
      onBlur={handleBlurInput}
      {...rest}
    />
  );
}
export default Index;
