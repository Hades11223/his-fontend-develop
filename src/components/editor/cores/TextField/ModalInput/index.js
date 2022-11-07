import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Modal, InputNumber, Input, message } from "antd";
import values from "postcss-modules-values";
export default forwardRef(function ModalInput(props, ref) {
  const [state, _setState] = useState({});
  const refCallback = useRef(null);
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: (option = {}, callback) => {
      setState({
        value: +option.value,
        maxValue: option.itemProps.maxValue || 1000000000000000,
        minValue: option.itemProps.minValue || 0,
        typeNumber: option.itemProps.typeNumber,
        show: true,
      });
      refCallback.current = callback;
    },
  }));
  const onPressEnter = () => {
    var valid = !isNaN(state.value);
    if (valid) {
      if (state.typeNumber == "int") {
        if (Number.isInteger(state.value)) {
          if (state.value > state.minValue && state.value < state.maxValue) {
            if (refCallback.current) {
              const value = {
                text: state.value,
                htmlValue: state.value,
              };
              refCallback.current(value);
              setState({ show: false });
            }
          } else {
            message.error(
              `Giá trị phải lớn ${state.minValue} và nhỏ hơn ${state.maxValue}`
            );
          }
        } else {
          message.error(`Giá trị phải là số nguyên`);
        }
      } else {
        if (state.value > state.minValue && state.value < state.maxValue) {
          if (refCallback.current) {
            const value = {
              text: state.value,
              htmlValue: state.value,
            };
            refCallback.current(value);
            setState({ show: false });
          }
        } else {
          message.error(
            `Giá trị phải lớn ${state.minValue} và nhỏ hơn ${state.maxValue}`
          );
        }
      }
    } else {
      message.error("Giá trị phải là số");
    }
  };
  const onChange = (e) => {
    setState({ value: e });
  };
  const onCancel = () => {
    setState({
      show: false,
    });
  };
  return (
    <Modal
      width={400}
      title="Nhập giá trị"
      visible={state.show}
      onOk={onPressEnter}
      okText="Đồng ý"
      cancelText="Huỷ bỏ"
      cancelButtonProps={{ type: "danger" }}
      onCancel={onCancel}
    >
      <InputNumber
        placeholder="Nhập giá trị"
        type="number"
        autoFocus={true}
        style={{ width: "100%" }}
        placeholder="Nhập giá trị"
        onChange={onChange}
        onPressEnter={onPressEnter}
        value={state.value}
      />
    </Modal>
  );
});
