import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BaseSearch } from "components";
import { useTranslation } from "react-i18next";
import moment from "moment";
import useListAll from "hook/useListAll";
import { ENUM, TRANG_THAI_DICH_VU } from "constants/index";
import { useEnum } from "hook";
import {
  getAllQueryString,
  setQueryStringValues,
} from "hook/useQueryString/queryString";

const TimKiemPhieu = (props) => {
  const { t } = useTranslation();
  const [listAllKhoa] = useListAll("khoa");

  const {
    pttt: { onChangeInputSearch, getDashboardTheoTrangThai },
  } = useDispatch();
  const [listTrangThaiDichVu] = useEnum(ENUM.TRANG_THAI_DICH_VU);
  const [listPhanLoaiPTTT] = useEnum(ENUM.PHAN_LOAI_PTTT);

  const [state, _setState] = useState({
    tuThoiGianThucHien: moment()
      .set("hour", 0)
      .set("minute", 0)
      .set("second", 0),
    denThoiGianThucHien: moment()
      .set("hour", 23)
      .set("minute", 59)
      .set("second", 59),
  });
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const onSearchDate = (data) => {
    onChangeInputSearch(
      data.tuThoiGianThucHien
        ? data
        : {
            tuThoiGianThucHien: "",
            denThoiGianThucHien: "",
          }
    );
    getDashboardTheoTrangThai(data.tuThoiGianThucHien ? data : {});
  };

  useEffect(() => {
    const { page, size, dataSortColumn, ...queries } = getAllQueryString();
    if (queries.trangThai) {
      queries.trangThai = parseInt(queries.trangThai);
    }
    if (queries.khoaChiDinhId) {
      queries.khoaChiDinhId = parseInt(queries.khoaChiDinhId);
    }
    if (queries.phanLoai) {
      queries.phanLoai = parseInt(queries.phanLoai);
    }
    if (queries.tuThoiGianThucHien == "-") {
      queries.tuThoiGianThucHien = "";
    }
    if (queries.denThoiGianThucHien == "-") {
      queries.denThoiGianThucHien = "";
    }

    setState(queries);
  }, []);

  return (
    <BaseSearch
      cacheData={state}
      dataInput={[
        {
          widthInput: "232px",
          placeholder: t("goiDichVu.timTenNbQrNbMaHs"),
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
          placeholder: t("pttt.timMaBA"),
          keyValueInput: "maBenhAn",
          functionChangeInput: onChangeInputSearch,
        },
        {
          widthInput: "232px",
          placeholder: t("pttt.timTenDv"),
          keyValueInput: "tenDichVu",
          functionChangeInput: onChangeInputSearch,
        },
        {
          widthInput: "232px",
          type: "dateOptions",
          state: state,
          setState: setState,
          ignoreKeys: ["tatCa"],
          keyValueInput: ["tuThoiGianThucHien", "denThoiGianThucHien"],
          functionChangeInput: (e) => {
            onSearchDate(
              {
                tuThoiGianThucHien: e.tuThoiGianVaoVien?.format(
                  "YYYY-MM-DD 00:00:00"
                ),
                denThoiGianThucHien: e.denThoiGianVaoVien?.format(
                  "YYYY-MM-DD 23:59:59"
                ),
              },
              !!e.tuThoiGianVaoVien
            );
          },
          title: t("pttt.thoiGianBatDauPttt"),
          placeholder: t("tiepDon.chonNgayDangKy"),
          format: "DD/MM/YYYY",
        },
        {
          widthInput: "180px",
          placeholder: t("common.trangThai"),
          keyValueInput: "trangThai",
          functionChangeInput: onChangeInputSearch,
          type: "select",
          listSelect: listTrangThaiDichVu?.filter((i) =>
            [
              TRANG_THAI_DICH_VU.CHO_TIEP_NHAN,
              TRANG_THAI_DICH_VU.DA_TIEP_NHAN,
              TRANG_THAI_DICH_VU.DA_CO_KET_QUA,
            ].some((j) => j === i.id)
          ),
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
            key: "maDichVu",
            placeholder: t("pttt.timTheoMaDv"),
            type: "normal",
          },
          {
            key: "khoaChiDinhId",
            placeholder: t("pttt.timTheoKhoaCd"),
            type: "select",
            dataSelect: listAllKhoa,
          },
          {
            key: "phanLoai",
            placeholder: t("pttt.timTheoPhanLoaiPTTT"),
            type: "select",
            dataSelect: listPhanLoaiPTTT,
          },
        ],
      }}
    />
  );
};

export default TimKiemPhieu;
