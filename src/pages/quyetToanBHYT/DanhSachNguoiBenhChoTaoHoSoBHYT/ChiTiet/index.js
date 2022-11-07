import React, { useState, useEffect } from "react";
import { Main } from "./styled";
import HomeWrapper from "components/HomeWrapper";
import { Col, Row } from "antd";
import TimKiem from "./TimKiem";
import { connect, useDispatch } from "react-redux";
import DanhSach from "./DanhSach";
import Breadcrumb from "components/Breadcrumb";
import TTCoBan from "./TTCoBan";
const DanhSachPhieu = (props) => {
  return (
    <Main>
      {/* <HomeWrapper title="Ký số"> */}
      <Breadcrumb
        chains={[
          { title: "Quyết toán BHYT", link: "/quyet-toan-bhyt" },
          { title: "Danh sách NB chờ tạo hồ sơ quyết toán BHYT", link: "/quyet-toan-bhyt/danh-sach-nguoi-benh-cho-tao-ho-so-quyet-toan-bhyt" },
          { title: "Chi tiết NB chờ tạo hồ sơ quyết toán BHYT", link: `/quyet-toan-bhyt/danh-sach-nguoi-benh-cho-tao-ho-so-quyet-toan-bhyt/chi-tiet/${props?.match?.params?.id}` },
        ]}
      >
        <Row xs={24}>
          <TimKiem />
        </Row>
        <Row>
          <DanhSach />
        </Row>
      </Breadcrumb>
      {/* </HomeWrapper> */}
    </Main>
  );
};

export default DanhSachPhieu;
