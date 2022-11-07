import React, { useEffect, useRef, useMemo } from "react";
import { Main } from "./styled";
import Breadcrumb from "components/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { refConfirm } from "app";
import MainPage from "pages/kho/components/MainPage";
import Header from "pages/kho/components/Header";
import { Card } from "components";
import DanhSachHangHoa from "./DanhSachHangHoa";
import { useHistory, useParams } from "react-router-dom";
import TrangThai from "pages/kho/components/TrangThai";
import { Tabs } from "antd";
import { getIdFromUrl } from "utils";
import Action from "pages/kho/phieuNhap/Action";
import { useTranslation } from "react-i18next";
import ThongTinBenhNhan from "pages/phauThuatThuThuat/ChiTietNguoiBenh/ThongTinBenhNhan";

const ChiTiet = ({ ...props }) => {
  const id = getIdFromUrl();
  const history = useHistory();
  const { t } = useTranslation();

  const { linkBack, chains } = useMemo(() => {
    return {
      linkBack: "/quan-ly-noi-tru/danh-sach-nguoi-benh-noi-tru-tra-dich-vu",
      chains: [
        { link: "/quan-ly-noi-tru", title: "Quản lý nội trú" },
        {
          link: "/quan-ly-noi-tru/danh-sach-nguoi-benh-noi-tru",
          title: "Danh sách người bệnh nội trú",
        },
        {
          link: "/quan-ly-noi-tru/danh-sach-nguoi-benh-noi-tru-tra-dich-vu",
          title: "Danh sách NB chưa hoàn thành trả",
        },
        {
          link:
            "/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru-tra-dich-vu/" + id,
          title: t("pttt.chiTietPhieuLinh"),
        },
      ],
    };
  }, [window.location]);

  const { thongTinPhieu } = useSelector((state) => state.phieuNhapXuat);

  const {
    phieuNhapXuat: {
      getDetail,
      xoaPhieu,
      resetData,
      inPhieuLinh,
      guiDuyetPhieu,
    },
    danhSachNguoiBenhNoiTru: { getNbNoiTruById },
    nbDvKho: { getNbDvKho: getDsNb },
  } = useDispatch();

  useEffect(() => {
    getDsNb({ phieuLinhId: id });
    getNbNoiTruById(id);
    return () => {
      resetData();
    };
  }, []);

  const onPrint = () => {
    // inPhieuLinh({ id });
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
    <Main>
      <Header>
        <Breadcrumb chains={chains}></Breadcrumb>
        <TrangThai times={times} />
      </Header>
      <MainPage
        title={
          <div className="wrapper-title">
            Điều trị nội trú
            {/* <div className="header-action">
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
            </div> */}
          </div>
        }
      >
        <div className="wrap-content">
          <div style={{ marginBottom: 15 }}>
            <ThongTinBenhNhan />
          </div>
          <Card className="tab-content" noPadding={true}>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Danh sách dịch vụ" key="1">
                <DanhSachHangHoa {...props} isEdit={false} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Danh sách thuốc" key="2">
                <DanhSachHangHoa {...props} isEdit={false} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Danh sách vật tư" key="3">
                <DanhSachHangHoa {...props} isEdit={false} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Máu" key="4">
                <DanhSachHangHoa {...props} isEdit={false} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Hóa chất" key="5">
                <DanhSachHangHoa {...props} isEdit={false} />
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
