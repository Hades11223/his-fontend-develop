import React, { useState } from "react";
import { useDispatch } from "react-redux";
import BaseSearch from "components/BaseSearch";
import { useStore } from "hook";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { DatePicker } from "components";
const TimKiemDichVu = (props) => {
  const { t } = useTranslation();
  const {
    dsBenhNhan: { onChangeInputSearchListNb: onChangeInputSearch },
  } = useDispatch();

  const dataSearch = useStore("dsBenhNhan.dataSearch", {});

  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const listtrangThaiNb = [
    { id: 25, i18n: "xetNghiem.choTiepNhan" },
    { id: [46, 38, 62], i18n: "xetNghiem.choLayMau" },
    { id: 50, i18n: "common.boQua" },
    { id: 80, i18n: "xetNghiem.huyMau" },
  ];

  return (
    <BaseSearch
      cacheData={{
        ...dataSearch,
      }}
      dataInput={[
        {
          widthInput: "232px",
          placeholder: t("cdha.timTenNbQrNbMaHs"),
          functionChangeInput: onChangeInputSearch,
          isScanQR: true,
          qrGetValue: "maHoSo",
          keysFlexible: [
            {
              key: "tenNb",
              type: "string",
            },
            {
              key: "maHoSo",
              type: "number",
            },
          ],
        },
        {
          widthInput: "232px",
          placeholder: t("cdha.thoiGianThucHien"),
          keyValueInput: "thoiGianChiDinh",
          functionChangeInput: onChangeInputSearch,
          type: "addition",
          component: (
            <DatePicker
              format="DD/MM/YYYY"
              placeholder="Ngày thực hiện"
              style={{ width: "100%", height: "100%" }}
              onChange={(e) =>
                onChangeInputSearch({
                  thoiGianThucHien: moment(e).format("DD/MM/YYYY"),
                })
              }
            />
          ),
        },
        {
          widthInput: "232px",
          placeholder: t("cdha.timMaDv"),
          keyValueInput: "maDichVu",
          functionChangeInput: onChangeInputSearch,
        },
        {
          widthInput: "232px",
          placeholder: t("cdha.timSoPhieu"),
          keyValueInput: "soPhieu",
          functionChangeInput: onChangeInputSearch,
        },
        {
          widthInput: "232px",
          placeholder: t("common.trangThai"),
          keyValueInput: "trangThai",
          functionChangeInput: onChangeInputSearch,
          type: "select",
          listSelect: listtrangThaiNb,
        },
      ]}
      filter={{
        open: true,
        width: "110px",
        funcSearchData: onChangeInputSearch,
        data: [],
      }}
    />
  );
};

export default TimKiemDichVu;
