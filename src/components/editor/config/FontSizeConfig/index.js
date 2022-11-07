import React, { forwardRef, useState, useEffect } from "react";
import { Popover, Button as AntButton } from "antd";
import { fontSizes } from "components/editor/config/EditorTool/TextTool/constants";
import { Main, GlobalStyle } from "./styled";
const FontSizeConfig = forwardRef(({ className, style, ...props }, ref) => {
  const [state, _setState] = useState({
    fontSize: "2",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const handleChangeFontSize = (value) => () => {
    if (props.onChange) {
      props.onChange(value);
    } else if (props.changeFont) {
      props.changeFont(fontSizes[value]);
    }
    setState({
      fontSize: value,
    });
    // command.setFontSize(value);
  };
  useEffect(() => {
    if (props.value) {
      if (props.value.indexOf("pt") != -1) {
        const value = props.value.replace("pt", "");
        const fontSize =
          Object.keys(fontSizes).find((key) => fontSizes[key] == value) || "2";
        setState({ fontSize });
      } else
        setState({
          fontSize: props.value,
        });
    } else {
      const fontSize =
        Object.keys(fontSizes).find(
          (key) => fontSizes[key] == props.fontSize
        ) || "2";
      setState({ fontSize });
    }
  }, [props.value, props.fontSize]);

  return (
    <Main>
      <GlobalStyle />
      <Popover
        trigger="click"
        placement="bottom"
        overlayClassName="popover-fontsize"
        content={Object.keys(fontSizes).map((item) => (
          <AntButton onClick={handleChangeFontSize(item)} key={item}>
            {fontSizes[item]} {" pt"}
          </AntButton>
        ))}
      >
        <AntButton
          className={`select-font-size ${className} ${
            state.fontSize ? "" : "no-select"
          }`}
          style={style}
        >
          {state.fontSize
            ? `${fontSizes[state.fontSize]} pt`
            : props.placehoder || "Chọn cỡ chữ"}
        </AntButton>
      </Popover>
    </Main>

    // <Main
    //   size={"small"}
    //   style={{ width: "100%", display: "inline-block", ...props.style }}
    //   placeholder={"font-size" || props.placeholder}
    //   className={"item-tool"}
    //   value={
    //     props.value ||
    //     Object.keys(fontSizes).find((item) => fontSizes[item] == props.fontSize)
    //   }
    //   onChange={onChange}
    // >
    //   {Object.keys(fontSizes).map((item) => (
    //     <Select.Option key={item} value={item}>
    //       {fontSizes[item]}
    //       {" pt"}
    //     </Select.Option>
    //   ))}
    // </Main>
  );
});

export default FontSizeConfig;
