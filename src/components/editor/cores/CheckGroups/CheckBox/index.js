import React, { forwardRef } from "react";
import T from "prop-types";
import { Main } from "./styled";
import TextEdit from "../../TextEdit";
import { MODE } from "utils/editor-utils";

const CheckBox = forwardRef((props, ref) => {
  const {
    checked,
    item,
    mode,
    disabled,
    handleUpdateData,
    handleOnChange,
    direction,
    width,
    note,
    blockWidth,
  } = props;

  const handleOnClick = (e) => {
    if (disabled) return;
    if (mode === MODE.editing) {
      e.preventDefault();
      handleOnChange(item.value);
    }
  };

  const handleLabelChange = (value) => {
    handleUpdateData({
      ...item,
      labelValue: value,
    });
  };

  return (
    <Main checked={checked} onClick={handleOnClick} direction={direction}>
      <TextEdit
        onChange={handleLabelChange}
        mode={mode}
        defaultValue={
          item.label === undefined || item.label === null ? "label" : item.label
        }
        width={width}
        note={note}
        maxWidth={blockWidth - 20}
      />
      <div className={"check-box-contain"}>
        <span>{checked ? "x" : ""}</span>
      </div>
    </Main>
  );
});

CheckBox.defaultProps = {
  direction: "ltr",
};

CheckBox.propTypes = {
  checked: T.bool,
  label: T.string,
  direction: T.string,
};

export default CheckBox;
