import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Form, Input } from "antd";
import { Main } from "./styled";
import { useDispatch } from "react-redux";
import { Button, DateTimePicker, ModalTemplate, Select } from "components";
import IconSave from "assets/images/thuNgan/icSave.png";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useEnum, useStore } from "hook";
import {
  ENUM,
  KET_QUA_DIEU_TRI,
  HUONG_DIEU_TRI_NOI_TRU,
} from "constants/index";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { firstLetterWordUpperCase } from "utils";

const ModalKetThucDieuTri = (props, ref) => {
  const { t } = useTranslation();
  const { onShowModalChuyenVien } = props;
  const [form] = Form.useForm();
  const refModal = useRef(null);
  const [listlyDoTuVong] = useEnum(ENUM.LY_DO_TU_VONG);
  const [listdiaDiemTuVong] = useEnum(ENUM.DIA_DIEM_TU_VONG);
  const [listhuongDieuTriNoiTru] = useEnum(ENUM.HUONG_DIEU_TRI_NOI_TRU);
  const [listketQuaDieuTri] = useEnum(ENUM.KET_QUA_DIEU_TRI);
  const [listgioiTinh] = useEnum(ENUM.GIOI_TINH);
  const { infoPatient } = useStore("danhSachNguoiBenhNoiTru", {});
  const { nbThongTinRaVien } = useStore("nbDotDieuTri", {});
  const {
    danhSachNguoiBenhNoiTru: { ketThucDieuTri, getNbNoiTruById },
    nbDotDieuTri: { getThongTinRaVien, updateData },
  } = useDispatch();
  const [state, _setState] = useState({ show: false, tuVong: false });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: () => {
      updateData({ coTheRaVien: true });
      setState({ show: true });
    },
    hide: () => {
      setState({ show: false });
    },
  }));

  useEffect(() => {
    if (state?.show) {
      refModal.current && refModal.current.show();
      let info = {
        ...nbThongTinRaVien,
        thoiGianHenKham:
          nbThongTinRaVien?.thoiGianHenKham &&
          moment(nbThongTinRaVien?.thoiGianHenKham),
        thoiGianRaVien: nbThongTinRaVien?.thoiGianRaVien
          ? moment(nbThongTinRaVien?.thoiGianRaVien)
          : moment(),
        thoiGianTuVong:
          nbThongTinRaVien?.thoiGianTuVong &&
          moment(nbThongTinRaVien?.thoiGianTuVong),
      };
      form.setFieldsValue(info);
      if (nbThongTinRaVien?.ketQuaDieuTri === KET_QUA_DIEU_TRI.TU_VONG) {
        setState({ tuVong: true, isDisplayThoiGianHenKham: true });
      }
      if (
        nbThongTinRaVien?.ketQuaDieuTri === HUONG_DIEU_TRI_NOI_TRU.TRON_VIEN ||
        nbThongTinRaVien?.huongDieuTri === HUONG_DIEU_TRI_NOI_TRU.CHUYEN_VIEN
      ) {
        setState({ isDisplayThoiGianHenKham: true });
      }
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state?.show, nbThongTinRaVien]);

  useEffect(() => {}, []);
  const gioiTinh =
    (listgioiTinh || []).find((item) => item.id === infoPatient?.gioiTinh) ||
    {};

  const onHanldeSubmit = (values) => {
    const payload = {
      ...values,
      id: infoPatient.id,
      thoiGianHenKham:
        values.thoiGianHenKham &&
        moment(values.thoiGianHenKham).format("YYYY-MM-DD HH:mm:ss"),
      thoiGianRaVien:
        values.thoiGianRaVien &&
        moment(values.thoiGianRaVien).format("YYYY-MM-DD HH:mm:ss"),
      thoiGianTuVong:
        values.thoiGianTuVong &&
        moment(values.thoiGianTuVong).format("YYYY-MM-DD HH:mm:ss"),
    };
    ketThucDieuTri(payload).then(() => {
      getNbNoiTruById(infoPatient.id);
      getThongTinRaVien(infoPatient.id).then((s) => {
        if (s?.huongDieuTri === 40) {
          onShowModalChuyenVien(s.dsCdChinhId);
        }
      });
      onCancel();
    });
  };
  const onCancel = () => {
    setState({ show: false, tuVong: false });
    form.resetFields();
  };
  const onSubmit = () => {
    form.submit();
  };

  const onChangeFlied = (key) => (e) => {
    let tuVong = false;
    let isDisplayThoiGianHenKham = false;
    let ketQuaDieuTri = form.getFieldValue("ketQuaDieuTri");
    let tinhTrangRaVien = form.getFieldValue("huongDieuTri");
    if (key === "ketQuaDieuTri") {
      if (e === KET_QUA_DIEU_TRI.TU_VONG) {
        tuVong = true;
        isDisplayThoiGianHenKham = true;
      } else if (
        [
          HUONG_DIEU_TRI_NOI_TRU.TRON_VIEN,
          HUONG_DIEU_TRI_NOI_TRU.CHUYEN_VIEN,
        ].includes(tinhTrangRaVien)
      ) {
        isDisplayThoiGianHenKham = true;
      }
    }

    if (key === "tinhTrangRaVien") {
      if (
        [
          HUONG_DIEU_TRI_NOI_TRU.TRON_VIEN,
          HUONG_DIEU_TRI_NOI_TRU.CHUYEN_VIEN,
        ].includes(e)
      ) {
        isDisplayThoiGianHenKham = true;
      } else if (ketQuaDieuTri === KET_QUA_DIEU_TRI.TU_VONG) {
        isDisplayThoiGianHenKham = true;
      }
    }

    setState({
      tuVong: tuVong,
      isDisplayThoiGianHenKham: isDisplayThoiGianHenKham,
    });
  };
  let tuoi =
    infoPatient?.thangTuoi > 36 || infoPatient?.tuoi
      ? `${infoPatient?.tuoi} ${t("common.tuoi")}`
      : `${infoPatient?.thangTuoi} ${t("common.thang")}`;
  return (
    <ModalTemplate
      width={800}
      ref={refModal}
      title={t("quanLyNoiTru.ketThucDieuTri")}
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
      closable={false}
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
            label={t("quanLyNoiTru.tinhTrangRaVien")}
            name="huongDieuTri"
            rules={[
              {
                required: true,
                message: t("quanLyNoiTru.vuiLongChonTinhTrangRaVien"),
              },
            ]}
          >
            <Select
              data={listhuongDieuTriNoiTru}
              placeholder={t("quanLyNoiTru.tinhTrangRaVien")}
              onChange={onChangeFlied("tinhTrangRaVien")}
            />
          </Form.Item>
          <Form.Item
            label={t("quanLyNoiTru.ketQuaDieuTri")}
            name="ketQuaDieuTri"
            rules={[
              {
                required: true,
                message: t("quanLyNoiTru.vuiLongChonKetQuaDieuTri"),
              },
            ]}
          >
            <Select
              data={listketQuaDieuTri}
              onChange={onChangeFlied("ketQuaDieuTri")}
              placeholder={t("quanLyNoiTru.ketQuaDieuTri")}
            />
          </Form.Item>
          {state?.tuVong && (
            <Form.Item
              label={t("quanLyNoiTru.lyDoTuVong")}
              name="lyDoTuVong"
              rules={[
                {
                  required: state?.tuVong,
                  message: t("quanLyNoiTru.vuiLongChonLyDoTuVong"),
                },
              ]}
            >
              <Select
                data={listlyDoTuVong}
                placeholder={t("quanLyNoiTru.lyDoTuVong")}
              />
            </Form.Item>
          )}
          {state?.tuVong && (
            <Form.Item
              label={t("quanLyNoiTru.diaDiemTuVong")}
              name="diaDiemTuVong"
              rules={[
                {
                  required: state?.tuVong,
                  message: t("quanLyNoiTru.vuiLongChonDiaDiemTuVong"),
                },
              ]}
            >
              <Select
                data={listdiaDiemTuVong}
                placeholder={t("quanLyNoiTru.diaDiemTuVong")}
              />
            </Form.Item>
          )}
          {state?.tuVong && (
            <Form.Item
              label={t("quanLyNoiTru.thoiGianTuVong")}
              name="thoiGianTuVong"
              rules={[
                {
                  required: state?.tuVong,
                  message: t("quanLyNoiTru.vuiLongNhapThoiGianTuVong"),
                },
              ]}
            >
              <DateTimePicker
                placeholder={t("quanLyNoiTru.thoiGianTuVong")}
                disabledDate={(date) =>
                  moment(date).isBefore(infoPatient?.thoiGianVaoVien)
                }
              />
            </Form.Item>
          )}
          {state?.tuVong && (
            <Form.Item
              label={t("quanLyNoiTru.ghiChuTuVong")}
              name="ghiChuTuVong"
              rules={[
                {
                  required: state?.tuVong,
                  message: t("quanLyNoiTru.vuiLongNhapGhiChuTuVong"),
                },
              ]}
            >
              <Input placeholder={t("quanLyNoiTru.ghiChuTuVong")}></Input>
            </Form.Item>
          )}
          <Form.Item
            label={t("quanLyNoiTru.thoiGianRaVien")}
            name="thoiGianRaVien"
            rules={[
              {
                required: true,
                message: t("quanLyNoiTru.vuiLongNhapThoiGianRaVien"),
              },
            ]}
          >
            <DateTimePicker
              placeholder={t("quanLyNoiTru.thoiGianRaVien")}
              disabledDate={(date) =>
                moment(date).isBefore(infoPatient?.thoiGianVaoVien)
              }
            />
          </Form.Item>
          {!state?.isDisplayThoiGianHenKham && (
            <Form.Item
              label={t("quanLyNoiTru.thoiGianHenKham")}
              name="thoiGianHenKham"
            >
              <DateTimePicker
                placeholder={t("quanLyNoiTru.thoiGianHenKham")}
                disabledDate={(date) =>
                  moment(date).isBefore(infoPatient?.thoiGianVaoVien)
                }
              />
            </Form.Item>
          )}
        </Form>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalKetThucDieuTri);
