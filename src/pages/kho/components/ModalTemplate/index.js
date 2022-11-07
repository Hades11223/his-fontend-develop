import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useEffect,
} from "react";
import { useDispatch } from "react-redux";
import { ContentTable, Main, Modal, GlobalStyle } from "./styled";
import stringUtils from "mainam-react-native-string-utils";
const ModalTemplate = (
  {
    children,
    title,
    rightTitle,
    width = 12000,
    closable = true,
    wrapClassName,
    actionLeft,
    actionRight,
    actionCenter,
    bottomActionStyle = {},
    hotKeys = [],
    centered = true,
    zIndex,
    autoFocus,
    ...props
  },
  ref
) => {
  const refLayerHotKey = useRef(stringUtils.guid());

  const {
    phimTat: { onAddLayer, onRemoveLayer, onRegisterHotkey },
  } = useDispatch();

  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };

  useImperativeHandle(ref, () => ({
    show: () => {
      setState({
        show: true,
      });
    },
    hide: () => {
      setState({
        show: false,
      });
    },
  }));
  useEffect(() => {
    if (state.show && hotKeys.length) {
      onAddLayer({ layerId: refLayerHotKey.current });
      onRegisterHotkey({
        layerId: refLayerHotKey.current,
        hotKeys: hotKeys,
      });
    } else {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    }
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, [state.show]);

  const onCancel = () => {
    if (props.onCancel) {
      props.onCancel();
    } else {
      setState({ show: false });
    }
  };

  return (
    <Modal
      visible={state.show}
      onCancel={onCancel}
      footer={null}
      closable={onCancel || closable}
      closableX={closable}
      width={width}
      wrapClassName={`modal-template ${wrapClassName || ""}`}
      centered={centered}
      autoFocus={autoFocus}
      title={
        <div className="title">
          <h2>
            <b>{title}</b>
          </h2>
          <div className="rightTitle">{rightTitle}</div>
        </div>
      }
      zIndex={zIndex}
    >
      <GlobalStyle closable={closable} />
      <Main>
        <ContentTable>{children}</ContentTable>
        {actionLeft || actionRight || actionCenter ? (
          <div className="bottom-action" style={{ ...bottomActionStyle }}>
            {!actionLeft && !actionRight ? (
              <div className="center">{actionCenter}</div>
            ) : (
              <>
                <div className="left">{actionLeft}</div>
                <div className="right">{actionRight}</div>
              </>
            )}
          </div>
        ) : null}
      </Main>
    </Modal>
  );
};

export default forwardRef(ModalTemplate);
