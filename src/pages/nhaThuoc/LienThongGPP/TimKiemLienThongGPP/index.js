import React, { useEffect, useRef, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DANH_SACH_LOAI_NHAP_XUAT, ENUM } from "constants/index";
import BaseSearch from "components/BaseSearch";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";

const TimKiemLienThongGPP = ({ layerId, ...props }) => {
  const { t } = useTranslation();
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  //redux
  const {
    kho: { getAllTongHop: getAllKhoTongHop, getTheoTaiKhoan },
    nhanVien: { getListAllNhanVien },
    lienThongGpp: { searchLienThongGppByParams },
  } = useDispatch();

  const {
    lienThongGpp: { dataSearch },
    kho: { listKhoUser },
  } = useSelector((state) => state);
  const { listAllNhanVien } = useSelector((state) => state.nhanVien);
  const [listTrangThaiGpp] = useEnum(ENUM.TRANG_THAI_GPP)

  const listKhoNhanVienKho = useMemo(() => {
    return listKhoUser.map((item) => {
      item.value = item.id;
      item.label = item?.ten;
      return item;
    });
  }, [listKhoUser]);

  const refFocusTenNb = useRef();
  const refFocusQr = useRef();
  const refCreate = useRef();

  const {
    phimTat: { onRegisterHotkey },
  } = useDispatch();

  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 112, //F1
          onEvent: () => {
            refCreate.current && refCreate.current.click();
          },
        },
        {
          keyCode: 114, //F3
          onEvent: () => {
            refFocusQr.current && refFocusQr.current.focus();
          },
        },
        {
          keyCode: 117, //F6
          onEvent: () => {
            refFocusTenNb.current && refFocusTenNb.current.focus();
          },
        },
      ],
    });

    getAllKhoTongHop({});
    getListAllNhanVien();
    getTheoTaiKhoan({ nhaThuoc: true });
  }, []);

  const onSearchInput = (key) => (e) => {
    if (key === "dsKhoId") {
      searchLienThongGppByParams({ dsKhoId: e });

      setState({ dsKhoId: e });
    }
  };

  return (
    <BaseSearch
      dataInput={[
        {
          widthInput: "232px",
          placeholder: "Chọn loại nhập xuất",
          keyValueInput: "dsLoaiNhapXuat",
          listSelect: DANH_SACH_LOAI_NHAP_XUAT.map((x) => ({
            ...x,
            id: x.value,
          })),
          defaultValue: dataSearch?.dsLoaiNhapXuat,
          functionChangeInput: searchLienThongGppByParams,
          type: "select",
          allowClear: true,
        },
        {
          widthInput: "232px",
          placeholder: "Tìm theo số phiếu",
          keyValueInput: "soPhieu",
          functionChangeInput: searchLienThongGppByParams,
        },
        {
          widthInput: "232px",
          placeholder: "Chọn kho",
          title: "Tên kho",
          keyValueInput: "dsKhoId",
          listSelect: listKhoNhanVienKho,
          value: state.dsKhoId,
          functionChangeInput: ({ dsKhoId }) =>
            onSearchInput("dsKhoId")(dsKhoId),
          type: "selectCheckbox",
        },
        {
          widthInput: "232px",
          placeholder: "Chọn trạng thái",
          keyValueInput: "dsTrangThaiGpp",
          listSelect: [{ id: "", ten: "Tất cả" }, ...listTrangThaiGpp],
          defaultValue: dataSearch?.dsTrangThaiGpp,
          functionChangeInput: searchLienThongGppByParams,
          type: "select",
        },
      ]}
      filter={{
        open: true,
        width: "110px",
        funcSearchData: searchLienThongGppByParams,
        data: [
          {
            key: "maNb",
            widthInput: "212px",
            placeholder: "Mã NB",
            type: "normal",
          },
          {
            key: "maHoSo",
            widthInput: "212px",
            placeholder: "Mã hồ sơ",
            type: "normal",
          },
          {
            key: "soPhieu",
            widthInput: "212px",
            placeholder: "Số phiếu",
            type: "normal",
          },
          {
            key: "nguoiDuyetId",
            widthInput: "212px",
            placeholder: "Người phát",
            dataSelect: listAllNhanVien || [],
            type: "select",
          },
          {
            key: ["tuThoiGianDuyet", "denThoiGianDuyet"],
            widthInput: "212px",
            type: "date-1",
            placeholder: [t("common.tuNgay"), t("common.denNgay")],
            title: "Ngày phát",
          },
        ],
      }}
    />
  );
};

export default TimKiemLienThongGPP;
