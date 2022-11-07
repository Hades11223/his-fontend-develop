import Button from "pages/kho/components/Button";
import React, { useRef } from "react";
import LayoutChiTiet from "./ChiTietPhieuTra";
import ThongTinPhieu from "./ChiTietPhieuTra/ThongTinPhieu";
import DanhSach from "./DanhSach";
import ModalCreate from "./ModalCreate";
import { Main, WrapperPage } from "./styled";

const ScreenPhieuTra = ({ breadcrumb, ModalTaoPhieuTra, DanhSach }) => {
  const refModalTaoPhieu = useRef();
  const clickTaoPhieuLinh = () => {
    if (refModalTaoPhieu.current) {
      refModalTaoPhieu.current.show();
    }
  };

  return (
    <WrapperPage
      breadcrumb={breadcrumb}
      title={"Danh sách phiếu trả"}
      titleRight={
        <Button
          className="btn_new"
          type={"success"}
          iconHeight={20}
          onClick={clickTaoPhieuLinh}
        >
          <span>Tạo phiếu trả</span>
        </Button>
      }
    >
      <Main>
        {/* <DanhSach /> */}
        <ModalTaoPhieuTra ref={refModalTaoPhieu} disabledLoaiNhapXuat={true} />
      </Main>
    </WrapperPage>
  );
};

ScreenPhieuTra.ModalCreate = ModalCreate;
ScreenPhieuTra.DanhSach = DanhSach;
ScreenPhieuTra.LayoutChiTiet = LayoutChiTiet;
ScreenPhieuTra.ThongTinPhieu = ThongTinPhieu;

export default ScreenPhieuTra;
