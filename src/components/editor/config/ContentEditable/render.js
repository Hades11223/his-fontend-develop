import React, { useEffect, memo, useState } from "react";
import T from "prop-types";

const Render = (props) => {
  const {
    editWidth,
    type,
    emitChange,
    disabled,
    handleKeyDown,
    handleKeyPress,
    htmlValue,
    extentLine,
    updateLineNumber,
    textNode,
    font,
    contentAlign,
    contentColor,
    onClick = () => {},
    inputNumber,
  } = props;

  useEffect(() => {
    setTimeout(() => {
      if (textNode.current) {
        const lineNumber = Math.round(
          textNode.current.offsetHeight / font.offsetHeight
        );
        const lineDefault = extentLine || 0;
        const current = lineNumber > lineDefault ? lineNumber : lineDefault;
        updateLineNumber(current - 1);
        textNode.current.focus();
      }
    }, 500);
    textNode.current.innerHTML = htmlValue;
  }, [htmlValue]);

  return (
    <span
      className="edit-available editing-content"
      style={{
        width: editWidth || "unset",
        display: type === "single" ? "inline-block" : "",
        whiteSpace: type === "single" ? "nowrap" : "",
        marginLeft: type === "single" ? "" : 1,
        textAlign: contentAlign || "left",
        color: contentColor,
      }}
      ref={textNode}
      onInput={emitChange}
      contentEditable={!disabled}
      suppressContentEditableWarning={true}
      onKeyDown={handleKeyDown}
      onKeyPress={handleKeyPress}
      onClick={(e) => {
        onClick();
        e.stopPropagation();
        e.preventDefault();
      }}
    ></span>
  );
};

Render.propTypes = {
  editWidth: T.number,
  type: T.string,
  emitChange: T.func,
  disabled: T.bool,
  handleKeyDown: T.func,
  htmlValue: T.oneOfType([T.string, T.number]),
};

export default memo(Render);
