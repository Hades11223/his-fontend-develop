import React, { useEffect } from "react";
import { Main } from "./styled";
import DanhSach from "./DanhSach";
import TimKiemNb from "./TimKiemNb";
import { Page } from "components";
import { TRANG_THAI_NB } from "constants/index";

const DanhSachNguoiBenhNoiTru = ({ history }) => {
  let dsTrangThai = [
    TRANG_THAI_NB.CHO_TIEP_NHAN_VAO_KHOA,
    TRANG_THAI_NB.DANG_DIEU_TRI,
    TRANG_THAI_NB.DANG_CHUYEN_KHOA,
    TRANG_THAI_NB.CHO_HOAN_TAT_THU_TUC_RA_VIEN,
    TRANG_THAI_NB.HEN_DIEU_TRI,
    TRANG_THAI_NB.DA_RA_VIEN,
  ];

  return (
    <Page
      breadcrumb={[
        { link: "/quan-ly-noi-tru", title: "Quản lý nội trú" },
        {
          link: "/quan-ly-noi-tru/danh-sach-nguoi-benh-noi-tru",
          title: "Danh sách người bệnh nội trú",
        },
        {
          link: "/quan-ly-noi-tru/danh-sach-nguoi-benh-noi-tru-tra-dich-vu",
          title: "Danh sách NB chưa hoàn thành trả",
        },
      ]}
      title={
        "Danh sách người bệnh trả thuốc/ vật tư/ hóa chất - chưa tạo/ duyệt trả"
      }
      // titleRight={
      //   <div style={{ display: "flex", justifyContent: "flex-end" }}></div>
      // }
    >
      <Main>
        <TimKiemNb dsTrangThai={dsTrangThai} />
        <DanhSach dsTrangThai={dsTrangThai} />
      </Main>
    </Page>
  );
};

export default DanhSachNguoiBenhNoiTru;
