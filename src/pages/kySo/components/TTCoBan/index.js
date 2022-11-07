import React, { useEffect } from "react";
import { Main } from "./styled";
import { useEnum, useStore } from "hook";
import { ENUM } from "constants/index";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const TTCoBan = () => {
  const { thongTinBenhNhan } = useStore("nbDotDieuTri", {});
  const [listgioiTinh] = useEnum(ENUM.GIOI_TINH);
  const { t } = useTranslation();
  const {
    nbDotDieuTri: { getById },
  } = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) getById(id);
  }, [id]);
  return (
    <Main>
      <div className="left">
        <div className="ma-nb ml2">
          {t("common.maNb")}-{thongTinBenhNhan?.maNb}
        </div>
        <div className="tt-nb ml2">
          <b>{thongTinBenhNhan?.tenNb}</b> (
          {
            listgioiTinh.find((item) => item.id === thongTinBenhNhan?.gioiTinh)
              ?.ten
          }{" "}
          - {thongTinBenhNhan?.tuoi} {t("common.tuoi")}) - {t("common.sdt")}:{" "}
          {thongTinBenhNhan?.soDienThoai} - {t("common.maHoSo")}:{" "}
          {thongTinBenhNhan?.maHoSo} - {thongTinBenhNhan?.diaChi}
        </div>
      </div>
    </Main>
  );
};

export default TTCoBan;
