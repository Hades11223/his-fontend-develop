import React, { useEffect, useRef, useMemo } from "react";
import { MainPage } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { refConfirm } from "app";
import { Card } from "components";
import ThongTinPhieu from "./ThongTinPhieu";
import DanhSachHangHoa from "./DanhSachHangHoa";
import { useHistory, useParams } from "react-router-dom";
import TrangThai from "pages/kho/components/TrangThai";
import Action from "../../phieuNhap/Action";
import DeleteRedIcon from "assets/svg/kho/delete.svg";
import IcPrint from "assets/svg/chuanDoanHinhAnh/print.svg";
import { Tabs, Tooltip } from "antd";
import DanhSachNguoiBenh from "./DanhSachNguoiBenh";
import { getIdFromUrl } from "utils";

const ChiTiet = ({ ...props }) => {
  const id = getIdFromUrl();
  const history = useHistory();

  const { thongTinPhieu } = useSelector((state) => state.phieuNhapXuat);

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
    inPhieuLinh({ id });
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

  return (
    <MainPage
      breadcrumb={[
        { title: "Kho", link: "/kho" },
        { title: "Xuất kho", link: "/kho/xuat-kho" },
        {
          title: "Chi tiết phiếu xuất",
          link: `/kho/xuat-kho/chi-tiet-linh-bu/${id}`,
        },
      ]}
      title={
        <div className="wrapper-title">
          Chi tiết phiếu xuất
          <div className="header-action">
            {(thongTinPhieu?.trangThai == 20 ||
              thongTinPhieu?.trangThai == 30) && (
              <Tooltip title="In chi tiết phiếu lĩnh bù">
                <div className="action-btn" onClick={onPrint}>
                  <IcPrint />
                </div>
              </Tooltip>
            )}
            <Tooltip title="Xóa phiếu lĩnh bù">
              <div className="action-btn" onClick={onDelete}>
                <DeleteRedIcon />
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
      <Card noPadding={true}>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Danh sách hàng hóa" key="1">
            <DanhSachHangHoa {...props} isEdit={false} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Danh sách người bệnh sử dụng" key="2">
            <DanhSachNguoiBenh {...props} isEdit={false} />
          </Tabs.TabPane>
        </Tabs>
      </Card>
      <Action loaiPhieu={1} />
    </MainPage>
  );
};

export default ChiTiet;
