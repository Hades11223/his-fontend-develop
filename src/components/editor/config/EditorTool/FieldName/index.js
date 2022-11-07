import React, { useEffect, useState } from "react";
import { Main } from "./styled";
import { Select } from "antd";
export default function FieldName(props) {
  const { apiFields = [] } = props;
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);
  const onSelect = (value) => {
    setValue(value);
    props.onSelect && props.onSelect(value);
  };
  return (
    <Main
      placeholder={props.placeholder}
      style={{ flex: 1, ...(props.style || {}) }}
      size={"small"}
      showSearch
      onSelect={onSelect}
      value={value}
    >
      {apiFields.map((item) => (
        <Select.Option key={item} value={item}>
          <span title={item}>{item}</span>
        </Select.Option>
      ))}
    </Main>
  );
}
