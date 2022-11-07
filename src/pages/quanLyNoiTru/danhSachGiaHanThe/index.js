import React from "react";
import { Page } from "components";
import { Main } from "./styled";
import DanhSach from "./DanhSach";
import TimKiemNb from "./TimKiemNb";
import { useTranslation } from "react-i18next";
const DanhSachGiaHanThe = (props) => {
  const { t } = useTranslation();
  return (
    <Page
      breadcrumb={[
        { link: "/quan-ly-noi-tru", title: "Quản lý nội trú" },
        {
          link: "/quan-ly-noi-tru/gia-han-the-chuyen-doi-tuong",
          title: "Gia hạn thẻ, chuyển đối tượng",
        },
      ]}
      title={t("quanLyNoiTru.giaHanThe.giaHanTheChuyenDoiTuong")}
    >
      <Main>
        <TimKiemNb />
        <DanhSach />
      </Main>
    </Page>
  );
};

export default DanhSachGiaHanThe;
