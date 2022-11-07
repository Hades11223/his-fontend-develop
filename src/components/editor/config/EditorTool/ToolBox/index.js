import React, { useEffect } from "react";
import { Button, Row, Col } from "antd";
import { Main } from "./styled";
import PickColor from "../PickColor";
import { bold, italic, underline, handleShortKey } from "../utils";
import * as command from "../utils";
import {
  UnderlineOutlined,
  ItalicOutlined,
  BoldOutlined,
  HighlightOutlined,
  FontColorsOutlined,
} from "@ant-design/icons";

const ToolBox = () => {
  useEffect(() => {
    document.addEventListener("keydown", handleShortKey);

    return () => {
      document.removeEventListener("keydown", handleShortKey);
    };
  }, []);

  const handleChangeColor = (value) => {
    command.foreColor(value);
  };

  const handleMark = (value) => {
    command.mark(value);
  };

  return (
    <Main>
      <Row gutter={[6, 6]}>
        <Col span={10}>
          <PickColor
            iconComponent={FontColorsOutlined}
            changeColor={handleChangeColor}
          />
        </Col>

        <Col span={12}>
          <PickColor iconComponent={HighlightOutlined} changeColor={handleMark} />
        </Col>

        <Col span={4}>
          <Button
            onClick={bold}
            className={"tool-btn"}
            size={"small"}
            icon={<BoldOutlined />}
          />
        </Col>
        <Col span={4}>
          <Button
            onClick={italic}
            className={"tool-btn"}
            size={"small"}
            icon={<ItalicOutlined />}
          />
        </Col>
        <Col span={4}>
          <Button
            onClick={underline}
            className={"tool-btn"}
            size={"small"}
            icon={<UnderlineOutlined />}
          />
        </Col>
      </Row>
    </Main>
  );
};

export default ToolBox;
