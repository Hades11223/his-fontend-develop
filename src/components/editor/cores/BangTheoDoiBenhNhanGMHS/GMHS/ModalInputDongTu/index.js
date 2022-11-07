import React, {
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
} from "react";
import { message } from "antd";
import { Modal, InputNumber } from "antd";
import { cloneDeep } from "lodash";

const ModalInputDongTu = (props, ref) => {
  const refCallBack = useRef(null);
  const [state, setState] = useState({
    show: false,
    left: "",
    right: "",
  });

  useImperativeHandle(ref, () => ({
    show: ({ value = "" }, callback) => {
      const arr = (value || "").split("/");
      let newState = { show: true, left: arr[0] || "", right: arr[1] || "" };
      setState(newState);
      refCallBack.current = callback;
    },
  }));
  const onCancel = () => {
    setState({
      show: false,
    });
  };

  const _onOK = () => {
    if (!state.left && !state.right) {
      refCallBack.current && refCallBack.current("");
      setState({
        show: false,
      });
    } else if (!state.left || !state.right) {
      message.error("Vui lòng nhập đầy đủ giá trị ");
    } else {
      refCallBack.current &&
        refCallBack.current(state.left + "/" + state.right);
      setState({
        show: false,
      });
    }
  };
  const onChange = (type) => (_value) => {
    if (_value == null) _value = "";
    if (type === 1) {
      let newState = cloneDeep(state);
      // changeValueInput(`${_value}/${state.right}`);
      newState.left = _value;
      setState(newState);
    } else {
      // changeValueInput(`${state.left}/${_value}`);
      let newState = cloneDeep(state);
      newState.right = _value;
      setState(newState);
    }
  };

  return (
    <Modal
      width={400}
      title="Nhập giá trị Đồng Tử"
      visible={state.show}
      onOk={_onOK}
      okText="Đồng ý"
      cancelText="Huỷ bỏ"
      onCancel={onCancel}
      cancelButtonProps={{ type: "danger" }}
    >
      <div style={{ fontSize: 17, fontWeight: "bold" }}>Trái</div>
      <InputNumber
        min={0}
        style={{ width: "100%", marginBottom: 10 }}
        // max={10}
        placeholder="Nhập giá trị"
        // step={0.1}
        onChange={onChange(1)}
        autoFocus={true}
        value={state.left}
        onPressEnter={_onOK}
      />
      <div style={{ fontSize: 17, fontWeight: "bold" }}>Phải</div>
      <InputNumber
        min={0}
        // max={state.left}
        style={{ width: "100%", marginBottom: 10 }}
        // max={10}
        placeholder="Nhập giá trị"
        // step={0.1}
        onChange={onChange(2)}
        value={state.right}
        onPressEnter={_onOK}
      />
    </Modal>
  );
};

export default forwardRef(ModalInputDongTu);
