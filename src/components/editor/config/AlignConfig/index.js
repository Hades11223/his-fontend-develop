import React, { forwardRef } from "react";
import { Button } from "antd";
import {
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const AlignConfig = (props) => {
  const changeAlign = (value) => () => {
    if (props.changeAlign) {
      props.changeAlign(value);
    }
  };
  return (
    <Button.Group size={"small"} style={{ width: 100, ...(props.style || {}) }}>
      <Button
        type={props.contentAlign === "left" ? "primary" : ""}
        icon={<AlignLeftOutlined />}
        onClick={changeAlign("left")}
        value={"left"}
      />
      <Button
        type={props.contentAlign === "center" ? "primary" : ""}
        icon={<AlignCenterOutlined />}
        onClick={changeAlign("center")}
        value={"center"}
      />
      <Button
        type={props.contentAlign === "right" ? "primary" : ""}
        icon={<AlignRightOutlined />}
        onClick={changeAlign("right")}
        value={"right"}
      />
      <Button
        type={props.contentAlign === "justify" ? "primary" : ""}
        icon={<MenuOutlined />}
        onClick={changeAlign("justify")}
        value={"justify"}
      />
    </Button.Group>
  );
};

export default AlignConfig;
