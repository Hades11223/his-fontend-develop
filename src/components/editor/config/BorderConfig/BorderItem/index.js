import React, { forwardRef, useState } from "react";
import { Main } from "./styled";
import PickColor from "components/editor/config/EditorTool/PickColor";
import { Icon } from "@ant-design/compatible";
import BorderType from "../BorderType";
import BorderSize from "../BorderSize";
const BorderItem = ({ configIcon, size, color, type, ...props }) => {
  const onChange = (dataType) => (value) => {
    let data = { size, color, type };
    data[dataType] = value;
    if (props.onChange) props.onChange(data);
  };
  return (
    <Main>
      <Icon type={configIcon || "border-left"} />
      <BorderSize
        title="Chọn kích thước viền"
        size={size === undefined ? "0" : size}
        onChange={onChange("size")}
      />
      <BorderType
        title="Chọn loại viền"
        type={type === undefined ? "solid" : type}
        onChange={onChange("type")}
      />
      <PickColor
        title="Chọn màu viền"
        dataColor={color === undefined ? "black" : color}
        changeColor={onChange("color")}
      />
    </Main>
  );
};

export default BorderItem;
