import React, { useEffect, useRef } from "react";
import { AutoComplete, Input } from "antd";
import { Main } from "./styled";
import stringUtils from "mainam-react-native-string-utils";

const { TextArea } = Input;

const options = [{ value: "Bình thường" }];

const AutoCompleteField = ({ label = "", ...rest }) => {
  const refId = useRef(stringUtils.guid());

  useEffect(() => {
    setTimeout(() => {
      const element = document.getElementById(refId.current);
      if (element) {
        element.style.height = "5px";
        element.style.height = element.scrollHeight + "px";
      }
    }, 500);
  }, [rest.defaultValue]);

  const onInput = (element) => {
    element.target.style.height = "5px";
    element.target.style.height = element.target.scrollHeight + "px";
  };

  return (
    <Main key={rest.defaultValue}>
      <span className={`label`}>
        {label}
        {":"}
      </span>

      <AutoComplete
        options={options}
        className="autocomplete-editable"
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        id={refId.current}
        {...rest}
      >
        <TextArea onInput={onInput} />
      </AutoComplete>
    </Main>
  );
};

export default AutoCompleteField;
