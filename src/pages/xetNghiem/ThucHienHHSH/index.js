import React, { useRef, useEffect } from "react";
import { Row, Col } from "antd";
import { MainPage, Main } from "./styled";
import ChiTietDichVu from "../chiTietDichVu";
import DanhSachDichVu from "./DanhSachDichVu";
import DanhSachBN from "../components/danhSachBN";
import ThongTinBN from "../components/thongTinBN";
import TimKiemBN from "../components/timKiemBN";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const ThucHienHHSH = () => {
  const { t } = useTranslation();

  const refLayerHotKey = useRef(stringUtils.guid());
  const { onAddLayer, onRemoveLayer } = useDispatch().phimTat;
  const { getThietLap } = useDispatch().thietLap;
  useEffect(() => {
    getThietLap({ ma: "NHOM_HUYET_HOC" });
    getThietLap({ ma: "NHOM_SINH_HOA" });
    getThietLap({ ma: "NHOM_SINH_HOA_TIM_MACH" });
    getThietLap({ ma: "NHOM_MIEN_DICH" });
    onAddLayer({ layerId: refLayerHotKey.current });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);
  const chiTietDVRef = useRef(null);
  const onShowInfo = (data) => {
    if (chiTietDVRef.current) {
      chiTietDVRef.current.show(data);
    }
  };
  return (
    <MainPage
      breadcrumb={[
        { link: "/xet-nghiem", title: t("xetNghiem.xetNghiem") },
        {
          link: "/xet-nghiem/sinh-hoa-huyet-hoc",
          title: t("xetNghiem.thucHienSinhHoaHuyetHoc"),
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
          </Col>
          <Col span={16} className="right">
            <DanhSachDichVu
              onShowInfo={onShowInfo}
              layerId={refLayerHotKey.current}
            />
          </Col>
        </Row>
        <ChiTietDichVu ref={chiTietDVRef} layerId={refLayerHotKey.current} />
      </Main>
    </MainPage>
  );
};

export default ThucHienHHSH;
