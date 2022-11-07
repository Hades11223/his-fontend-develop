import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import { Input, InputNumber } from "antd";
import stringUtils from "mainam-react-native-string-utils";
const InputTimeout = (
  {
    onChange = () => {},
    value,
    style = {},
    isTextArea,
    timeDelay = 500,
    refWrap,
    autoHeight = false,
    type = "search",
    formatPrice = false,
    ...props
  },
  ref
) => {
  const refTimeOut = useRef(null);
  const refId = useRef(stringUtils.guid());
  const [state, setState] = useState("");

  useEffect(() => {
    setState(value);
  }, [value]);
  useEffect(() => {
    if (autoHeight)
      setTimeout(() => {
        const element = document.getElementById(refId.current);
        if (element) {
          element.style.height = "5px";
          element.style.height = element.scrollHeight + "px";
        }
      }, 500);
  }, [state]);
  useEffect(() => {
    if (refWrap)
      refWrap.current = {
        setValue: setState,
      };
  }, [refWrap]);

  // useImperativeHandle(ref, () => ({
  //   focus: () => ref.current.focus()
  // }))

  // const focusRef = useRef()
  // useEffect(() => {
  //   focusRef.current && focusRef.current.focus();
  // }, []);

  const onChangeInput = (e) => {
    const value = type == "number" ? e : e.target.value;
    setState(value);
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
    }
    refTimeOut.current = setTimeout(
      (value) => {
        onChange(value);
      },
      timeDelay,
      value
    );
  };
  const Component = isTextArea
    ? Input.TextArea
    : type == "number"
    ? InputNumber
    : Input;
  const onInput = (element) => {
    if (autoHeight && element?.target) {
      element.target.style.height = "5px";
      element.target.style.height = element.target.scrollHeight + "px";
    }
    props?.onInput && props.onInput(element);
  };
  const onFormat = (value) => {
    if (value) return Number((value + "").replaceAll(".", "")).formatPrice();
  };
  const onParser = (value) => {
    return value.replaceAll(".", "");
  };

  return (
    <>
      {/* <input ref={ref} /> */}
      <Component
        id={refId.current}
        value={state}
        onChange={onChangeInput}
        style={style}
        {...(type == "number" && formatPrice
          ? { formatter: onFormat, parser: onParser }
          : {})}
        {...props}
        type={type === "search" ? type : ""}
        onInput={onInput}
        ref={ref}
      />
    </>
  );
};

export default forwardRef(InputTimeout);
