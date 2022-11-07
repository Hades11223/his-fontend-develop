import React, { forwardRef } from "react";
import Components from "components/editor/config/Components";
import { Main } from "./styled";
import render from "./render";

const ConfigRender = (
  {
    comRef,
    item,
    verticalLine,
    updateContent,
    currentComponent,
    formId,
    mode,
    component,
    children,
    level,
    layoutType,
    totalBlockInLine,
    ...props
  },
  ref
) => {
  return (
    <Main
      style={{ width: item.width || "unset" }}
      data-type={"block"}
      data-level={level}
    >
      {component.type ? (
        render(component.type)({
          component,
          ref: comRef,
          verticalLine,
          focusing: component.key === currentComponent?.key,
          mode,
          blockWidth: item.width,
          updateContent,
          block: item,
          formId,
          level: level + 1,
          layoutType,
          rowHeight: props.rowHeight, //dùng trong tính năng set rowHeight của component page và layout
          lineHeightText: props.lineHeightText, //dùng trong tính năng set line height của văn bản
          fontSize: props.fontSize, //parrent font size
        })
      ) : (
        <Components
          level={level}
          block={item}
          totalBlockInLine={totalBlockInLine}
          rowHeight={props.rowHeight} //dùng trong tính năng set rowHeight của component page và layout
          lineHeightText={props.lineHeightText} //dùng trong tính năng set line height của văn bản
        />
      )}
      {children}
    </Main>
  );
};

export default forwardRef(ConfigRender);
