import React, {
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";
import stringUtils from "mainam-react-native-string-utils";
import { Main } from "./styled";
const InputHtml = (
  {
    onChange = () => {},
    value,
    style = {},
    timeDelay = 500,
    refWrap,
    autoHeight = false,
    type = "search",
    formatPrice = false,
    disabled = false,
    ...props
  },
  ref
) => {
  const refContentEditable = useRef(null);
  const refTimeOut = useRef(null);
  const refId = useRef(stringUtils.guid());

  useEffect(() => {
    refContentEditable.current.innerHTML = value;
  }, [value]);

  useEffect(() => {
    if (refWrap)
      refWrap.current = {
        setValue: (value) => (refContentEditable.current.innerHTML = value),
      };
  }, [refWrap]);

  useImperativeHandle(ref, () => ({
    setValue: (value) => (refContentEditable.current.innerHTML = value),
  }));

  const onChangeInput = (e) => {
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
    }
    refTimeOut.current = setTimeout(
      (value) => {
        onChange(value);
      },
      timeDelay,
      refContentEditable.current.innerHTML
    );
  };

  return (
    <>
      <Main
        contentEditable={!disabled}
        id={refId.current}
        style={style}
        {...props}
        onInput={onChangeInput}
        ref={refContentEditable}
      />
    </>
  );
};

export default forwardRef(InputHtml);
