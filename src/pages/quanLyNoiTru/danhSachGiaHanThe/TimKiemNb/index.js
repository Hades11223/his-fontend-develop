import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import BaseSearch from "components/BaseSearch";
import { getAllQueryString } from "hook/useQueryString/queryString";

const TimKiemPhieu = (props) => {
  const { t } = useTranslation();
  const {
    khoa: { getListAllKhoa },
    giaHanTheChuyenDoiTuong: { onChangeInputSearch },
  } = useDispatch();
  const { listAllKhoa } = useSelector((state) => state.khoa);

  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    const { page, size, dataSortColumn, ...queries } = getAllQueryString();
    if (queries.khoaNbId) {
      queries.khoaNbId = parseInt(queries.khoaNbId);
    }
    setState(queries);

    getListAllKhoa({ active: true, page: "", size: "" });
  }, []);

  return (
    <BaseSearch
      cacheData={state}
      dataInput={[
        {
          widthInput: "262px",
          placeholder: t("quanLyNoiTru.giaHanThe.timMaQrNguoiBenh"),
          functionChangeInput: onChangeInputSearch,
          isScanQR: true,
          qrGetValue: "maNb",
          keysFlexible: [
            {
              key: "maNb",
              type: "number",
            },
          ],
        },
        {
          widthInput: "232px",
          placeholder: t("quanLyNoiTru.giaHanThe.timMaHoSoNguoiBenh"),
          keyValueInput: "maHoSo",
          functionChangeInput: onChangeInputSearch,
        },
        {
          widthInput: "232px",
          placeholder: t("quanLyNoiTru.giaHanThe.timMaBenhAn"),
          keyValueInput: "maBenhAn",
          functionChangeInput: onChangeInputSearch,
        },
        {
          widthInput: "232px",
          placeholder: t("common.timTenNb"),
          keyValueInput: "tenNb",
          functionChangeInput: onChangeInputSearch,
        },
        {
          widthInput: "232px",
          placeholder: t("quanLyNoiTru.giaHanThe.timKhoaNguoiBenh"),
          keyValueInput: "khoaNbId",
          functionChangeInput: onChangeInputSearch,
          type: "select",
          listSelect: listAllKhoa,
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

export default TimKiemPhieu;
