import React, { useEffect, useRef } from "react";
import moment from "moment";
import { openInNewTab } from "utils";
import { useDispatch } from "react-redux";
import { Main } from "./styled";
import ModalNhapLyDo from "pages/kho/components/ModalNhapLyDo";
import Header1 from "pages/kho/components/Header1";
import Action from "../../../Action";
import { Button, DateTimePicker, Select } from "components";
import { Col, Form, Input, Row } from "antd";
import { useStore } from "hook";
import IcSave from "assets/images/kho/ic-save.svg";
import { checkRole } from "utils/role-utils";
import { LOAI_NHAP_XUAT, ROLES } from "constants/index";
import { useTranslation } from "react-i18next";
const { Item } = Form;

const ThongTinPhieuNhap = ({ data = {}, setData = () => {} }) => {
  const { listTongHop } = useStore("hinhThucNhapXuat", []);
  const { listData: listNguonNhapKho } = useStore("nguonNhapKho", []);
  const { listDataTongHop } = useStore("doiTac", []);
  const { t } = useTranslation();
  const { thongTinPhieu } = useStore("phieuNhapXuat", {});

  const {
    nhapKho: { kiemTraSoHoaDon },
    nguonNhapKho: { onSearch: searchNguonNhapKho },
    hinhThucNhapXuat: { getTongHop },
    doiTac: { getListTongHop },
    phieuNhapXuat: { patch },
  } = useDispatch();

  const refModalNhapLyDo = useRef(null);
  const [form] = Form.useForm();
  useEffect(() => {
    getTongHop({ active: true, dsHinhThucNhapXuat: 10, page: "", size: "" });
  }, []);
  const onBlur = (type) => (e) => {
    const value = e?.hasOwnProperty("target")
      ? e.target.value
      : e?.hasOwnProperty("_d")
      ? moment(e._d)
      : e;
    if (type == "soHoaDon") {
      //TODO: check trung hoa don
      kiemTraSoHoaDon({
        [type]: value,
        id: thongTinPhieu?.id ? thongTinPhieu?.id : 0,
        ngayHoaDon: moment(form.getFieldValue("ngayHoaDon")).format(
          "YYYY-MM-DD"
        ),
      });
    }
    if (type == "ngayHoaDon" && e) {
      kiemTraSoHoaDon({
        [type]: moment(value).format("YYYY-MM-DD"),
        id: thongTinPhieu?.id ? thongTinPhieu?.id : 0,
        soHoaDon: thongTinPhieu?.soHoaDon,
      });
    }
  };

  // console.log(thongTinPhieu?.nguoiTaoPhieu);

  useEffect(() => {
    if (thongTinPhieu) {
      let data = {
        tenKho: thongTinPhieu?.kho?.ten,
        nhaCungCapId: thongTinPhieu?.nhaCungCapId,
        tenQuyetDinhThau: thongTinPhieu?.quyetDinhThau?.quyetDinhThau,
        nguonNhapKhoId: thongTinPhieu?.nguonNhapKhoId,
        thoiGianDuyet: moment(thongTinPhieu?.thoiGianDuyet),
        hinhThucNhapXuatId: thongTinPhieu?.hinhThucNhapXuatId,
        soHoaDon: thongTinPhieu?.soHoaDon,
        ngayHoaDon: moment(thongTinPhieu?.ngayHoaDon),
        kyHieuHoaDon: thongTinPhieu?.kyHieuHoaDon,
        soHopDong: thongTinPhieu?.soHopDong,
        ghiChu: thongTinPhieu?.ghiChu,
        tenNguoiTao: thongTinPhieu?.nguoiTaoPhieu?.ten,
        soPhieu: thongTinPhieu?.soPhieu,
      };

      form.setFieldsValue(data);
      let dataSearch = {
        active: true,
        dsLoaiDichVu: thongTinPhieu?.kho?.dsLoaiDichVu,
        thau: !!thongTinPhieu?.quyetDinhThauId,
      };
      searchNguonNhapKho({ dataSearch });
      getListTongHop({
        dsLoaiDoiTac: [20],
        active: true,
        page: "",
        size: "",
        dsLoaiDichVu: thongTinPhieu?.kho?.dsLoaiDichVu,
      });
    }
  }, [thongTinPhieu]);

  const onhandleSubmit = (values) => {
    let payload = {
      nhaCungCapId: values?.nhaCungCapId,
      nguonNhapKhoId: values?.nguonNhapKhoId,
      hinhThucNhapXuatId: values?.hinhThucNhapXuatId,
      soHoaDon: values?.soHoaDon,
      ngayHoaDon: moment(values?.ngayHoaDon).format("YYYY-MM-DD"),
      kyHieuHoaDon: values?.kyHieuHoaDon,
      soHopDong: values?.soHopDong,
      ghiChu: values?.ghiChu,
      id: thongTinPhieu?.id,
      nguoiDuyetId: thongTinPhieu.nguoiTaoPhieu?.id,
      thoiGianDuyet: moment(values?.thoiGianDuyet).format(
        "YYYY-MM-DD HH:mm:ss"
      ),
    };

    patch(payload);
  };
  const onSave = () => {
    form.submit();
  };
  return (
    <Main>
      <Form
        form={form}
        layout="vertical"
        style={{ width: "100%" }}
        onFinish={onhandleSubmit}
      >
        <Header1
          title={t("kho.thongTinPhieuNhap")}
          noPadding={true}
          bottom={10}
          left={0}
        ></Header1>

        <Row gutter={[0, 0]}>
          <Col span={23}>
            <Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/kho/quan-tri-kho")}
                >
                  {t("kho.khoNhap")}
                </div>
              }
              name="tenKho"
              style={{ width: "100%" }}
            >
              <Input disabled></Input>
            </Item>
          </Col>
          <Col span={23}>
            <Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/kho/quan-ly-thau")}
                >
                  {t("kho.quetDinhThau")}
                </div>
              }
              name="tenQuyetDinhThau"
              style={{ width: "100%" }}
            >
              <Input className="input-option" disabled></Input>
            </Item>
          </Col>
          <Col span={23}>
            <Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/doi-tac")}
                >
                  {t("kho.nhaCungCap")}
                </div>
              }
              name="nhaCungCapId"
              rules={[
                {
                  required: true,
                  message: t("kho.vuiLongChonNhaCungCap"),
                },
              ]}
              style={{ width: "100%" }}
            >
              <Select
                allowClear
                showSearch
                placeholder={t("kho.chonNhaCungCap")}
                data={listDataTongHop}
              ></Select>
            </Item>
          </Col>

          <Col span={23}>
            <Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/nguon-nhap-kho")}
                >
                  {t("kho.nguonNhapKho")}
                </div>
              }
              name="nguonNhapKhoId"
              rules={[
                {
                  required: true,
                  message: t("kho.vuiLongChonNguonNhapKho"),
                },
              ]}
              style={{ width: "100%" }}
            >
              <Select
                allowClear
                showSearch
                placeholder={t("kho.vuiLongChonNguonNhapKho")}
                data={listNguonNhapKho}
              ></Select>
            </Item>
          </Col>
          <Col span={23}>
            <Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/hinh-thuc-nhap-xuat")}
                >
                  {t("kho.hinhThucNhap")}
                </div>
              }
              name="hinhThucNhapXuatId"
              style={{ width: "100%" }}
            >
              <Select
                allowClear
                showSearch
                placeholder={t("kho.vuiLongChonHinhThucNhap")}
                data={listTongHop}
              ></Select>
            </Item>
          </Col>

          <Col span={23}>
            <Item
              label={t("kho.soHoaDon")}
              name="soHoaDon"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: t("kho.vuiLongNhapSoHoaDon"),
                },
                {
                  whitespace: true,
                  message: t("kho.vuiLongNhapSoHoaDon"),
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder={t("kho.vuiLongNhapSoHoaDon")}
              />
            </Item>
          </Col>
          <Col span={23}>
            <Item
              label={t("kho.ngayHoaDon")}
              name="ngayHoaDon"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: t("kho.vuiLongChonNgayHoa"),
                },
              ]}
            >
              <DateTimePicker
                style={{ width: "100%" }}
                placeholder={t("kho.vuiLongChonNgayHoa")}
                format="DD / MM / YYYY"
                onBlur={onBlur("ngayHoaDon")}
                showTime={false}
              />
            </Item>
          </Col>

          <Col span={23}>
            <Item
              label={t("kho.kyHieuHoaDon")}
              name="kyHieuHoaDon"
              style={{ width: "100%" }}
            >
              <Input
                className="input-option"
                placeholder={t("kho.vuiLongNhapKyHieuHoaDon")}
              />
            </Item>
          </Col>

          <Col span={23}>
            <Item
              label={t("kho.soHopDong")}
              name="soHopDong"
              style={{ width: "100%" }}
            >
              <Input
                className="input-option"
                placeholder={t("kho.vuiLongNhapSoHopDong")}
              />
            </Item>
          </Col>
          <Col span={23}>
            <Item
              label={t("kho.soPhieu")}
              name="soPhieu"
              style={{ width: "100%" }}
            >
              <Input className="input-option" disabled />
            </Item>
          </Col>
          <Col span={23}>
            <Item
              label={<div className="pointer">{t("kho.thoiGianDuyet")}</div>}
              name="thoiGianDuyet"
              style={{ width: "100%" }}
            >
              <DateTimePicker
                disabled={
                  !checkRole([ROLES["KHO"].SUA_THOI_GIAN_DUYET_NGUOI_DUYET])
                }
                style={{ width: "100%" }}
                placeholder={t("kho.vuiLongChonThoiGianDuyet")}
                // format="DD / MM / YYYY"
                onBlur={onBlur("thoiGianDuyet")}
                showTime={true}
              />
            </Item>
          </Col>
          <Col span={23}>
            <Item
              label={t("kho.ghiChu")}
              name="ghiChu"
              style={{ width: "100%" }}
            >
              <Input.TextArea
                rows={3}
                className="input-option"
                placeholder={t("kho.vuiLongNhapGhiChu")}
              />
            </Item>
          </Col>
          <Col span={23}>
            <Item
              label={t("kho.nguoiLapPhieu")}
              name="tenNguoiTao"
              style={{ width: "100%" }}
            >
              <Input className="input-option" disabled />
            </Item>
          </Col>
        </Row>
      </Form>
      <div className="action">
        <Action />
        {checkRole([ROLES["KHO"].SUA_PHIEU_HOAN_THANH]) &&
          thongTinPhieu?.loaiNhapXuat === LOAI_NHAP_XUAT.NHAP_TU_NCC && (
            <Button
              onClick={onSave}
              type={"primary"}
              minWidth={100}
              rightIcon={<IcSave />}
            >
              Lưu
            </Button>
          )}
      </div>
      <ModalNhapLyDo ref={refModalNhapLyDo} />
    </Main>
  );
};

export default ThongTinPhieuNhap;
