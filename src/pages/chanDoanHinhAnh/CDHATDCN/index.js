import React from "react";
import TimKiemDichVu from "./TimKiemDichVu";
import DanhSachDichVu from "./DanhSachDichVu";
import { Main } from "./styled";
import { Page } from "components";
import { useTranslation } from "react-i18next";

const ChanDoanHinhAnh = (props) => {
  const { t } = useTranslation();
  return (
    <Page
      breadcrumb={[
        {
          title: t("cdha.thucHienCdhaTdcn"),
          link: "/chan-doan-hinh-anh/thuc-hien-cdha-tdcn",
        },
      ]}
      title={t("cdha.danhSachDichVu")}
    >
      <Main>
        <TimKiemDichVu />
        <DanhSachDichVu />
      </Main>
    </Page>
  );
};

export default ChanDoanHinhAnh;
