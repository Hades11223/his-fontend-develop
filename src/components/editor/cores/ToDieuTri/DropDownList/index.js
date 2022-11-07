import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useMemo,
  useImperativeHandle,
} from "react";
import { Select } from "antd";
import { Main, ModalMain } from "./styled";

const ModalSelect = forwardRef(({ dataSource, placeholder, ...props }, ref) => {
  const refCallBack = useRef(null);
  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: ({ value }, callback) => {
      setState({ value: Array.isArray(value) ? value[0] : value, show: true });
      refCallBack.current = callback;
    },
  }));
  const onCancel = () => {
    setState({
      show: false,
    });
  };

  const _onOK = () => {
    refCallBack.current && refCallBack.current(state.value);
    setState({
      show: false,
    });
  };

  const onChange = (value) => {
    setState({
      value: value,
    });
  };
  const filterOption = (input, option) => {
    return (
      option.props.children
        ?.toLowerCase()
        .createUniqueText()
        .indexOf(input.toLowerCase().createUniqueText()) >= 0
    );
  };
  return (
    <ModalMain
      width={400}
      title={props.title}
      visible={state.show}
      onOk={_onOK}
      okText="Đồng ý"
      cancelText="Huỷ bỏ"
      onCancel={onCancel}
      cancelButtonProps={{ type: "danger" }}
    >
      <Select
        size="small"
        onChange={onChange}
        value={state.value}
        placeholder={placeholder || "Chọn giá trị"}
        showSearch
        filterOption={filterOption}
        allowClear
      >
        {dataSource.map((item, key) => {
          return (
            <Select.Option value={item} key={key}>
              {item}
            </Select.Option>
          );
        })}
      </Select>
    </ModalMain>
  );
});

const DropDownList = ({ value, dataSource, disabled, ...props }, ref) => {
  const refModalDropDown = useRef(null);
  const [state, _setState] = useState({
    value,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    setState({
      value: Array.isArray(state.value) ? value : [value],
    });
  }, [value]);

  const selectedItem = useMemo(() => {
    return dataSource?.find((item) => {
      if (Array.isArray(state.value)) {
        return state.value.includes(item);
      } else {
        return (state.value == item);
      }
    });
  }, [dataSource, state.value]);

  const onShowModal = () => {
    refModalDropDown.current &&
      refModalDropDown.current.show({ value: state.value }, (value) => {
        if (!Array.isArray(value)) value = [value];
        if (props.onChange) props.onChange(value);
        setState({
          value: value,
        });
      });
  };

  return (
    <>
      <Main
        onClick={!disabled ? onShowModal : null}
        className={props.className}
      >
        {selectedItem}
      </Main>
      <ModalSelect
        ref={refModalDropDown}
        dataSource={dataSource}
        title={props.title}
        placeholder={props.placeholder}
      />
    </>
  );
};

export default DropDownList;
