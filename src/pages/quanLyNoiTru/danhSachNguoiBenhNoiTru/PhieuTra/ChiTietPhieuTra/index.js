import React, { useEffect, useRef, useMemo } from "react";
import { Main } from "./styled";
import Breadcrumb from "components/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { refConfirm } from "app";
import MainPage from "pages/kho/components/MainPage";
import Header from "pages/kho/components/Header";
import { Card } from "components";
import ThongTinPhieu from "./ThongTinPhieu";
import DanhSachHangHoa from "./DanhSachHangHoa";
import { useHistory } from "react-router-dom";
import TrangThai from "pages/kho/components/TrangThai";
import DeleteRedIcon from "assets/svg/kho/delete.svg";
import IcPrint from "assets/svg/chuanDoanHinhAnh/print.svg";
import { Tabs, Tooltip } from "antd";
import DanhSachNguoiBenh from "./DanhSachNguoiBenh";
import { getIdFromUrl } from "utils";
import Action from "pages/kho/phieuNhap/Action";
import { useTranslation } from "react-i18next";

const ChiTiet = ({ ...props }) => {
  const id = getIdFromUrl();

  const history = useHistory();
  const { t } = useTranslation();

  const { linkBack, chains } = useMemo(() => {
    const { pathname } = window.location;
    if (pathname.indexOf("/kho/chi-tiet-phieu-tra/") !== -1) {
      return {
        linkBack: "/kho/xuat-kho",
        chains: [
          { title: t("kho.kho"), link: "/kho" },
          { title: t("kho.xuatKho"), link: "/kho/xuat-kho" },
        ],
      };
    }
    if (pathname.indexOf("/phau-thuat-thu-thuat/chi-tiet-phieu-linh/") !== -1) {
      return {
        linkBack: "/phau-thuat-thu-thuat/xuat-kho",
        chains: [
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
            title: t("pttt.danhSachPhieuLinh"),
          },
          {
            link: "/phau-thuat-thu-thuat/chi-tiet-phieu-linh/" + id,
            title: t("pttt.chiTietPhieuLinh"),
          },
        ],
      };
    }
    return {
      linkBack: "/quan-ly-noi-tru/danh-sach-phieu-tra",
      chains: [
        { link: "/quan-ly-noi-tru", title: t("quanLyNoiTru.quanLyNoiTru") },
        {
          link: "/quan-ly-noi-tru/danh-sach-nguoi-benh-noi-tru",
          title: t("quanLyNoiTru.danhSachNguoiBenhNoiTru"),
        },
        {
          link: "/quan-ly-noi-tru/danh-sach-phieu-tra",
          title: t("quanLyNoiTru.danhSachPhieuTra"),
        },
        {
          link: "/quan-ly-noi-tru/chi-tiet-phieu-tra/" + id,
          title: t("quanLyNoiTru.chiTietPhieuTra"),
        },
      ],
    };
  }, [window.location]);

  const {
    phieuNhapXuat: { thongTinPhieu },
  } = useSelector((state) => state);

  const {
    phieuNhapXuat: { getDetail, xoaPhieu, resetData, inPhieuTra },
    nbDvKho: { getDsTraKho },
  } = useDispatch();

  const times = useMemo(() => {
    const { thoiGianDuyet, thoiGianGuiDuyet, thoiGianTaoPhieu } =
      thongTinPhieu || {};
    return [thoiGianTaoPhieu, thoiGianGuiDuyet, thoiGianDuyet].map(
      (item) => item
    );
  }, [thongTinPhieu]);

  useEffect(() => {
    getDsTraKho({ phieuTraId: id });
    getDetail({ id });

    return () => {
      resetData();
    };
  }, []);

  const onPrint = () => {
    inPhieuTra(id);
  };
  const onDelete = () => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: "Cảnh báo",
          content: `Xóa phiếu số ${thongTinPhieu?.soPhieu}?`,
          cancelText: "Đóng",
          okText: "Xóa",
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
        },
        () => {
          xoaPhieu({ id: thongTinPhieu.id }).then((s) => {
            onBack();
          });
        },
        () => {}
      );
  };

  const onBack = () => {
    history.push(linkBack);
  };

  const refreshList = () => {
    getDsTraKho({ phieuTraId: id });
    getDetail({ id });
  };

  return (
    <Main>
      <Header>
        <Breadcrumb chains={chains}></Breadcrumb>
        <TrangThai times={times} />
      </Header>
      <MainPage
        title={
          <div className="wrapper-title">
            Chi tiết phiếu trả
            <div className="header-action">
              <Tooltip title="In chi tiết phiếu">
                <div className="action-btn" onClick={onPrint}>
                  <IcPrint />
                </div>
              </Tooltip>
              <Tooltip title="Xóa phiếu">
                <div className="action-btn" onClick={onDelete}>
                  <DeleteRedIcon />
                </div>
              </Tooltip>
            </div>
          </div>
        }
      >
        <div className="wrap-content">
          <Card>
            <ThongTinPhieu {...props} id={id} />
          </Card>
          <Card className="tab-content" noPadding={true}>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Danh sách hàng hóa trả" key="1">
                <DanhSachHangHoa
                  {...props}
                  isEdit={false}
                  onRefresh={refreshList}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Danh sách người bệnh trong phiếu trả" key="2">
                <DanhSachNguoiBenh
                  {...props}
                  isEdit={false}
                  onRefresh={refreshList}
                />
              </Tabs.TabPane>
            </Tabs>
          </Card>
        </div>
      </MainPage>
      <Action
        listBtn={
          [10, 15].some((i) => i === thongTinPhieu.trangThai)
            ? ["guiDuyet"]
            : []
        }
        showBack={true}
      ></Action>
    </Main>
  );
};

export default ChiTiet;
