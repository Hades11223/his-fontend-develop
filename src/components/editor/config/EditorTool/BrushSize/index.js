import React, { useState, useEffect } from "react";
import { Dropdown, Slider, Button } from "antd";
import { Main, LineBrush } from "./styled";
import { BRUSH_SIZE_DEFAULT } from "../constants";
import { HighlightOutlined } from "@ant-design/icons";

const SlideSize = (props) => {
  const { value, min, max, handleChangeSize } = props;
  return (
    <Slider
      value={value}
      min={min}
      max={max}
      onChange={(value) => handleChangeSize(value)}
    />
  );
};

function BrushSize({ onChangeSize, value }) {
  const [size, setSize] = useState(BRUSH_SIZE_DEFAULT);

  const handleChangeSize = (value) => {
    setSize(value);
    onChangeSize(value);
  };

  useEffect(() => {
    setSize(value);
  }, [value]);
  return (
    <Main>
      <Dropdown
        placement="bottom"
        overlay={
          <SlideSize
            value={size}
            min={1}
            max={10}
            handleChangeSize={handleChangeSize}
          />
        }
        size="small"
        trigger={["click"]}
      >
        <Button size="small" className="btn-brush">
          <HighlightOutlined className="btn-brush__icon" />
          <LineBrush size={size} />
        </Button>
      </Dropdown>
    </Main>
  );
}

export default BrushSize;
