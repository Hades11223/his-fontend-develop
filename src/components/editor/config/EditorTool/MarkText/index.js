import React, { useState } from "react";
import { Button, Popover } from "antd";
import ColorPick from "components/editor/config/EditorTool/ColorPick";
import { Main } from "./styled";
import { HighlightOutlined } from "@ant-design/icons";

const MarkColor = (props) => {
  const [color, setColor] = useState("#F9E79F");
  const { mark } = props;

  const pickColor = (color) => () => {
    setColor(color);
  };

  return (
    <Popover
      trigger="click"
      content={<ColorPick color={color} pickColor={pickColor} />}
      placement="left"
    >
      <Main color={color}>
        <Button
          className="control-btn"
          icon={<HighlightOutlined />}
          onClick={mark(color)}
        />
      </Main>
    </Popover>
  );
};

export default MarkColor;
