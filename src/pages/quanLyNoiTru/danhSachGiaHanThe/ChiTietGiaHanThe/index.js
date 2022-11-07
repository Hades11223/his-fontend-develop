import React, { useEffect } from "react";
import { Col, Row } from "antd";
import { Main } from "./styled";
import ThongTinBenhNhan from "./ThongTinBenhNhan";
import DanhSachThe from "./DanhSachThe";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Page } from "components";

const ChiTietBenhAn = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const {
    danhSachNguoiBenhNoiTru: { getNbNoiTruById },
  } = useDispatch();
  const { getListAllLoaiDoiTuong } = useDispatch().loaiDoiTuong;

  useEffect(() => {
    getListAllLoaiDoiTuong({ active: true, page: "", size: "" });
  }, []);

  useEffect(() => {
    if (id) getNbNoiTruById(id);
  }, [id]);

  return (
    <Page
      breadcrumb={[
        { link: "/quan-ly-noi-tru", title: t("quanLyNoiTru.quanLyNoiTru") },
        {
          link: "/quan-ly-noi-tru/gia-han-the-chuyen-doi-tuong",
          title: t("quanLyNoiTru.giaHanThe.giaHanTheChuyenDoiTuong"),
        },
        {
          link: `${`/quan-ly-noi-tru/chi-tiet-gia-han-the/${id}`}`,
          title: t("quanLyNoiTru.giaHanThe.chiTietGiaHanTheChuyenDoiTuong"),
        },
      ]}
      title={t("quanLyNoiTru.giaHanThe.chiTietGiaHanTheChuyenDoiTuong")}
    >
      <Main>
        <Row>
          <Col className="header-left">
            <ThongTinBenhNhan />
          </Col>
        </Row>
        <Row className="content">
          <DanhSachThe id={id} />
        </Row>
      </Main>
    </Page>
  );
};

export default ChiTietBenhAn;
