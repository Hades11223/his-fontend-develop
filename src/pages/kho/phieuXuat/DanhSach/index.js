import React, { useEffect, useRef } from "react";
import { MainPage } from "./styled";
import { Row } from "antd";
import TimKiemPhieuXuat from "./TimKiemPhieuXuat";
import DanhSachPhieuXuat from "./DanhSachPhieuXuat";
import Button from "pages/kho/components/Button";
import IcCreate from "assets/images/kho/IcCreate.png";
import { useDispatch } from "react-redux";
import ModalChonLoaiPhieuXuat from "pages/kho/components/ModalChonLoaiPhieuXuat";
import ModalChonKho from "pages/kho/components/ModalChonKho";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";

const XuatKho = (props) => {
  const {
    kho: { getTheoTaiKhoan },
  } = useDispatch();
  useEffect(() => {
    getTheoTaiKhoan({});
  }, []);
  const history = useHistory();
  const refTimKiemPhieuXuat = useRef(null);
  const refModalChonLoaiPhieuXuat = useRef(null);
  const refModalChonKho = useRef(null);
  const onCreateNew = () => {
    refModalChonLoaiPhieuXuat.current &&
      refModalChonLoaiPhieuXuat.current.show({}, (index) => {
        refModalChonKho.current &&
          refModalChonKho.current.show({ title: "Chọn kho xuất" }, (khoId) => {
            history.push(`/kho/xuat-kho/them-moi?type=${index}&khoId=${khoId}`);
          });
      });
  };
  return (
    <MainPage
      breadcrumb={[
        { title: "Kho", link: "/kho" },
        { title: "Xuất kho", link: "/kho/xuat-kho" },
      ]}
      title={<>Danh sách phiếu xuất</>}
      titleRight={
        checkRole([ROLES["KHO"].THEM_MOI_PHIEU_XUAT_KHO]) && (
          <Button
            className="btn_new"
            type={"success"}
            iconHeight={20}
            rightIcon={<img src={IcCreate} alt="..." />}
            onClick={onCreateNew}
          >
            <span> Thêm mới</span>
          </Button>
        )
      }
    >
      <Row xs={24}>
        <TimKiemPhieuXuat ref={refTimKiemPhieuXuat} />
      </Row>
      <DanhSachPhieuXuat />
      <ModalChonLoaiPhieuXuat ref={refModalChonLoaiPhieuXuat} />
      <ModalChonKho ref={refModalChonKho} />
    </MainPage>
  );
};

export default XuatKho;
