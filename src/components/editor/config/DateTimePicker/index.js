import React, {
  useState,
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
  useMemo,
  memo,
} from "react";
import { Input, Popover, Button } from "antd";
import DatePicker, { registerLocale } from "react-datepicker";
import { Main, DatePickerMain, GlobalStyle } from "./styled";
import moment from "moment";
import stringUtils from "mainam-react-native-string-utils";
import vi from "date-fns/locale/vi"; // the locale you want
registerLocale("vi", vi); // register it with the name you want
const DateTimePicker = (props, ref) => {
  const { focus = () => {} } = props;
  const [state, _setState] = useState({
    visible: false,
    value: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refId = useRef(stringUtils.guid());
  const refVisible = useRef(null);
  const refOldDate = useRef(null);
  const refValue = useRef(null);
  const refTimeout = useRef(null);

  const onChangeDate = (e, isDississ = false) => {
    debugger
    const newState = {
      date: e,
      value: moment(e).format(format),
    };
    if (!isDississ) {
      newState.visible = false;
    }
    setState(newState);
    refOldDate.current = e;
    props.onChange && props.onChange(moment(e));
    if (!isDississ) {
      props.onShowDatePicker && props.onShowDatePicker(false, e);
    }
  };
  const format = useMemo(() => {
    const format = !props.showTimeSelectOnly
      ? (props.format || "dd/MM/yyyy").toUpperCase()
      : "";
    if (props.showTime) {
      if (props.showTime.format) {
        return (format ? format + " " : "") + props.showTime.format;
      }
      return (format ? format + " " : "") + "HH:mm";
    }
    return format;
  }, [props.format, props.showTime]);
  const onChange = (e) => {
    refValue.current = e.target.value;
    setState({
      value: e.target.value,
    });
    if (refTimeout.current) {
      clearTimeout(refTimeout.current);
    }
    refTimeout.current = setTimeout((value) => {}, 1000, e.target.value);
  };
  useEffect(() => {
    try {
      if (props.value) {
        refOldDate.current = props.value._d;
        const date = moment(props.value?._d || new Date())?._d;
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
    } catch (error) {}
  }, [props.value, props.format, props.showTime, props.showTimeSelectOnly]);

  useImperativeHandle(ref, () => ({
    show: show(true),
    hide: () => {},
  }));
  const show = (value, isOk) => () => {
    if (!state.date && isOk) {
      onChangeDate(new Date(), false);
    } else {
      if (value !== state.visible) {
        refVisible.current = value;
        setState({
          visible: value,
        });
        setTimeout(() => {
          props.onShowDatePicker &&
            props.onShowDatePicker(value, isOk ? state.date : null);
        }, 500);
      }
    }
  };
  const onVisibleChange = (visible) => {
    if (refVisible.current != visible) {
      show(visible)();
    }
  };
  const onBlur = () => {
    try {
      const date = moment(refValue.current, format)._d;
      if (date.isValidDate()) {
        refValue.current = moment(date).format(format);
        setState({
          date,
          value: refValue.current,
        });
        refOldDate.current = date;
        props.onChange && props.onChange(moment(date));
      } else {
        if (state.date) {
          refValue.current = moment(state.date).format(format);
          setState({
            value: refValue.current,
          });
          refOldDate.current = state.date;
          props.onChange && props.onChange(moment(state.date));
        } else {
          refValue.current = "";
          refOldDate.current = null;
          setState({
            date: null,
            value: refValue.current,
          });
          props.onChange && props.onChange(null);
        }
      }
    } catch (error) {}
  };

  const onFocus = () => {
    focus();
    if (state.visible) return;
    show(true)();
  };
  const onClick = (e) => {
    show(true)();
  };

  const onKeyDown = (e) => {
    if (e.keyCode == 13) {
      show(true)();
    } else {
      if (e.keyCode == 9) {
        show(false)();
      }
    }
  };
  const onGetToDay = () => {
    onChangeDate(new Date(), true);
  };
  const removeDate = () => {
    const newState = {
      date: "",
      value: "",
      visible: false,
    };
    setState(newState);
    props.onChange && props.onChange(null);
    props.onShowDatePicker && props.onShowDatePicker(false, null);
  };

  const onDateClassName = (date) => {
    if (props.onHandleDateColor) {
      return props.onHandleDateColor(date);
    }
    if (props.disableDate) {
      if (props.disableDate(date)) return "datepicker-disabled-date";
    }
  };
  return (
    <Main className={"date-picker"} width={props.width} height={props.height}>
      {state.visible && <GlobalStyle />}
      <Popover
        trigger="contextMenu"
        visible={state.visible}
        onVisibleChange={onVisibleChange}
        content={
          <DatePickerMain
            locale="vi"
            inline
            selected={state.date}
            onChange={onChangeDate}
            dateFormat={format}
            showTimeSelect={props.showTime}
            showTimeSelectOnly={props.showTimeSelectOnly}
            timeIntervals={10}
            timeFormat={props.showTime?.format || "HH:mm"}
            timeClassName={props.onHandleTimeColor}
            timeCaption="Giờ"
            dayClassName={onDateClassName}
            renderDayContents={props.onRenderDayContent}
          >
            {
              <div>
                <div
                  style={{
                    width: "100%",
                    paddingTop: "2px",
                    paddingBottom: "2px",
                    borderTop: "1px solid #aca",
                    display: "inline-block",
                    textAlign: "center",
                  }}
                >
                  <Button onClick={removeDate}>Xóa</Button>
                  {props.showToday && (
                    <Button style={{ marginLeft: 5 }} onClick={onGetToDay}>
                      Bây giờ
                    </Button>
                  )}
                  <Button
                    onClick={show(false, true)}
                    style={{ marginLeft: 5 }}
                    type="primary"
                  >
                    Đồng ý
                  </Button>
                </div>
              </div>
            }
          </DatePickerMain>
        }
      >
        <Input
          className="input-date-time"
          id={refId.current}
          onChange={onChange}
          value={state.value}
          onClick={onClick}
          // ref={refTimeout}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          // onFocus={show(true)}
          onBlur={onBlur}
          placeholder={props.placeholder}
          size={props.size || "small"}
        />
      </Popover>
    </Main>
  );
};
export default memo(forwardRef(DateTimePicker));
