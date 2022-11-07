import React, { useEffect } from "react";
import { Main } from "./styled";
import { Page } from "components";
import TimKiemNB from "./TimKiemNB";
import DanhSach from "./DanhSach";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const DanhSachNBHuyTiepDon = (props) => {
  const { t } = useTranslation();
  return (
    <Page
      breadcrumb={[
        {
          title: t("tiepDon.quanLyTiepDon"),
          link: "/quan-ly-tiep-don",
        },
        {
          title: t("tiepDon.danhSachNguoiBenhHuyTiepDon"),
          link: "/quan-ly-tiep-don/danh-sach-nb-huy-tiep-don",
        },
      ]}
      title={t("tiepDon.danhSachNguoiBenhHuyTiepDon")}
    >
      <Main>
        <TimKiemNB />
        <DanhSach />
      </Main>
    </Page>
  );
};

export default DanhSachNBHuyTiepDon;
