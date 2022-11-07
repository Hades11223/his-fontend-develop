import React, { useEffect, useState } from "react";
import { Main } from "./styled";
export default function ToggleValue(props) {
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);
  const onClick = () => {
    if (value == props.valueToggle) {
      setValue("");
      props.onChange && props.onChange("");
    } else {
      setValue(props.valueToggle);
      props.onChange && props.onChange(props.valueToggle);
    }
  };
  return (
    <Main className="toggle" onClick={!props.disabled ? onClick : null}>
      {value}
    </Main>
  );
}
