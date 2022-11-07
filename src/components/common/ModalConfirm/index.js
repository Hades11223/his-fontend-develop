import React, {
  useImperativeHandle,
  useState,
  useRef,
  forwardRef,
} from "react";
import { Main } from "./styled";
import { Button } from "antd";
const ModalConfirmAllocation = (props, ref) => {
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
    show: (option = {}, callback) => {
      setState({
        show: true,
        ...option,
      });
      refCallback.current = callback;
    },
  }));
  const onOK = (ok) => () => {
    setState({ show: false });
    if (ok) if (refCallback.current) refCallback.current();
  };

  return (
    <Main
      visible={state.show}
      style={{ maxWidth: 420 }}
      bodyStyle={{ padding: "24px 0 0 0" }}
      closable={false}
      centered
      onCancel={onOK(false)}
      footer={
        <div style={{ textAlign: "center" }}>
          <Button
            type="danger"
            style={{
              minWidth: 100,
            }}
            onClick={onOK(false)}
          >
            Huỷ
          </Button>
          <Button
            type="primary"
            style={{
              minWidth: 100,
            }}
            onClick={onOK(true)}
          >
            Xác nhận
          </Button>
        </div>
      }
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <div className="modal-des">
        <h4 className="title-des">{state.title}</h4>
        <p>
          <span className="detail-txt">{state.message}</span>
        </p>
      </div>
    </Main>
  );
};

export default forwardRef(ModalConfirmAllocation);
