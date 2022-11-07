import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
  } from "react";
  import { Input } from "antd";
  
  const InputBlur = (
    { onChange = () => () => {}, value, readOnly, disabled, ...props },
    refs
  ) => {
    const [state, setState] = useState("");
  
    useEffect(() => {
      setState(value);
    }, [value]);
  
    return (
      <Input
        value={state}
        onChange={(e) => {
          if (!disabled || !readOnly) setState(e.target.value);
        }}
        onBlur={() => onChange(state)}
        ref={refs}
        readOnly={readOnly}
        disabled={disabled}
        {...props}
      />
    );
  };
  
  export default forwardRef(InputBlur);
  