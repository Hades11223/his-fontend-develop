import React, { forwardRef, useImperativeHandle } from "react";
import { useDispatch } from "react-redux";
import T from "prop-types";
import { Button } from "antd";
import { Main } from "./styled";
import HSTC from "./HSTC";
import { SettingOutlined } from "@ant-design/icons";
import { MODE } from "utils/editor-utils";

const ToDieuTri = forwardRef((props, ref) => {
  const {
    component,
    updateContent,
    mode,
    formId,
    form,
    formChange,
    valuesHIS,
    fileConfig,
    fileTemplate,
    template,
    level,
    block,
  } = props;
  const init = useDispatch().component.init;

  const itemProps = component.props || {};

  useImperativeHandle(ref, () => ({}));

  const handleFocus = () => {
    if (mode === MODE.config) {
      init(component);
    }
  };

  const getFontSize = () => {
    if (itemProps.fontSize) return itemProps.fontSize;
    return props.fontSize;
  };
  return (
    <Main data-type="to-dieu-tri" mode={mode} itemProps={itemProps}>
      {mode === MODE.config && (
        <>
          <div className="table-config">
            <Button
              icon={<SettingOutlined />}
              onClick={handleFocus}
              size={"small"}
            />
          </div>
        </>
      )}
      <HSTC
        {...{
          itemProps,
          component,
          disable: props.disable,
          mode,
          formId,
          form,
          formChange,
          dataSource: form[itemProps.fieldName] || [],
          valuesHIS, //[dataFromHis]
          fileConfig,
          fileTemplate,
          updateContent,
          template,
          level,
          fontSize: getFontSize(),
          lineHeightText: itemProps.lineHeightText || props.lineHeightText,
          rowHeight: itemProps.rowHeight || props.rowHeight,
          block,
        }}
      />
    </Main>
  );
});

ToDieuTri.defaultProps = {
  component: {},
  form: {},
};

ToDieuTri.propTypes = {
  component: T.shape({}),
  form: T.shape({}),
};

export default ToDieuTri;
