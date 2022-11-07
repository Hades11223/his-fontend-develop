import React, { useState, useEffect } from "react";
import { Dropdown, Row, Col } from "antd";
import { Main, Color, ColorItem, ColorContain } from "./styled";
import { colors } from "../constants";
import { Icon } from "@ant-design/compatible";

const color = (handleSetColor) => (
  <ColorContain>
    <Row gutter={[6, 6]}>
      {colors.map((key) => (
        <Col span={8} key={key}>
          <ColorItem onClick={handleSetColor(key)} color={key} />
        </Col>
      ))}
    </Row>
  </ColorContain>
);

const PickColor = ({ iconComponent, changeColor, dataColor, title }) => {
  const [value, setColor] = useState(dataColor || colors[1]);
  useEffect(() => {
    setColor(dataColor || colors[1]);
  }, [dataColor]);

  const handleSetColor = (res) => () => {
    setColor(res);
    changeColor(res);
  };
  const handleClick = () => {
    changeColor(value);
  };

  return (
    <Main title={title}>
      <Dropdown.Button
        className="color-picker"
        placement="bottom"
        overlay={color(handleSetColor)}
        size={"small"}
        icon={<Color color={value} />}
        trigger={["click"]}
        onClick={handleClick}
      >
        {iconComponent &&
          React.createElement(iconComponent, { style: { color: value } })}
      </Dropdown.Button>
    </Main>
  );
};

export default PickColor;
