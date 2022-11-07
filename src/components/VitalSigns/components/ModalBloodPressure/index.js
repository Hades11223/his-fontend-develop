import React, {
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
} from "react";
import { message } from "antd";
import { handleBloodPressure } from "utils/vital-signs/canvas-utils";
import { Modal, InputNumber } from "antd";
import { cloneDeep } from "lodash";

const valuesHPTh = [];
for (let i = 30; i <= 380; i++) {
  valuesHPTh.push(i.toString());
}
const ModalBloodPressure = (props, ref) => {
  const refCallBack = useRef(null);
  const [state, setState] = useState({
    show: false,
    systolic: 120,
    diastolic: 90,
  });

  useImperativeHandle(ref, () => ({
    show: ({ value, isHideValueDefault = false }, callback) => {
      let newState = {
        show: true,
        systolic: isHideValueDefault ? null : 120,
        diastolic: isHideValueDefault ? null : 90,
      };
      if (value) {
        newState = { ...newState, ...handleBloodPressure(value) };
      }
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
    if (!state.systolic && !state.diastolic) {
      refCallBack.current && refCallBack.current("");
      setState({
        show: false,
      });
    } else if (+state.systolic <= state.diastolic) {
      message.error(
        "Huyết áp tâm thu cần lớn hơn huyết áp tâm trương nhưng không quá 100 đơn vị "
      );
    } else {
      refCallBack.current &&
        refCallBack.current(state.systolic + "/" + state.diastolic);
      setState({
        show: false,
      });
    }
  };
  const onChange = (type) => (_value) => {
    if (_value == null) _value = "";
    if (type === 1) {
      let newState = cloneDeep(state);
      // changeValueInput(`${_value}/${state.diastolic}`);
      newState.systolic = _value;
      setState(newState);
    } else {
      // changeValueInput(`${state.systolic}/${_value}`);
      let newState = cloneDeep(state);
      newState.diastolic = _value;
      setState(newState);
    }
  };

  return (
    <Modal
      width={400}
      title="Nhập giá trị huyết áp"
      visible={state.show}
      onOk={_onOK}
      okText="Đồng ý"
      cancelText="Huỷ bỏ"
      onCancel={onCancel}
      cancelButtonProps={{ type: "danger" }}
    >
      <div style={{ fontSize: 17, fontWeight: "bold" }}>Huyết áp tâm thu</div>
      <InputNumber
        min={0}
        style={{ width: "100%", marginBottom: 10 }}
        // max={10}
        placeholder="Nhập giá trị"
        // step={0.1}
        onChange={onChange(1)}
        autoFocus={true}
        value={state.systolic}
        onPressEnter={_onOK}
      />
      <div style={{ fontSize: 17, fontWeight: "bold" }}>
        Huyết áp tâm trương
      </div>
      <InputNumber
        min={0}
        // max={state.systolic}
        style={{ width: "100%", marginBottom: 10 }}
        // max={10}
        placeholder="Nhập giá trị"
        // step={0.1}
        onChange={onChange(2)}
        value={state.diastolic}
        onPressEnter={_onOK}
      />
    </Modal>
  );
};

export default forwardRef(ModalBloodPressure);
