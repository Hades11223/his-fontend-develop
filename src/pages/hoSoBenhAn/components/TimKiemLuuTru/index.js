import React, { useState } from "react";
import { useDispatch } from "react-redux";
import BaseSearch from "../../../../components/BaseSearch";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";
import { ENUM } from "constants/index";

const TimKiemLuuTru = (props) => {
  const { t } = useTranslation();

  const [listTrangThaiBenhAn] = useEnum(ENUM.TRANG_THAI_BENH_AN);
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const {
    dsLuuTruBa: { onChangeInputSearch, onSearch },
  } = useDispatch();

  return (
    <BaseSearch
      dataInput={[
        {
          widthInput: "232px",
          placeholder: t("hsba.timTenNbMaHs"),
          keyValueInput: "tenNb",
          functionChangeInput: onChangeInputSearch,
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
          placeholder: t("common.maBenhAn"),
          keyValueInput: "maBenhAn",
          functionChangeInput: onChangeInputSearch,
        },
        {
          widthInput: "232px",
          placeholder: t("hsba.maLuuTru"),
          keyValueInput: "maLuuTru",
          functionChangeInput: onChangeInputSearch,
        },
        {
          widthInput: "180px",
          placeholder: t("hsba.trangThaiBenhAn"),
          keyValueInput: "trangThaiBenhAn",
          functionChangeInput: onChangeInputSearch,
          type: "select",
          listSelect: listTrangThaiBenhAn,
        },

        {
          widthInput: "350px",
          type: "dateRange",
          state: state,
          setState: setState,
          functionChangeInput: onChangeInputSearch,
          keyValueInput: ["tuThoiGianVaoVien", "denThoiGianVaoVien"],
          title: t("hsba.ngayDangKy"),
          placeholder: [t("common.tuNgay"), t("common.denNgay")],
          format: "DD/MM/YYYY",
        },
      ]}
      filter={{
        open: true,
        width: "110px",
        funcRefreshData: () => {
          onSearch({ page: 0, size: 10 });
        },
        funcSearchData: onChangeInputSearch,
        data: [],
      }}
    />
  );
};

export default TimKiemLuuTru;
