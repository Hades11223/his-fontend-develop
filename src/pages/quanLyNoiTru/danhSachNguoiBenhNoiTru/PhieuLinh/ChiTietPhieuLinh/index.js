import React, { useEffect, useMemo } from "react";
import { MainPage } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { refConfirm } from "app";
import { Card } from "components";
import ThongTinPhieu from "./ThongTinPhieu";
import DanhSachHangHoa from "./DanhSachHangHoa";
import { useHistory } from "react-router-dom";
import TrangThai from "pages/kho/components/TrangThai";
import IcDelete from "assets/svg/ic-delete.svg";
import IcPrint from "assets/svg/ic-print.svg";
import { Tabs, Tooltip } from "antd";
import DanhSachNguoiBenh from "./DanhSachNguoiBenh";
import { getIdFromUrl } from "utils";
import SoLuongLeLinhTruoc from "./SoLuongLeLinhTruoc";
import SoLuongLeLinhSau from "./SoLuongLeLinhSau";
import Action from "pages/kho/phieuNhap/Action";
import { useTranslation } from "react-i18next";
import { useLoading } from "hook";

const ChiTiet = ({ ...props }) => {
  const id = getIdFromUrl();
  const history = useHistory();
  const { showLoading, hideLoading } = useLoading();
  const { t } = useTranslation();
  const { thongTinPhieu } = useSelector((state) => state.phieuNhapXuat);

  const { linkBack, chains, hiddenBtn, showBtnHuyDuyet } = useMemo(() => {
    const { pathname } = window.location;
    if (pathname.indexOf("/kho/chi-tiet-phieu-linh/") !== -1) {
      return {
        hiddenBtn: false,
        showBtnHuyDuyet: [30].some((i) => i === thongTinPhieu.trangThai),
        linkBack: "/kho/xuat-kho",
        chains: [
          { title: t("kho.kho"), link: "/kho" },
          { title: t("kho.xuatKho"), link: "/kho/xuat-kho" },
          {
            link: "/kho/chi-tiet-phieu-linh/" + id,
            title: t("pttt.chiTietPhieuLinh"),
          },
        ],
      };
    }
    if (pathname.indexOf("/phau-thuat-thu-thuat/chi-tiet-phieu-linh/") !== -1) {
      return {
        hiddenBtn: true,
        showBtnHuyDuyet: false,
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
      hiddenBtn: true,
      showBtnHuyDuyet: false,
      linkBack: "/quan-ly-noi-tru/danh-sach-phieu-linh",
      chains: [
        { link: "/quan-ly-noi-tru", title: t("quanLyNoiTru.quanLyNoiTru") },
        {
          link: "/quan-ly-noi-tru/danh-sach-nguoi-benh-noi-tru",
          title: t("quanLyNoiTru.danhSachNguoiBenhNoiTru"),
        },
        {
          link: "/quan-ly-noi-tru/danh-sach-phieu-linh",
          title: t("pttt.danhSachPhieuLinh"),
        },
        {
          link: "/quan-ly-noi-tru/chi-tiet-phieu-linh/" + id,
          title: t("pttt.chiTietPhieuLinh"),
        },
      ],
    };
  }, [window.location, thongTinPhieu]);

  const {
    phieuNhapXuat: { getDetail, xoaPhieu, resetData, inPhieuLinh },
    nbDvKho: { getNbDvKho: getDsNb },
  } = useDispatch();

  useEffect(() => {
    getDsNb({ phieuLinhId: id });
    getDetail({ id });
    return () => {
      resetData();
    };
  }, []);

  const onPrint = () => {
    showLoading();

    inPhieuLinh({ id, printMerge: true })
      .then(() => {
        hideLoading();
      })
      .catch(() => {
        hideLoading();
      });
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
  const times = useMemo(() => {
    const { thoiGianDuyet, thoiGianGuiDuyet, thoiGianTaoPhieu } =
      thongTinPhieu || {};
    return [thoiGianTaoPhieu, thoiGianGuiDuyet, thoiGianDuyet].map(
      (item) => item
    );
  }, [thongTinPhieu]);

  const onBack = () => {
    history.push(linkBack);
  };

  return (
    <MainPage
      breadcrumb={chains}
      title={
        <div className="wrapper-title">
          Chi tiết phiếu lĩnh
          <div className="header-action">
            <Tooltip title="In chi tiết phiếu">
              <div className="action-btn" onClick={onPrint}>
                <IcPrint />
              </div>
            </Tooltip>
            <Tooltip title="Xóa phiếu">
              <div className="action-btn" onClick={onDelete}>
                <IcDelete />
              </div>
            </Tooltip>
          </div>
        </div>
      }
      titleRight={<TrangThai times={times} />}
    >
      <Card>
        <ThongTinPhieu {...props} />
      </Card>
      <Card className="tab-content" noPadding={true}>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Danh sách hàng hóa lĩnh" key="1">
            <DanhSachHangHoa {...props} isEdit={false} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Danh sách người bệnh trong phiếu lĩnh" key="2">
            <DanhSachNguoiBenh {...props} isEdit={false} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Số lượng lẻ lĩnh cho lần sau" key="3">
            <SoLuongLeLinhSau {...props} isEdit={false} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Số lượng lẻ lĩnh cho lần trước" key="4">
            <SoLuongLeLinhTruoc {...props} isEdit={false} />
          </Tabs.TabPane>
        </Tabs>
      </Card>
      <Action
        listBtn={
          [10, 15].some((i) => i === thongTinPhieu.trangThai)
            ? ["guiDuyet"]
            : showBtnHuyDuyet
            ? ["huyDuyet"]
            : hiddenBtn
            ? []
            : [20].some((i) => i === thongTinPhieu.trangThai)
            ? ["tuChoiDuyet", "duyet"]
            : []
        }
        showBack={true}
      ></Action>
    </MainPage>
  );
};

export default ChiTiet;
