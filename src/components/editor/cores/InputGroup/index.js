import React, { forwardRef } from "react";
import T from "prop-types";
import { sum } from "lodash";
import { Main } from "./styled";
import { connect, useDispatch } from "react-redux";
import { MODE } from "utils/editor-utils";

const subValue = (value = "", rule, index, rules) => {
  let listIndex = [];
  if (index > 0) {
    for (let i = 0; i <= index - 1; i++) {
      listIndex.push(i);
    }
  }

  const position = index > 0 ? sum(listIndex.map((i) => rules[i].length)) : 0;

  return value ? `${value}`.substr(position, rule.length) : "";
};

const InputGroup = forwardRef((props, ref) => {
  const { component, mode, form } = props;
  const itemProps = component.props || {};
  const itemRules = itemProps.rule || "";
  const rules = itemRules.split ? itemRules.split("_") : [];
  const {
    component: { init },
  } = useDispatch();

  const handleFocus = () => {
    if (mode === MODE.config) {
      init(component);
    }
  };

  return (
    <Main
      onClick={handleFocus}
      width={itemProps.width}
      height={itemProps.height}
    >
      {rules.map((rule, index) => (
        <span className={"box-input"} key={index}>
          {subValue(
            form[itemProps.fieldName || ""] || "",
            rule,
            index,
            rules,
            itemProps
          )}
        </span>
      ))}
    </Main>
  );
});

InputGroup.defaultProps = {
  component: {},
  form: {},
};

InputGroup.propTypes = {
  component: T.shape({}),
  form: T.shape({}),
};

export default InputGroup;
