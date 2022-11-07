import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BaseSearch } from "components";
import { useTranslation } from "react-i18next";

const TimKiemPhieuBaoGia = ({ layerId, ...props }) => {
  const { t } = useTranslation();
  const refFocusTenNb = useRef();

  const [state, _setState] = useState({
    selectedDateFrom: null,
    selectedDateTo: null,
  });

  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const {
    utils: { listTrangThaiHopDong = [] },
  } = useSelector((state) => state);

  const {
    phimTat: { onRegisterHotkey },
    khamSucKhoe: { searchPhieuBaoGiaByParams, clearData },
    utils: { getUtils },
  } = useDispatch();

  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 117, //F6
          onEvent: () => {
            refFocusTenNb.current && refFocusTenNb.current.focus();
          },
        },
      ],
    });

    getUtils({ name: "TrangThaiHopDong" });

    return () => {
      clearData();
    };
  }, []);

  return (
    <BaseSearch
      dataInput={[
        {
          widthInput: "232px",
          placeholder: "Tìm mã báo giá",
          keyValueInput: "ma",
          functionChangeInput: searchPhieuBaoGiaByParams,
        },
        {
          widthInput: "232px",
          placeholder: "Tìm tên báo giá",
          keyValueInput: "ten",
          functionChangeInput: searchPhieuBaoGiaByParams,
        },
        {
          widthInput: "232px",
          placeholder: "Tìm tên công ty",
          keyValueInput: "tenDoiTac",
          functionChangeInput: searchPhieuBaoGiaByParams,
        },
        {
          widthInput: "160px",
          title: t("common.trangThai"),
          keyValueInput: "dsTrangThai",
          functionChangeInput: ({ dsTrangThai }) => {
            searchPhieuBaoGiaByParams({ dsTrangThai });

            setState({ dsTrangThai });
          },
          type: "selectCheckbox",
          value: state.dsTrangThai,
          listSelect: [
            { value: "", label: "Tất cả" },
            ...(listTrangThaiHopDong || []).map((item) => ({
              value: item.id,
              label: item.ten,
            })),
          ],
        },
      ]}
      filter={{
        open: true,
        width: "110px",
        funcSearchData: searchPhieuBaoGiaByParams,
        data: [
          {
            key: ["tuThoiGianTao", "denThoiGianTao"],
            widthInput: "212px",
            type: "dateRange",
            placeholder: [t("common.tuNgay"), t("common.denNgay")],
            title: "Ngày tạo báo giá",
          },
          {
            key: ["tuThoiGianCapNhat", "denThoiGianCapNhat"],
            widthInput: "212px",
            type: "dateRange",
            placeholder: [t("common.tuNgay"), t("common.denNgay")],
            title: "Ngày cập nhật báo giá",
          },
        ],
      }}
    />
  );
};

export default TimKiemPhieuBaoGia;
