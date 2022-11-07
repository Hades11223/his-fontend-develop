import React from "react";
import { Main } from "./styled";
import BorderItem from "./BorderItem";

const BorderConfig = ({
  borderTop = {},
  borderLeft = {},
  borderRight = {},
  borderBottom = {},
  ...props
}) => {
  const onChange = (type) => (data) => {
    if (props.onChange) props.onChange(type, data);
  };
  return (
    <Main>
      <BorderItem
        size={borderLeft.size}
        type={borderLeft.type}
        color={borderLeft.color}
        configIcon="border-left"
        onChange={onChange("borderLeft")}
      />
      <BorderItem
        size={borderRight.size}
        type={borderRight.type}
        color={borderRight.color}
        configIcon="border-right"
        onChange={onChange("borderRight")}
      />
      <BorderItem
        size={borderTop.size}
        type={borderTop.type}
        color={borderTop.color}
        configIcon="border-top"
        onChange={onChange("borderTop")}
      />
      <BorderItem
        size={borderBottom.size}
        type={borderBottom.type}
        color={borderBottom.color}
        configIcon="border-bottom"
        onChange={onChange("borderBottom")}
      />
    </Main>
  );
};

export default BorderConfig;
