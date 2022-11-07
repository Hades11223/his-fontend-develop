import React, {
  memo,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Modal, InputNumber, Checkbox } from "antd";
const valuesRespiratory = [];
for (let i = 0; i <= 100; i++) {
  valuesRespiratory.push(i.toString());
}

const ModalInputRespiratory = memo(
  forwardRef(({}, ref) => {
    const refCallBack = useRef(null);
    const [state, _setState] = useState({
      show: false,
      value: "20",
    });
    const setState = (data = {}) => {
      _setState((state) => {
        return { ...state, ...data };
      });
    };

    useImperativeHandle(ref, () => ({
      show: ({ value = "" }, callback) => {
        const splitValues = value.toString().split("/");
        setState({
          value: splitValues[0],
          isResuscitationMask: !!splitValues[1],
          show: true,
        });
        refCallBack.current = callback;
      },
    }));
    const onCancel = () => {
      setState({
        show: false,
      });
    };
    const _onOK = () => {
      const textShow = state.isResuscitationMask ? "(bb)" : "";
      refCallBack.current &&
        refCallBack.current(`${state.value}${textShow ? `/${textShow}` : ""}`);
      setState({
        show: false,
      });
    };

    const onChange = (text) => {
      if (!text) text = "";
      setState({
        value: text,
      });
    };

    const handleSetIsResuscitationMask = () => {
      setState({
        isResuscitationMask: !state.isResuscitationMask,
      });
    };

    return (
      <Modal
        width={400}
        title="Nhập giá trị nhịp thở"
        visible={state.show}
        onOk={_onOK}
        okText="Đồng ý"
        cancelText="Huỷ bỏ"
        cancelButtonProps={{ type: "danger" }}
        onCancel={onCancel}
      >
        <div>
          <InputNumber
            min={0}
            style={{ width: "100%", marginBottom: 10 }}
            // max={10}
            placeholder="Nhập giá trị"
            // step={0.1}
            onChange={onChange}
            value={state.value}
            autoFocus={true}
            onPressEnter={_onOK}
          />
          <Checkbox
            onChange={handleSetIsResuscitationMask}
            checked={state.isResuscitationMask}
          >
            Bóp bóng
          </Checkbox>
        </div>
      </Modal>
    );
  })
);
export default ModalInputRespiratory;
