import React from "react";
import { Main } from "./styled";
import { openInNewTab } from "utils";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
export const DichVu = ({ item, isMainService, ...props }) => {
  const { t } = useTranslation();
  const [listTrangThaiDichVu] = useEnum(ENUM.TRANG_THAI_DICH_VU);
  if (isMainService) {
    let trangThai = listTrangThaiDichVu.find((tt) => tt.id == item.trangThai);
    return (
      <Main>
        {trangThai?.ten && (
          <div className="tooltip-item">
            <label>{t("khamBenh.hanhTrinhKham.trangThaiKham")}: </label>
            <p>{trangThai?.ten}</p>
          </div>
        )}
        {item?.tenBacSiKham && (
          <div className="tooltip-item">
            <label>{t("khamBenh.hanhTrinhKham.bsKham")}: </label>
            <p>{item?.tenBacSiKham}</p>
          </div>
        )}
        {item?.tenBacSiKetLuan && (
          <div className="tooltip-item">
            <label>{t("khamBenh.hanhTrinhKham.bacSiKetLuan")}: </label>
            <p>{item?.tenBacSiKetLuan}</p>
          </div>
        )}
        {item?.thoiGianKetLuan && (
          <div className="tooltip-item">
            <label>{t("khamBenh.hanhTrinhKham.thoiGianKetLuan")}: </label>
            <p>{`${
              item?.thoiGianKetLuan
                ? moment(item?.thoiGianKetLuan).format("DD/MM/YYYY HH:mm:ss")
                : ""
            }`}</p>
          </div>
        )}
        {(item?.dsCdChinh || []).length != 0 && (
          <div className="tooltip-item">
            <label
              //TODO: lay ten benh co nhom benh chinh != null
              className="pointer"
              onClick={() =>
                openInNewTab("/danh-muc/nhom-benh-tat?nhomBenh=true")
              }
            >
              {t("khamBenh.hanhTrinhKham.chanDoanBenh")}:{" "}
            </label>
            <p>
              <ul>
                {(item?.dsCdChinh || []).map((cd, index) => {
                  return <li key={index}>{cd.ten}</li>;
                })}
              </ul>
            </p>
          </div>
        )}
        {(item?.dsCdKemTheo || []).length != 0 && (
          <div className="tooltip-item">
            <label
              //TODO: lay ten benh co nhom benh phu [1or2] != null
              className="pointer"
              onClick={() =>
                openInNewTab("/danh-muc/nhom-benh-tat?nhomBenh=false")
              }
            >
              {t("khamBenh.hanhTrinhKham.chanDoanKemTheo")}:{" "}
            </label>
            <p>
              <ul>
                {(item?.dsCdKemTheo || []).map((cd, index) => {
                  return <li key={index}>{cd.ten}</li>;
                })}
              </ul>
            </p>
          </div>
        )}
      </Main>
    );
  } else if (props.isResult)
    return (
      <Main>
        {/* {item?.tenBacSiKetLuan && ( */}
        <div className="tooltip-item">
          <label>{t("khamBenh.hanhTrinhKham.bacSiKetLuan")}: </label>
          <p>{item?.tenBacSiKetLuan}</p>
        </div>
        {/* )} */}
        <div className="tooltip-item">
          <label>{t("khamBenh.hanhTrinhKham.thoiGianKetLuan")}: </label>
          <p>{`${
            item?.thoiGianKetLuan
              ? moment(item?.thoiGianKetLuan).format("DD/MM/YYYY HH:mm:ss")
              : ""
          }`}</p>
        </div>
        {item?.ghiChu && (
          <div className="tooltip-item">
            <label>{t("khamBenh.hanhTrinhKham.ghiChu")}: </label>
            <p>{item?.ghiChu}</p>
          </div>
        )}
        {item?.loiDan && (
          <div className="tooltip-item">
            <label>{t("khamBenh.hanhTrinhKham.loiDan")}: </label>
            <p>{item?.loiDan}</p>
          </div>
        )}
      </Main>
    );
  return (
    <Main>
      <div className="tooltip-item">
        <ul>
          {(props.items || []).map((item, index) => {
            let trangThai = listTrangThaiDichVu.find(
              (tt) => tt.id == item.trangThai
            );
            return (
              <li key={index}>
                {/* {item.tenNhomDichVuCap2}{" "}
                {item.bacSiDocKetQua ? `- {item.bacSiDocKetQua}` : ""} -{" "}
                {trangThai?.ten} */}
                <p>{`${item.tenDichVu} : ${trangThai.ten}`}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </Main>
  );
};

export default DichVu;
