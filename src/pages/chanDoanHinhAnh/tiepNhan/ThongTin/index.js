import React, { useState } from "react";
import { connect } from "react-redux";
import { Col, Row } from "antd";
import { Element } from "react-scroll";
import { listNav } from "./config";
import Navigation from "./navigationPage";
import useWindowSize from "hook/useWindowSize";
import StepWrapper from "pages/chanDoanHinhAnh/tiepNhan/StepWrapper";
import ChiDinhDichVu from "pages/chanDoanHinhAnh/tiepNhan/ChiDinhDichVu";
import DonThuoc from "pages/chanDoanHinhAnh/tiepNhan/DonThuoc";

function ThongTin(props) {
  const [elementKey, setElementKey] = useState(0);

  const windowSize = useWindowSize();

  const handleScroll = (key) => {};

  return (
    <Row>
      <Col span={18}>
        <StepWrapper elementKey={elementKey}>
          <Element name={"0"} className="element element-page">
            <ChiDinhDichVu />
          </Element>
          <Element name={"1"} className="element element-page">
            <DonThuoc />
          </Element>
        </StepWrapper>
      </Col>
      <Col span={6} style={{ paddingTop: 43 }}>
        {listNav.map((item) => {
          return (
            <Navigation
              {...item}
              key={item.title}
              handleScroll={handleScroll}
              padding={(windowSize.height - 700) / 10}
            />
          );
        })}
      </Col>
    </Row>
  );
}

export default connect(
  ({
    chiDinhDichVuCls: { neededUpdateRecord },
    phongThucHien: { listData: listPhongThucHien },
    utils: { listhuongDieuTriKham = [], listketQuaDieuTri = [] },
  }) => ({
    neededUpdateRecord,
    listPhongThucHien,
    listhuongDieuTriKham,
    listketQuaDieuTri,
  }),
  ({
    chiDinhDichVuCls: {
      chiDinhDichVu,
      updateData: updateDataChiDinh,
      getDsDichVuChiDinhKham,
      getDsDichVuChiDinhXN,
      getDsDichVuChiDinhCLS,
    },
    utils: { getUtils },
    phongThucHien: { getData },
  }) => ({
    chiDinhDichVu,
    updateDataChiDinh,
    getUtils,
    searchPhongThucHien: getData,
    getDsDichVuChiDinhKham,
    getDsDichVuChiDinhXN,
    getDsDichVuChiDinhCLS,
  })
)(ThongTin);
