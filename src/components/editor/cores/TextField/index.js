import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useContext,
} from "react";
import T from "prop-types";
import TextEdit from "components/editor/cores/TextEdit";
import ContentEditable from "components/editor/config/ContentEditable";
import MultipleLine from "components/editor/config/MultipleLine";
import { Main } from "./styled";
import { useDispatch } from "react-redux";
import ModalInput from "./ModalInput";
import { MODE } from "utils/editor-utils";
import EMRContext from "pages/editor/context/EMR";
import { useStore } from "hook";
const TextField = forwardRef((props, ref) => {
  const [state, _setState] = useState({
    disable: false,
    width: 0,
    labelWidth: 0,
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
  const refInput = useRef(null);
  const {
    mode,
    component,
    form,
    formChange,
    focusing,
    other,
    textTransform,
    blockWidth,
  } = props;

  const labelRef = useRef(null);
  const refMultipleLine = useRef(null);
  const label = mode === MODE.config ? "label" : "";
  const itemProps = component.props || {};

  const getValue = (id) => {
    const elm = document.getElementById(id);
    return elm ? elm.innerHTML : "";
  };
  useImperativeHandle(ref, () => ({
    collectLabel: () => getValue(`${component.type}_${component.key}`),
  }));

  useEffect(() => {
    if (labelRef.current) {
      setState({
        width: blockWidth - labelRef.current.node.clientWidth - 6,
        labelWidth: labelRef.current.node.clientWidth,
      });
    }
  }, [state.labelValue, blockWidth]);

  useEffect(() => {
    setState({
      labelValue: itemProps.label,
    });
  }, [component]);

  const handleFocus = () => {
    if (mode === MODE.config) {
      init(component);
    } else {
      if (refMultipleLine.current) refMultipleLine.current.focus(false);
    }
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
  const lineHeightText =
    (((itemProps.fontSize || props.fontSize) * 4) / 3) *
    (itemProps.lineHeight || props.lineHeightText);
  let minHeight = itemProps.line
    ? itemProps.line * lineHeightText
    : lineHeightText;
  let value = form
    ? form[itemProps.fieldName] === null ||
      form[itemProps.fieldName] == undefined
      ? ""
      : form[itemProps.fieldName]
    : "";
  const handleOnChange = (e) => {
    if (formChange[itemProps.fieldName]) {
      if (itemProps.isDataArray) {
        // check xem giá trị đầu vào có là mảng hay không nếu là mảng khi đẩy lên sẽ conver thành mảng
        const valueSplit = e.htmlValue
          .replaceAll("</div>", "")
          .replaceAll("<br>", "")
          .split("<div>")
          .filter((item) => item);
        formChange[itemProps.fieldName](valueSplit);
      } else {
        formChange[itemProps.fieldName](e.htmlValue || " ");
      }
    }
  };
  if (value.replaceAll) value = value.replaceAll("\n", "<br/>");
  let defaultValue = itemProps.defaultValue || "";
  if (defaultValue.replaceAll)
    defaultValue = defaultValue.replaceAll("\n", "<br/>");
  const handleShowModal = () => {};
  useEffect(() => {
    if (itemProps.isDataArray) {
      setState({
        value: (value || []).map((item) => `<div>${item}</div>`).join(""),
      });
    } else {
      setState({
        value: value,
      });
    }
  }, [value]);
  return (
    <Main
      onClick={handleFocus}
      focusing={focusing}
      hadLabel={!!itemProps.label}
      data-type="text-field"
      showMarkSpanRow={
        itemProps.markSpanRow === undefined ? true : itemProps.markSpanRow
      }
      lineHeight={lineHeightText || 1.5}
      minHeight={minHeight}
      fontSize={itemProps.fontSize || props.fontSize} //parrent font size
      contentAlign={itemProps.contentAlign || "left"}
      mode={mode}
      disabled={state.disable}
      border={itemProps.border}
      itemProps={itemProps}
      fontWeight={itemProps.fontWeight ? itemProps.fontWeight : undefined}
    >
      {mode === MODE.editing ? (
        <MultipleLine
          label={!itemProps.noLabel ? itemProps.label : ""}
          labelWidth={itemProps.labelWidth}
          contentAlign={itemProps.contentAlign}
          contentColor={itemProps.contentColor}
          onChange={handleOnChange}
          value={
            state.value === undefined || state.value === null
              ? !itemProps.disabled
                ? defaultValue
                : ""
              : state.value + "" //chỉ hiển thị giá trị default value khi lấy giá trị từ emr
          }
          extentLine={itemProps.line - 1 < 0 ? 0 : itemProps.line - 1}
          disabled={!!state.disable}
          width={blockWidth}
          min={itemProps.line}
          size={itemProps.size || 1000}
          ref={refMultipleLine}
          lineHeightText={itemProps.lineHeight || props.lineHeightText || 1.5}
          showMarkSpanRow={false}
          fontSize={itemProps.fontSize || props.fontSize} //parrent font size
          inputNumber={itemProps.inputNumber}
          maxValue={itemProps.maxValue}
          minValue={itemProps.minValue}
          typeNumber={itemProps.typeNumber}
          onClick={handleShowModal}
          toUpperCaseText={itemProps?.toUpperCaseText}
        />
      ) : (
        <>
          {!itemProps.noLabel && (
            <TextEdit
              id={`${component.type}_${component.key}`}
              className={"text-field-label"}
              defaultValue={itemProps.label || label}
              ref={labelRef}
              mode={mode}
              onChange={(value) => {
                setState({
                  labelValue: value,
                });
              }}
              textTransform={textTransform}
              width={itemProps.labelWidth}
              disabled={false} //allow edit in config mode
            />
          )}
          <ContentEditable
            labelWidth={state.labelWidth}
            htmlValue={
              !itemProps.disabled ? defaultValue : "" //Chỉ hiển thị default value khi lấy dữ liệu từ emr
            }
            size={itemProps.size || 500}
            // width={state.width}
            onChange={handleOnChange}
            disabled={true} //disable edit in config mode
            type={itemProps.line > 1 ? "multiple" : "single"}
            extentLine={itemProps.line - 1 || 0}
            contentAlign={itemProps.contentAlign}
            contentColor={itemProps.contentColor || "black"}
            fontSize={itemProps.fontSize || props.fontSize} //parrent font size
            onClick={handleFocus}
            toUpperCaseText={itemProps?.toUpperCaseText}
            {...other}
          />
        </>
      )}
      <ModalInput ref={refInput} />
    </Main>
  );
});

TextField.defaultProps = {
  mode: MODE.editing,
  labelText: "",
  form: {},
  formChange: {},
  component: {
    noLabel: false,
  },
  line: {},
};

TextField.propTypes = {
  mode: T.oneOf([MODE.config, MODE.editing]),
  form: T.shape({}),
  formChange: T.shape({}),
  component: T.shape({}),
  line: T.shape({}),
  labelText: T.string,
};

export default TextField;
