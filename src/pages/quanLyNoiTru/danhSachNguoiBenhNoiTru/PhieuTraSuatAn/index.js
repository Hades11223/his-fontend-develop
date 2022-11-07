import React, { useState, useEffect, useRef } from "react";
import ModalTaoPhieu from "./ModalTaoPhieu";
import DanhSachTra from "./DanhSachTra";
import { Page } from "components";
import cacheUtils from "utils/cache-utils";
import TimKiemNb from "./TimKiemNb";
import { Main } from "./styled";
import Button from "pages/kho/components/Button";

const DanhSachPhieuTraSuatAn = () => {
  const refModalTaoPhieu = useRef();
  const refDanhSachTra = useRef(null);

  const [khoaLamViec, setKhoaLamViec] = useState(null);

  const clickTaoPhieuLinh = () => {
    if (refModalTaoPhieu.current) {
      refModalTaoPhieu.current.show();
    }
  };

  useEffect(() => {
    async function fetchData() {
      let khoaLamViec = await cacheUtils.read(
        "DATA_KHOA_LAM_VIEC",
        "",
        null,
        false
      );
      if (khoaLamViec) {
        setKhoaLamViec(khoaLamViec);
      }
    }
    fetchData();
  }, []);
  return (
    <Page
      breadcrumb={[
        { link: "/quan-ly-noi-tru", title: "Quản lý nội trú" },
        {
          link: "/quan-ly-noi-tru/danh-sach-nguoi-benh-noi-tru",
          title: "Danh sách người bệnh nội trú",
        },
        {
          link: "/quan-ly-noi-tru/danh-sach-phieu-tra-suat-an",
          title: "Danh sách phiếu trả suất ăn",
        },
      ]}
      title="Danh sách phiếu trả suất ăn"
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
        <TimKiemNb />
        <DanhSachTra ref={refDanhSachTra} />
        <ModalTaoPhieu
          ref={refModalTaoPhieu}
          disabledLoaiNhapXuat={true}
          khoaLamViecId={khoaLamViec?.id}
        />
      </Main>
    </Page>
  );
};
export default DanhSachPhieuTraSuatAn;
