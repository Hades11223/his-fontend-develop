import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDispatch } from "react-redux";
import T from "prop-types";
import { Main } from "./styled";
import TextEdit from "components/editor/cores/TextEdit";
import { MODE } from "utils/editor-utils";

const Label = forwardRef((props, ref) => {
  const { component, mode } = props;
  const itemProps = component.props || {};
  const [content, setContent] = useState("");
  const {
    component: { init },
  } = useDispatch();

  useEffect(() => {
    setContent(component.value);
  }, [component]);

  useImperativeHandle(ref, () => ({
    collectValue: () => content,
  }));

  const handleFocus = () => {
    if (mode === MODE.config) {
      init(component);
    }
  };

  return (
    <Main onClick={handleFocus} itemProps={itemProps} data-type="label">
      <TextEdit
        defaultValue={component.value}
        onChange={setContent}
        mode={mode}
      />
    </Main>
  );
});

Label.defaultProps = {
  component: {},
  line: {},
  disabled: false,
  mode: MODE.config,
};

Label.propTypes = {
  component: T.shape({}),
  line: T.shape({}),
  updateContent: T.func,
  disabled: T.bool,
  mode: T.string,
};

export default Label;
