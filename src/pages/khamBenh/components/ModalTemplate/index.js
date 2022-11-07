import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
} from "react";
import { useDispatch } from "react-redux";
import { Row } from "antd";
import { Main, ModalStyled } from "./styled";
import IconCancel from "assets/images/khamBenh/iconCancel.png";
import stringUtils from "mainam-react-native-string-utils";

export const ModalTemplate = forwardRef(
  ({ width, layerId, children, title, onCancel, footer, ...props }, ref) => {
    const refLayerHotKey = useRef(stringUtils.guid());

    const [state, _setState] = useState({
      show: false,
    });
    const setState = (data = {}) => {
      _setState((state) => {
        return { ...state, ...data };
      });
    };

    const {
      phimTat: { onAddLayer, onRemoveLayer, onRegisterHotkey },
    } = useDispatch();

    useImperativeHandle(ref, () => ({
      show: (option = {}) => {
        setState({
          show: true,
        });
        if (!layerId)
          //nếu không truyền vào layerId thì mặc định tự tạo 1 layer mới
          onAddLayer({ layerId: refLayerHotKey.current });
        onRegisterHotkey({
          layerId: layerId || refLayerHotKey.current,
          hotKeys: [
            {
              keyCode: 27, //ESC
              onEvent: () => {
                onCloseModal();
              },
            },
          ],
        });
      },
      hide: () => {
        setState({
          show: false,
        });
      },
    }));
    useEffect(() => {
      if (layerId) {
        onRemoveLayer({ layerId: refLayerHotKey.current });
      }
    }, [layerId]);
    const onCloseModal = () => {
      if (onCancel && onCancel()) return;
      setState({
        show: false,
      });
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
      <ModalStyled
        visible={state.show}
        closable={false}
        footer={null}
        width={width}
        onCancel={onCloseModal}
      >
        <Main>
          <Row className="header-table">
            <div className="header-table__left">{title}</div>
            <div className="header-table__right">
              <img src={IconCancel} alt="IconCancel" onClick={onCloseModal} />
            </div>
          </Row>
          <div className="modal-content">{children}</div>
          {!!footer && <div className="modal-footer">{footer}</div>}
        </Main>
      </ModalStyled>
    );
  }
);

export default ModalTemplate;
