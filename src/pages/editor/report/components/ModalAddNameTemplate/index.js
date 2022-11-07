import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { InputTimeout, Button, ModalTemplate } from "components";
import { useTranslation } from "react-i18next";
import { Main } from "./styled";
import { message } from "antd";
const ModalAddNameTemplate = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const [state, _setState] = useState({
    text: "",
    show: false,
  });
  const refCallback = useRef(null);
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: (data = {}, callBack) => {
      setState({
        text: "",
      });
      refModal.current.show();
      refCallback.current = callBack;
    },
  }));
  const onOK = () => (ok) => {
    if (ok) {
      if (!state.text) {
        message.error(t("editor.tenDuLieuMauKhuongDuocDeTrong"));
        return;
      }
      refCallback.current(state.text);
      refModal.current.hide();
    } else {
      refModal.current.hide();
    }
  };
  return (
    <ModalTemplate
      ref={refModal}
      onCancel={onOK(false)}
      title={t("editor.nhapMauTenDuLieuMau")}
      width={520}
    >
      <Main>
        <label>{t("editor.tenDulieuMau")}: </label>
        <InputTimeout
          onChange={(e) =>
            setState({
              text: e,
            })
          }
          placeholder={t("editor.nhapMauTenDuLieuMau")}
          value={state?.text || ""}
        ></InputTimeout>
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

export default forwardRef(ModalAddNameTemplate);
