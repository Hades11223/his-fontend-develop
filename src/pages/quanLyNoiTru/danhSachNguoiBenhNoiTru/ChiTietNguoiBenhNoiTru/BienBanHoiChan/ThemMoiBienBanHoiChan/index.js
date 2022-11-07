import React, { memo } from "react";
import { MainPage } from "./styled";
import { useQueryString } from "hook";
import { useTranslation } from "react-i18next";
import BienBanHoiChan from "../BienBanHoiChan";

const ThemMoiBienBanHoiChan = (props) => {
  const { t } = useTranslation();
  const [nbDotDieuTriId] = useQueryString("nbDotDieuTriId", 0);

  return (
    <MainPage
      breadcrumb={[
        { link: "/quan-ly-noi-tru", title: t("quanLyNoiTru.quanLyNoiTru") },
        {
          link: "/quan-ly-noi-tru/danh-sach-nguoi-benh-noi-tru",
          title: t("quanLyNoiTru.danhSachNguoiBenhNoiTru"),
        },
      ]}
    >
      <BienBanHoiChan nbDotDieuTriId={nbDotDieuTriId} isShowTuVan={false}/>
    </MainPage>
  );
};
export default memo(ThemMoiBienBanHoiChan);
