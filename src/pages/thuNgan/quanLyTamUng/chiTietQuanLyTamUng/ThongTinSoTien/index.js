import { Row } from "antd";
import React from "react";
import { Main } from "./styled";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const ThongTinSoTien = () => {
  const { tienDieuTri } = useSelector((state) => state.nbDotDieuTri);
  const { t } = useTranslation();
  const {
    tienTamUng = 0,
    tienHoanUng = 0,
    tienChuaThanhToan = 0,
  } = tienDieuTri || {};
  return (
    <Main>
      <h1>{t("thuNgan.thongTinSoTien")}</h1>
      <Row className="title">
        <div className="left">Số tiền đã tạm ứng</div>
        <div className="right">
          <b>{`${(tienTamUng - tienHoanUng)?.formatPrice()} đ`}</b>
        </div>
      </Row>
      <Row className="title">
        <div className="left">Số tiền DV phải trả</div>
        <div className="right">
          <b>{`${(tienDieuTri?.tienChuaThanhToan || 0)?.formatPrice()} đ`}</b>
        </div>
      </Row>
      <Row className="title">
        <div className="left">Số tiền còn lại</div>
        <div className="right">
          <b>{`${(
            tienTamUng -
            tienHoanUng -
            tienChuaThanhToan
          )?.formatPrice()} đ`}</b>
        </div>
      </Row>
    </Main>
  );
};
export default ThongTinSoTien;
