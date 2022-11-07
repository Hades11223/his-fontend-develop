import React from "react";
import { Main } from "./styled";
import TimKiemPhieu from "pages/kho/vatTuKyGui/TimKiemPhieu";
import DanhSach from "pages/kho/vatTuKyGui/DanhSach";
import { Page } from "components";
import { useTranslation } from "react-i18next";
const VatTuKyGui = (props) => {
  const { t } = useTranslation();
  return (
    <Page
      breadcrumb={[
        { title: "Kho", link: "/kho" },
        {
          title: t("kho.danhSachVtytKyGuiDaSuDung"),
          link: "/kho/vat-tu-ky-gui",
        },
      ]}
      title={t("kho.danhSachVtytKyGuiDaSuDung")}
    >
      <Main>
        <TimKiemPhieu />
        <DanhSach />
      </Main>
    </Page>
  );
};

export default VatTuKyGui;
