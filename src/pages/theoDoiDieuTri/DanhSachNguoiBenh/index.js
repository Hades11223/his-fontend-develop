import React, { useState } from "react";
import { Main } from "./styled";
import HomeWrapper from "components/HomeWrapper";
import { Col, Row } from "antd";
import TimKiemPhieu from "pages/theoDoiDieuTri/components/TimKiemPhieu";
import DanhSach from "pages/theoDoiDieuTri/components/DanhSach";
import { connect } from "react-redux";
const DanhSachNguoiBenh = (props) => {
  return (
    <Main>
      <HomeWrapper title="Theo dõi người bệnh">
        <Row xs={24}>
          <TimKiemPhieu />
        </Row>
        <Row xs={24}>
          <Col xs={24} md={24} xl={24} xxl={24}>
            <DanhSach />
          </Col>
        </Row>
      </HomeWrapper>
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    nhapKho: { chiTiet },
  } = state;
  return {
    chiTiet,
  };
};
export default connect(mapStateToProps, null)(DanhSachNguoiBenh);
