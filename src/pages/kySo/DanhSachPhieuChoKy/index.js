import React from "react";
import { Main } from "./styled";
import { Row } from "antd";
import TimKiem from "./TimKiem";
import DanhSach from "./DanhSach";
import { useTranslation } from "react-i18next";
import { Page } from "components";
const DanhSachPhieuChoKy = (props) => {
  const { t } = useTranslation();
  return (
    <Page
      breadcrumb={[
        { title: t("kySo.kySo"), link: "/ky-so" },
        {
          title: t("kySo.danhSachPhieuChoKy"),
          link: "/ky-so/danh-sach-phieu-cho-ky",
        },
      ]}
    >
      <Main>
        <Row xs={24}>
          <TimKiem />
        </Row>
        <Row>
          <DanhSach />
        </Row>
      </Main>
    </Page>
  );
};

export default DanhSachPhieuChoKy;
