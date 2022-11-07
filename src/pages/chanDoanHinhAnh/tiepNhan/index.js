import React, { useRef, useEffect } from "react";
import { Row, Col } from "antd";
import HomeWrapper from "components/HomeWrapper";
import { Main } from "./styled";
import TimKiemBN from "pages/chanDoanHinhAnh/components/TimKiemBN";
import DanhSachBN from "pages/chanDoanHinhAnh/tiepNhan/DanhSachBN";
import ThongTinBN from "pages/chanDoanHinhAnh/components/ThongTinBN";
import DanhSachDichVu from "../choTiepDon/DanhSachDichVu";
import DanhSachNBTiepTheo from "pages/chanDoanHinhAnh/tiepNhan/DanhSachNBTiepTheo";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const TiepNhanCDHA = () => {
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
    <Main>
      <HomeWrapper
        title={t("cdha.cdha")}
        listLink={[
          { link: "/chan-doan-hinh-anh", title: t("cdha.cdha") },
          {
            link: "/chan-doan-hinh-anh/tiep-nhan",
            title: t("common.tiepNhan"),
          },
        ]}
      >
        <div className="scroll-content">
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
              {checkRole([ROLES["CHAN_DOAN_HINH_ANH"].NB_TIEP_THEO]) && (
                <DanhSachNBTiepTheo layerId={refLayerHotKey.current} />
              )}
              <DanhSachBN layerId={refLayerHotKey.current} />
            </Col>
            <Col span={16} className="right">
              <DanhSachDichVu layerId={refLayerHotKey.current} />
            </Col>
          </Row>
        </div>
      </HomeWrapper>
    </Main>
  );
};

export default TiepNhanCDHA;
