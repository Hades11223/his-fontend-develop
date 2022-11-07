import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BaseSearch } from "components";
import { useTranslation } from "react-i18next";
import {
  getAllQueryString,
  setQueryStringValues,
} from "hook/useQueryString/queryString";

const TimKiemPhieu = (props) => {
  const { t } = useTranslation();
  const {
    information: { onChangeInputSearch, onSearch },
  } = useDispatch();

  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    const { page, size, dataSortColumn, ...queries } = getAllQueryString();
    setState(queries);
  }, []);

  return (
    <BaseSearch
      cacheData={state}
      dataInput={[
        {
          widthInput: "232px",
          placeholder: t("hsba.timHoTenNguoiBenh"),
          keyValueInput: "tenNb",
          functionChangeInput: onChangeInputSearch,
        },
        {
          widthInput: "232px",
          placeholder: t("hsba.timSoDienThoai"),
          keyValueInput: "soDienThoai",
          functionChangeInput: onChangeInputSearch,
        },
        {
          widthInput: "400px",
          placeholder: t("hsba.nhapHoacQuetQRNBMaNb"),
          keyValueInput: "maNb",
          isScanQR: true,
          functionChangeInput: onChangeInputSearch,
        },
        {
          widthInput: "232px",
          placeholder: t("common.timMaHoSo"),
          keyValueInput: "maHoSo",
          functionChangeInput: onChangeInputSearch,
        },
      ]}
      filter={{
        open: true,
        width: "110px",
        funcRefreshData: () => {
          onSearch({ page: 0, size: 10 });
        },
        funcSearchData: (data) => {
          setQueryStringValues(data);
          onChangeInputSearch(data);
        },
        data: [
          {
            key: "maTheBhyt",
            placeholder: t("common.soBHYT"),
            type: "normal",
            defaultValue: state.maTheBhyt,
          },
          {
            key: "tuoi",
            placeholder: t("hsba.nhapGiaTriTuoiNhoNhatCanTin"),
            type: "number",
            defaultValue: state.tuoi,
          },
          {
            key: "NgaySinh",
            placeholder: [t("common.tuNgay"), t("common.denNgay")],
            type: "date",
            title: t("common.ngaySinh"),
            defaultDate: [state.tuNgaySinh, state.denNgaySinh],
          },
          {
            key: "ThoiGianVaoVien",
            placeholder: [t("common.tuNgay"), t("common.denNgay")],
            type: "date",
            title: t("hsba.ngayDangKy"),
            defaultDate: [state.tuThoiGianVaoVien, state.denThoiGianVaoVien],
          },
        ],
      }}
    />
  );
};

export default TimKiemPhieu;
