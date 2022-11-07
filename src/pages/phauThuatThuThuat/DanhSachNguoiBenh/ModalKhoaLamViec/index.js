import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Main } from "./styled";
import { Button, ModalTemplate, Select } from "components";
import IcSave from "assets/svg/ic-save.svg";
import { useTranslation } from "react-i18next";
import { useStore } from "hook";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { message } from "antd";

const ModalKhoaLamViec = (props, ref) => {
  const { t } = useTranslation();

  const refModal = useRef(null);
  const refCallback = useRef(null);

  const listKhoaTheoTaiKhoan = useStore("khoa.listKhoaTheoTaiKhoan", []);

  const [state, _setState] = useState({ show: false });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: (data = {}, onOK) => {
      setState({ show: true, khoaLamViec: data });
      refCallback.current = onOK;
    },
  }));

  useEffect(() => {
    if (state?.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state?.show]);

  const onCancel = () => {
    if (state?.khoaLamViec) {
      setState({ show: false });
    } else {
      message.error(t("quanLyNoiTru.vuiLongChonKhoaLamViec"));
    }
  };

  const onSave = () => {
    refCallback.current(state?.khoaLamViec);
    onCancel();
  };
  const onChange = (e, data) => {
    setState({ khoaLamViec: data?.lists });
  };
  return (
    <ModalTemplate
      width={400}
      ref={refModal}
      title={t("quanLyNoiTru.chonKhoaLamViec")}
      onCancel={onCancel}
      actionLeft={
        <Button.Text
          type="primary"
          minWidth={100}
          onClick={onCancel}
          iconHeight={15}
          leftIcon={<IcArrowLeft />}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        <Button
          type="primary"
          minWidth={100}
          onClick={onSave}
          iconHeight={20}
          rightIcon={<IcSave />}
        >
          {t("common.luu")}
        </Button>
      }
    >
      <Main>
        <Select
          onChange={onChange}
          data={listKhoaTheoTaiKhoan}
          style={{ width: "100%" }}
          value={state?.khoaLamViec?.id}
          // defaultValue={listKhoaTheoTaiKhoan[0]}
        />
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalKhoaLamViec);
