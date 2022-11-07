import React, { memo, useState, useRef, useEffect } from "react";
import moment from "moment";
import { Main } from "./styled";
import { Input } from "antd";
import { DatePicker } from "components";
import { CalendarOutlined } from "@ant-design/icons";

const range = (start, end) => {
  return Array(end - start + 1)
    .fill()
    .map((_, i) => start + i);
};

const DateTimePicker = (props) => {
  const refDatepicker = useRef(null);
  const {
    value,
    disabled,
    placeholder,
    className,
    allowClear,
    onChange,
    onSelect,
    showIcon = true,
    bottom = <></>,
    format = "DD/MM/YYYY HH:mm:ss",
    showTime = true,
    disabledDate,

    // disabled giờ theo ngày. disable các chọn giờ trước hoặc sau nếu chọn ngày = ngày của pointTime
    pointTime,
    compareTime = () => true,
    style
  } = props;

  const [state, _setState] = useState({
    focus: false,
  });
  const refOldDate = useRef(null);
  const refValue = useRef(null);
  const refTimeout = useRef(null);
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const onBlur = () => {
    setState({ focus: false });
    try {
      const date = moment(refValue.current, format)._d;
      if (date.isValidDate()) {
        refValue.current = moment(date).format(format);
        setState({
          date,
          value: refValue.current,
        });
        refOldDate.current = date;
        onChange && onChange(moment(date));
      } else {
        if (date && moment(date).format(format) != "Invalid date") {
          refValue.current = moment(date).format(format);
          setState({
            value: refValue.current,
          });
          refOldDate.current = date;
          onChange && onChange(moment(date));
        } else {
          refValue.current = "";
          refOldDate.current = null;
          setState({
            date: null,
            value: refValue.current,
          });
          onChange && onChange(null);
        }
      }
    } catch (error) {}
  };

  const onFocus = () => {
    setState({ focus: true });
  };

  useEffect(() => {
    if (value && value?._d?.isValidDate()) {
      refOldDate.current = value._d;
      const date = moment(value?._d || new Date())?._d;
      refValue.current = moment(date).format(format);
      setState({
        value: refValue.current,
        date,
      });
    } else {
      setState({
        date: null,
        value: "",
      });
    }
  }, [value, format]);

  const onChangeDate = (value) => {
    const e = moment(value);
    const careTime = moment(pointTime);
    if (pointTime && compareTime(e, careTime)) {
      e.set("hour", careTime.get("hour"))
        .set("minute", careTime.get("minute"))
        .set("second", careTime.get("second"));
    }
    const newState = {
      date: e,
      value: moment(e).format(format),
      focus: false,
    };
    refOldDate.current = e;
    refValue.current = e.format(format);
    onChange && onChange(moment(e));
    setState(newState);
  };

  const onChangeInput = (e) => {
    refValue.current = e.target.value;
    setState({
      value: e.target.value,
    });
    if (refTimeout.current) {
      clearTimeout(refTimeout.current);
    }
    refTimeout.current = setTimeout((value) => {}, 1000, e.target.value);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13 || e.keyCode === 9) {
      setState({ focus: false });
      onBlur();
    }
  };

  const disabledTime = pointTime
    ? (d) => {
        const date = moment(d);
        const careTime = moment(pointTime);
        return {
          disabledHours: () =>
            range(0, 23).filter((i) =>
              date.get("date") === careTime.get("date")
                ? compareTime(i, careTime.get("hour"))
                : false
            ),
          disabledMinutes: () =>
            range(0, 59).filter((i) =>
              date.get("date") === careTime.get("date") &&
              date.get("hour") === careTime.get("hour")
                ? compareTime(i, careTime.get("minute"))
                : false
            ),
          disabledSeconds: () =>
            range(0, 59).filter((i) =>
              date.get("date") === careTime.get("date") &&
              date.get("hour") === careTime.get("hour") &&
              date.get("minute") === careTime.get("minute")
                ? compareTime(i, careTime.get("second"))
                : false
            ),
        };
      }
    : undefined;

  const _disabledDate = pointTime
    ? (d) => {
        const careTime = moment(pointTime);
        return (
          compareTime(d, careTime) && d.get("date") !== careTime.get("date")
        );
      }
    : disabledDate;

  const _onSelect = pointTime
    ? (d) => {
        const careTime = moment(pointTime);
        return (
          compareTime(d, careTime) && d.get("date") !== careTime.get("date")
        );
      }
    : onSelect;

  return (
    <Main className="input-content" style={style}>
      <Input
        onClick={onFocus}
        type="text"
        onBlur={onBlur}
        onFocus={onFocus}
        value={state?.value}
        placeholder={placeholder}
        className={`${className || ""} input-date`}
        disabled={disabled}
        allowClear={allowClear}
        onChange={onChangeInput}
        onKeyDown={onKeyDown}
      />
      <DatePicker
        value={
          state?.date
            ? moment.isMoment(state?.date)
              ? state?.date
              : moment(state?.date)
            : null
        }
        format={format}
        open={state.focus}
        ref={refDatepicker}
        onFocus={refDatepicker.current?.blur}
        onChange={onChangeDate}
        onSelect={_onSelect}
        showTime={showTime}
        disabledDate={_disabledDate}
        disabledTime={disabledTime}
      />
      <div className="calendar-icon">
        {showIcon && <CalendarOutlined size={20} />}
      </div>
      {bottom}
    </Main>
  );
};
export default memo(DateTimePicker);
