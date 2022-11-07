import React from "react";
import { Main } from "./styled";
import MainPage from "pages/kho/components/MainPage";
import Breadcrumb from "components/Breadcrumb";
import Header from "pages/kho/components/Header";
import { Row } from "antd";

const BaseDm3 = ({ children, breadcrumb, title, ...props }) => {
  return (
    <Main>
      <Header>
        <Breadcrumb chains={breadcrumb}></Breadcrumb>
      </Header>
      <MainPage title={<div>{title}</div>}>
        <Row className="page-body">{children}</Row>
      </MainPage>
    </Main>
  );
};

export default BaseDm3;
