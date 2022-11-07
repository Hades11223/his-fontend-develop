import React, { forwardRef } from "react";
import T from "prop-types";
import { useDispatch } from "react-redux";
import { Main } from "./styled";
import { MODE } from "utils/editor-utils";

const FieldsWrapper = forwardRef((props, ref) => {
  const {
    component: { init },
  } = useDispatch();

  const { mode, component, form } = props;
  const itemProps = component.props;
  const apiFields = itemProps.apiFields || [];

  const value = form[itemProps.fieldName] || form || {};

  const handleFocus = () => {
    if (mode === MODE.config) {
      init(component);
    }
  };

  return (
    <Main onClick={handleFocus}>
      {mode === MODE.editing ? (
        apiFields.map((item) => (
          <React.Fragment>
            <span>{item.prefix} </span>
            <span
              key={item.key}
              style={{
                fontWeight: item.bold ? "bold" : "normal",
                fontStyle: item.italic ? "italic" : "normal",
                textDecoration: item.underline ? "underline" : "normal",
              }}
            >
              {value[item.name]}
            </span>
            <span> {item.suffix}</span>
          </React.Fragment>
        ))
      ) : (
        <div>{"Field wrapper"}</div>
      )}
    </Main>
  );
});

FieldsWrapper.defaultProps = {
  form: {},
};

FieldsWrapper.propTypes = {
  form: T.shape({}),
};

export default FieldsWrapper;
