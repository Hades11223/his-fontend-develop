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
import IcPrint from "assets/svg/chuanDoanHinhAnh/print.svg";
import { Tooltip } from "antd";

const ChiTiet = ({ ...props }) => {
  const { id } = useParams();
  const history = useHistory();

  const {
    phieuNhapXuat: { thongTinPhieu },
  } = useSelector((state) => state);

  const {
    phieuNhapXuat: { getDetail, xoaPhieu, resetData, inPhieuLinh },
  } = useDispatch();

  useEffect(() => {
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
        { title: "Nhập kho", link: "/kho/nhap-kho" },
      ]}
      title={
        <div>
          Phiếu nhập dự trù
          <div className="header-action">
            {[10, 15].includes(thongTinPhieu?.trangThai) && (
              <div className="action-btn" onClick={onDelete}>
                <DeleteRedIcon />
              </div>
            )}
            {(thongTinPhieu?.trangThai === 20 ||
              thongTinPhieu?.trangThai === 30) && (
              <div className="action-btn" onClick={onPrint}>
                <Tooltip title="In chi tiết phiếu nhập">
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
        <ThongTinPhieuNhap {...props} />
      </Card>
      <Card noPadding={true}>
        <DanhSachHangHoa {...props} isEdit={false} />
      </Card>
      <Action />
    </MainPage>
  );
};

export default ChiTiet;
