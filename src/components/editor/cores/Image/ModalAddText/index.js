import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import { Input, message } from "antd";
import FontSizeConfig from "components/editor/config/FontSizeConfig";
import { ModalTemplate, Button, InputTimeout } from "components";
import { useTranslation } from "react-i18next";
import { Main } from "./styled";
import { fontSizes } from "../../../config/EditorTool/TextTool/constants";
import Item from "antd/lib/list/Item";

const ModalAddText = ({ ...rest }, ref) => {
  const refModal = useRef(null);
  const { t } = useTranslation();
  const [state, _setState] = useState({
    size: "6",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const refCallback = useRef();
  useImperativeHandle(ref, () => ({
    show: (data = {}, callBack) => {
      const key = Object.keys(fontSizes).find(
        (key) => fontSizes[key] == data.size
      );
      setState({
        show: true,
        text: data.text || "",
        size: key,
      });
      refCallback.current = callBack;
    },
  }));

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  const onOK = (value) => () => {
    if (value) {
      if (!state.text) {
        message.error("Vui lòng nhập chữ");
        return;
      }
      refCallback.current({
        size: state.size,
        text: state.text,
      });
      setState({
        show: false,
      });
    } else {
      setState({
        show: false,
      });
    }
  };
  return (
    <ModalTemplate
      ref={refModal}
      onCancel={onOK(false)}
      title={t("editor.nhapChu")}
      width={520}
      // closable={false}
      // maskClosable={false}
    >
      <Main>
        <label>{t("common.noiDung")}: </label>
        <InputTimeout
          onChange={(e) =>
            setState({
              text: e,
            })
          }
          placeholder={t("editor.nhapChu")}
          value={state?.text || ""}
        ></InputTimeout>
        <div style={{ fontWeight: "600", margin: "10px 0", display: "flex" }}>
          <label>{t("editor.chonKichCoChu")}:</label>
          <FontSizeConfig
            onChange={(e) => {
              setState({
                size: e,
              });
            }}
            value={state.size || "6"}
          ></FontSizeConfig>
        </div>
        <div className="footer-action">
          <Button onClick={onOK(false)} type="default" minWidth={100}>
            {t("common.huy")}
          </Button>
          <Button onClick={onOK(true)} type="primary" minWidth={100}>
            {t("common.dongY")}
          </Button>
        </div>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalAddText);
