import React from "react";
import { Main } from "./styled";
import { Row } from "antd";
import TimKiemPhieu from "pages/kho/phatThuocNgoaiTru/TimKiemPhieu";
import DanhSach from "pages/kho/phatThuocNgoaiTru/DanhSach";
import { Page } from "components";
const PhatThuocNgoaiTru = (props) => {
  return (
    <Page
      breadcrumb={[
        { title: "Kho", link: "/kho" },
        {
          title: "Phát thuốc ngoại trú",
          link: "/kho/phat-thuoc-ngoai-tru",
        },
      ]}
      title={"Danh sách đơn thuốc ngoại trú"}
    >
      <Main>
        <TimKiemPhieu />
        <DanhSach />
      </Main>
    </Page>
  );
};

export default PhatThuocNgoaiTru;
