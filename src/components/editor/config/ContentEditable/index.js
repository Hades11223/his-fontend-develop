import React, { PureComponent } from "react";
import htmlToText from "react-html-parser";
import T from "prop-types";
import { message } from "antd";
import { controlKeys, fontHeight } from "./constants";
import EditableView from "./EditableView";

class ContentEditable extends PureComponent {
  constructor(props) {
    super(props);
    this.editNode = React.createRef();
    this.state = {
      disabledEnter: false,
      text: "",
      font: {},
    };
  }

  componentDidMount() {
    const { size } = this.props;
    const fontSizePx = Math.round(
      parseFloat(window.getComputedStyle(this.editNode.current).fontSize)
    );
    const font =
      Object.keys(fontHeight).find(
        (key) => fontHeight[key].fontSize === fontSizePx
      ) || fontHeight[12];

    this.setState({ font: fontHeight[font] });

    this.editNode.current.addEventListener("paste", (event) => {
      const clipboardData = event.clipboardData || window.clipboardData;
      const data = clipboardData.getData("text");
      let text = this.editNode.current.innerText;
      text = (text || "").replace(/(\r\n|\n|\r)/gm, "");
      const convert1 = data.replace(/(\r\n|\n|\r)/gm, "");
      const selection = window.getSelection();
      if (!selection.rangeCount) return false;
      selection.deleteFromDocument();
      if (convert1.length + text.length > size) {
        message.error(`Không đươc nhập quá ${size} ký tự`);
      } else {
        selection.getRangeAt(0).insertNode(document.createTextNode(convert1));
        selection.collapseToEnd();
        this.emitChange();
      }

      event.preventDefault();
    });
  }

  focus = (jumpToEnd) => {
    this.editNode.current.focus();
    if (jumpToEnd) {
      // select all the content in the element
      document.execCommand("selectAll", false, null);
      // collapse selection to the end
      document.getSelection().collapseToEnd();
    }
  };

  handleKeyDown = (e) => {
    let text = e.target.innerText;
    text = (text || "").replace(/(\r\n|\n|\r)/gm, " ");
    const { size } = this.props;
    const keys = Object.keys(controlKeys).map((key) => controlKeys[key]);
    if (size && text.length >= size && !keys.includes(e.keyCode)) {
      message.error(`Không đươc nhập quá ${size} ký tự`);
      e.preventDefault();
    }
    return false;
  };

  handleKeyPress = (e) => {
    if (this.props.inputNumber) {
      if (this.props.typeNumber == "int") {
        if (isNaN(String.fromCharCode(e.which))) e.preventDefault();
      }
    }
  };

  emitChange = () => {
    const {
      onChange,
      extentLine,
      updateLineNumber,
      maxValue,
      minValue = 0,
    } = this.props;
    const { font } = this.state;
    const isNumeric = (n) => {
      return !isNaN(parseFloat(n)) && isFinite(n) && !n.includes(" ");
    };
    const htmlValue = this.editNode.current.innerHTML;
    const htmlText = this.editNode.current.innerText;
    const line = htmlValue.split("<br>");
    let current = extentLine || 1;

    const text = (htmlText || "").replace(/(\r\n|\n|\r)/gm, "");
    let newText = "";
    if (this.props.inputNumber) {
      if (isNumeric(htmlValue)) {
        if (this.props.typeNumber == "float") {
          if (/[0-9.]/g.test(text)) {
            if (+text >= minValue && maxValue ? +text <= maxValue : true) {
              newText = text;
            } else {
              message.error(
                `Giá trị phải lớn ${minValue} ${
                  maxValue ? `và nhỏ hơn ${maxValue}` : ""
                } `
              );
              return;
            }
          }
        } else {
          if (+text > minValue && maxValue ? +text <= maxValue : true) {
            newText = +text;
          } else {
            message.error(
              `Giá trị phải lớn ${minValue} ${
                maxValue ? `và nhỏ hơn ${maxValue}` : ""
              } `
            );
            return;
          }
        }
      } else {
        message.error(`Giá trị phải là số`);
        return;
      }
    } else {
      newText = text;
    }
    this.setState({
      disabledEnter: line.length > extentLine + 1,
      text: newText,
      value: htmlValue,
    });
    onChange({ text, htmlValue });
  };

  render() {
    const {
      labelWidth,
      extentLine,
      type,
      width,
      htmlValue,
      updateLineNumber,
      inputNumber,
      onClick,
      ...other
    } = this.props;
    const { font } = this.state;
    const editWidth = type === "multiple" ? width - labelWidth : width;
    const lines = [];
    const lineDefault = extentLine || 0;
    const elm = this.editNode.current;
    if (elm) {
      for (let i = 0; i < lineDefault; i++) {
        lines.push(i + 1);
      }
    }
    return (
      <EditableView
        {...other}
        width={width}
        type={type}
        htmlValue={htmlValue}
        labelWidth={labelWidth}
        editWidth={editWidth}
        lines={lines}
        focus={this.focus}
        emitChange={this.emitChange}
        handleKeyDown={this.handleKeyDown}
        handleKeyPress={this.handleKeyPress}
        textNode={this.editNode}
        updateLineNumber={updateLineNumber}
        extentLine={extentLine}
        font={font}
        contentAlign={this.props.contentAlign}
        lineHeightText={this.props.lineHeightText || 1.5}
        fontSize={this.props.fontSize} //parrent font size
        contentColor={this.props.contentColor}
        inputNumber={inputNumber}
        onClick={onClick}
      />
    );
  }
}

ContentEditable.defaultProps = {
  type: "single",
  size: 0,
  extentLine: 0,
  onChange: () => {},
  plusLine: () => {},
  minusLine: () => {},
  updateLineNumber: () => {},
};

ContentEditable.propTypes = {
  type: T.oneOf(["single", "multiple"]),
  size: T.number,
  onChange: T.func,
  plusLine: T.func,
  updateLineNumber: T.func,
  minusLine: T.func,
  extentLine: T.number,
};

export default ContentEditable;
