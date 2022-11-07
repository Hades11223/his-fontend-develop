import React from "react";
import { Button } from "antd";
  import {
    BoldOutlined,
    ItalicOutlined,
    UnderlineOutlined,
  } from "@ant-design/icons";

const FontStyleConfig = ({ ...props }) => {
  const onChange = (type) => () => {
    if (props.onChange) props.onChange(type, !props[type]);
  };

  return (
    <Button.Group size={"small"}>
      <Button
        type={!!props.bold ? "primary" : ""}
        icon={<BoldOutlined />}
        onClick={onChange("bold")}
      />
      <Button
        type={!!props.italic ? "primary" : ""}
        icon={<ItalicOutlined />}
        onClick={onChange("italic")}
      />
      <Button
        type={!!props.underline ? "primary" : ""}
        icon={<UnderlineOutlined />}
        onClick={onChange("underline")}
      />
    </Button.Group>
  );
};

export default FontStyleConfig;
