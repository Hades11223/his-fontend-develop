import { Col, Row } from "antd";
import Breadcrumb from "components/Breadcrumb";
import React from "react";
import LeftComponent from "./components/LeftComponent";
import RightComponent from "./components/RightComponent";
import { Main } from "./styled";

const TroGiupHđsd = (props) => {
  return (
    <Main>
      <Breadcrumb chains={[{ title: "Trợ giúp", link: "/kho" }]}>
        <Row xs={24} className="title-header">
          Tài liệu hướng dẫn sử dụng
        </Row>
        <Row>
          <Col span={18} className="left-contet">
            <LeftComponent />
          </Col>
          <Col span={6} className="right-contet">
            <RightComponent />
          </Col>
        </Row>
      </Breadcrumb>
    </Main>
  );
};

export default TroGiupHđsd;
