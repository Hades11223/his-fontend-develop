import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Main } from "./styled";
import moment from "moment";
import "moment/locale/vi";
import DateTimePicker from "components/DateTimePicker";
function ModalChangeDate(props, ref) {
  const refCallback = useRef(null);
  const refDate = useRef(null);
  const refOnChanged = useRef(false);
  const refDatePicker = useRef(null);
  const [state, _setState] = useState({
    search: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: (date, currentCol, callback) => {
      refDate.current = moment(date);
      setState({
        value: refDate.current,
        currentCol,
        show: true,
      });
      refOnChanged.current = false;
      refCallback.current = callback;
      setTimeout(() => {
        refDatePicker.current && refDatePicker.current.show();
      }, 200);
    },
  }));

  const onOK = () => {
    setState({ show: false });
    refOnChanged?.current &&
      refCallback?.current &&
      refCallback.current(refDate?.current?._d);
  };
  if (!state.show) return null;

  const onShowDatePicker = (visible, date) => {
    if (date) {
      refDate.current = date?._d ? date._d : moment(date);
      refOnChanged.current = true;
    }
    if (!visible) {
      onOK();
    }
  };
  const onChangeDate = (date) => {
    refDate.current = date;
    refOnChanged.current = true;
    refOnChanged?.current &&
      refCallback?.current &&
      refCallback.current(refDate?.current?._d);
    setState({ value: date });
  };
  return (
    <Main
      left={props.marginLeft + props.columnWidth * state.currentCol}
      top={0}
      width={props.columnWidth}
      {...props}
    >
      <DateTimePicker
        includeDates={props.includeDates}
        disableDate={props.disableDate}
        showTimeSelectOnly={props.showTimeSelectOnly}
        onChange={onChangeDate}
        ref={refDatePicker}
        value={state.value}
        showToday={true}
        showTime={{ format: "HH:mm" }}
        width={150}
        height={30}
        onShowDatePicker={onShowDatePicker}
        showIcon={false}
      />
    </Main>
  );
}
export default forwardRef(ModalChangeDate);
