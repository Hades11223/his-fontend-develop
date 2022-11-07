import React, { memo, useRef } from "react";
import { useDispatch } from "react-redux";
import { Avatar, Row, Col, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { PatientInfoWrapper, Main } from "./styled";
import Image from "components/Image";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useEnum, useStore } from "hook";
import { ENUM } from "constants/index";
import IcEye from "assets/svg/ic-eye.svg";
import IcEdit from "assets/svg/ic-edit.svg";
import IcHsBa from "assets/svg/ic-hsba.svg";
import ModalChinhSuaThongTin from "../../../../tiepDon/TiepDon/ModalChinhSuaThongTin";
import ModalHoSoBenhAn from "pages/quanLyNoiTru/danhSachNguoiBenhNoiTru/ChiTietNguoiBenhNoiTru/Modal/ModalHoSoBenhAn";

const ThongTinBenhNhan = () => {
  const thongTinBenhNhan = useStore("nbDotDieuTri.thongTinBenhNhan");
  const [listTrangThaiNb] = useEnum(ENUM.TRANG_THAI_NB);
  const [listGioiTinh] = useEnum(ENUM.GIOI_TINH);
  const refModalChinhSuaThongTin = useRef(null);
  const refModalHoSoBenhAn = useRef(null);
  const {
    nbDotDieuTri: { getById },
  } = useDispatch();

  const { t } = useTranslation();

  const gioiTinh =
    (listGioiTinh || []).find(
      (item) => item.id === thongTinBenhNhan?.gioiTinh
    ) || {};
  const age = thongTinBenhNhan?.tuoi
    ? ` - ${thongTinBenhNhan?.tuoi} ${t("common.tuoi")}`
    : "";
  const onShowThongTinNb = (isEdit) => {
    refModalChinhSuaThongTin.current &&
      refModalChinhSuaThongTin.current.show(
        { id: thongTinBenhNhan.id, isEdit },
        () => {
          getById(thongTinBenhNhan.id);
        }
      );
  };
  const onShowHoSoBenhAn = () => {
    refModalHoSoBenhAn.current &&
      refModalHoSoBenhAn.current.show({
        nbThongTinId: thongTinBenhNhan?.nbThongTinId,
        nbDotDieuTriId: thongTinBenhNhan?.id,
      });
  };

  return (
    <Main>
      <PatientInfoWrapper>
        <div className="img-avatar">
          {thongTinBenhNhan?.anhDaiDien ? (
            <Image
              preview={false}
              src={thongTinBenhNhan?.anhDaiDien}
              width={100}
              height={100}
            />
          ) : (
            <Avatar icon={<UserOutlined />} size={100} shape={"square"} />
          )}
        </div>

        <div className="patient-content">
          <div className="head">
            <Col span={10}>
              <div style={{ display: "flex" }}>
                <div className="benhAn">
                  {t("common.maNb")}: {thongTinBenhNhan?.maNb} -{" "}
                  {t("common.maHs")}: {thongTinBenhNhan?.maHoSo} -{" "}
                  {t("common.maBA")}: {thongTinBenhNhan?.maBenhAn}
                </div>
              </div>
            </Col>
            <Col span={14} className="bunch-icon">
              <div>
                <div style={{ marginRight: "20px" }}>
                  {t("common.khoa")}: {thongTinBenhNhan?.tenKhoaNb}
                </div>
                {t("common.trangThai")}:{" "}
                {
                  listTrangThaiNb.find(
                    (x) => x.id === thongTinBenhNhan?.trangThai
                  )?.ten
                }
              </div>
              <div>
                <Tooltip title={t("common.xemChiTietThongTin")}>
                  <IcEye onClick={() => onShowThongTinNb(false)} />
                </Tooltip>
                <Tooltip title={t("common.suaChiTietThongTin")}>
                  <IcEdit onClick={() => onShowThongTinNb(true)} />
                </Tooltip>
                <Tooltip title={t("quanLyNoiTru.xemHoSoBenhAn")}>
                  <IcHsBa onClick={() => onShowHoSoBenhAn()} />
                </Tooltip>
              </div>
            </Col>
          </div>
          <div className="patient-information">
            <Col xl={{ span: 10 }} lg={{ span: 24 }}>
              <Row>
                <div className="name">
                  <b>{thongTinBenhNhan?.tenNb}</b>{" "}
                  <span style={{ color: "black", fontWeight: "normal" }}>
                    {gioiTinh.ten && `(${gioiTinh.ten}${age})`}
                  </span>
                  <span style={{ color: "black", fontWeight: "normal" }}>
                    {" "}
                    - {t("common.sdt")}: {thongTinBenhNhan?.soDienThoai}
                  </span>
                </div>
              </Row>
              <Row>
                <span>{t("common.diaChi")}:</span>
                <b className="info">&nbsp;{thongTinBenhNhan?.diaChi}</b>
              </Row>
            </Col>
            <Col xl={{ span: 7 }} lg={{ span: 24 }}>
              <Row>
                <span>{t("common.soBHYT")}:</span>
                <b className="info">&nbsp;{thongTinBenhNhan?.maTheBhyt}</b>
              </Row>
              <Row>
                <span>{t("common.giaTriThe")}:</span>
                {thongTinBenhNhan?.maTheBhyt && (
                  <b className="info">
                    &nbsp;{t("common.tu")} {thongTinBenhNhan?.tuNgayTheBhyt}{" "}
                    {t("common.den")} {thongTinBenhNhan?.denNgayTheBhyt}
                  </b>
                )}
              </Row>
            </Col>
            <Col xl={{ span: 7 }} lg={{ span: 24 }}>
              <Row>
                <span>{t("thuNgan.ngayDangKy")}:</span>
                <b className="info">
                  &nbsp;
                  {thongTinBenhNhan?.thoiGianVaoVien &&
                    moment(thongTinBenhNhan.thoiGianVaoVien).format(
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                </b>
              </Row>
              <Row>
                <span>{t("thuNgan.ngayNhapVien")}:</span>
                <b className="info">
                  &nbsp;
                  {thongTinBenhNhan?.thoiGianLapBenhAn &&
                    moment(thongTinBenhNhan.thoiGianLapBenhAn).format(
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                </b>
              </Row>
            </Col>
          </div>
        </div>
      </PatientInfoWrapper>
      <ModalChinhSuaThongTin ref={refModalChinhSuaThongTin} />
      <ModalHoSoBenhAn ref={refModalHoSoBenhAn} />
    </Main>
  );
};

export default memo(ThongTinBenhNhan);
