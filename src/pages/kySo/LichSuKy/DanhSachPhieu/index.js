import React from "react";
import { Main } from "./styled";
import { Row } from "antd";
import TimKiem from "./TimKiem";
import DanhSach from "./DanhSach";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { Page } from "components";

const DanhSachPhieu = (props) => {
  const { t } = useTranslation();
  const { id } = useParams();

  return (
    <Page
      breadcrumb={[
        { title: t("kySo.kySo"), link: "/ky-so" },
        {
          title: t("kySo.lichSuKy"),
          link: "/ky-so/lich-su-ky/danh-sach-nguoi-benh",
        },
        {
          title: t("kySo.danhSachPhieu"),
          link: `/ky-so/lich-su-ky/danh-sach-nguoi-benh/danh-sach-phieu/${id}`,
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

export default DanhSachPhieu;
