import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Form } from "antd";
import { Main } from "./styled";
import { useDispatch } from "react-redux";
import { Button, DateTimePicker, ModalTemplate } from "components";
import IconSave from "assets/images/thuNgan/icSave.png";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useEnum, useStore } from "hook";
import { ENUM } from "constants/index";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { firstLetterWordUpperCase } from "utils";

const ModalDuKienRaVien = (props, ref) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const refModal = useRef(null);
  const [listgioiTinh] = useEnum(ENUM.GIOI_TINH);
  const { infoPatient } = useStore("danhSachNguoiBenhNoiTru", {});
  const {
    danhSachNguoiBenhNoiTru: { duKienRaVien, getNbNoiTruById },
  } = useDispatch();
  const [state, _setState] = useState({ show: false });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: () => {
      setState({ show: true });
    },
  }));

  useEffect(() => {
    if (state?.show) {
      refModal.current && refModal.current.show();
      form.setFieldsValue({ thoiGianRaVien: moment() });
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state?.show]);

  useEffect(() => {}, []);
  const gioiTinh =
    (listgioiTinh || []).find((item) => item.id === infoPatient?.gioiTinh) ||
    {};

  const onHanldeSubmit = (values) => {
    const payload = {
      id: infoPatient.id,
      thoiGianRaVien:
        values.thoiGianRaVien &&
        moment(values.thoiGianRaVien).format("YYYY-MM-DD HH:mm:ss"),
    };
    duKienRaVien(payload).then(() => {
      getNbNoiTruById(infoPatient.id);
      onCancel();
    });
  };

  const onCancel = () => {
    setState({ show: false });
    form.resetFields();
  };
  const onSubmit = () => {
    form.submit();
  };

  let tuoi =
    infoPatient?.thangTuoi > 36 || infoPatient?.tuoi
      ? `${infoPatient?.tuoi} ${t("common.tuoi")}`
      : `${infoPatient?.thangTuoi} ${t("common.thang")}`;
  return (
    <ModalTemplate
      width={500}
      ref={refModal}
      title={t("quanLyNoiTru.duKienRaVien")}
      rightTitle={
        <>
          <span className="font-color">
            {firstLetterWordUpperCase(infoPatient?.tenNb)}
          </span>
          {gioiTinh.ten && (
            <span className="normal-weight"> - {gioiTinh.ten} </span>
          )}

          {tuoi && <span className="normal-weight">- {tuoi}</span>}
        </>
      }
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
          onClick={onSubmit}
          iconHeight={30}
          rightIcon={<img src={IconSave} alt={IconSave} />}
        >
          {t("common.luu")}
        </Button>
      }
    >
      <Main>
        <Form
          form={form}
          layout="vertical"
          onFinish={onHanldeSubmit}
          className="form-custom"
        >
          <Form.Item
            label={t("quanLyNoiTru.thoiGianDuKienRaVien")}
            name="thoiGianRaVien"
            rules={[
              {
                required: true,
                message: t("quanLyNoiTru.vuiLongNhapThoiGianDuKienRaVien"),
              },
            ]}
          >
            <DateTimePicker
              placeholder={t("quanLyNoiTru.thoiGianDuKienRaVien")}
              disabledDate={(date) => moment(date).isBefore(moment())}
            />
          </Form.Item>
        </Form>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalDuKienRaVien);
