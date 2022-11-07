import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Modal, InputNumber, Input, message } from "antd";
import ModalBloodPressure from "../ModalBloodPressure";
import ModalInputRespiratory from "../ModalInputRespiratory";

export default forwardRef(function ModalInput(props, ref) {
  const refModalBloodPressure = useRef(null);
  const refModalInputRespiratory = useRef(null);

  const [state, _setState] = useState({
    search: "",
  });
  const refCallback = useRef(null);
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: (option = {}, callback) => {
      if (option.type == 0) {
        refModalBloodPressure.current &&
          refModalBloodPressure.current.show(
            {
              value: option.value || "",
            },
            (value) => {
              callback && callback(value, option.type);
            }
          );
      } else {
        if (option.type == 1) {
          refModalInputRespiratory.current &&
            refModalInputRespiratory.current.show(
              {
                value: option.value || "",
              },
              (value) => {
                callback && callback(value, option.type);
              }
            );
        } else {
          if (option.type == 2 || option.type == 3) {
            refCallback.current = callback;
            setState({
              value: option.value,
              type: option.type,
              keyboardType: option.keyboardType,
              dmChiSo: option.dmChiSo,
              show: true,
            });
          }
        }
      }
    },
  }));

  const onChange = (value) => {
    setState({ value: value });
  };
  const onChangeText = (e) => {
    setState({ value: e.target.value });
  };
  const onCancel = () =>
    setState({
      show: false,
    });

  const onOK = (value) => {
    if (refCallback.current)
      refCallback.current(
        value || (state.value ? state.value + "" : ""),
        state.type
      );
    setState({ show: false });
  };

  const onPressEnter = () => {
    if (
      state.value &&
      (state.dmChiSo?.giaTriLonNhat || state.dmChiSo?.giaTriNhoNhat)
    ) {
      if (
        state.dmChiSo?.giaTriLonNhat &&
        state.value > state.dmChiSo?.giaTriLonNhat
      ) {
        message.error(
          "Vui lòng nhập giá trị nhỏ hơn " + state.dmChiSo?.giaTriLonNhat
        );
        return;
      }
      if (
        state.dmChiSo?.giaTriNhoNhat &&
        state.value < state.dmChiSo?.giaTriNhoNhat
      ) {
        message.error(
          "Vui lòng nhập giá trị lớn hơn " + state.dmChiSo?.giaTriNhoNhat
        );
        return;
      }
    }
    onOK(state.value || "");
  };
  return (
    <>
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
        {/* {JSON.stringify(state.dmChiSo)} */}
        {state.dmChiSo?.giaTriLonNhat || state.dmChiSo?.giaTriNhoNhat ? (
          <InputNumber
            min={0}
            autoFocus={true}
            style={{ width: "100%" }}
            // max={10}
            placeholder="Nhập giá trị"
            // step={0.1}
            onChange={onChange}
            value={state.value}
            onPressEnter={onPressEnter}
          />
        ) : (
          <Input
            autoFocus={true}
            style={{ width: "100%" }}
            // max={10}
            placeholder="Nhập giá trị"
            // step={0.1}
            onChange={onChangeText}
            value={state.value}
            onPressEnter={onPressEnter}
          />
        )}
      </Modal>

      <ModalBloodPressure ref={refModalBloodPressure} />
      <ModalInputRespiratory ref={refModalInputRespiratory} />
    </>
  );
});
