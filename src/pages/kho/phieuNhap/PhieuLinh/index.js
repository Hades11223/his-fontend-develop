import React, { useEffect, useRef, useMemo } from "react";
import { MainPage } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { refConfirm } from "app";
import { Card } from "components";
import ThongTinPhieu from "./ThongTinPhieu";
import DanhSachHangHoa from "./DanhSachHangHoa";
import { useHistory } from "react-router-dom";
import TrangThai from "pages/kho/components/TrangThai";
import Action from "../Action";
import DeleteRedIcon from "assets/svg/kho/delete.svg";
import IcPrint from "assets/svg/chuanDoanHinhAnh/print.svg";
import { Dropdown, Menu, Tabs, Tooltip } from "antd";
import DanhSachNguoiBenh from "./DanhSachNguoiBenh";
import { getIdFromUrl } from "utils";
import { useTranslation } from "react-i18next";
const ChiTiet = ({ ...props }) => {
  const id = getIdFromUrl();
  const { t } = useTranslation();
  const history = useHistory();

  const { thongTinPhieu } = useSelector((state) => state.phieuNhapXuat);

  const {
    phieuNhapXuat: { getDetail, xoaPhieu, resetData, inPhieuLinh, inPhieuLinhChiTiet },
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
    inPhieuLinh({ id });
  };
  const onDelete = () => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: t("common.canhBao"),
          content: `${t("common.xoaPhieuSo")} ${thongTinPhieu?.soPhieu}?`,
          cancelText: t("common.dong"),
          okText: t("common.xoa"),
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
        },
        () => {
          xoaPhieu({ id: thongTinPhieu.id }).then((s) => {
            history.push("/kho/nhap-kho");
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

  const onPrintDanhSachBenhNhan = () => {
    inPhieuLinhChiTiet({ id });
  };

  const menu = (
    <Menu
      items={[
        {
          key: 0,
          label: (
            <a href={() => false} onClick={onPrint}>
              {t("kho.inChiTietPhieuNhap")}
            </a>
          ),
        },
        {
          key: 1,
          label: (
            <a href={() => false} onClick={onPrintDanhSachBenhNhan}>
              {t("kho.inDanhSachBenhNhan")}
            </a>
          ),
        },
      ]}
    />
  );

  return (
    <MainPage
      breadcrumb={[
        { title: t("kho.kho"), link: "/kho" },
        { title: t("kho.nhapKho"), link: "/kho/nhap-kho" },
        {
          title: t("kho.chiTietLinhBu"),
          link: `/kho/nhap-kho/chi-tiet-linh-bu/${id}`,
        },
      ]}
      title={
        <div className="wrapper-title">
          {t("kho.phieuLinhBuTuTruc")}
          <div className="header-action">
            <Dropdown overlay={menu} trigger={["click"]}>
              <div className="action-btn">
                <IcPrint />
              </div>
            </Dropdown>
            {[15].includes(thongTinPhieu?.trangThai) && (
              <Tooltip title={t("kho.xoaPhieu")}>
                <div className="action-btn" onClick={onDelete}>
                  <DeleteRedIcon />
                </div>
              </Tooltip>
            )}
          </div>
        </div>
      }
      titleRight={<TrangThai times={times} />}
    >
      <Card>
        <ThongTinPhieu {...props} />
      </Card>
      <Card noPadding={true}>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab={t("kho.danhSachHangHoa")} key="1">
            <DanhSachHangHoa {...props} isEdit={false} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={t("kho.danhSachNguoiBenhSuDung")} key="2">
            <DanhSachNguoiBenh {...props} isEdit={false} />
          </Tabs.TabPane>
        </Tabs>
      </Card>
      <Action />
    </MainPage>
  );
};

export default ChiTiet;
