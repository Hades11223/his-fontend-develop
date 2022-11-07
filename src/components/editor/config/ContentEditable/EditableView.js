import React from "react";
import T from "prop-types";
import { Main } from "./styled";
import Render from "./render";

const EditableView = ({
  labelWidth,
  focus,
  type,
  htmlValue,
  handleKeyDown,
  handleKeyPress,
  width,
  disabled,
  extendChild,
  lines,
  editWidth,
  emitChange,
  textNode,
  updateLineNumber,
  extentLine,
  font,
  contentAlign,
  contentColor,
  onClick,
  inputNumber,
  ...props
}) => {
  return (
    <Main
      disabled={disabled}
      data-type="content-editable-view"
      onClick={() => {
        if (focus) focus(true);
      }}
      lineHeightText={props.lineHeightText}
      toUpperCaseText={props.toUpperCaseText}
    >
      {extendChild && <div className="extent-child">{extendChild}</div>}

      <Render
        htmlValue={htmlValue}
        updateLineNumber={updateLineNumber}
        emitChange={emitChange}
        disabled={disabled}
        handleKeyDown={handleKeyDown}
        handleKeyPress={handleKeyPress}
        type={type}
        textNode={textNode}
        extentLine={extentLine}
        font={font}
        contentAlign={contentAlign}
        contentColor={contentColor}
        onClick={onClick}
        inputNumber={inputNumber}
      />
    </Main>
  );
};

EditableView.defaultProps = {
  font: {},
};

EditableView.propTypes = {
  font: T.shape({}),
};

export default EditableView;
