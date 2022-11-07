import React, { useEffect, useMemo } from "react";
import { Main } from "./styled";
import Breadcrumb from "components/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import MainPage from "pages/kho/components/MainPage";
import Header from "pages/kho/components/Header";
import { Card } from "components";
import { useHistory } from "react-router-dom";
import TrangThai from "pages/kho/components/TrangThai";
import DeleteRedIcon from "assets/svg/kho/delete.svg";
import IcPrint from "assets/svg/chuanDoanHinhAnh/print.svg";
import { Tabs, Tooltip } from "antd";
import { getIdFromUrl } from "utils";
import Action from "pages/kho/phieuNhap/Action";
import { refConfirm } from "app";

const ChiTietPhieuLinh = ({
  title = "Chi tiết phiếu trả",
  ComponentThongTinPhieu,
  chains,
  listPanel = [],
  ...props
}) => {
  const id = getIdFromUrl();
  const history = useHistory();

  const { thongTinPhieu } = useSelector((state) => state.phieuNhapXuat);

  const {
    phieuNhapXuat: {
      getDetail,
      xoaPhieu,
      resetData,
      inPhieuLinh,
      guiDuyetPhieu,
    },
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
            history.goBack();
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
    <Main>
      <Header>
        <Breadcrumb chains={chains}></Breadcrumb>
        <TrangThai times={times} />
      </Header>
      <MainPage
        title={
          <div className="wrapper-title">
            {title}
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
            <ComponentThongTinPhieu {...props} />
          </Card>
          <Card className="tab-content" noPadding={true}>
            <Tabs defaultActiveKey="1">
              {listPanel.map((item, index) => (
                <Tabs.TabPane tab={item.title} key={index + 1 + ""}>
                  {item.component}
                </Tabs.TabPane>
              ))}
            </Tabs>
          </Card>
        </div>
      </MainPage>
      <Action showBack={true}></Action>
    </Main>
  );
};

export default ChiTietPhieuLinh;
