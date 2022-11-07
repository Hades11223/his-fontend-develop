import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Main } from "./styled";
import { InputNumber, Button } from "antd";
function InputValue(props, ref) {
  const refHide = useRef(null);
  const refCallback = useRef(null);
  const [state, _setState] = useState({
    search: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: (x, y, text, callback) => {
      setState({
        top: y + 10,
        left: x,
        show: true,
        value: text + "",
      });
      if (refHide.current) {
        try {
          clearTimeout(refHide.current);
        } catch (error) {}
      }
      refHide.current = setTimeout(() => {
        setState({
          show: false,
        });
      }, 2000);
      refCallback.current = callback;
    },
  }));

  const onFocus = () => {
    if (refHide.current) {
      try {
        clearTimeout(refHide.current);
      } catch (error) {}
    }
  };
  const onBlur = () => {
    refHide.current = setTimeout(() => {
      setState({
        show: false,
      });
    }, 2000);
  };
  const onCancel = () => {
    setState({ show: false });
  };
  const onTextChange = (value) => {
    setState({ value: value });
  };
  const onOK = () => {
    setState({ show: false });
    if (refCallback.current) refCallback.current(state.value);
  };
  if (!state.show) return null;
  return (
    <Main
      style={{
        top: state.top || 0,
        left: state.left || 0,
      }}
      {...props}
    >
      <div className="card">
        <div className="input-value-header">Nhập giá trị</div>
        <InputNumber
          min={0}
          onChange={onTextChange}
          placeholder={"Nhập giá trị"}
          value={state.value}
          onFocus={onFocus}
          onBlur={onBlur}
          step={0.1}
        />
        <div className="action-bottom">
          <Button type="danger" onClick={onCancel}>
            Huỷ
          </Button>
          <Button type="primary" onClick={onOK}>
            Đồng ý
          </Button>
        </div>
      </div>
    </Main>
  );
}
export default forwardRef(InputValue);
