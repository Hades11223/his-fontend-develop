import Button from "pages/kho/components/Button";
import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import DanhSach from "./DanhSach";
import ModalTaoPhieuLinh from "./ModalTaoPhieuLinh";
import { Main, WrapperPage } from "./styled";

const DanhSachPhieuLinh = (props) => {
  const refModalPhieuLinh = useRef();
  const [state, _setState] = useState({ dataSortColumn: {} });
  const { dataSortColumn } = state;
  const { t } = useTranslation();
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const clickTaoPhieuLinh = () => {
    if (refModalPhieuLinh.current) {
      refModalPhieuLinh.current.show();
    }
  };

  const { linkDetail, breadcrumb } = useMemo(() => {
    const { pathname } = window.location;
    if (
      pathname.indexOf("/phau-thuat-thu-thuat/danh-sach-phieu-linh") !== -1
    ) {
      // phẫu thuật thủ thuật
      return {
        linkDetail: "/phau-thuat-thu-thuat/chi-tiet-phieu-linh/",
        breadcrumb: [
          {
            link: "/phau-thuat-thu-thuat",
            title: t("pttt.quanLyPhauThuatThuThuat"),
          },
          {
            link: "/phau-thuat-thu-thuat/danh-sach-nguoi-benh",
            title: t("pttt.danhSachPhauThuatThuThuat"),
          },
          {
            link: "/phau-thuat-thu-thuat/danh-sach-phieu-linh",
            title: t("pttt.danhSachPhieuLinhTra"),
          },
        ],
      };
    }

    // quản lý nội trú
    return {
      linkDetail: "/quan-ly-noi-tru/chi-tiet-phieu-linh/",
      breadcrumb: [
        { link: "/quan-ly-noi-tru", title: "Quản lý nội trú" },
        {
          link: "/quan-ly-noi-tru/danh-sach-phieu-linh",
          title: "Danh sách phiếu lĩnh",
        },
        {
          link: "/quan-ly-noi-tru/danh-sach-phieu-linh",
          title: "Danh sách phiếu lĩnh trả",
        },
      ],
    };
  }, [window.location]);

  return (
    <WrapperPage
      breadcrumb={breadcrumb}
      title={"Danh sách phiếu lĩnh"}
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
        <DanhSach linkDetail={linkDetail} />
        <ModalTaoPhieuLinh
          ref={refModalPhieuLinh}
          disabledLoaiNhapXuat={true}
        />
      </Main>
    </WrapperPage>
  );
};

export default DanhSachPhieuLinh;
