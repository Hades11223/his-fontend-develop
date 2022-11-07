import React, { useEffect } from "react";
import { Col, Row } from "antd";
import { Main } from "./styled";
import ThongTinBenhNhan from "./ThongTinBenhNhan";
import ThongTinSoTien from "./ThongTinSoTien";
import ThongTinVaoVien from "./ThongTinVaoVien";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Page } from "components";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";

const ChiTietBenhAn = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const {
    nbDotDieuTri: { getById, tongTienDieuTri },
    quanLyNoiTru: { getNbLapBenhAnById },
  } = useDispatch();

  useEffect(() => {
    getNbLapBenhAnById(id);
    getById(id);
    tongTienDieuTri({ id: id });
  }, [id]);

  return (
    <Page
      breadcrumb={[
        { link: "/quan-ly-noi-tru", title: t("quanLyNoiTru.quanLyNoiTru") },
        {
          link: "/quan-ly-noi-tru/danh-sach-lap-benh-an",
          title: t("lapBenhAn.danhSachLapBenhAn"),
        },
        {
          link: `/quan-ly-noi-tru/chi-tiet-lap-benh-an/${id}`,
          title: t("lapBenhAn.chiTietLapBenhAn"),
        },
      ]}
      title={t("lapBenhAn.chiTietLapBenhAn")}
    >
      <Main>
        <Row>
          <Col className="header-left" span={19}>
            <ThongTinBenhNhan />
          </Col>
          {checkRole([ROLES["QUAN_LY_NOI_TRU"].THONG_TIN_SO_TIEN]) && (
            <Col
              className="header-right"
              span={5}
              style={{ paddingLeft: "20px" }}
            >
              <ThongTinSoTien />
            </Col>
          )}
        </Row>
        <Row className="content">
          <ThongTinVaoVien id={id} />
        </Row>
      </Main>
    </Page>
  );
};

export default ChiTietBenhAn;
