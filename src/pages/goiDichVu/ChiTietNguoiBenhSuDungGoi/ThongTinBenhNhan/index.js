import React, { useEffect, useRef, memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { Avatar, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { PatientInfoWrapper, Main } from "./styled";
import Image from "components/Image";
import ModalChinhSuaThongTin from "../../../tiepDon/TiepDon/ModalChinhSuaThongTin";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";
import { ENUM } from "constants/index";

const ThongTinBenhNhan = () => {
  const { t } = useTranslation();
  const { thongTinBenhNhan } = useSelector((state) => state.nbDotDieuTri);
  const [listGioiTinh] = useEnum(ENUM.GIOI_TINH);
  const [listDoiTuong] = useEnum(ENUM.DOI_TUONG);
  const refModalChinhSuaThongTin = useRef(null);

  const gioiTinh = useMemo(() => {
    return (
      (listGioiTinh || []).find(
        (item) => item.id === thongTinBenhNhan?.gioiTinh
      ) || {}
    );
  }, [thongTinBenhNhan, listGioiTinh]);
  const doiTuong = useMemo(() => {
    return (listDoiTuong || []).find(
      (item) => item.id === thongTinBenhNhan?.doiTuong
    )?.ten;
  }, [thongTinBenhNhan, listDoiTuong]);
  const age = thongTinBenhNhan?.tuoi
    ? ` - ${thongTinBenhNhan?.tuoi} ${t("common.tuoi")}`
    : "";

  return (
    <Main>
      <PatientInfoWrapper>
        <div className="img-avatar">
          {thongTinBenhNhan?.anhDaiDien ? (
            <Image
              preview={false}
              src={thongTinBenhNhan?.anhDaiDien}
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
              {t("common.maBa")}: {thongTinBenhNhan?.maBenhAn}
            </div>
            <div className="name">
              <span>{thongTinBenhNhan?.tenNb}</span>{" "}
              <span className="more-info">
                {gioiTinh.ten && `(${gioiTinh.ten}${age})`}
                {thongTinBenhNhan?.tenPhong
                  ? ` - ${thongTinBenhNhan.tenPhong}}`
                  : ""}
                {thongTinBenhNhan?.soHieuGiuong
                  ? ` - ${thongTinBenhNhan.soHieuGiuong}}`
                  : ""}
              </span>
            </div>
            <div className="bunch-icon">
              {/* <img
                src={IconDetail}
                alt=""
                onClick={() => onShowThongTinNb(false)}
                title={t("common.xemChiTietThongTin")}
              />
              <img
                src={IconEdit}
                alt=""
                onClick={() => onShowThongTinNb(true)}
                title={t("common.suaChiTietThongTin")}
              />
              <img
                src={IconHoSoBenhAn}
                alt=""
                onClick={() => onShowHoSoBenhAn()}
                title={t("dieuTriNoiTru.xemHoSoBenhAn")}
              />
              <img src={IconDoiDoiTuong} alt="" /> */}
            </div>
          </div>
          <div className="patient-information">
            <Row>
              <span>
                <span>{t("common.diaChi")}:</span>
                <b className="info">&nbsp;{thongTinBenhNhan?.diaChi}</b>
                <span> - {t("common.maHs")}:</span>
                <b className="info">&nbsp;{thongTinBenhNhan?.maHoSo}</b>
                <span> - {t("common.doiTuong")}:</span>
                <b className="info">&nbsp;{doiTuong}</b>
                {thongTinBenhNhan?.doiTuong == 2 && (
                  <>
                    <span> - {t("common.soBHYT")}:</span>
                    <b className="info">
                      &nbsp;{thongTinBenhNhan?.maTheBhyt}{" "}
                      {`${
                        thongTinBenhNhan?.mucHuongTheBhyt
                          ? `(${thongTinBenhNhan?.mucHuongTheBhyt}%)`
                          : ""
                      }`}
                    </b>
                    <span> {t("common.hanThe")}:</span>
                    <b className="info">
                      &nbsp;
                      {`${thongTinBenhNhan?.tuNgayTheBhyt
                        ?.toDateObject()
                        .format(
                          "dd/MM/yyyy"
                        )} - ${thongTinBenhNhan?.denNgayTheBhyt
                        ?.toDateObject()
                        .format("dd/MM/yyyy")}`}
                    </b>
                  </>
                )}
              </span>
              <span
                style={{ flex: 1, textAlign: "right", display: "inline-block" }}
              >
                {/* <span>
                  <span>{t("thuNgan.soTienConLai")}:</span>
                  <b className="info" style={{ color: "red" }}>
                    &nbsp;
                    {thongTinBenhNhan?.tienConLai &&
                      thongTinBenhNhan?.tienConLai?.formatPrice()}
                  </b>
                </span> */}
              </span>
            </Row>
          </div>
        </div>
      </PatientInfoWrapper>
      <ModalChinhSuaThongTin ref={refModalChinhSuaThongTin} />
    </Main>
  );
};

export default memo(ThongTinBenhNhan);
