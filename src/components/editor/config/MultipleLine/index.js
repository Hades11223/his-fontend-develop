import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import T from "prop-types";
import renderHTML from "react-render-html";
import ContentEditable from "components/editor/config/ContentEditable";
import { Main } from "./styled";

const MultipleLine = forwardRef((props, ref) => {
  const {
    label,
    onChange,
    value,
    extentLine,
    disabled,
    extendChild,
    width,
    min,
    size,
    contentAlign,
    contentColor,
    showMarkSpanRow,
    inputNumber,
    maxValue,
    minValue,
    typeNumber,
    onClick,
    toUpperCaseText,
  } = props;
  const [labelWidth, setLabelWidth] = useState(0);
  const [lineQuantity, setLineQuantity] = useState(0);
  const [lineNumber, setLineNumber] = useState(0);
  const refLabel = useRef(null);
  const refContentEditable = useRef(null);

  useEffect(() => {
    const labelWidth = refLabel.current.clientWidth;
    setLabelWidth(labelWidth);
    setLineQuantity(extentLine);
    setLineNumber(extentLine || 0);
  }, []);

  const plusLine = () => {
    setLineQuantity(lineQuantity + 1);
  };

  const minusLine = () => {
    setLineQuantity(lineQuantity <= min ? min : lineQuantity - 1);
  };

  const handleSetLineNumber = (value) => {
    const defaultExtendLine = extentLine || 0;

    setLineNumber(value > defaultExtendLine ? value : defaultExtendLine);
  };

  useImperativeHandle(ref, () => ({
    focus: (jumpToEnd) => {
      if (refContentEditable.current) {
        refContentEditable.current.focus(jumpToEnd);
      }
    },
  }));
  const lineHeightText = ((props.fontSize * 4) / 3) * props.lineHeightText;

  return (
    <Main
      className={`input-multiple-line ${props.className}`}
      showMarkSpanRow={showMarkSpanRow === undefined ? true : showMarkSpanRow}
      lineHeight={lineHeightText}
      fontSize={props.fontSize} //parrent font size
      disabled={disabled}
      readonly={props.readonly} //!!!!important sử dụng trong phiếu gây mê hồi sức
      minHeight={props.minHeight}
    >
      <span
        ref={refLabel}
        style={{
          display: label ? "inline-block" : "",
          width: props.labelWidth + "px",
          background: "#FFF",
        }}
      >
        {label && renderHTML(label)}
      </span>

      <ContentEditable
        ref={(ref) => {
          refContentEditable.current = ref;
        }}
        contentAlign={contentAlign}
        contentColor={contentColor}
        extendChild={extendChild}
        extentLine={lineNumber}
        labelWidth={labelWidth}
        onChange={onChange}
        value={value}
        htmlValue={value}
        type="multiple"
        disabled={!!disabled}
        width={width}
        plusLine={plusLine}
        minusLine={minusLine}
        size={size}
        updateLineNumber={handleSetLineNumber}
        fontSize={props.fontSize} //parrent font size
        inputNumber={inputNumber}
        maxValue={maxValue}
        minValue={minValue}
        onClick={onClick}
        typeNumber={typeNumber}
        toUpperCaseText={toUpperCaseText}
      />
    </Main>
  );
});

MultipleLine.defaultProps = {
  extentLine: 0,
  min: 1,
  disabled: false,
};

MultipleLine.propTypes = {
  extentLine: T.number,
  min: T.number,
  max: T.number,
  onChange: T.func,
  disabled: T.bool,
};

export default MultipleLine;
