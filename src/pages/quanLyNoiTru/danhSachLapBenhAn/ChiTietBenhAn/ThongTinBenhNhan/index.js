import React, { useRef } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Tooltip, Avatar, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { formatPhone } from "utils";
import { Main, PatientInfoWrapper } from "./styled";
import Image from "components/Image";
import IcEye from "assets/svg/ic-eye.svg";
import IcDoiDoiTuong from "assets/svg/ic-doi-doi-tuong.svg";
import IcEdit from "assets/svg/ic-edit.svg";
import IcHsBa from "assets/svg/ic-hsba.svg";
import IcPhongGiuong from "assets/svg/noiTru/ic-chi-dinh-dich-vu.svg";
import ModalHoSoBenhAn from "pages/quanLyNoiTru/danhSachLapBenhAn/ChiTietBenhAn/ModalHoSoBenhAn";
import ModalChinhSuaThongTin from "../../../../tiepDon/TiepDon/ModalChinhSuaThongTin";
import { useTranslation } from "react-i18next";
import { checkRole } from "utils/role-utils";
import { ENUM, ROLES } from "constants/index";
import { useEnum } from "hook";

const ThongTinBenhNhan = () => {
  const { t } = useTranslation();
  const { thongTinBenhNhan } = useSelector((state) => state.nbDotDieuTri);
  const { nbLapBenhAn } = useSelector((state) => state.quanLyNoiTru);
  const [listGioiTinh] = useEnum(ENUM.GIOI_TINH);
  const refModalChinhSuaThongTin = useRef(null);
  const refModalHoSoBenhAn = useRef(null);

  const gioiTinh =
    (listGioiTinh || []).find(
      (item) => item.id === thongTinBenhNhan?.gioiTinh
    ) || {};
  const age = thongTinBenhNhan?.tuoi ? ` - ${thongTinBenhNhan?.tuoi} tuổi` : "";

  const onShowHoSoBenhAn = () => {
    refModalHoSoBenhAn.current &&
      refModalHoSoBenhAn.current.show({
        nbThongTinId: thongTinBenhNhan?.nbThongTinId,
        nbDotDieuTriId: thongTinBenhNhan?.nbDotDieuTriId,
      });
  };
  const onShowThongTinNb = (isEdit) => {
    if (thongTinBenhNhan)
      refModalChinhSuaThongTin.current &&
        refModalChinhSuaThongTin.current.show({
          id: thongTinBenhNhan.id,
          isEdit,
        });
  };
  return (
    <Main>
      <PatientInfoWrapper>
        <div className="img-avatar">
          {thongTinBenhNhan?.anhDaiDien ? (
            <Image preview={false} src={thongTinBenhNhan?.anhDaiDien} />
          ) : (
            <Avatar icon={<UserOutlined />} size={100} shape={"square"} />
          )}
        </div>

        <div className="patient-content">
          <div className="head">
            <div className="benhAn">
              {t("common.maBa")}: {nbLapBenhAn?.maBenhAn}
            </div>
            <div className="name">
              <span>{thongTinBenhNhan?.tenNb}</span>{" "}
              {gioiTinh.ten && `(${gioiTinh.ten})`}
            </div>
            <div className="action">
              {checkRole([
                ROLES["QUAN_LY_NOI_TRU"].SUA_THONG_TIN_HANH_CHINH,
              ]) && (
                <div
                  onClick={() => onShowThongTinNb(false)}
                  title={t("common.xemChiTietThongTin")}
                >
                  <IcEye />
                </div>
              )}
              {checkRole([
                ROLES["QUAN_LY_NOI_TRU"].SUA_THONG_TIN_HANH_CHINH,
              ]) && (
                <div
                  onClick={() => onShowThongTinNb(true)}
                  title={t("common.suaChiTietThongTin")}
                >
                  <IcEdit />
                </div>
              )}
              {checkRole([ROLES["QUAN_LY_NOI_TRU"].XEM_HO_SO_BENH_AN]) && (
                <div
                  onClick={() => onShowHoSoBenhAn()}
                  title={t("quanLyNoiTru.xemHoSoBenhAn")}
                >
                  <IcHsBa />
                </div>
              )}
              <div>
                <IcDoiDoiTuong />
              </div>
              {checkRole([ROLES["QUAN_LY_NOI_TRU"].XEM_SO_DO_PHONG_GIUONG]) && (
                <div>
                  <IcPhongGiuong />
                </div>
              )}
            </div>
          </div>
          <div className="patient-information">
            <Row className="info-content" gutter={12}>
              <Col xl={8} xxl={10} className="custom-col">
                <div className="flex">
                  <div className="w150">{t("common.ngaySinh")}:</div>
                  <div className="info">
                    {moment(thongTinBenhNhan?.ngaySinh).format(
                      thongTinBenhNhan?.chiNamSinh ? "YYYY" : "DD/MM/YYYY"
                    )}
                    {age}
                  </div>
                </div>
                <div className="flex">
                  <div className="w150">{t("common.diaChi")}:</div>
                  <div className="info">
                    <Tooltip
                      placement="topLeft"
                      title={thongTinBenhNhan?.diaChi}
                    >
                      {thongTinBenhNhan?.diaChi}
                    </Tooltip>
                  </div>
                </div>
                <div className="flex">
                  <div className="w150">
                    {t("quanLyNoiTru.thoiGianNhapVien")}:
                  </div>
                  <div className="info">
                    {nbLapBenhAn?.thoiGianKetLuan &&
                      moment(nbLapBenhAn?.thoiGianKetLuan).format(
                        "DD/MM/YYYY HH:mm:ss"
                      )}
                  </div>
                </div>
              </Col>
              <Col xl={8} xxl={6} className="custom-col">
                <div className="flex">
                  <div className="w60">{t("common.maHs")}:</div>
                  <div className="info">{thongTinBenhNhan?.maHoSo}</div>
                </div>
                <div className="flex">
                  <div className="w60">{t("common.maNb")}:</div>
                  <div className="info">{thongTinBenhNhan?.maNb}</div>
                </div>
                <div className="flex">
                  <div className="w60">{t("common.sdt")}:</div>
                  <div className="info">
                    {formatPhone(thongTinBenhNhan?.soDienThoai)}
                  </div>
                </div>
              </Col>
              <Col xl={8} xxl={8} className="custom-col">
                <div className="flex">
                  <div className="w150">{t("common.soBHYT")}:</div>
                  <div className="info">
                    <span className="info__highlight">
                      {thongTinBenhNhan?.maTheBhyt}
                    </span>
                  </div>
                </div>
                <div className="flex">
                  <div className="150">{t("common.giaTriThe")}:</div>
                  <div className="info">
                    {thongTinBenhNhan?.maTheBhyt && (
                      <span className="info__highlight">
                        {t("common.tu")}{" "}
                        {moment(thongTinBenhNhan.tuNgayTheBhyt).format(
                          "DD/MM/YYYY"
                        )}{" "}
                        {t("common.den")}{" "}
                        {moment(thongTinBenhNhan.denNgayTheBhyt).format(
                          "DD/MM/YYYY"
                        )}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex">
                  <div className="w150">{t("thuNgan.loaiKhamBh")}:</div>
                  <div className="info">
                    <span className="info__highlight">
                      {thongTinBenhNhan?.dungTuyen &&
                        `${t("thuNgan.dungTuyen")}`}
                      {!!thongTinBenhNhan?.mucHuongTheBhyt &&
                        ` (${thongTinBenhNhan?.mucHuongTheBhyt}%)`}
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </PatientInfoWrapper>
      <ModalChinhSuaThongTin ref={refModalChinhSuaThongTin} />
      <ModalHoSoBenhAn ref={refModalHoSoBenhAn} />
    </Main>
  );
};

export default ThongTinBenhNhan;
