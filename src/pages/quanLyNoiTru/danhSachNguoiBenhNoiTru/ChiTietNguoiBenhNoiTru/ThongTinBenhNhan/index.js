import React, { useRef, memo, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Row, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { PatientInfoWrapper, Main } from "./styled";
import Image from "components/Image";
import IcEye from "assets/svg/ic-eye.svg";
import IcEdit from "assets/svg/ic-edit.svg";
import IcHsBa from "assets/svg/ic-hsba.svg";
import IcDoiDoiTuong from "assets/svg/ic-doi-doi-tuong.svg";
import ModalChinhSuaThongTin from "../../../../tiepDon/TiepDon/ModalChinhSuaThongTin";
import ModalHoSoBenhAn from "pages/quanLyNoiTru/danhSachNguoiBenhNoiTru/ChiTietNguoiBenhNoiTru/Modal/ModalHoSoBenhAn";
import { useTranslation } from "react-i18next";
import { checkRole } from "utils/role-utils";
import { ENUM, ROLES } from "constants/index";
import { useEnum } from "hook";
import ModalFolderAndFile from "components/ModalFolderAndFile";

const ThongTinBenhNhan = () => {
  const { t } = useTranslation();
  const { getNbNoiTruById } = useDispatch().danhSachNguoiBenhNoiTru;
  const { infoPatient } = useSelector((state) => state.danhSachNguoiBenhNoiTru);
  const refModalChinhSuaThongTin = useRef(null);
  const refModalFoderAndFile = useRef(null);
  const refModalHoSoBenhAn = useRef(null);
  const [listDoiTuong] = useEnum(ENUM.DOI_TUONG);
  const [listGioiTinh] = useEnum(ENUM.GIOI_TINH);

  const gioiTinh = useMemo(() => {
    return (
      (listGioiTinh || []).find((item) => item.id === infoPatient?.gioiTinh) ||
      {}
    );
  }, [infoPatient, listGioiTinh]);
  const age = infoPatient?.tuoi ? ` - ${infoPatient?.tuoi} tuổi` : "";

  const onShowHoSoBenhAn = () => {
    refModalHoSoBenhAn.current &&
      refModalHoSoBenhAn.current.show({
        nbThongTinId: infoPatient?.nbThongTinId,
        nbDotDieuTriId: infoPatient?.id,
      });
  };
  const onShowThongTinNb = (isEdit) => {
    refModalChinhSuaThongTin.current &&
      refModalChinhSuaThongTin.current.show(
        { id: infoPatient?.id, isEdit },
        () => {
          getNbNoiTruById(infoPatient?.id);
        }
      );
  };
  return (
    <Main>
      <PatientInfoWrapper>
        <div className="img-avatar">
          {infoPatient?.anhDaiDien ? (
            <Image
              preview={false}
              src={infoPatient?.anhDaiDien}
              width={60}
              height={60}
            />
          ) : (
            <Avatar icon={<UserOutlined />} size={60} shape={"square"} />
          )}
        </div>

        <div className="patient-content">
          <div className="head">
            <div className="benhAn">
              {t("common.maBa")}: {infoPatient?.maBenhAn}
            </div>
            <div className="name">
              <span>{infoPatient?.tenNb}</span>{" "}
              <span className="more-info">
                {gioiTinh.ten && `(${gioiTinh.ten}${age})`}
                {infoPatient?.tenPhong ? ` - ${infoPatient.tenPhong}` : ""}
                {infoPatient?.khoaNbVietTat
                  ? ` - ${infoPatient.khoaNbVietTat}`
                  : ""}
                {infoPatient?.soHieuGiuong
                  ? ` - ${infoPatient.soHieuGiuong}`
                  : ""}
              </span>
            </div>
            <div className="bunch-icon">
              {checkRole([
                ROLES["QUAN_LY_NOI_TRU"].SUA_THONG_TIN_HANH_CHINH_NOI_TRU,
              ]) && (
                <Tooltip title={t("common.xemChiTietThongTin")}>
                  <IcEye onClick={() => onShowThongTinNb(false)} />
                </Tooltip>
              )}
              {checkRole([
                ROLES["QUAN_LY_NOI_TRU"].SUA_THONG_TIN_HANH_CHINH_NOI_TRU,
              ]) && (
                <Tooltip title={t("common.suaChiTietThongTin")}>
                  <IcEdit onClick={() => onShowThongTinNb(true)} />
                </Tooltip>
              )}
              {checkRole([
                ROLES["QUAN_LY_NOI_TRU"].XEM_HO_SO_BENH_AN_NOI_TRU,
              ]) && (
                <Tooltip title={t("quanLyNoiTru.xemHoSoBenhAn")}>
                  <IcHsBa onClick={() => onShowHoSoBenhAn()} />
                </Tooltip>
              )}
              <IcDoiDoiTuong />
            </div>
          </div>
          <div className="patient-information">
            <Row>
              <span>
                <span>{t("common.diaChi")}:</span>
                <b className="info">&nbsp;{infoPatient?.diaChi}</b>
                <span> - {t("common.maHs")}:</span>
                <b className="info">&nbsp;{infoPatient?.maHoSo}</b>
                <span> - {t("common.doiTuong")}:</span>
                <b className="info">
                  &nbsp;
                  {
                    listDoiTuong.find(
                      (item) => item.id === infoPatient?.doiTuong
                    )?.ten
                  }
                </b>
                {infoPatient?.doiTuong === 2 && (
                  <>
                    <span> - {t("common.soBHYT")}:</span>
                    <b className="info">
                      &nbsp;{infoPatient?.maTheBhyt}{" "}
                      {`${
                        infoPatient?.mucHuongTheBhyt
                          ? `(${infoPatient?.mucHuongTheBhyt}%)`
                          : ""
                      }`}
                    </b>
                    <span> {t("common.hanThe")}:</span>
                    <b className="info">
                      &nbsp;
                      {`${infoPatient?.tuNgayTheBhyt
                        ?.toDateObject()
                        .format("dd/MM/yyyy")} - ${infoPatient?.denNgayTheBhyt
                        ?.toDateObject()
                        .format("dd/MM/yyyy")}`}
                    </b>
                  </>
                )}
              </span>
              <span
                style={{ flex: 1, textAlign: "right", display: "inline-block" }}
              >
                <span>
                  <span>{t("thuNgan.soTienConLai")}:</span>
                  <b className="info" style={{ color: "red" }}>
                    &nbsp;
                    {infoPatient?.tienConLai &&
                      infoPatient?.tienConLai?.formatPrice()}
                  </b>
                </span>
              </span>
            </Row>
          </div>
        </div>
      </PatientInfoWrapper>
      <ModalChinhSuaThongTin ref={refModalChinhSuaThongTin} />
      <ModalHoSoBenhAn ref={refModalHoSoBenhAn} />
      <ModalFolderAndFile
        refModalFoderAndFile={refModalFoderAndFile}
      ></ModalFolderAndFile>
    </Main>
  );
};

export default memo(ThongTinBenhNhan);
