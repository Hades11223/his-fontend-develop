import React from "react";
import { Main } from "./styled";
import { useSelector } from "react-redux";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";
import { ENUM } from "constants/index";

const ThongTinPhieu = (props) => {
  const { t } = useTranslation();
  const { chiTietPhieuDoiTra } = useSelector(
    (state) => state.danhSachPhieuYeuCauHoan
  );
  const [listTrangThaiPhieuDoiTra] = useEnum(ENUM.TRANG_THAI_PHIEU_DOI_TRA);
  const [listLoaiDoiTra] = useEnum(ENUM.LOAI_DOI_TRA);

  const renderStatus = () => {
    if (listTrangThaiPhieuDoiTra?.length) {
      const data = listTrangThaiPhieuDoiTra.find(
        (item) => item?.id === chiTietPhieuDoiTra?.trangThai
      );
      return data?.ten || "";
    }
  };
  const renderLoaiDoiTra = () => {
    if (listLoaiDoiTra?.length) {
      const data = listLoaiDoiTra.find(
        (item) => item?.id == chiTietPhieuDoiTra?.loai
      );
      return data?.ten || "";
    }
  };
  const renderSoPhieuThu = () => {
    const soPhieuThuArr = chiTietPhieuDoiTra.dsDichVuHoan
      .filter((item) => item.soPhieuThu)
      .map((item) => item.soPhieuThu);

    const uniqSoPhieuThu = [...new Set(soPhieuThuArr)];
    return uniqSoPhieuThu.join(", ");
  };
  return (
    <Main>
      {chiTietPhieuDoiTra ? (
        <>
          <div className="title">{t("thuNgan.thongTinPhieu")}</div>
          <div className="header-info-phieu">
            <p className="so-phieu">
              {t("thuNgan.soPhieu")}: <span>{chiTietPhieuDoiTra?.soPhieu}</span>
            </p>
            <p className="status">
              {t("thuNgan.trangThaiPhieu")}:
              <span
                style={{
                  color:
                    chiTietPhieuDoiTra?.trangThai === 40 ? "#219653" : "red",
                }}
              >
                {renderStatus(chiTietPhieuDoiTra?.trangThai)}
              </span>
            </p>
          </div>
          <div className="main">
            <p>
              {t("thuNgan.liDoHoan")}:{" "}
              <span>{chiTietPhieuDoiTra?.lyDoDoiTra?.ten}</span>
            </p>
            <p>
              {t("thuNgan.hinhThucHoan")}:
              <span>{renderLoaiDoiTra(chiTietPhieuDoiTra?.loai)}</span>
            </p>
            <p>
              {t("thuNgan.nguoiYeuCauHoan")}:
              <span>{chiTietPhieuDoiTra?.nguoiYeuCau?.ten}</span>
            </p>
            <p>
              {t("thuNgan.thoiGianYeuCau")}:
              <span>
                {moment(chiTietPhieuDoiTra?.thoiGianYeuCau).format(
                  "DD/MM/YYYY  HH:mm:ss"
                )}
              </span>
            </p>
          </div>
          <div className="footer">
            {chiTietPhieuDoiTra?.trangThai == 40 && (
              <>
                <p>
                  {t("thuNgan.nguoiHoan")}:
                  <span>{chiTietPhieuDoiTra?.nguoiXacNhan?.ten}</span>
                </p>
                <p>
                  {t("thuNgan.thoiGianHoan")}:
                  <span>
                    {" "}
                    {moment(chiTietPhieuDoiTra?.thoiGianXacNhan).format(
                      "YYYY/MM/DD - hh:mm:ss"
                    )}
                  </span>
                </p>
              </>
            )}

            <p style={{ marginTop: "30px" }}>
              {t("thuNgan.soPhieuThu")}: <span>{renderSoPhieuThu()}</span>
            </p>
          </div>
        </>
      ) : null}
    </Main>
  );
};

export default ThongTinPhieu;
