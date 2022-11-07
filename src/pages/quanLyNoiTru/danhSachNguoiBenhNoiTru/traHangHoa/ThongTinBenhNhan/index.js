import { ENUM } from "constants/index";
import { useEnum } from "hook";
import { memo, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { PatientInfoWrapper } from "./styled";
import React from "react";
import { useParams } from "react-router-dom";

const ThongTinBenhNhan = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { getNbNoiTruById } = useDispatch().danhSachNguoiBenhNoiTru;
  const { infoPatient } = useSelector((state) => state.danhSachNguoiBenhNoiTru);
  const [listGioiTinh] = useEnum(ENUM.GIOI_TINH);

  const gioiTinh = useMemo(() => {
    return (
      (listGioiTinh || []).find((item) => item.id === infoPatient?.gioiTinh) ||
      {}
    );
  }, [infoPatient, listGioiTinh]);
  const age = infoPatient?.tuoi ? ` - ${infoPatient?.tuoi} tuổi` : "";

  useEffect(() => {
    if (id) getNbNoiTruById(id);
  }, []);

  return (
    <PatientInfoWrapper>
      <div className="benhAn">
        {t("common.maBa")}: {infoPatient?.maBenhAn}
      </div>
      <div className="content">
        <span className="bold">{infoPatient?.tenNb}</span>{" "}
        <span className="more-info">
          {gioiTinh.ten && `(${gioiTinh.ten}${age})`}
        </span>
        {infoPatient?.tenPhong ? (
          <>
            <span> - Phòng hiện tại: </span>
            <span className="bold">{infoPatient.tenPhong}</span>
          </>
        ) : (
          ""
        )}
        {infoPatient?.soHieuGiuong ? (
          <>
            <span> - Giường hiện tại: </span>
            <span className="bold">{infoPatient.soHieuGiuong}</span>
          </>
        ) : (
          ""
        )}
      </div>
    </PatientInfoWrapper>
  );
};

export default memo(ThongTinBenhNhan);
