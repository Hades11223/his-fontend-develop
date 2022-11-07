import { Row } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import IcTime from "assets/svg/cdha/ic-time.svg";
import IcTiepNhan from "assets/svg/cdha/ic-tiep-nhan.svg";
import IcSuccess from "assets/svg/cdha/ic-success.svg";
import IcChoHoan from "assets/svg/cdha/ic-cho-hoan.svg";
import IcDaHoan from "assets/svg/cdha/ic-da-hoan.svg";
import { Main } from "./styled";

const TrangThaiDashboard = (props) => {
  const { t } = useTranslation();
  const {
    dashboardCDHA: { data },
  } = useSelector((state) => state) || {};
  const trangThai = {
    25: t("cdha.choTiepNhan"),
    63: t("cdha.daTiepNhan"),
    155: t("cdha.daDocKetQua"),
    10: t("cdha.choHoan"),
    30: t("cdha.daHoan"),
  };
  const color = {
    25: "#F0E6FA",
    63: "#E6FAFC",
    155: "#E6F9F1",
    10: "#FFFAE6",
    30: "#FDECF0",
  };

  const renderIcon = (trangThai) => {
    switch (trangThai) {
      case 25:
        return <IcTime className="icon" />;
      case 63:
        return <IcTiepNhan className="icon" />;
      case 155:
        return <IcSuccess className="icon" />;
      case 10:
        return <IcChoHoan className="icon" />;
      default:
        return <IcDaHoan className="icon" />;
    }
  };
  return (
    <Main justify="space-between" gutter={[8, 8]} style={{ marginTop: 10 }}>
      {(data || []).map((item, index) => (
        <div
          key={index}
          style={{
            flex: "1 1 auto",
            background: color[item?.trangThai || item?.trangThaiHoan],
            marginRight: 10,
            padding: 8,
            borderRadius: 10,
          }}
        >
          <Row justify="space-between" align="middle">
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>
                {trangThai[item?.trangThai || item?.trangThaiHoan]}
              </div>
              <div style={{ fontSize: 28 }}>
                <b>{item?.soLuong}</b>
              </div>
            </div>
            <div>{renderIcon(item?.trangThai || item?.trangThaiHoan)}</div>
          </Row>
        </div>
      ))}
    </Main>
  );
};

export default TrangThaiDashboard;
