import React from "react";
import { Main } from "./styled";
import { Row } from "antd";

const Header = ({ children }) => {
  return (
    <Main className="wrapper-header-container">
      <Row className="top-level-category" justify="space-between">
        {children}
      </Row>
    </Main>
  );
};

export default Header;
