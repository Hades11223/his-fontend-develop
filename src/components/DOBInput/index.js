import React, { memo, useState, useRef } from "react";
import moment from "moment";
import { checkFormat, objectConverter, dateDefault } from "./utils";
import { Main } from "./styled";
import { DatePicker, Input } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
const DOBInput = (props) => {
  const refDatepicker = useRef(null);
  const {
    value,
    disabled,
    placeholder,
    className,
    allowClear,
    onBlur,
    onChange,
    showIcon = true,
    bottom = <></>,
    disabledDate,
    maxDate = new Date(),
  } = props;

  const [state, _setState] = useState({
    focus: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const keyUpBirthday = (e) => {
    if ((e.key && e.key === "Tab") || (e.key && e.key === "Enter")) {
      parseDate();
    }
  };
  const parseDate = () => {
    setState({ focus: false });
    /* 
		By default, two digit years above 68 are assumed to be in the 1900's and years 68 or below are assumed to be in the 2000's. 
		This can be changed by replacing the moment.parseTwoDigitYear method. 
		The only argument of this method is a string containing the two years input by the user, and should return the year as an integer.

		moment.parseTwoDigitYear = function(yearString) {
			return parseInt(yearString) + 2000;
		}
		*/
    moment.parseTwoDigitYear = function (yearString) {
      //SAKURA-15119 FE [Tiếp đón] - Lỗi nhập dữ liệu ngày tháng năm khi nhập năm chỉ có 2 số
      const currentYear = maxDate.getFullYear();
      if (parseInt(yearString) + 2000 > currentYear) {
        return parseInt(yearString) + 1900;
      } else {
        return parseInt(yearString) + 2000;
      }
    };
    if (!value?.strData) {
      let momentDate;
      let validate;
      const text = value?.str || "";
      if (Number(text?.replaceAll("/", "")).toString() != "NaN") {
        const formatStr = checkFormat(text) || "";
        if (formatStr.length > 3) {
          if (
            formatStr.length === 5 ||
            formatStr.length === 7 ||
            formatStr.length >= 9 ||
            !moment(text, formatStr).isValid()
          ) {
            validate = 1000;
          } else {
            if (formatStr.length !== 4) {
              const momentTime = moment(text, formatStr);
              momentDate = momentTime.isValid()
                ? objectConverter(momentTime, "DD/MM/YYYY")
                : dateDefault;
            } else {
              momentDate = moment(text, formatStr).isValid()
                ? objectConverter(moment(text, formatStr), "YYYY")
                : dateDefault;
            }
          }
        } else {
          if (text.length === 3 && Number(text) >= 201) {
            validate = 1001;
          } else if (text.length >= 9) {
            validate = 1000;
          } else {
            const year = parseFloat(moment().format("YYYY")) - parseFloat(text);
            momentDate = moment(year, "YYYY").isValid()
              ? objectConverter(moment(year, "YYYY"), "YYYY")
              : dateDefault;
          }
        }
        if (momentDate) {
          onBlur(
            momentDate,
            momentDate?.validate,
            momentDate?.ageStr,
            momentDate?.formatStr === "YYYY" ? true : false
          );
        } else if (validate) {
          onBlur(value, validate);
        }
      } else {
        onBlur(value, 1000);
      }
    }
  };
  const onChangeDate = (e) => {
    const value = e.target.value;
    onChange({ str: value });
  };
  const onFocus = () => {
    setState({ focus: true });
  };
  const onSelect = (e) => {
    const momentDate = e.isValid()
      ? objectConverter(e, "DD/MM/YYYY")
      : dateDefault;
    onBlur(
      momentDate,
      momentDate?.validate,
      momentDate?.ageStr,
      momentDate?.formatStr === "YYYY" ? true : false
    );
    setState({ focus: false });
  };
  return (
    <Main className="input-content">
      <Input
        onClick={onFocus}
        type="text"
        onChange={onChangeDate}
        onBlur={parseDate}
        onFocus={onFocus}
        onKeyUp={keyUpBirthday}
        value={value ? value.str : ""}
        placeholder={placeholder}
        className={`${className || ""} input-date`}
        disabled={disabled}
        allowClear={allowClear}
      />
      <DatePicker
        onSelect={onSelect}
        value={
          value?.date
            ? moment.isMoment(value?.date)
              ? value?.date
              : moment(value?.date)
            : null
        }
        format={"DD/MM/YYYY"}
        open={state.focus}
        ref={refDatepicker}
        onFocus={refDatepicker.current?.blur}
        disabledDate={disabledDate}
      />
      <div className="calendar-icon">
        {showIcon && <CalendarOutlined size={20} />}
      </div>
      {bottom}
    </Main>
  );
};
export default memo(DOBInput);
