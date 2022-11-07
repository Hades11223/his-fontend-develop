import React, { useEffect, useRef } from "react";
import { Main } from "./styled";
import Header from "pages/kho/components/Header";
import Breadcrumb from "components/Breadcrumb";
import MainPage from "pages/kho/components/MainPage";
import { Col, Row } from "antd";
import TrangThaiLienThongGPP from "./RightPanel/TrangThaiLienThongGPP";
import ThongTinLienThongGPP from "./LeftPanel/ThongTinLienThongGPP";
import stringUtils from "mainam-react-native-string-utils";
import DanhSachThuoc from "./LeftPanel/DanhSachThuoc";
import { ModalNotification2 } from "components/ModalConfirm";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ChiTietLienThongGPP = (props) => {
  const { id } = useParams();
  //ref
  const refModalNotificationDeleted = useRef(null);
  const refLayerHotKey = useRef(stringUtils.guid());

  //redux
  const {
    lienThongGpp: {
      deleteLienThongGPP,
      getLienThongGpp,
      dayLienThong,
      capNhatLienThong,
    },
    utils: { getUtils },
  } = useDispatch();

  const {
    lienThongGpp: { chiTietLienThong },
    utils: { listTrangThaiGpp = [] },
  } = useSelector((state) => state);

  useEffect(() => {
    getUtils({ name: "TrangThaiGpp" });
  }, []);

  //effect
  useEffect(() => {
    if (id) {
      getLienThongGpp(id);
    }
  }, [id]);

  //function
  function onDeleteLienThong(e) {
    e.preventDefault();

    refModalNotificationDeleted.current &&
      refModalNotificationDeleted.current.show(
        {
          title: "Xoá dữ liệu",
          content: `Bạn chắc chắn muốn xóa ?`,
          cancelText: "Quay lại",
          okText: "Đồng ý",
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
        },
        () => {
          deleteLienThongGPP(id);
        },
        () => {}
      );
  }

  function onRefreshLienThong() {
    if (id) {
      getLienThongGpp(id);
    }
  }

  function onCapNhatLienThong() {
    capNhatLienThong({ id });
  }

  return (
    <Main>
      <Header>
        <Breadcrumb
          chains={[
            { title: "Nhà thuốc", link: "/quan-ly-nha-thuoc" },
            { title: "Liên thông GPP", link: "/nha-thuoc/lien-thong-gpp" },
          ]}
        ></Breadcrumb>
      </Header>

      <MainPage title={<div>Liên thông GPP</div>}>
        <Row gutter={[12, 12]} style={{ height: "100%" }}>
          <Col span={19} className="flexc">
            <ThongTinLienThongGPP
              layerId={refLayerHotKey.current}
              chiTietLienThong={chiTietLienThong}
            />

            <DanhSachThuoc
              layerId={refLayerHotKey.current}
              className="flex1"
              dsThuoc={chiTietLienThong?.dsPhieuNhapXuatChiTiet || []}
            />
          </Col>
          <Col span={5} className="flexc">
            <TrangThaiLienThongGPP
              className="flexc flex1"
              onDeleteLienThong={onDeleteLienThong}
              chiTietLienThong={chiTietLienThong}
              listTrangThaiGpp={listTrangThaiGpp}
              dayLienThong={dayLienThong}
              onRefreshLienThong={onRefreshLienThong}
              capNhatLienThong={onCapNhatLienThong}
            />
          </Col>
        </Row>
      </MainPage>

      <ModalNotification2 ref={refModalNotificationDeleted} />
    </Main>
  );
};

export default ChiTietLienThongGPP;
