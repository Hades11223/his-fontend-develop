import React, { useEffect, useState } from "react";
import "./styled.css";
import { useDispatch, useSelector } from "react-redux";
import { BaseSearch } from "components";
import { useTranslation } from "react-i18next";
import { DA_KIEM_TRA, ENUM } from "constants/index";
import { useEnum } from "hook";
import {
  getAllQueryString,
  setQueryStringValues,
} from "hook/useQueryString/queryString";

const TimKiemNB = (props) => {
  const { t } = useTranslation();

  const {
    danhSachNbTiepDon: { onChangeInputSearch },
    nhanVien: { getListNhanVienTongHop },
  } = useDispatch();
  const [listDoiTuong] = useEnum(ENUM.DOI_TUONG);
  const listNhanVien = useSelector((state) => state.nhanVien.listNhanVien);

  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    getListNhanVienTongHop({});
    const { page, size, dataSortColumn, ...queries } = getAllQueryString();
    if (queries.doiTuong) queries.doiTuong = parseInt(queries.doiTuong);
    if (queries.nhanVienTiepDonId)
      queries.nhanVienTiepDonId = parseInt(queries.nhanVienTiepDonId);
    setState(queries);
  }, []);

  return (
    <BaseSearch
      cacheData={state}
      dataInput={[
        {
          widthInput: "288px",
          placeholder: t("tiepDon.timHoTenNguoiBenh"),
          keyValueInput: "tenNb",
          functionChangeInput: onChangeInputSearch,
        },
        {
          widthInput: "288px",
          placeholder: t("tiepDon.timSoDienThoai"),
          keyValueInput: "soDienThoai",
          functionChangeInput: onChangeInputSearch,
        },

        {
          widthInput: "288px",
          placeholder: t("tiepDon.timMaHoSo"),
          keyValueInput: "maHoSo",
          functionChangeInput: onChangeInputSearch,
        },
        {
          widthInput: "288px",
          placeholder: t("tiepDon.nhapHoacQuetQRNguoiBenh"),
          keyValueInput: "maNb",
          isScanQR: true,
          functionChangeInput: onChangeInputSearch,
        },

        {
          widthInput: "288px",
          placeholder: t("tiepDon.timTenCongTy"),
          keyValueInput: "tenDoiTac",
          functionChangeInput: onChangeInputSearch,
        },

        {
          widthInput: "288px",
          placeholder: t("tiepDon.timMaThanhToanHDKSK"),
          keyValueInput: "maHopDongKsk",
          functionChangeInput: onChangeInputSearch,
        },
      ]}
      filter={{
        open: true,
        width: "110px",
        // funcRefreshData: () => { onSearch({ page: 0, size: 10 }) },
        funcSearchData: (data) => {
          setQueryStringValues(data);
          onChangeInputSearch(data);
        },
        data: [
          {
            key: ["tuThoiGianVaoVien", "denThoiGianVaoVien"],
            widthInput: "212px",
            type: "date-1",
            placeholder: [t("common.tuNgay"), t("common.denNgay")],
            title: t("tiepDon.chonNgayDangKy"),
          },
          {
            widthInput: "212px",
            placeholder: t("tiepDon.nhanVienTiepDon"),
            key: "nhanVienTiepDonId",
            type: "select",
            title: t("tiepDon.nhanVienTiepDon"),
            dataSelect: listNhanVien,
            defaultValue: state.nhanVienTiepDonId,
          },
          {
            widthInput: "212px",
            placeholder: t("common.doiTuong"),
            key: "doiTuong",
            type: "select",
            dataSelect: [{ id: null, ten: t("common.tatCa") }, ...listDoiTuong],
            title: t("tiepDon.doiTuongNguoiBenh"),
            defaultValue: state.doiTuong,
          },
          {
            widthInput: "212px",
            placeholder: t("common.khoa"),
            key: "tenKhoaNb",
            type: "normal",
            title: t("common.khoa"),
            defaultValue: state.tenKhoaNb,
          },
          {
            widthInput: "212px",
            key: "maTheBhyt",
            placeholder: t("tiepDon.soTheBaoHien"),
            type: "normal",
            title: t("tiepDon.soTheBaoHien"),
            defaultValue: state.maTheBhyt,
          },
          {
            widthInput: "212px",
            placeholder: t("tiepDon.kiemTraTheBh"),
            key: "boQuaTheLoi",
            type: "select",
            title: t("tiepDon.kiemTraTheBh"),
            defaultValue: state.boQuaTheLoi,
            dataSelect: DA_KIEM_TRA,
          },
        ],
      }}
    />
  );
};

export default TimKiemNB;
