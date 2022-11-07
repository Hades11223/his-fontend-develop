import { Input } from "antd";
import onScan from "onscan.js";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { getNormalizedKeyNum, stripAccents } from "utils";

const InputScan = (
  {
    onChange = () => () => {},
    data,
    style = {},
    defaultValue,
    placeholder,
    id,
    ...props
  },
  ref
) => {
  const [state, setState] = useState("");
  const refTimeout = useRef(null);
  const refInput = useRef();

  useEffect(() => {
    onScan.attachTo(refInput.current.input, {
      onScan: function (sCode, iQty) {
        const code = stripAccents(sCode);
        changeInput(code);
        props.onKeyDown &&
          props.onKeyDown({
            target: { value: code },
            key: "Enter",
          });
      },
      keyCodeMapper: function (oEvent) {
        var iCode = getNormalizedKeyNum(oEvent);
        switch (true) {
          case iCode >= 48 && iCode <= 90: // numbers and letters
          case iCode >= 106 && iCode <= 111: // operations on numeric keypad (+, -, etc.)
            if (oEvent.key !== undefined && oEvent.key !== "") {
              return oEvent.key;
            }

            var sDecoded = String.fromCharCode(iCode);
            switch (oEvent.shiftKey) {
              case false:
                sDecoded = sDecoded.toLowerCase();
                break;
              case true:
                sDecoded = sDecoded.toUpperCase();
                break;
            }
            return sDecoded;
          case iCode >= 96 && iCode <= 105: // numbers on numeric keypad
            return 0 + (iCode - 96);
          case iCode === 32:
            return " ";
        }
        return "";
      },
    });
    return () => {
      onScan.detachFrom(refInput.current.input);
    };
  }, []);

  useEffect(() => {
    setState(data);
  }, [data]);

  // useImperativeHandle(ref,() => ({}))

  const changeInput = (value) => {
    setState(value);
    if (refTimeout.current) {
      clearTimeout(refTimeout.current);
    }
    refTimeout.current = setTimeout(() => {
      onChange(value);
    }, 700);
  };
  return (
    <Input
      id={id}
      value={state}
      placeholder={placeholder}
      onChange={(e) => changeInput(e.target.value)}
      style={style}
      ref={refInput}
      {...props}
    />
  );
};

export default forwardRef(InputScan);
