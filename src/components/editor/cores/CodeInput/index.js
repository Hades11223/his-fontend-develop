import React, { useEffect, useState, forwardRef, useContext } from "react";
import T from "prop-types";
import moment from "moment";
import { Main } from "./styled";
import { connect, useDispatch } from "react-redux";
import { MODE } from "utils/editor-utils";
import ReactInput from "./ReactCodeInput";
import { useStore } from "hook";
import EMRContext from "pages/editor/context/EMR";

const CodeInput = forwardRef((props, ref) => {
  const { component, mode, form, formChange } = props;
  const itemProps = component.props || {};

  const handleFocus = () => {
    if (mode === MODE.config) {
      init(component);
    }
  };
  const [state, _setState] = useState({
    disable: false,
    value: "",
  });
  const signStatus = useStore("files.signStatus", {});
  const context = useContext(EMRContext);

  const {
    component: { init },
  } = useDispatch();

  useEffect(() => {}, []);
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

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

  useEffect(() => {
    let fieldValue;
    const field = form && form[itemProps.fieldName];
    const isvalidDate = field && typeof field === "number" ? true : moment();
    if (field && !isvalidDate) {
      fieldValue = moment(field).format("DD-MM-YYYY");
    } else {
      fieldValue = form && form[itemProps.fieldName];
      fieldValue = fieldValue && fieldValue.toString();
    }
    // eslint-disable-next-line no-useless-escape
    const fieldConvert =
      fieldValue && typeof fieldValue === "string"
        ? fieldValue.replace(/[- _&\/\\#,+()$~%'":*?<>{}^;]/g, "").toUpperCase()
        : "";
    setState({
      value: fieldConvert,
    });
  }, [form, formChange]);

  const onChangeIput = (value) => {
    setState({
      value,
    });
    if (!itemProps.disabled)
      if (formChange[itemProps.fieldName]) {
        formChange[itemProps.fieldName](value);
      }
  };
  return (
    <Main onClick={handleFocus}>
      <ReactInput
        size={itemProps.size}
        value={state.value}
        onChangeInput={onChangeIput}
        disabled={state.disable}
        letterCase={itemProps.letterCase || "upper"}
        type={itemProps.type || "Strings"}
      />
    </Main>
  );
});

CodeInput.defaultProps = {
  formChange: {},
  form: {},
  component: {
    size: 2,
    disabled: false,
    props: {
      fieldName: "",
    },
  },
};

CodeInput.propTypes = {
  formChange: T.shape({}),
  form: T.shape({}),
  component: T.shape({}),
};

export default CodeInput;
