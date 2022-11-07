import React from "react";
import TextField from "components/TextField";
import { Title } from "../styled";
import { useSelector } from "react-redux";
import { refElement } from "../../ThongTin";
import { useTranslation } from "react-i18next";

const KhamXet = (props) => {
  const { t } = useTranslation();
  const {
    thongTinChiTiet: {
      nbKhamXet: { toanThan, cacBoPhan, ghiChu } = {},
      nbDvKyThuat: { trangThai: trangThaiKham } = {},
    },
  } = useSelector((state) => {
    if (!state.khamBenh.thongTinChiTiet.nbHoiBenh)
      state.khamBenh.thongTinChiTiet.nbHoiBenh = {};
    if (!state.khamBenh.thongTinChiTiet.nbKhamXet)
      state.khamBenh.thongTinChiTiet.nbKhamXet = {};
    if (!state.khamBenh.thongTinChiTiet.nbDvKyThuat)
      state.khamBenh.thongTinChiTiet.nbDvKyThuat = {};
    return state.khamBenh;
  });

  const { handleSetData } = props;
  return (
    <>
      <Title>V. {t("khamBenh.khamXet.title")}</Title>
      <TextField
        label={`1. ${t("khamBenh.khamXet.toanThan")}`}
        maxLength={2000}
        html={toanThan}
        disabled={trangThaiKham === 150}
        onChange={handleSetData(["nbKhamXet", "toanThan"])}
        refsChild={refElement}
        keyReload={"chan-doan"}
      />
      <TextField
        label={`2. ${t("khamBenh.khamXet.cacBoPhan")}`}
        // maxLine={2}
        disabled={trangThaiKham === 150}
        maxLength={2000}
        html={cacBoPhan}
        onChange={handleSetData(["nbKhamXet", "cacBoPhan"])}
        refsChild={refElement}
        keyReload={"chan-doan"}
      />
      <TextField
        label={`3. ${t("khamBenh.khamXet.luuY")}`}
        // maxLine={2}
        disabled={trangThaiKham === 150}
        maxLength={2000}
        html={ghiChu}
        onChange={handleSetData(["nbKhamXet", "ghiChu"])}
        refsChild={refElement}
        keyReload={"chan-doan"}
      />
    </>
  );
};

export default KhamXet;
