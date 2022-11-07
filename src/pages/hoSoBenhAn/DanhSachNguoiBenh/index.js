import React from "react";
import { Main } from "./styled";
import TimKiemPhieu from "pages/hoSoBenhAn/components/TimKiemPhieu";
import DanhSach from "pages/hoSoBenhAn/components/DanhSach";
import { useTranslation } from "react-i18next";
import { Page } from "components";
const DanhSachNguoiBenh = (props) => {
  const { t } = useTranslation();
  return (
    <Page
      breadcrumb={[
        { title: t("hsba.hoSoBenhAn"), link: "/ho-so-benh-an" },
        {
          title: t("hsba.danhSachNguoiBenh"),
          link: "/ho-so-benh-an/danh-sach-nguoi-benh",
        },
      ]}
      title={t("hsba.danhSachNguoiBenh")}
    >
      <Main>
        <TimKiemPhieu />
        <DanhSach />
      </Main>
    </Page>
  );
};

export default DanhSachNguoiBenh;
