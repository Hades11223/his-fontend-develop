import React, { useEffect, useRef } from "react";
import { Main } from "./styled";
import Breadcrumb from "components/Breadcrumb";
import { Col, Row } from "antd";
import Button from "pages/kho/components/Button";
import TimKiemPhieuNhap from "./TimKiemPhieuNhap";
import DanhSachPhieuNhap from "./DanhSachPhieuNhap";
import DanhSachRutGon from "pages/kho/components/DanhSachRutGon";
import { useDispatch, useSelector } from "react-redux";
import ThongTinHangHoaChiTiet from "pages/kho/components/ThongTinHangHoaChiTiet";
import MainPage from "pages/kho/components/MainPage";
import IcCreate from "assets/images/kho/IcCreate.png";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
const NhapKho = (props) => {
  const refTimKiemPhieuNhap = useRef(null);
  const {
    nhapKho: { chiTiet },
  } = useSelector((state) => state);

  const {
    kho: { getTheoTaiKhoan },
  } = useDispatch();
  useEffect(() => {
    getTheoTaiKhoan({});
  }, []);

  return (
    <Main>
      <Row className="top-level-category" justify="space-between">
        <Breadcrumb
          chains={[
            { title: "Kho", link: "/kho" },
            { title: "Nhập kho", link: "/kho/nhap-kho" },
          ]}
        ></Breadcrumb>
      </Row>
      <MainPage
        title={"Danh sách phiếu nhập"}
        titleRight={
          checkRole([ROLES["KHO"].THEM_MOI_PHIEU_NHAP_KHO]) && (
            <Button
              className="btn_new"
              type={"success"}
              rightIcon={<img src={IcCreate} alt="..." />}
              iconHeight={20}
              onClick={
                refTimKiemPhieuNhap.current &&
                refTimKiemPhieuNhap.current.onCreateNew
              }
            >
              <span> Thêm mới</span>
            </Button>
          )
        }
      >
        {chiTiet && (
          <>
            <TimKiemPhieuNhap ref={refTimKiemPhieuNhap} />
            <DanhSachPhieuNhap />
          </>
        )}
        {!chiTiet && (
          <Row>
            <Col xs={6}>
              <Row>
                <Col className="left">
                  <DanhSachRutGon />
                </Col>
              </Row>
            </Col>
            <Col xs={18} className="right">
              <ThongTinHangHoaChiTiet />
            </Col>
          </Row>
        )}
      </MainPage>
    </Main>
  );
};

export default NhapKho;
