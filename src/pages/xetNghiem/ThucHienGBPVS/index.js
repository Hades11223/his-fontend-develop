import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "antd";
import { MainPage, Main } from "./styled";
import DanhSachDichVu from "./danhSachDichVu";
import DanhSachBN from "../components/danhSachBN";
import ThongTinBN from "../components/thongTinBN";
import TimKiemBN from "../components/timKiemBN";
import HomeWrapper from "components/HomeWrapper";
import ThongTinDichVu from "./thongTinDichVu";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const ThucHienGBPVS = (props) => {
  const { t } = useTranslation();

  const refLayerHotKey = useRef(stringUtils.guid());
  const { onAddLayer, onRemoveLayer } = useDispatch().phimTat;
  const { getThietLap } = useDispatch().thietLap;

  const {
    xnGiaiPhauBenhViSinh: { infoDichVu },
  } = useSelector((state) => state);
  useEffect(() => {
    getThietLap({ ma: "NHOM_GIAI_PHAU_BENH" });
    getThietLap({ ma: "NHOM_VI_SINH" });
    onAddLayer({ layerId: refLayerHotKey.current });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);
  return (
    <MainPage
      breadcrumb={[
        { link: "/xet-nghiem", title: t("xetNghiem.xetNghiem") },
        {
          link: "/xet-nghiem/giai-phau-benh-vi-ky-sinh",
          title: t("xetNghiem.thucHienGiaiPhauBenhViSinh"),
        },
      ]}
    >
      <Main>
        <Row>
          <Col span={8} className="left">
            <TimKiemBN layerId={refLayerHotKey.current} />
          </Col>
          <Col span={16} className="right">
            <ThongTinBN layerId={refLayerHotKey.current} />
          </Col>
        </Row>
        <Row className="list-area">
          <Col span={8} className="left">
            <DanhSachBN layerId={refLayerHotKey.current} />
            <DanhSachDichVu layerId={refLayerHotKey.current} />
          </Col>
          <Col span={16} className="right">
            <ThongTinDichVu
              infoDichVu={infoDichVu}
              layerId={refLayerHotKey.current}
            />
          </Col>
        </Row>
      </Main>
    </MainPage>
  );
};

export default ThucHienGBPVS;
