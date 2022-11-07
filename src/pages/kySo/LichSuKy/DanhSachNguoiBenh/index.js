import React from "react";
import { Main } from "./styled";
import { Row } from "antd";
import TimKiem from "./TimKiem";
import DanhSach from "./DanhSach";
import Breadcrumb from "components/Breadcrumb";
const DanhSachPhieuChoKy = (props) => {
  return (
    <Main>
      <Breadcrumb
        chains={[
          { title: "Ký số", link: "/ky-so" },
          {
            title: "Lịch sử ký",
            link: "/ky-so/lich-su-ky/danh-sach-nguoi-benh",
          },
        ]}
      >
        <Row xs={24}>
          <TimKiem />
        </Row>
        <Row>
          <DanhSach />
        </Row>
      </Breadcrumb>
    </Main>
  );
};

export default DanhSachPhieuChoKy;
