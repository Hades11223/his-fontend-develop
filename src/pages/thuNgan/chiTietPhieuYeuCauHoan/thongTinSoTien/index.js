import React, { useEffect, useState } from "react";
import { Main } from "./styled";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const ThongTinSoTien = (props) => {
  const [state, _setState] = useState({
    tienDvMoi: 0,
    tienDvTraLai: 0,
    tienNbTraThem: 0,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { t } = useTranslation();
  const { chiTietPhieuDoiTra } = useSelector(
    (state) => state.danhSachPhieuYeuCauHoan
  );

  useEffect(() => {
    setState({
      tienDvMoi: chiTietPhieuDoiTra?.thanhTienMoi || 0,
      tienDvTraLai: chiTietPhieuDoiTra?.thanhTienCu || 0,
      tienNbTraThem:
        (chiTietPhieuDoiTra?.thanhTienMoi || 0) -
        (chiTietPhieuDoiTra?.thanhTienCu || 0) +
        (chiTietPhieuDoiTra?.tienPhiTra || 0),
    });
  }, [chiTietPhieuDoiTra]);

  return (
    <Main>
      <div className="title">
        {t("thuNgan.thongTinSoTien")}
      </div>
      <div className="row-money">
        <span className="label">{t("thuNgan.tongTienDVMoi")}</span>
        <span className="money">{state?.tienDvMoi.formatPrice()} đ</span>
      </div>
      <div className="row-money">
        <span className="label">{t("thuNgan.tongTienDVTraLai")}</span>
        <span className="money">{state?.tienDvTraLai.formatPrice()} đ</span>
      </div>
      <div className="row-money">
        <span className="label">{t("thuNgan.tienNbTraThem")}</span>
        <span className="money">{state?.tienNbTraThem.formatPrice()} đ</span>
      </div>
    </Main>
  );
};

export default ThongTinSoTien;
