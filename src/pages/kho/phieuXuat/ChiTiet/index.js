import React, { useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import DanhSachHangHoa from "../DanhSachHangHoa";
import { refConfirm } from "app";
import { MainPage } from "./styled";
import { useEffect } from "react";
import TrangThai from "pages/kho/components/TrangThai";
import { Card } from "components";
import { useParams, useLocation, useHistory } from "react-router-dom";
import ThongTinPhieuXuat from "./ThongTinPhieuXuat";
import { useQueryString } from "hook";
import SearchHangHoa from "../SearchHangHoa";
import Action from "../../phieuNhap/Action";
import DeleteRedIcon from "assets/svg/kho/delete.svg";
import IcPrint from "assets/svg/chuanDoanHinhAnh/print.svg";
import { Tooltip } from "antd";

const PhieuXuat = ({ ...props }) => {
  const { id } = useParams();
  const location = useLocation();
  const [xuatType] = useQueryString("type", "");
  const history = useHistory();

  const {
    phieuNhapXuat: { thongTinPhieu },
  } = useSelector((state) => {
    return state;
  });

  const {
    phieuNhapXuat: { getDetail, resetData, xoaPhieu, inPhieuNhapXuat },
  } = useDispatch();

  const loaiNhapXuat = useMemo(() => {
    if (xuatType) return parseInt(xuatType);
    if (thongTinPhieu.id) return thongTinPhieu.loaiNhapXuat;
    return 0;
  }, [location, xuatType, thongTinPhieu.loaiNhapXuat]);

  const getTitlePage = useMemo(() => {
    if ([0, 20].includes(loaiNhapXuat)) return "Chi tiết phiếu xuất";
    if (loaiNhapXuat == 30) return "Chi tiết phiếu xuất chuyển kho";
    if (loaiNhapXuat == 40) return "Chi tiết phiếu xuất trả nhà cung cấp";
    if (loaiNhapXuat == 90) return "Chi tiết phiếu xuất khác";
  }, [loaiNhapXuat]);
  const times = useMemo(() => {
    const { thoiGianDuyet, thoiGianGuiDuyet, thoiGianTaoPhieu } =
      thongTinPhieu || {};
    return [thoiGianTaoPhieu, thoiGianGuiDuyet, thoiGianDuyet].map(
      (item) => item
    );
  }, [thongTinPhieu]);

  useEffect(() => {
    if (id) {
      getDetail({ id });
    }
    return () => {
      resetData();
    };
  }, []);

  const onPrint = () => {
    inPhieuNhapXuat({ id });
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
            history.push("/kho/xuat-kho");
          });
        },
        () => {}
      );
  };

  return (
    <MainPage
      breadcrumb={[
        { title: "Kho", link: "/kho" },
        { title: "Xuất kho", link: "/kho/xuat-kho" },
        {
          title: "Chi tiết phiếu xuất",
          link: `/kho/xuat-kho/chi-tiet/${id}`,
        },
      ]}
      title={
        <div>
          {getTitlePage}
          <div className="header-action">
            {[10, 15].includes(thongTinPhieu?.trangThai) && (
              <div className="action-btn" onClick={onDelete}>
                <DeleteRedIcon />
              </div>
            )}
            {(thongTinPhieu?.trangThai == 20 ||
              thongTinPhieu?.trangThai == 30) && (
              <div className="action-btn" onClick={onPrint}>
                <Tooltip title="In chi tiết phiếu xuất">
                  <IcPrint />
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      }
      titleRight={<TrangThai times={times} />}
    >
      <Card>
        <ThongTinPhieuXuat />
      </Card>
      <Card noPadding={true}>
        <SearchHangHoa isEdit={false} />
        <DanhSachHangHoa {...props} isEdit={false} />
      </Card>
      <Action
        loaiPhieu={1}
        allowEdit={[10, 15, 20].includes(thongTinPhieu?.trangThai)}
        hiddenCancel={
          thongTinPhieu?.loaiNhapXuat === 30 && thongTinPhieu?.trangThai === 30
        }
      />
    </MainPage>
  );
};

export default PhieuXuat;
