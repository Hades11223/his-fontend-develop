import { Row } from "antd";
import React from "react";
import { MainTableXN, ContentTable } from "./styled";

function Index(props) {
  const { contentHeaderLeft = "", contentHeaderRight = null } = props;
  return (
    <MainTableXN
      bleXN
      styleMargin={props.styleMargin}
      className="table-xet-nghiem"
    >
      <Row className="header-table">
        <div className="header-table__left">{contentHeaderLeft}</div>
        <div className="header-table__right">{contentHeaderRight}</div>
      </Row>
      <ContentTable className="content-table">{props.children}</ContentTable>
    </MainTableXN>
  );
}

export default Index;
