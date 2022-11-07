import React from "react";
import TextField from "components/TextField";
import { Title } from "../styled";
import { useSelector } from "react-redux";
import { refElement } from "../../ThongTin";
import { useTranslation } from "react-i18next";

const HoiBenh = (props) => {
  const { t } = useTranslation();
  const {
    thongTinChiTiet: {
      nbHoiBenh: { quaTrinhBenhLy, tienSuBanThan, tienSuGiaDinh } = {},
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
      <Title>IV. {t("khamBenh.hoiBenh.title")}</Title>
      <TextField
        label={`1. ${t("khamBenh.hoiBenh.quaTrinhBenhLy")}`}
        html={quaTrinhBenhLy}
        onChange={handleSetData(["nbHoiBenh", "quaTrinhBenhLy"])}
        maxLength={2000}
        refsChild={refElement}
        keyReload={"chan-doan"}
      />
      <div>2. {t("khamBenh.hoiBenh.tienSuBenh")}:</div>
      <TextField
        label={`- ${t("khamBenh.hoiBenh.banThan")}`}
        maxLength={2000}
        html={tienSuBanThan}
        onChange={handleSetData(["nbHoiBenh", "tienSuBanThan"])}
        refsChild={refElement}
        keyReload={"chan-doan"}
      />
      <TextField
        label={`- ${t("khamBenh.hoiBenh.giaDinh")}`}
        maxLength={2000}
        html={tienSuGiaDinh}
        onChange={handleSetData(["nbHoiBenh", "tienSuGiaDinh"])}
        refsChild={refElement}
        keyReload={"chan-doan"}
      />
    </>
  );
};

export default HoiBenh;
