import React, { useEffect, useRef } from "react";
import { Row, Col } from "antd";
import HomeWrapper from "components/HomeWrapper";
import { Main, MainPage } from "./styled";
import DanhSachDichVu from "./DanhSachDichVu";
import DanhSachBN from "./danhSachBN";
import ThongTinBN from "../components/thongTinBN";
import TimKiemBN from "../components/timKiemBN";
import DanhSachNBTiepTheo from "./DanhSachNBTiepTheo";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const TiepNhanMauXN = () => {
  const { t } = useTranslation();
  const refLayerHotKey = useRef(stringUtils.guid());
  const { onAddLayer, onRemoveLayer } = useDispatch().phimTat;
  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);
  return (
    <MainPage
      breadcrumb={[
        { link: "/xet-nghiem", title: t("xetNghiem.xetNghiem") },
        { link: "/xet-nghiem/lay-mau", title: t("xetNghiem.layMau") },
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
        <Row>
          <Col span={8} className="left">
            {checkRole([ROLES["XET_NGHIEM"].DS_NB_TIEP_THEO]) && (
              <DanhSachNBTiepTheo layerId={refLayerHotKey.current} />
            )}
            <DanhSachBN layerId={refLayerHotKey.current} />
          </Col>
          <Col span={16} className="right">
            <DanhSachDichVu layerId={refLayerHotKey.current} />
          </Col>
        </Row>
      </Main>
    </MainPage>
  );
};

export default TiepNhanMauXN;
