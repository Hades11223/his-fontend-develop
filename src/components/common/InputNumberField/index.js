import React, { useRef, useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import { Input } from "antd";

function Index({
  onChange = () => {},
  value,
  timeDelay = 500,
  refWrap,
  ...rest
}) {
  const refTimeOut = useRef(null);
  const [state, setState] = useState(0);

  const onChangeInput = (e) => {
    const { floatValue } = e || {};
    setState(floatValue);

    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
    }
    refTimeOut.current = setTimeout(
      (value) => {
        onChange(floatValue);
      },
      timeDelay,
      value
    );
  };

  useEffect(() => {
    setState(parseFloat(value));
  }, [value]);

  useEffect(() => {
    if (refWrap)
      refWrap.current = {
        setValue: (e) => {
          setState(parseFloat(e) || "");
        },
      };
  }, [refWrap]);

  return (
    <NumberFormat
      style={{ paddingBottom: 5 }}
      customInput={Input}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      value={state}
      onValueChange={onChangeInput}
      {...rest}
    />
  );
}
export default Index;
