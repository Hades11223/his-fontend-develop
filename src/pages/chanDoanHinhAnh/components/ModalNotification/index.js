import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import { Row, Col } from "antd";
import { Main } from "./styled";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch } from "react-redux";

const ModalNotification = forwardRef((props, ref) => {
  const refLayerHotKey = useRef(stringUtils.guid());
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;
  const refOk = useRef(null);
  const refCancel = useRef(null);
  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: (options = {}, onOk, onCancel) => {
      const {
        title,
        typeModal,
        content,
        detail,
        classNameCancelText,
        cancelText,
        okText,
        showIconSuccess,
        showBtnOk,
        showImg,
      } = options;
      setState({
        show: true,
        title,
        typeModal,
        content,
        detail,
        classNameCancelText,
        cancelText,
        okText,
        showIconSuccess,
        showBtnOk,
        showImg,
      });
      refOk.current = onOk;
      refCancel.current = onCancel;
      onAddLayer({ layerId: refLayerHotKey.current });
      onRegisterHotkey({
        layerId: refLayerHotKey.current,
        hotKeys: [
          {
            keyCode: 27, //ESC
            onEvent: () => {
              setState({
                show: false,
              });
            },
          },
          {
            keyCode: 13, //Enter
            onEvent: () => {
              onOk();
            },
          },
        ],
      });
    },
  }));
  const onOk = () => {
    setState({ show: false });
    if (refOk.current) refOk.current();
  };
  useEffect(() => {
    if (!state.show) {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    }
  }, [state.show]);
  useEffect(() => {
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);
  return (
    <Main width={600} visible={state.show} closable={false}>
      <Row className="container">
        <Col>
          <Row className={`header ${state.typeModal || "error"}`}>
            <h3 className="title">{state.title || "Thông báo"}</h3>
          </Row>
          <div className="modal-content">
            <img src={require("assets/images/welcome/error.png")} alt="" />
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: state.content }}
            />
            <div
              className="detail"
              dangerouslySetInnerHTML={{ __html: state.detail }}
            />
          </div>
          <Row className="button-bottom">
            <div className="fotter">
              {state.showBtnOk && (
                <div
                  className={`btn btn-cancel ${state.classNameOkText || ""}`}
                  onClick={onOk}
                >
                  <span>{state.okText || "Đồng ý"}</span>
                </div>
              )}
            </div>
          </Row>
        </Col>
      </Row>
    </Main>
  );
});

export { ModalNotification };
