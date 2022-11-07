import React, {
  useState,
  useEffect,
  forwardRef,
  useRef,
  useContext,
} from "react";
import T from "prop-types";
import { useDispatch, useStore } from "react-redux";
import moment from "moment";
import DateTimePicker from "components/editor/config/DateTimePicker";
import { Main } from "./styled";
import { render, formatSecond, showTimeOnly } from "./constants";
import EMRContext from "pages/editor/context/EMR";

const AppDatePicker = forwardRef((props, ref) => {
  const refDatePicker = useRef(null);
  const [state, _setState] = useState({
    disable: false,
    showInput: false,
  });
  // const { currentTime } = useSelector((state) => state.drugAllocation);
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const context = useContext(EMRContext);
  const {
    component: { init },
  } = useDispatch();
  const signStatus = useStore("files.signStatus", {});
  const { mode, component, form, formChange } = props;
  const [localValue, setLocalValue] = useState();

  const itemProps = component.props || {};
  useEffect(() => {
    const isDisable = context.isDisable;
    let disable =
      isDisable({ itemProps, signStatus, props }) || itemProps.disabled;
    if (state.disable != disable) {
      setState({
        disable,
      });
    }
  }, [
    signStatus,
    itemProps,
    props.valuesHIS, //[dataFromHis]
    props.disable,
  ]);

  useEffect(() => {
    if (Object.keys(form)[0] && Object.keys(form)[0] != "undefined") {
      if (form[itemProps.fieldName]) {
        setLocalValue(form[itemProps.fieldName]);
      } else {
        // if (itemProps.defaultTimeCurrent && currentTime) {
        //   const time = moment(
        //     new Date(currentTime).toLocaleString("en-US", {
        //       timeZone: "Asia/Ho_Chi_Minh",
        //     })
        //   );
        //   setLocalValue(time);
        //   handleChangeDate(time);
        // }
      }
    }
  }, [
    form,
    // currentTime
  ]);

  const handleFocus = () => {
    if (mode === "config") {
      init(component);
    }
  };

  const handleChangeDate = (value) => {
    if (formChange && itemProps.fieldName && formChange[itemProps.fieldName]) {
      if (!value) {
        formChange[itemProps.fieldName](null);
        setLocalValue(null);
      } else {
        if (itemProps.onlyDate) {
          formChange[itemProps.fieldName](value?.format("YYYY-MM-DD"));
        } else {
          formChange[itemProps.fieldName](value?.format());
        }
        setLocalValue(value?.format());
      }
    }
  };
  const lineHeightText =
    (((itemProps.fontSize || props.fontSize) * 4) / 3) *
    (itemProps.lineHeight || props.lineHeightText);
  let minHeight = itemProps.line
    ? itemProps.line * lineHeightText
    : lineHeightText;

  const showDatePicker = () => {
    refDatePicker.current && refDatePicker.current.show(true);
  };
  const onShowDatePicker = (isVisible) => {
    setState({
      showInput: isVisible,
    });
  };
  return (
    <Main
      onClick={handleFocus}
      data-type="date-picker"
      contentAlign={itemProps.contentAlign}
      mode={mode}
      fontSize={itemProps.fontSize || props.fontSize} //parrent font size
      minHeight={minHeight}
      lineHeightText={lineHeightText}
      showInput={state.showInput}
      dateTimeFormat={itemProps.dateTimeFormat}
      fontWeight={itemProps.bold ? "bold" : ""}
      fontStyle={itemProps.italic ? "italic" : ""}
      textDecoration={itemProps.underline ? "underline" : ""}
    >
      {mode === "editing" && !state.disable && (
        <div>
          <DateTimePicker
            showToday={true}
            ref={refDatePicker}
            showTime={formatSecond[itemProps.dateTimeFormat]}
            showTimeSelectOnly={showTimeOnly.includes(itemProps.dateTimeFormat)}
            onChange={handleChangeDate}
            value={localValue ? moment(localValue) : null}
            format="DD/MM/YYYY"
            onShowDatePicker={onShowDatePicker}
          />
        </div>
      )}

      <div className={"value-display"} onClick={showDatePicker}>
        {render(itemProps.dateTimeFormat, localValue, mode)}
      </div>
    </Main>
  );
});

AppDatePicker.defaultProps = {
  form: {},
};

AppDatePicker.propTypes = {
  form: T.shape({}),
};

export default AppDatePicker;
