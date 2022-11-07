import React, { useEffect, useMemo } from "react";
import { MainPage, Main } from "./styled";
import { useDispatch } from "react-redux";
import { Tabs, Card } from "components";
import { useHistory } from "react-router-dom";
import TrangThai from "pages/kho/components/TrangThai";
import DeleteRedIcon from "assets/svg/kho/delete.svg";
import IcPrint from "assets/svg/chuanDoanHinhAnh/print.svg";
import { Tooltip } from "antd";
import Action from "pages/kho/phieuNhap/Action";
import { refConfirm } from "app";
import { useStore } from "hook";

const ChiTietPhieuLinh = ({
  title = "Chi tiết phiếu lĩnh",
  ComponentThongTinPhieu,
  chains,
  listPanel = [],
  tabBarExtraContent,
  onChangeTab,
  listBtn,
  otherBtn,
  xoaPhieu,
  dataDetail,
  showStatus = true,
  ...props
}) => {
  const history = useHistory();

  const data = useStore("phieuNhapXuat.thongTinPhieu");
  const thongTinPhieu = useMemo(() => dataDetail || data, [dataDetail, data]);

  const {
    phieuNhapXuat: { xoaPhieu: deletePhieu, resetData },
  } = useDispatch();

  useEffect(() => {
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
          (xoaPhieu || deletePhieu)({ id: thongTinPhieu.id }).then((s) => {
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
    <MainPage
      breadcrumb={chains}
      title={
        <div className="title">
          {title}
          <div className="header-action">
            {/* <Tooltip title="In chi tiết phiếu"></Tooltip> */}
            <Tooltip title="Xóa phiếu">
              <div className="action-btn" onClick={onDelete}>
                <DeleteRedIcon />
              </div>
            </Tooltip>
          </div>
        </div>
      }
      rightBreadcrumbContent={showStatus && <TrangThai times={times} />}
    >
      <Main>
        <Card>
          <ComponentThongTinPhieu {...props} />
        </Card>
        <Card className="tab-content" noPadding={true} bottom={0}>
          <Tabs
            onChange={onChangeTab}
            defaultActiveKey="1"
            tabBarExtraContent={tabBarExtraContent}
          >
            {listPanel.map((item, index) => (
              <Tabs.TabPane
                tab={item.title}
                key={index + 1 + ""}
                style={{ height: "100%" }}
              >
                {item.component}
              </Tabs.TabPane>
            ))}
          </Tabs>
        </Card>
      </Main>
      <Action otherBtn={otherBtn} listBtn={listBtn} showBack={true}></Action>
    </MainPage>
  );
};

export default ChiTietPhieuLinh;
