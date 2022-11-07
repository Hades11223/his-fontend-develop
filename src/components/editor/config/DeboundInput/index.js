import React, { useState, useEffect, useRef, memo } from "react";
import { Input, InputNumber } from "antd";
import MultipleLine from "components/editor/config/MultipleLine";

const DeboundInput = ({
  onChange,
  value,
  type,
  readOnly,
  timeout = 800,
  ...props
}) => {
  const [value1, setValue] = useState("");
  const refTimeout = useRef(null);
  useEffect(() => {
    if (value !== value1) setValue(value);
  }, [value]);
  const onChangeText = (e) => {
    const value =
      type == "number"
        ? e
        : type == "multipleline"
        ? e.htmlValue
        : e.target.value;
    if (type != "multipleline") {
      setValue(value);
    }
    if (refTimeout.current) {
      clearTimeout(refTimeout.current);
    }
    refTimeout.current = setTimeout(
      (value) => {
        if (onChange) {
          onChange(value);
        }
      },
      timeout,
      value
    );
  };
  const onKeyDown = (e) => {};
  if (type == "number")
    return (
      <InputNumber
        readOnly={readOnly}
        value={value1}
        {...props}
        onChange={onChangeText}
      />
    );
  if (type == "multipleline") {
    return (
      <MultipleLine
        disabled={readOnly}
        readonly={readOnly}
        onChange={onChangeText}
        value={value1}
        {...props}
      />
    );
  }
  if (type == "textarea") {
    return (
      <Input.TextArea
        readOnly={readOnly}
        onKeyDown={onKeyDown}
        rows={2}
        value={value1}
        {...props}
        onChange={onChangeText}
      />
    );
  }
  return (
    <Input
      readOnly={readOnly}
      value={value1}
      {...props}
      onChange={onChangeText}
    />
  );
};
export default memo(DeboundInput);
