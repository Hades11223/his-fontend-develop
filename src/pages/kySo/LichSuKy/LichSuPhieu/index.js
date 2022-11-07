import React from "react";
import { Main } from "./styled";
import { Row } from "antd";
import TimKiem from "./TimKiem";
import { useSelector } from "react-redux";
import DanhSach from "./DanhSach";
import TTCoBan from "pages/kySo/components/TTCoBan";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { Page } from "components";

const LichSuPhieu = (props) => {
  const {
    lichSuKyLichSuPhieu: { listData = [] },
  } = useSelector((state) => state);
  const { t } = useTranslation();
  const { id, lichSuPhieuId } = useParams();
  return (
    <Page
      breadcrumb={[
        { title: t("kySo.kySo"), link: "/ky-so" },
        {
          title: t("kySo.lichSuKy"),
          link: "/ky-so/lich-su-ky/danh-sach-nguoi-benh",
        },
        {
          title: t("kySo.danhSachNguoiBenh"),
          link: "/ky-so/lich-su-ky/danh-sach-nguoi-benh",
        },
        {
          title: t("kySo.danhSachPhieu"),
          link: `/ky-so/lich-su-ky/danh-sach-nguoi-benh/danh-sach-phieu/${id}`,
        },
        {
          title: t("kySo.lichSuPhieuChiTiet"),
          link: `/ky-so/lich-su-ky/danh-sach-nguoi-benh/danh-sach-phieu/${id}/lich-su-phieu/${lichSuPhieuId}`,
        },
      ]}
    >
      <Main>
        <TimKiem />
        <Row xs={24}>
          <TTCoBan />
          <div>
            <b>{t("kySo.tenPhieu")}</b>: {listData[0]?.tenBaoCao} -{" "}
            {t("kySo.soPhieuKy")}: {listData[0]?.soPhieu}
          </div>
        </Row>
        <Row>
          <DanhSach />
        </Row>
      </Main>
    </Page>
  );
};

export default LichSuPhieu;
