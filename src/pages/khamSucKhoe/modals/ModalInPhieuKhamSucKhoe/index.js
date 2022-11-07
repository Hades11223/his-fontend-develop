import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import { Main } from "./styled";
import { Button, ModalTemplate } from "components";
import { useTranslation } from "react-i18next";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import IcPrint from "assets/svg/chuanDoanHinhAnh/print.svg";
import { InputNumber } from "antd";

const ModalInPhieuKhamSucKhoe = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const refCallback = useRef(null);
  //state
  const [state, _setState] = useState({
    show: false,
    tuSo: null,
    denSo: null,
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useImperativeHandle(ref, () => ({
    show: (data = {}, onOk) => {
      setState({
        show: true,
        title: data?.title,
      });
      refCallback.current = onOk;
    },
  }));

  //function
  const onClose = () => {
    setState({ show: false, tuSo: null, denSo: null });
  };

  const onSave = () => {
    refCallback.current({ tuSo: state.tuSo, denSo: state.denSo });
    onClose();
  };

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  const onChange = (key) => (e) => {
    setState({
      [key]: e,
    });
  };

  return (
    <ModalTemplate
      ref={refModal}
      width={350}
      onCancel={onClose}
      title={state?.title}
      closable={false}
    >
      <Main>
        <div className="form">
          <div className="form-item">
            <label>{t("khamSucKhoe.tuStt")}</label>
            <InputNumber
              value={state.tuSo}
              min={0}
              placeholder="Nhập số"
              onChange={onChange("tuSo")}
            />
          </div>
          <div className="form-item">
            <label>{t("khamSucKhoe.denStt")}</label>
            <InputNumber
              value={state.denSo}
              min={0}
              placeholder="Nhập số"
              onChange={onChange("denSo")}
            />
          </div>
        </div>

        <div className="footer-action">
          <Button.Text
            type="primary"
            leftIcon={<IcArrowLeft />}
            onClick={onClose}
          >
            {t("common.quayLai")}
          </Button.Text>

          <Button
            type="primary"
            onClick={onSave}
            minWidth={100}
            rightIcon={<IcPrint />}
          >
            {t("common.in")}
          </Button>
        </div>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalInPhieuKhamSucKhoe);
