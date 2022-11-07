import React, { useEffect, useState, forwardRef, useContext } from "react";
import T from "prop-types";
import { Main } from "./styled";
import { useDispatch } from "react-redux";
import { MODE } from "utils/editor-utils";
import { useStore } from "hook";
import EMRContext from "pages/editor/context/EMR";

const Input = forwardRef((props, ref) => {
  const [state, _setState] = useState({
    disable: false,
    localValue: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const context = useContext(EMRContext);
  const {
    component: { init },
  } = useDispatch();
  const signStatus = useStore("files.signStatus", {});

  const { component, mode, form, formChange } = props;
  const itemProps = component.props || {};

  useEffect(() => {
    setState({
      localValue:
        (form && form[itemProps.fieldName || ""]) == 0 ||
        (form && form[itemProps.fieldName || ""])
          ? form[itemProps.fieldName]
          : !itemProps.disabled
          ? (itemProps.defaultValue || "").replace("\n", "<br/>")
          : "", //chỉ hiển thị giá trị default value khi lấy giá trị từ emr,
    });
  }, [component, form]);

  useEffect(() => {
    const isDisable = context.isDisable;
    let disable =
      isDisable({ itemProps, signStatus, props }) || itemProps.disabled;
    if (state.disable != disable) {
      setState({
        disable,
      });
    }
  }, [
    signStatus,
    itemProps,
    props.valuesHIS, //[dataFromHis]
    props.disable,
  ]);

  const handleFocus = () => {
    if (mode === MODE.config) {
      init(component);
    }
  };

  const handleOnChange = (e) => {
    setState({
      localValue: e.target.value,
    });
    if (itemProps.fieldName && formChange[itemProps.fieldName]) {
      formChange[itemProps.fieldName](e.target.value);
    }
  };

  return (
    <Main onClick={handleFocus}>
      <input
        style={{
          width: `${itemProps.width}px` || "100%",
          height: `${itemProps.height}px` || "100%",
          borderRadius: itemProps.type === "circle" ? "50%" : 0,
        }}
        value={state.localValue}
        type="text"
        className={"input-component"}
        onChange={handleOnChange}
        maxLength={2}
        disabled={state.disable}
      />
    </Main>
  );
});

Input.defaultProps = {
  component: {
    props: {},
  },
};

Input.propTypes = {
  component: T.shape({}),
};

export default Input;
