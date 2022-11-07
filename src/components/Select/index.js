import React, { useMemo, useState, useEffect } from "react";
import { Select as AntSelect } from "antd";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { parserNumber } from "utils";

const { Option } = AntSelect;

const Select = ({
  data = [],
  showEnums = false,
  value,
  defaultValue,
  onChange,
  allowClear,
  placeholder,
  loading,
  className,
  autoFocus = false,
  refSelect,
  fit = false,
  valueNumber = false,
  style = {},
  ...props
}) => {
  const { t } = useTranslation();
  const [state, setState] = useState("");

  useEffect(() => {
    const newValue = value || defaultValue;
    if (valueNumber) {
      setState(newValue ? parseInt(newValue) : newValue);
    } else {
      setState(newValue);
    }
  }, [value, defaultValue, valueNumber]);

  const onChangeSelect = (value, data) => {
    setState(value);
    onChange && onChange(value, data);
  };

  const options = useMemo(() => {
    return showEnums && data && data.map
      ? data.map((option) => (
          <Option key={option.value} value={option.value}>
            {t(option.name)}
          </Option>
        ))
      : data.map((option) => {
          return (
            <Option
              lists={option}
              key={option[`${props.id}`] ? option[`${props.id}`] : option.id}
              value={option[`${props.id}`] ? option[`${props.id}`] : option.id}
              ref={option}
            >
              {t(option.i18n) || option[`${props.ten}`] || option.ten}
            </Option>
          );
        });
  }, [t, showEnums, data, props.ten, props.id]);
  if (fit == true) {
    style = { ...style, width: "100%" };
  }
  return (
    <>
      <AntSelect
        onChange={onChangeSelect}
        value={state}
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          option &&
          option.children &&
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        allowClear={!allowClear}
        loading={loading}
        placeholder={placeholder}
        className={className}
        autoFocus={autoFocus}
        ref={refSelect}
        style={style}
        defaultValue={defaultValue}
        {...props}
      >
        {options}
      </AntSelect>
    </>
  );
};

Select.propTypes = {
  showEnums: PropTypes.bool,
  data: PropTypes.array,
  onChange: PropTypes.func,
};
Select.Option = Option;

export default React.memo(Select);
