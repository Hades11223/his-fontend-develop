import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BaseSearch } from "components";
import { useTranslation } from "react-i18next";
import { TRANG_THAI_DO_SINH_HIEU } from "constants/index";

const TimKiem = (props) => {
  const { t } = useTranslation();

  const {
    sinhHieu: { searchSinhHieuByParams },
    utils: { getUtils },
  } = useDispatch();
  const { dataSearch } = useSelector((state) => state.sinhHieu);
  useEffect(() => {
    getUtils({ name: "PhanLoaiPTTT" });
  }, []);

  return (
    <BaseSearch
      cacheData={dataSearch}
      dataInput={[
        {
          widthInput: "200px",
          placeholder: t("sinhHieu.timTenNb"),
          keyValueInput: "tenNb",
          functionChangeInput: searchSinhHieuByParams,
        },
        {
          widthInput: "200px",
          placeholder: t("sinhHieu.timSoDienThoai"),
          keyValueInput: "soDienThoai",
          functionChangeInput: searchSinhHieuByParams,
        },
        {
          widthInput: "232px",
          placeholder: t("sinhHieu.timMaNb"),
          keyValueInput: "maNb",
          isScanQR: true,
          qrGetValue: "maNb",
          keysFlexible: [
            {
              key: "maNb",
              type: "number",
            },
          ],
          functionChangeInput: searchSinhHieuByParams,
        },
        {
          widthInput: "150px",
          placeholder: t("sinhHieu.timMaHoSo"),
          keyValueInput: "maHoSo",
          functionChangeInput: searchSinhHieuByParams,
        },
        {
          widthInput: "180px",
          placeholder: t("common.trangThai"),
          keyValueInput: "trangThai",
          functionChangeInput: searchSinhHieuByParams,
          type: "select",
          listSelect: TRANG_THAI_DO_SINH_HIEU,
        },
      ]}
      filter={{
        open: true,
        width: "110px",
        funcSearchData: searchSinhHieuByParams,
        data: [
          {
            key: ["tuThoiGianVaoVien", "denThoiGianVaoVien"],
            placeholder: [t("common.tuNgay"), t("common.denNgay")],
            type: "date-1",
            title: t("sinhHieu.ngayDangKy"),
          },
        ],
      }}
    />
  );
};

export default TimKiem;
