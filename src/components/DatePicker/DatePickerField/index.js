import React from "react";
import { DatePickerStyled } from "./styled";
import moment from "moment";
import PropTypes from "prop-types";

const DatePickerField = (props)=> {
  const { customFormat, placeholder, ...rest } = props;
  const dateFormat = (value) => {
    return `ngày ${value.date()} tháng ${
      value.month() + 1
    } năm ${value.year()}`;
  };

  return (
    <DatePickerStyled
      placeholder={placeholder || "ngày ........ tháng ........ năm ........"}
      format={customFormat || dateFormat}
      suffixIcon={null}
      {...rest}
    />
  );
}

DatePickerField.propTypes = {
  customFormat: PropTypes.func,
  placeholder: PropTypes.string,
};

export default DatePickerField;
