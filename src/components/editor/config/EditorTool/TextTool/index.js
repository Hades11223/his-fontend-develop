import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { Main } from "./styled";
import PickColor from "../PickColor";
import { fontSizes } from "./constants";
import FontSizeConfig from "components/editor/config/FontSizeConfig";
import FontStyleConfig from "components/editor/config/FontStyleConfig";
import AlignConfig from "components/editor/config/AlignConfig";
import {
  OrderedListOutlined,
  FontColorsOutlined,
  HighlightOutlined,
} from "@ant-design/icons";

import * as command from "../utils";

const TextTool = ({ type }) => {
  const [state, _setState] = useState({
    fieldName: "",
    noLabel: false,
    disabled: false,
    size: "",
    border: false,
    line: "",
    contentAlign: "left",
    readOnly: false,
    blockSignLevel: 0,
    defaultValue: "",
    defaultFromHIS: false,
    markSpanRow: true,
    lineHeight: "",
    fontSize: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const handleChangeFontSize = (value) => {
    setState({
      fontSize: value,
    });
    command.setFontSize(value);
  };

  const handleChangeAlign = (value) => {
    switch (value) {
      case "left":
        command.justifyLeft();
        break;
      case "right":
        command.justifyRight();
        break;
      case "center":
        command.justifyCenter();
        break;
      case "justify":
        command.justifyFull();
    }
    setState({
      align: value,
    });
  };

  const handleChangeColor = (value) => {
    command.foreColor(value);
  };

  const handleMark = (value) => {
    command.mark(value);
  };

  const handleCreateOrderedList = () => {
    command.insertOrderedList();
  };
  useEffect(() => {
    window.addEventListener("message", eventMessage, false);
    return () => {
      window.removeEventListener("message", eventMessage);
    };
  }, []);

  const eventMessage = (event = {}) => {
    if (event.data?.TYPE === "EDITOR-SELECT-FONT") {
      let newState = {};
      let size = event.data.size;
      newState.italic = (event.data.fontItalic || "").indexOf("italic") != -1;
      newState.underline =
        (event.data.fontUnderline || "").indexOf("underline") != -1;
      newState.bold = (event.data.fontWeight || "") == 700;
      newState.align = event.data.textAlign || "";
      // let fontFamily = (event.data.fontFamily || "").split(",");
      // let fonts = fontFamily
      //   .map((font) => {
      //     let x = Object.keys(fontFamilies).find((key) => {
      //       return font.includes(fontFamilies[key]);
      //     });
      //     return x;
      //   })
      //   .filter((font) => font);
      // if (fonts.length) {
      //   newState.fontFamily = fonts[0];
      // }
      if (size) {
        size = Object.keys(fontSizes).find((key) => {
          return fontSizes[key] == size;
        });
        newState.fontSize = size;
      }
      setState(newState);
    }
  };

  const onChangeFontStyle = (type, value) => {
    setState({
      [type]: value,
    });
    switch (type) {
      case "bold":
        command.bold();
        break;
      case "italic":
        command.italic();
        break;
      case "underline":
        command.underline();
        break;
      default:
        break;
    }
  };
  return (
    <Main type={type}>
      {/* <Col span={24}>
            <Select
              size={"small"}
              value={fontFamily}
              onChange={setFontFamily}
              style={{ width: "100%" }}
              placeholder={"font-family"}
            >
              {Object.keys(fontFamilies).map((key) => (
                <Select.Option key={key} value={key}>
                  {fontFamilies[key]}
                </Select.Option>
              ))}
            </Select>
          </Col> */}

      <div className="group">
        <FontStyleConfig
          bold={state.bold}
          italic={state.italic}
          underline={state.underline}
          onChange={onChangeFontStyle}
        />
      </div>
      <div className="group">
        <Button.Group>
          <Button
            style={{ width: 24 }}
            icon={<OrderedListOutlined />}
            block
            size={"small"}
            onClick={handleCreateOrderedList}
          />
        </Button.Group>
      </div>
      <div className="group">
        <AlignConfig
          changeAlign={handleChangeAlign}
          contentAlign={state.align}
          style={{ width: "auto" }}
        />
      </div>
      <div className="group">
        <FontSizeConfig
          value={state.fontSize || "12 pt"}
          onChange={handleChangeFontSize}
          style={{ width: "auto", minWidth: "70px" }}
        />
      </div>
      <div className="group">
        <Button.Group size={"small"}>
          <PickColor
            iconComponent={FontColorsOutlined}
            changeColor={handleChangeColor}
          />
        </Button.Group>
        <Button.Group size={"small"} style={{ marginLeft: 5 }}>
          <PickColor
            iconComponent={HighlightOutlined}
            changeColor={handleMark}
          />
        </Button.Group>
      </div>
    </Main>
  );
};

export default TextTool;
