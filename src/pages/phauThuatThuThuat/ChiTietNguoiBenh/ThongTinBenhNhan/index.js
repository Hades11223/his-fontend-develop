import React, { useRef, memo, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Avatar, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { PatientInfoWrapper, Main } from "./styled";
import Image from "components/Image";
import IconDetail from "assets/images/his-core/iconDetail.png";
import IconDoiDoiTuong from "assets/images/noiTru/icDoiDoiTuong.png";
import IconHoSoBenhAn from "assets/images/noiTru/icHoSoBenhAn.png";
import ModalChinhSuaThongTin from "pages/tiepDon/TiepDon/ModalChinhSuaThongTin";
import ModalHoSoBenhAn from "pages/quanLyNoiTru/danhSachNguoiBenhNoiTru/ChiTietNguoiBenhNoiTru/Modal/ModalHoSoBenhAn";
import { useTranslation } from "react-i18next";
import { checkRole } from "utils/role-utils";
import { ENUM, ROLES } from "constants/index";
import { useEnum } from "hook";
import useThongTinNb from "../hook/useThongTinNb";

const ThongTinBenhNhan = () => {
  const { t } = useTranslation();
  const {
    danhSachNguoiBenhNoiTru: { getNbNoiTruById },
  } = useDispatch();

  const [thongTinNb] = useThongTinNb();
  const refModalChinhSuaThongTin = useRef(null);
  const refModalHoSoBenhAn = useRef(null);
  const [listDoiTuong] = useEnum(ENUM.DOI_TUONG);
  const [listGioiTinh] = useEnum(ENUM.GIOI_TINH);

  const gioiTinh = useMemo(() => {
    return (
      (listGioiTinh || []).find((item) => item.id === thongTinNb?.gioiTinh) ||
      {}
    );
  }, [thongTinNb, listGioiTinh]);
  const age = thongTinNb?.tuoi ? ` - ${thongTinNb?.tuoi} tuổi` : "";

  const onShowHoSoBenhAn = () => {
    refModalHoSoBenhAn.current &&
      refModalHoSoBenhAn.current.show({
        nbThongTinId: thongTinNb?.nbThongTinId,
        nbDotDieuTriId: thongTinNb?.id,
      });
  };
  const onShowThongTinNb = (isEdit) => {
    refModalChinhSuaThongTin.current &&
      refModalChinhSuaThongTin.current.show(
        { id: thongTinNb?.id, isEdit },
        () => {
          getNbNoiTruById(thongTinNb?.id);
        }
      );
  };
  return (
    <Main>
      <PatientInfoWrapper>
        <div className="img-avatar">
          {thongTinNb?.anhDaiDien ? (
            <Image
              preview={false}
              src={thongTinNb?.anhDaiDien}
              width={60}
              height={60}
            />
          ) : (
            <Avatar icon={<UserOutlined />} size={60} shape={"square"} />
          )}
        </div>

        <div className="patient-content">
          <div className="head">
            {thongTinNb?.maBenhAn && (
              <div className="benhAn">
                {t("common.maBa")}: {thongTinNb?.maBenhAn}
              </div>
            )}
            <div className="name">
              <span>{thongTinNb?.tenNb}</span>{" "}
              <span className="more-info">
                {gioiTinh.ten && `(${gioiTinh.ten}${age})`}
                {thongTinNb?.tenPhong ? ` - ${thongTinNb.tenPhong}` : ""}
                {thongTinNb?.soHieuGiuong
                  ? ` - ${thongTinNb.soHieuGiuong}`
                  : ""}
              </span>
            </div>
            <div className="bunch-icon">
              {checkRole([
                ROLES["QUAN_LY_NOI_TRU"].SUA_THONG_TIN_HANH_CHINH_NOI_TRU,
              ]) && (
                <img
                  src={IconDetail}
                  alt=""
                  onClick={() => onShowThongTinNb(false)}
                  title={t("common.xemChiTietThongTin")}
                />
              )}
              {/* {checkRole([
                ROLES["QUAN_LY_NOI_TRU"].SUA_THONG_TIN_HANH_CHINH_NOI_TRU,
              ]) && (
                <img
                  src={IconEdit}
                  alt=""
                  onClick={() => onShowThongTinNb(true)}
                  title={t("common.suaChiTietThongTin")}
                />
              )} */}
              {checkRole([
                ROLES["QUAN_LY_NOI_TRU"].XEM_HO_SO_BENH_AN_NOI_TRU,
              ]) && (
                <img
                  src={IconHoSoBenhAn}
                  alt=""
                  onClick={() => onShowHoSoBenhAn()}
                  title={t("dieuTriNoiTru.xemHoSoBenhAn")}
                />
              )}
              <img src={IconDoiDoiTuong} alt="" />
            </div>
          </div>
          <div className="patient-information">
            <Row>
              <span>
                <span>{t("common.diaChi")}:</span>
                <b className="info">&nbsp;{thongTinNb?.diaChi}</b>
                <span> - {t("common.maHs")}:</span>
                <b className="info">&nbsp;{thongTinNb?.maHoSo}</b>
                <span> - {t("common.doiTuong")}:</span>
                <b className="info">
                  &nbsp;
                  {
                    listDoiTuong.find((item) => item.id == thongTinNb?.doiTuong)
                      ?.ten
                  }
                </b>
                {thongTinNb?.doiTuong === 2 && (
                  <>
                    {thongTinNb?.maTheBhyt && (
                      <>
                        <span> - {t("common.soBHYT")}:</span>
                        <b className="info">
                          &nbsp;{thongTinNb?.maTheBhyt}{" "}
                          {`${
                            thongTinNb?.mucHuongTheBhyt
                              ? `(${thongTinNb?.mucHuongTheBhyt}%)`
                              : ""
                          }`}
                        </b>
                      </>
                    )}
                    {thongTinNb?.tuNgayTheBhyt && thongTinNb?.denNgayTheBhyt && (
                      <>
                        <span> {t("common.hanThe")}:</span>
                        <b className="info">
                          &nbsp;
                          {`${thongTinNb?.tuNgayTheBhyt
                            ?.toDateObject()
                            .format(
                              "dd/MM/yyyy"
                            )} - ${thongTinNb?.denNgayTheBhyt
                            ?.toDateObject()
                            .format("dd/MM/yyyy")}`}
                        </b>
                      </>
                    )}
                  </>
                )}
              </span>
              {thongTinNb?.maBenhAn && (
                <span
                  style={{
                    flex: 1,
                    textAlign: "right",
                    display: "inline-block",
                  }}
                >
                  <span>
                    <span>{t("thuNgan.soTienConLai")}:</span>
                    <b className="info" style={{ color: "red" }}>
                      &nbsp;
                      {thongTinNb?.tienConLai &&
                        thongTinNb?.tienConLai?.formatPrice()}
                    </b>
                  </span>
                </span>
              )}
            </Row>
          </div>
        </div>
      </PatientInfoWrapper>
      <ModalChinhSuaThongTin ref={refModalChinhSuaThongTin} onlySeen={true} />
      <ModalHoSoBenhAn ref={refModalHoSoBenhAn} />
    </Main>
  );
};

export default memo(ThongTinBenhNhan);
