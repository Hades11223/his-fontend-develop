import React from "react";
import TextField from "components/TextField";
import { refElement } from "../../ThongTin";
import { Title } from "../styled";
import { useSelector } from "react-redux";
import SelectBacSy from "../components/SelectBacSy";
import { useTranslation } from "react-i18next";

const KetLuan = (props) => {
  const { t } = useTranslation();
  const { handleSetData } = props;

  const { thongTinKSK } = useSelector((state) => state.nbDichVuKhamKSK);
  const {
    phanLoai,
    benhKhac,
    phanLoaiNgheNghiep,
    nhungDieuCanGiaiQuyet,
    bacSiKetLuanId,
  } = thongTinKSK || {};

  return (
    <>
      <Title>VII. {t("khamBenh.khamSucKhoe.ketLuan")}</Title>

      <TextField
        label={t("khamBenh.khamSucKhoe.phanLoaiSucKhoe")}
        html={phanLoai}
        onChange={handleSetData(["nbKSK", "phanLoai"])}
        maxLength={2000}
        refsChild={refElement}
      />

      <TextField
        label={t("khamBenh.khamSucKhoe.cacBenhTatNeuCo")}
        html={benhKhac}
        onChange={handleSetData(["nbKSK", "benhKhac"])}
        maxLength={2000}
        refsChild={refElement}
      />

      <div style={{ display: "flex" }}>
        <span style={{ paddingRight: 5, background: "#fff" }}>
          {t("khamBenh.khamSucKhoe.bacSiKetLuan")}:
        </span>
        <div style={{ flex: 1, marginTop: "-10px" }}>
          <SelectBacSy
            value={bacSiKetLuanId}
            onChangeBacSyValue={handleSetData(["nbKSK", "bacSiKetLuanId"])}
          />
        </div>
      </div>

      <TextField
        label={t("khamBenh.khamSucKhoe.phanLoaiNgheNghiep")}
        html={phanLoaiNgheNghiep}
        onChange={handleSetData(["nbKSK", "phanLoaiNgheNghiep"])}
        maxLength={2000}
        refsChild={refElement}
      />

      <TextField
        label={t("khamBenh.khamSucKhoe.nhungDieuCanGiaiQuyet")}
        html={nhungDieuCanGiaiQuyet}
        onChange={handleSetData(["nbKSK", "nhungDieuCanGiaiQuyet"])}
        maxLength={2000}
        refsChild={refElement}
      />
    </>
  );
};

export default KetLuan;
