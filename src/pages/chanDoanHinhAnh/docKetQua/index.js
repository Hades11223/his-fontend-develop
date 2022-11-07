import { Col, Row, Select } from "antd";
import Breadcrumb from "components/Breadcrumb";
import React from "react";
import DsDichVu from "./containers/dsDichVu";
import DsDichVuLQ from "./containers/dsDichVuLienQuan";
import MauKetQua from "./containers/mauKetQua";
import ThongTinDichVu from "./containers/thongTinDichVu";
import { Main } from "./styled";

const { Option } = Select;

const ChiTiet = ({ ...props }) => {
  return (
    <Main>
      <Breadcrumb
        chains={[
          { title: "Chuẩn đoán hình ảnh", link: "/chan-doan-hinh-anh" },
          { title: "Đọc kết quả", link: "/chan-doan-hinh-anh/doc-ket-qua" },
        ]}
      >
        <Row>
          <Col span={16} className="left">
            <DsDichVu />
          </Col>
          <Col span={8} className="right">
            <ThongTinDichVu />
          </Col>
        </Row>
        <Row style={{ marginTop: "20px", paddingBottom: "40px" }}>
          <Col span={16} className="left">
            <DsDichVuLQ />
          </Col>
          <Col span={8} className="right">
            <MauKetQua />
          </Col>
        </Row>
      </Breadcrumb>
    </Main>
  );
};

export default ChiTiet;
