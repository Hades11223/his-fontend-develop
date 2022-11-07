import React, { useEffect, useRef, useMemo } from "react";
import { MainPage } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { refConfirm } from "app";
import { Card } from "components";
import ThongTinPhieuNhap from "./ThongTinPhieuNhap";
import DanhSachHangHoa from "../DanhSachHangHoa";
import { useHistory, useParams } from "react-router-dom";
import TrangThai from "pages/kho/components/TrangThai";
import Action from "../../Action";
import DeleteRedIcon from "assets/svg/kho/delete.svg";
import SearchHangHoa from "../SearchHangHoa";
import { Tooltip } from "antd";
import IcPrint from "assets/svg/chuanDoanHinhAnh/print.svg";

const ChiTiet = ({ ...props }) => {
  const { id } = useParams();
  const history = useHistory();

  const {
    phieuNhapXuat: { thongTinPhieu },
  } = useSelector((state) => state);

  const {
    phieuNhapXuat: { getDetail, xoaPhieu, resetData, inPhieuNhapXuat },
  } = useDispatch();

  useEffect(() => {
    getDetail({ id });
    return () => {
      resetData();
    };
  }, []);

  const onPrint = () => {
    inPhieuNhapXuat({ id, phieuNhapKho: true });
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

  console.log(thongTinPhieu, "thongTinPhieu...");

  return (
    <MainPage
      breadcrumb={[
        { title: "Kho", link: "/kho" },
        { title: "Nhập kho", link: "/kho/nhap-kho" },
        {
          title: "Chi tiết phiếu nhập chuyển kho",
          link: `/kho/phieu-nhap-chuyen-kho/chi-tiet/${id}`,
        },
      ]}
      title={
        <div>
          Chi tiết phiếu nhập chuyển kho
          <div className="header-action">
            {[10, 15].includes(thongTinPhieu?.trangThai) && (
              <div className="action-btn" onClick={onDelete}>
                <DeleteRedIcon />
              </div>
            )}
            <div className="action-btn" onClick={onPrint}>
              <Tooltip title="In phiếu nhập kho">
                <IcPrint />
              </Tooltip>
            </div>
          </div>
        </div>
      }
      titleRight={<TrangThai times={times} />}
    >
      <Card>
        <ThongTinPhieuNhap {...props} />
      </Card>
      <Card noPadding={true}>
        <SearchHangHoa isEdit={false} />
        <DanhSachHangHoa {...props} isEdit={false} />
      </Card>
      <Action allowEdit={false} />
    </MainPage>
  );
};

export default ChiTiet;
