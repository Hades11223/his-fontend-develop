import React from "react";
import { Select } from "antd";
import PropTypes from "prop-types";
import { forwardRef } from "react";
const { Option } = Select;

const SelectSearch = forwardRef((props, ref) => {
  const {
    data = [],
    showEnums = false,
    listSelect = [],
    value,
    onChange,
    allowClear,
    placeholder,
    loading,
    className,
    autoFocus = false,
    ...rest
  } = props;
  const dataHandle = data.map((item) =>
    listSelect.find((element) => element === item.id)
      ? { ...item, select: true }
      : item
  );

  return (
    <Select
      ref={ref}
      onChange={onChange}
      value={value}
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
      {...rest}
    >
      {dataHandle.map((option) => (
        <Option
          lists={option}
          key={option[`${props.id}`] ? option[`${props.id}`] : option.id}
          value={option[`${props.id}`] ? option[`${props.id}`] : option.id}
          ref={option}
          style={option.select ? { backgroundColor: "#e7f0fe" } : {}}
        >
          {option[`${props.ten}`] ? option[`${props.ten}`] : option.ten}
        </Option>
      ))}
    </Select>
  );
});

SelectSearch.propTypes = {
  showEnums: PropTypes.bool,
  data: PropTypes.array,
  onChange: PropTypes.func,
};

export default SelectSearch;
