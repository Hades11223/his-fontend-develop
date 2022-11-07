import React, { useEffect, useMemo, useState } from "react";
import { Main } from "./styled";
import { useSelector, useDispatch } from "react-redux";
import { BaseSearch } from "components";

import { useTranslation } from "react-i18next";
import { useEnum, useStore } from "hook";
import { ENUM, LOAI_DICH_VU } from "constants/index";
import useListAll from "hook/useListAll";

const TimKiemPhieu = (props) => {
  const { t } = useTranslation();
  const {
    kho: { getAllTongHop },
    vatTuKyGui: { onChangeInputSearch },
    nhanVien: { getListAllNhanVien },
    doiTac: { getListAllNhaCungCap },
  } = useDispatch();
  const listAllNhaCungCap = useStore("doiTac.listAllNhaCungCap", []);
  const [listTrangThaiVatTuKyGui] = useEnum(ENUM.TRANG_THAI_VAT_TU_KY_GUI);
  const listAllKho = useStore("kho.listAllKho", []);
  const [listAllKhoa] = useListAll("khoa");

  useEffect(() => {
    getAllTongHop({
      page: "",
      size: "",
      khoKyGui: true,
      dsLoaiDichVu: LOAI_DICH_VU.VAT_TU,
    });
    getListAllNhanVien({ page: "", size: "" });
    getListAllNhaCungCap({
      page: "",
      size: "",
      active: true,
      dsLoaiDoiTac: [20],
    });
  }, []);

  return (
    <Main>
      <BaseSearch
        filter={{
          open: true,
          width: "110px",
          title: "Lọc phiếu",
          funcSearchData: onChangeInputSearch,
          data: [
            {
              key: "khoaChiDinhId",
              placeholder: t("kho.khoaChiDinh"),
              type: "select",
              title: t("kho.khoaChiDinh"),
              dataSelect: listAllKhoa,
            },
            {
              key: "maHoSo",
              placeholder: t("common.maHoSo"),
              type: "normal",
              title: t("common.maHoSo"),
            },
            {
              key: "maNb",
              placeholder: t("common.maNb"),
              type: "normal",
              title: t("common.maNb"),
            },
            {
              key: ["tuThoiGianThucHien", "denThoiGianThucHien"],
              placeholder: ["Từ ngày", "đến ngày"],
              type: "date-1",
              title: t("kho.thoiGianThucHien"),
            },
          ],
        }}
        dataInput={[
          {
            widthInput: "250px",
            keyValueInput: "nhaCungCapId",
            functionChangeInput: onChangeInputSearch,
            type: "select",
            listSelect: listAllNhaCungCap,
            placeholder: t("kho.nhaCungCap"),
          },
          {
            widthInput: "200px",
            keyValueInput: "khoId",
            functionChangeInput: onChangeInputSearch,
            type: "select",
            listSelect: listAllKho,
            placeholder: t("kho.tatCaKhoKyGui"),
          },
          {
            widthInput: "200px",
            keyValueInput: "trangThaiVatTuKyGui",
            functionChangeInput: onChangeInputSearch,
            listSelect: listTrangThaiVatTuKyGui,
            type: "select",
            placeholder: t("kho.trangThaiHoaDon"),
          },
          {
            widthInput: "350px",
            placeholder: t("kho.nhapDeTimTheoMaHoacHangHoa"),
            functionChangeInput: onChangeInputSearch,
            keyValueInput: "timKiem",
          },
        ]}
      />
    </Main>
  );
};
export default TimKiemPhieu;
