import { Col, Row } from "antd";
import React from "react";
import { Main } from "./styled";
import { useSelector } from "react-redux";
import AuthWrapper from "components/AuthWrapper";
import { ROLES } from "constants/index";
import IconHistory from "assets/images/thuNgan/icHistory.svg";
import { formatDecimal } from "./configs";
import { useTranslation } from "react-i18next";

function ThongTinThongTien(props) {
  const { t } = useTranslation();
  const { tienDieuTri } = useSelector((state) => state.nbDotDieuTri);

  return (
    <Main>
      <div className="title-header">
        <div className="title-header-text">{t("thuNgan.thongTinSoTien")}</div>
        <AuthWrapper accessRoles={[ROLES["THU_NGAN"].LICH_SU_TAM_UNG]}>
          <IconHistory className="ic-history" />
        </AuthWrapper>
      </div>
      <Row className="info">
        <Col xs={16} className="info-left">
          {t("thuNgan.soTienConLai")}:
        </Col>
        <Col xs={8} className="info-right">
          {formatDecimal(String(tienDieuTri?.tienConLai))}
        </Col>
        <Col xs={16} className="info-left">
          {t("thuNgan.soTienTamUng")}:
        </Col>
        <Col xs={8} className="info-right">
          {formatDecimal(String(tienDieuTri?.tienTamUng - tienDieuTri?.tienHoanUng))}
        </Col>
        <Col xs={16} className="info-left">
          {t("thuNgan.soTienChuaThanhToan")}:
        </Col>
        <Col xs={8} className="info-right">
          {formatDecimal(String(tienDieuTri?.tienChuaThanhToan))}
        </Col>
        <Col xs={16} className="info-left">
          {t("thuNgan.soTienDaThanhToan")}:
        </Col>
        <Col xs={8} className="info-right">
          {formatDecimal(String(tienDieuTri?.tienDaThanhToan))}
        </Col>
      </Row>
    </Main>
  );
}
export default ThongTinThongTien;
