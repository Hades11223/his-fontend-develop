import Button from "pages/kho/components/Button";
import React, { useRef, useState } from "react";
import DanhSach from "./DanhSach";
import ModalTaoPhieuTra from "./ModalTaoPhieuTra";
import { Main, WrapperPage } from "./styled";

const DanhSachPhieuTra = (props) => {
  const refModalPhieuTra = useRef();
  const [state, _setState] = useState({ dataSortColumn: {} });
  const { dataSortColumn } = state;
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const clickTaoPhieuLinh = () => {
    if (refModalPhieuTra.current) {
      refModalPhieuTra.current.show();
    }
  };

  return (
    <WrapperPage
      breadcrumb={[
        { link: "/quan-ly-noi-tru", title: "Quản lý nội trú" },
        {
          link: "/quan-ly-noi-tru/danh-sach-phieu-tra",
          title: "Danh sách phiếu trả",
        },
      ]}
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
        <DanhSach />
        <ModalTaoPhieuTra ref={refModalPhieuTra} disabledLoaiNhapXuat={true} />
      </Main>
    </WrapperPage>
  );
};

export default DanhSachPhieuTra;
