import React, { useState, forwardRef, useImperativeHandle } from "react";
import T from "prop-types";
import { Main } from "./styled";
import { connect, useDispatch } from "react-redux";
import { MODE } from "utils/editor-utils";

const BreakLine = forwardRef(({ textTransform, ...props }, ref) => {
  const { mode, component, focusing } = props;
  const itemProps = component.props || {};

  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const {
    component: { init },
  } = useDispatch();

  useImperativeHandle(ref, () => ({}));

  const handleFocus = () => {
    if (mode === MODE.config) {
      init(component);
    }
  };
  const onMouseMove = () => {
    setState({
      hover: true,
    });
  };
  const onMouseLeave = () => {
    setState({
      hover: false,
    });
  };
  return (
    <Main
      onClick={handleFocus}
      focusing={focusing}
      mode={mode}
      itemProps={itemProps}
      className={state.hover ? "active" : ""}
    >
      {mode == MODE.config && (
        <div>
          <div
            onClick={handleFocus}
            className={"mark-focus"}
            // onMouseMove={onMouseMove}
            // onMouseLeave={onMouseLeave}
          />
        </div>
      )}
      <hr />
    </Main>
  );
});

BreakLine.defaultProps = {
  mode: MODE.editing,
  component: {},
};

BreakLine.propTypes = {
  mode: T.oneOf([MODE.config, MODE.editing]),
  component: T.shape({}),
};

export default BreakLine;
