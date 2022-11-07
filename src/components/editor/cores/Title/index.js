import React, { forwardRef, useMemo } from "react";
import T from "prop-types";
import { Main } from "./styled";
import { useDispatch } from "react-redux";
import { MODE } from "utils/editor-utils";

const Title = forwardRef((props, ref) => {
  const { mode, component, focusing, form } = props;
  const {
    component: { init },
  } = useDispatch();
  const itemProps = component.props;

  const handleFocus = () => {
    if (mode === MODE.config) {
      init(component);
    }
  };

  const fontSize = useMemo(
    () =>
      ((itemProps.fontSize || "") + "").includes("pt")
        ? itemProps.fontSize
        : itemProps.fontSize + "pt",
    [itemProps.fontSize]
  );
  return (
    <Main
      onClick={handleFocus}
      className="heading-text"
      focusing={focusing}
      fontSize={fontSize}
      fontWeight={itemProps.fontWeight}
      align={itemProps.align}
      textAlign={itemProps.align}
      textTransform={itemProps.textTransform}
    >
      <span>
        {form[itemProps.fieldName]
          ? form[itemProps.fieldName]
          : mode == MODE.config
          ? "Title heading"
          : ""}
      </span>
    </Main>
  );
});

Title.defaultProps = {
  form: {},
  component: {},
};

Title.propTypes = {
  form: T.shape({}),
  component: T.shape({}),
};

export default React.memo(Title);
