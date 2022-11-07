import React from "react";
import { Main } from "./styled";
import MainPage from "pages/kho/components/MainPage";
import Breadcrumb from "components/Breadcrumb";
import Header from "pages/kho/components/Header";
import { Row } from "antd";

const Page = ({
  children,
  breadcrumb,
  rightBreadcrumbContent,
  title,
  className,
  titleRight,
  showBreadcrumb = true,
  topHeader,
  height,
  actionLeft,
  actionRight,
  ...props
}) => {
  return (
    <Main className={className}>
      {showBreadcrumb && (
        <Header>
          <Breadcrumb height={height} chains={breadcrumb}></Breadcrumb>
          {rightBreadcrumbContent}
        </Header>
      )}
      {topHeader}
      <MainPage title={<div>{title}</div>} titleRight={titleRight}>
        <Row className="page-body">{children}</Row>
      </MainPage>
      {actionLeft || actionRight ? (
        <div className="footer-btn">
          <div className="left">{actionLeft}</div>
          <div className="right">{actionRight}</div>
        </div>
      ) : null}
    </Main>
  );
};

export default Page;
