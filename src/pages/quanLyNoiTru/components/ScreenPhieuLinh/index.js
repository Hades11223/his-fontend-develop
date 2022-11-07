import Button from "pages/kho/components/Button";
import React, { useRef } from "react";
import LayoutChiTiet from "./ChiTietPhieuLinh";
import ThongTinPhieu from "./ChiTietPhieuLinh/ThongTinPhieu";
import DanhSach from "./DanhSach";
import ModalCreate from "./ModalCreate";
import { Main, WrapperPage } from "./styled";

const ScreenPhieuLinh = ({
  breadcrumb,
  ModalTaoPhieuLinh,
  DanhSach,
  khoaLamViecId,
  title = "Danh sách phiếu lĩnh",
}) => {
  const refModalTaoPhieu = useRef();
  const clickTaoPhieuLinh = () => {
    if (refModalTaoPhieu.current) {
      refModalTaoPhieu.current.show();
    }
  };
  return (
    <WrapperPage
      breadcrumb={breadcrumb}
      title={title}
      titleRight={
        <Button
          className="btn_new"
          type={"success"}
          iconHeight={20}
          onClick={clickTaoPhieuLinh}
        >
          <span>Tạo phiếu lĩnh</span>
        </Button>
      }
    >
      <Main>
        <DanhSach />
        <ModalTaoPhieuLinh
          ref={refModalTaoPhieu}
          disabledLoaiNhapXuat={true}
          khoaLamViecId={khoaLamViecId}
        />
      </Main>
    </WrapperPage>
  );
};

ScreenPhieuLinh.ModalCreate = ModalCreate;
ScreenPhieuLinh.DanhSach = DanhSach;
ScreenPhieuLinh.LayoutChiTiet = LayoutChiTiet;
ScreenPhieuLinh.ThongTinPhieu = ThongTinPhieu;

export default ScreenPhieuLinh;
