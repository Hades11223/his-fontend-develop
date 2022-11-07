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
            <Row>
              <Col span={24}>
                <DsDichVu />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DsDichVuLQ />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <MauKetQua />
              </Col>
            </Row>
          </Col>
          <Col span={8} className="right">
            <ThongTinDichVu />
          </Col>
        </Row>
      </Breadcrumb>
    </Main>
  );
};

export default ChiTiet;
