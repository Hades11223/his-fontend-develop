import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { BaseSearch } from "components";
import { setQueryStringValues } from "hook/useQueryString/queryString";
import { useEnum } from "hook";
import { ENUM } from "constants/index";

const HeaderSearchHoaDon = (props) => {
  const { t } = useTranslation();

  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const dispatch = useDispatch();
  const { onChangeInputSearch, onSearch } = dispatch.dsHoaDonDienTu;
  const { getListAllNhanVien } = dispatch.nhanVien;
  const { listAllNhanVien } = useSelector((state) => state.nhanVien);
  const [listTrangThaiHoaDon] = useEnum(ENUM.TRANG_THAI_HOA_DON);

  useEffect(() => {
    getListAllNhanVien();
  }, []);

  return (
    <BaseSearch
      cacheData={state}
      dataInput={[
        {
          widthInput: "350px",
          placeholder: t("thuNgan.timTenNguoiBenhQRNguoiBenh"),
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
          widthInput: "250px",
          placeholder: t("thuNgan.nhapDeTimTheoSoHoaDon"),
          keyValueInput: "soHoaDon",
          functionChangeInput: onChangeInputSearch,
        },
        {
          widthInput: "232px",
          placeholder: t("thuNgan.nhapDeTimTenCongTy"),
          keyValueInput: "tenCongTy",
          functionChangeInput: onChangeInputSearch,
        },
        {
          widthInput: "232px",
          title: t("common.trangThai"),
          keyValueInput: "dsTrangThai",
          functionChangeInput: ({ dsTrangThai }) => {
            onChangeInputSearch({
              dsTrangThai,
            });

            setState({ dsTrangThai });
          },
          type: "selectCheckbox",
          value: state.dsTrangThai,
          listSelect: [
            { value: "", label: "Tất cả" },
            ...(listTrangThaiHoaDon || []).map((item) => ({
              value: item.id,
              label: item.ten,
            })),
          ],
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
            key: "nguoiPhatHanhHdId",
            placeholder: t("thuNgan.nguoiXuatHoaDon"),
            type: "select",
            dataSelect: listAllNhanVien,
          },
          {
            key: ["thoiGianXuatHoaDonTu", "thoiGianXuatHoaDonDen"],
            widthInput: "212px",
            type: "date-1",
            placeholder: [t("common.tuNgay"), t("common.denNgay")],
            title: t("thuNgan.thoiGianXuatHoaDon"),
          },
          {
            key: "kyHieuHoaDon",
            placeholder: t("thuNgan.kyHieuHoaDon"),
            type: "normal",
          },
          {
            key: "soHoaDonGoc",
            placeholder: t("thuNgan.soHoaDonGoc"),
            type: "normal",
          },
          {
            key: ["thanhTienTu", "thanhTienDen"],
            widthInput: "212px",
            type: "numberRange",
            placeholder: [
              t("thuNgan.nhapSoTienNhoNhat"),
              t("thuNgan.nhapSoTienLonNhat"),
            ],
            title: t("thuNgan.tongTienHoaDon"),
          },
        ],
      }}
    />
  );
};

export default HeaderSearchHoaDon;
