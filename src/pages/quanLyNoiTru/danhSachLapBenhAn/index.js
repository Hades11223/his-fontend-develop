import React from "react";
import { Main } from "./styled";
import DanhSach from "./DanhSach";
import TimKiemNb from "./TimKiemNb";
import { Page } from "components";
import { useTranslation } from "react-i18next";
const DanhSachLapBenhAn = (props) => {
  const { t } = useTranslation();
  return (
    <Page
      breadcrumb={[
        { link: "/quan-ly-noi-tru", title: t("quanLyNoiTru.quanLyNoiTru") },
        {
          link: "/quan-ly-noi-tru/danh-sach-lap-benh-an",
          title: t("lapBenhAn.danhSachLapBenhAn"),
        },
      ]}
      title={t("lapBenhAn.danhSachLapBenhAn")}
    >
      <Main>
        <TimKiemNb  />
        <DanhSach  />
      </Main>
    </Page>
  );
};

export default DanhSachLapBenhAn;
