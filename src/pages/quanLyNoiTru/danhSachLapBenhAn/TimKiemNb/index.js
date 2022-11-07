import React, { useState, useEffect } from "react";
import { BaseSearch } from "components";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
import {
  setQueryStringValues,
  getAllQueryString,
} from "hook/useQueryString/queryString";

const TimKiemPhieu = (props) => {
  const { t } = useTranslation();

  const {
    khoa: { getListAllKhoa },
    nhanVien: { getListAllNhanVien },
    quanLyNoiTru: { onChangeInputSearch },
  } = useDispatch();
  const [listTrangThaiNb] = useEnum(ENUM.TRANG_THAI_NB);
  const { listAllNhanVien } = useSelector((state) => state.nhanVien);
  const { listAllKhoa } = useSelector((state) => state.khoa);
  const [state, _setState] = useState({
    tuThoiGianKetLuan: moment().format("DD/MM/YYYY"),
    denThoiGianKetLuan: moment().format("DD/MM/YYYY"),
    trangThai: 10,
  });
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    const { page, size, dataSortColumn, ...queries } = getAllQueryString();
    if (queries.bacSiKetLuanId) {
      queries.bacSiKetLuanId = parseInt(queries.bacSiKetLuanId);
    }
    if (queries.khoaNhapVienId) {
      queries.khoaNhapVienId = parseInt(queries.khoaNhapVienId);
    }
    setState(queries);
    getListAllKhoa({ page: "", size: "" });
    getListAllNhanVien({ page: "", size: "" });
  }, []);

  return (
    <BaseSearch
      cacheData={state}
      dataInput={[
        {
          widthInput: "232px",
          placeholder: t("quanLyNoiTru.timTenNbQrNbMaHs"),
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
          placeholder: t("quanLyNoiTru.maBa"),
          keyValueInput: "maBenhAn",
          functionChangeInput: onChangeInputSearch,
        },
        {
          widthInput: "232px",
          placeholder: t("lapBenhAn.trangThaiNguoiBenh"),
          keyValueInput: "trangThai",
          functionChangeInput: onChangeInputSearch,
          type: "select",
          defaultValue: 10,
          listSelect: [{ id: null, ten: "Tất cả" }, ...listTrangThaiNb],
        },
        {
          widthInput: "232px",
          type: "dateOptions",
          state: state,
          setState: setState,
          keyValueInput: ["tuThoiGianKetLuan", "denThoiGianKetLuan"],
          functionChangeInput: (e) => {
            onChangeInputSearch(
              {
                tuThoiGianKetLuan: e.tuThoiGianVaoVien?.format(
                  "YYYY-MM-DD 00:00:00"
                ),
                denThoiGianKetLuan: e.denThoiGianVaoVien?.format(
                  "YYYY-MM-DD 23:59:59"
                ),
              },
              !!e.tuThoiGianVaoVien
            );
          },
          title: "Ngày kết luận",
          placeholder: "Chọn ngày kết luận",
          format: "DD/MM/YYYY",
        },
      ]}
      filter={{
        open: true,
        width: "110px",
        funcSearchData: (data) => {
          setQueryStringValues(data);
          onChangeInputSearch(data);
        },
        data: [
          {
            key: "maNb",
            placeholder: t("common.maNb"),
            defaultValue: state.maNb,
            type: "normal",
          },
          {
            key: "khoaNhapVienId",
            widthInput: "212px",
            placeholder: "Khoa nhập viện",
            dataSelect: listAllKhoa || [],
            defaultValue: state.khoaNhapVienId,
            type: "select",
          },
          {
            key: "bacSiKetLuanId",
            widthInput: "212px",
            placeholder: "Nhập tìm tên bác sĩ chỉ định",
            dataSelect: listAllNhanVien || [],
            defaultValue: state.bacSiKetLuanId,
            type: "select",
          },
        ],
      }}
    />
  );
};

export default TimKiemPhieu;
