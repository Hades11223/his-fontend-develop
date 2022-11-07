import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import { Modal } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import { Main } from "./styled";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const { warning, confirm } = Modal;

const ModalWarning = (props) => {
  warning({
    title: props.title ? props.title : "Thông báo",
    icon: <WarningOutlined />,
    content: props.content,
    okText: props.okText ? props.okText : "Đồng ý",
    className: "notification",
    onOk() {
      if (props.onOk) props.onOk();
    },
  });
};

const ModalConfirm = (props) => {
  confirm({
    title: props.title ? props.title : "Thông báo",
    icon: <WarningOutlined />,
    content: props.content,
    okText: props.okText ? props.okText : "Đồng ý",
    cancelText: props.cancelText ? props.cancelText : "Hủy",
    className: "notification",
    onOk() {
      if (props.onOk) props.onOk();
    },
    onCancel() {
      if (props.onCancel) props.onCancel();
    },
  });
};

// có 3 loại typeModal
// infoModal
// success
// error
const ModalNotification = (props) => {
  return (
    <Main
      width={props.width}
      visible={props.visible}
      closable={false}
      onCancel={props.onCancel(false)}
    >
      <Row className="container">
        <Col>
          <Row
            className={`header ${props.typeModal ? props.typeModal : "error"}`}
          >
            <h3 className="title">{props.title ? props.title : "Thông báo"}</h3>
          </Row>
          <div className="modal-content">
            <img src={require("assets/images/welcome/error.png")} alt="" />
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: props.content }}
            />
            <div
              className="detail"
              dangerouslySetInnerHTML={{ __html: props.detail }}
            />
          </div>
          z
          <Row className="button-bottom">
            <div
              className={`btn btn-cancel ${
                props.classNameCancelText ? props.classNameCancelText : ""
              }`}
              onClick={() => props.onCancel(false)}
            >
              <span>{props.cancelText ? props.cancelText : "Hủy"}</span>
            </div>
            {props.showBtnOk && (
              <div
                className={`btn btn-accept ${
                  props.classNameOkText ? props.classNameOkText : ""
                }`}
                onClick={() => props.onOk()}
              >
                <span>{props.okText ? props.okText : "Đồng ý"}</span>
                {props.showImg && (
                  <img
                    style={{ paddingLeft: 10 }}
                    src={require(`assets/images/welcome/${
                      props.showIconSuccess ? "icSuccess.png" : "delete3.png"
                    }`)}
                  ></img>
                )}
              </div>
            )}
          </Row>
        </Col>
      </Row>
    </Main>
  );
};

const ModalNotification2 = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const refOk = useRef(null);
  const refCancel = useRef(null);
  const refLayerHotKey = useRef(stringUtils.guid());
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;
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
        classNameOkText,
        showBtnOk,
        showBtnCancel = true,
        showImg,
        rightCancelButton,
        subContent
      } = options;
      setState({
        show: true,
        title,
        typeModal,
        content,
        detail,
        classNameCancelText,
        classNameOkText,
        cancelText,
        okText,
        showIconSuccess,
        showBtnOk,
        showBtnCancel,
        showImg,
        rightCancelButton,
        subContent
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
  const onCancel = () => {
    setState({ show: false });
    if (refCancel.current) refCancel.current();
  };
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
  const handleCancel = () => {
    setState({
      show: false,
    });
  };
  if (!state.show) {
    // remove popup khi đóng,
    // resolved vấn đề 2 popup đè lên nhau, và bị che mất
    return <></>;
  }
  return (
    <Main
      width={state.width}
      visible={state.show}
      closable={false}
      typeModal={state.typeModal}
      maskClosable={true}
      mask={true}
      onCancel={handleCancel}
    >
      <Row className="container">
        <Col>
          <Row className={`header header-2 ${state.typeModal || "error"}`}>
            <h3 className="title title-2">{state.title || "Thông báo"}</h3>
          </Row>
          <div className="modal-content modal-content-2">
            {state.typeModal == "warning" ? (
              <img src={require("assets/images/welcome/warning.png")} alt="" />
            ) : (
              <img src={require("assets/images/welcome/error.png")} alt="" />
            )}

            <div
              className="content content-2"
              dangerouslySetInnerHTML={{ __html: state.content }}
            />
            <div
              className="detail"
              dangerouslySetInnerHTML={{ __html: state.detail }}
            />
          </div>
          <div
            className="sub-content"
            dangerouslySetInnerHTML={{ __html: state.subContent }}
          />
          <Row
            className={`button-bottom button-bottom-2 ${
              state.rightCancelButton ? "right" : ""
            }`}
          >
            {state.showBtnCancel && (
              <div
                className={`btn btn-cancel btn-cancel-2 ${
                  state.classNameCancelText || ""
                }`}
                onClick={onCancel}
              >
                <span>{state.cancelText || t("common.huy")}</span>
              </div>
            )}
            {state.showBtnOk && (
              <div
                className={`btn btn-accept btn-accept-2 ${
                  state.classNameOkText || ""
                }`}
                onClick={onOk}
              >
                <span>{state.okText || t("common.dongY")}</span>
                {state.showImg && (
                  <img
                    style={{ paddingLeft: 10 }}
                    src={
                      state.showIconSuccess
                        ? require(`assets/images/welcome/icSuccess.png`)
                        : require(`assets/images/welcome/iconRemove.png`)
                    }
                  ></img>
                )}
              </div>
            )}
          </Row>
        </Col>
      </Row>
    </Main>
  );
});

export { ModalConfirm, ModalWarning, ModalNotification, ModalNotification2 };
