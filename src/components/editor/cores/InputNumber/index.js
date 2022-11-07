import React, { useEffect, useState, useRef, forwardRef, useContext } from "react";
import T from "prop-types";
import { Main } from "./styled";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";
import { MODE } from "utils/editor-utils";
import { useStore } from "hook";
import EMRContext from "pages/editor/context/EMR";

const InputNumber = forwardRef((props, ref) => {
  const [state, _setState] = useState({
    disable: false,
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
  const { mode, component, form, formChange, focusing } = props;

  const itemProps = component.props || {};
  const [value, setValue] = useState([]);
  const elRef = useRef([]);
  const singleRef = useRef([]);

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
    if (itemProps.quantity) {
      const arrEmpty = [];
      arrEmpty.length = itemProps.quantity;
      arrEmpty.fill("");
      setValue(arrEmpty && arrEmpty);
    }
  }, [form, itemProps]);
  const handleFocus = () => {
    if (mode === MODE.config) {
      init(component);
    }
  };

  const handleChangeInput = (index) => {
    let valueItem = elRef.current[index];
    let param;
    const values = form && form[itemProps.fieldName];
    if (itemProps.fieldName && formChange[itemProps.fieldName])
      if (itemProps.fieldName) {
        values[index] = valueItem && valueItem.innerHTML;
        const valueChanged = values && values.join("");
        param = {
          htmlLabe: valueChanged,
          htmlValue: values,
        };
        formChange[itemProps.fieldName](param);
      }
  };

  return (
    <Main onClick={handleFocus} focusing={focusing} size={itemProps.size}>
      {mode === MODE.config ? (
        <div className="contenteditable">
          {!isEmpty(value) ? (
            value.map((item, index) => (
              <span
                key={index}
                ref={(el) => (elRef.current[index] = el)}
                className="contenteditable-item"
              >
                {item}
              </span>
            ))
          ) : (
            <span className="contenteditable-item" />
          )}
        </div>
      ) : (
        <div className="contenteditable">
          {!isEmpty(value) ? (
            value.map((item, index) => (
              <span
                key={index}
                ref={(el) => (elRef.current[index] = el)}
                contentEditable={`${!state.disable}`}
                suppressContentEditableWarning
                onInput={(e) => handleChangeInput(index, e)}
                className="contenteditable-item"
              >
                {form && itemProps.fieldName && form[itemProps.fieldName]
                  ? (form[itemProps.fieldName] + "")[index]
                  : ""}
              </span>
            ))
          ) : (
            <span
              ref={(el) => (singleRef.current = el)}
              className="contenteditable-item"
              contentEditable={`${!state.disable}`}
              suppressContentEditableWarning
              onInput={handleChangeInput}
            />
          )}
        </div>
      )}
    </Main>
  );
});

InputNumber.defaultProps = {
  component: {
    props: {
      inputList: [],
    },
  },
  mode: MODE.editing,
};

InputNumber.propTypes = {
  component: T.shape({}),
  mode: T.oneOf([MODE.config, MODE.editing]),
};

export default InputNumber;
