import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BaseSearch from "components/BaseSearch";
import { useEnum, useStore } from "hook";
import { ENUM } from "constants/index";
import { useTranslation } from "react-i18next";
import useListAll from "hook/useListAll";
const TimKiemPhieu = (props) => {
  const { t } = useTranslation();
  const {
    danhSachNguoiBenhNoiTru: { onChangeInputSearch },
    khoa: { getListKhoaTongHop },
    thietLap: { getThietLap },
    nhanVien: { getListNhanVienTongHop },
    phong: { getListPhongTongHop },
  } = useDispatch();

  const listNhanVien = useStore("nhanVien.listNhanVien", []);
  const listRoom = useStore("phong.listRoom", []);
  const dataSearch = useStore("danhSachNguoiBenhNoiTru.dataSearch", {});

  const [listTrangThaiTaiKhoa] = useEnum(ENUM.TRANG_THAI_TAI_KHOA);
  const [listTrangThaiNb] = useEnum(ENUM.TRANG_THAI_NB);
  const [listDoiTuongKCB] = useEnum(ENUM.DOI_TUONG_KCB);
  const [listAllLoaiBenhAn] = useListAll("loaiBenhAn");
  const { dsTrangThai } = props;
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    getListKhoaTongHop({
      dsTinhChatKhoa: 70,
      page: "",
      size: "",
    });
    getThietLap({ ma: "BAC_SI" }).then((data) => {
      getListNhanVienTongHop({
        page: null,
        size: null,
        active: true,
        "vanBang.ma": data,
      });
    });
  }, []);
  useEffect(() => {
    if (state?.dsKhoaNbId) {
      getListPhongTongHop({
        page: "",
        size: "",
        dsKhoaId: state?.dsKhoaNbId,
      });
    }
  }, [state?.dsKhoaNbId]);

  return (
    <BaseSearch
      cacheData={{
        ...dataSearch,
        dsTrangThai: Array.isArray(dataSearch?.dsTrangThai)
          ? undefined
          : dataSearch?.dsTrangThai,
      }}
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
          placeholder: t("quanLyNoiTru.nbTrongKhoa"),
          keyValueInput: "trangThaiTaiKhoa",
          functionChangeInput: onChangeInputSearch,
          type: "select",
          listSelect: listTrangThaiTaiKhoa,
        },
        {
          widthInput: "232px",
          placeholder: t("quanLyNoiTru.loaiBenhAn"),
          keyValueInput: "loaiBenhAnId",
          listSelect: listAllLoaiBenhAn,
          functionChangeInput: onChangeInputSearch,
          type: "select",
        },
      ]}
      filter={{
        open: true,
        width: "110px",
        // funcRefreshData: () => { onSearch({ page: 0, size: 10 }) },
        funcSearchData: onChangeInputSearch,
        data: [
          {
            widthInput: "212px",
            placeholder: t("quanLyNoiTru.bacSiDieuTri"),
            key: "bacSiDieuTriId",
            functionChangeInput: onChangeInputSearch,
            type: "select",
            dataSelect: [{ id: null, ten: "Tất cả" }, ...(listNhanVien || [])],
          },
          {
            widthInput: "212px",
            placeholder: t("quanLyNoiTru.trangThaiNb"),
            key: "dsTrangThai",
            functionChangeInput: onChangeInputSearch,
            type: "select",
            dataSelect: [
              { id: null, ten: "Tất cả" },
              ...(listTrangThaiNb || []).filter((x) =>
                dsTrangThai.includes(x.id)
              ),
            ],
          },
          {
            widthInput: "212px",
            placeholder: t("quanLyNoiTru.timTheoDoiTuongKcb"),
            key: "doiTuongKcb",
            functionChangeInput: onChangeInputSearch,
            type: "select",
            dataSelect: [
              { id: null, ten: "Tất cả" },
              ...(listDoiTuongKCB || []),
            ],
          },
          {
            widthInput: "212px",
            placeholder: t("quanLyNoiTru.phong"),
            key: "phongId",
            functionChangeInput: onChangeInputSearch,
            type: "select",
            dataSelect: [{ id: null, ten: "Tất cả" }, ...(listRoom || [])],
          },
          {
            widthInput: "212px",
            placeholder: t("quanLyNoiTru.giuong"),
            key: "giuongId",
            type: "normal",
          },
          {
            key: ["tuThoiGianVaoKhoa", "denThoiGianVaoKhoa"],
            placeholder: [t("common.tuNgay"), t("common.denNgay")],
            type: "date-1",
            title: t("quanLyNoiTru.thoiGianVaoKhoa"),
          },
          {
            key: ["tuThoiGianVaoKhoaNhapVien", "denThoiGianVaoKhoaNhapVien"],
            placeholder: [t("common.tuNgay"), t("common.denNgay")],
            type: "date-1",
            title: t("quanLyNoiTru.thoiGianNhapVien"),
          },
          {
            key: ["tuThoiGianRaVien", "denThoiGianRaVien"],
            placeholder: [t("common.tuNgay"), t("common.denNgay")],
            type: "date-1",
            title: t("quanLyNoiTru.thoiGianRaVien"),
          },
        ],
      }}
    />
  );
};

export default TimKiemPhieu;
