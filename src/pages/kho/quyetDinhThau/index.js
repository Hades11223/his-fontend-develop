import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Col, Tabs } from "antd";
import { fullTableLayout } from "./config";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  ADD_LAYOUT,
  TABLE_LAYOUT,
} from "constants/index";
import MultiLevelTab from "components/MultiLevelTab";
import {
  DanhSach,
  QuyetDinhThau,
  FormQuyetDinhThau,
  ChiTietThau,
  FormChiTietThau,
  KhaiBaoGiamGia,
} from "./components";
import stringUtils from "mainam-react-native-string-utils";
import BaseDm2 from "pages/danhMuc/BaseDm2";
import { Main } from "./styled";
const { TabPane } = Tabs;

const Index = () => {
  const refLayerHotKey1 = useRef(stringUtils.guid());
  const refLayerHotKey2 = useRef(stringUtils.guid());
  const refLayerHotKey3 = useRef(stringUtils.guid());
  const { onAddLayer } = useDispatch().phimTat;
  const [state, _setState] = useState({
    showFullTable: false,
    activeKeyTab: "1",
    collapseStatus: false,
    activeTab: 0,
  });

  const { getListAllNhomDichVuKhoCap1 } = useDispatch().nhomDichVuKho;
  const { onSearchTongHop } = useDispatch().nhomChiPhi;
  const { getListAllNhaSanXuat, getListAllNhaCungCap } = useDispatch().doiTac;
  const { getListAllXuatXu } = useDispatch().xuatXu;
  const { getListAllDuongDung } = useDispatch().duongDung;
  const { getListAllHoatChat } = useDispatch().hoatChat;
  const { getListAllDonViTinh } = useDispatch().donViTinh;
  const { getListAllNguonNhapKho } = useDispatch().nguonNhapKho;
  const { getListAllKhoa, getKhoaTheoTaiKhoan } = useDispatch().khoa;
  const { getListAllQuyetDinhThau } = useDispatch().quyetDinhThau;

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const callback = (key) => {
    setState({ activeTab: parseInt(key, 10) });
    if (key === "1") onAddLayer({ layerId: refLayerHotKey1.current });
    else if (key === "2") onAddLayer({ layerId: refLayerHotKey2.current });
  };

  useEffect(() => {
    getListAllNhomDichVuKhoCap1({ page: "", size: "" });
    onSearchTongHop({});
    getListAllQuyetDinhThau({ page: "", size: "", active: true });
    getListAllNhaSanXuat({
      page: "",
      size: "",
      active: true,
      dsLoaiDoiTac: [10],
    });
    getListAllNhaCungCap({
      page: "",
      size: "",
      active: true,
      dsLoaiDoiTac: [20],
    });
    getListAllXuatXu({ page: "", size: "", active: true });
    getListAllDuongDung({ page: "", size: "", active: true });
    getListAllHoatChat({ page: "", size: "", active: true });
    getListAllDonViTinh({ page: "", size: "", active: true });
    getListAllNguonNhapKho({ thau: true, active: true, size: "" });
    getListAllKhoa({ page: "", size: "", active: true });
    getKhoaTheoTaiKhoan();
  }, []);

  const listPanel = [
    {
      title: "Thông tin chi tiết",
      key: 1,
      render: () => {
        return (
          <FormChiTietThau
            layerId={refLayerHotKey2.current}
            ignoreField={["giaKhongBaoHiem"]}
          />
        );
      },
    },
    {
      key: 2,
      title: "Khai báo giảm giá",
      render: () => {
        return <KhaiBaoGiamGia layerId={refLayerHotKey3.current} />;
      },
    },
  ];

  const handleChangeshowTable = () => {
    setState({
      changeShowFullTbale: true,
      showFullTable: !state.showFullTable,
    });
    setTimeout(() => {
      setState({
        changeShowFullTbale: false,
      });
    }, 1000);
  };
  const handleCollapsePane = () => {
    setState({ collapseStatus: !state?.collapseStatus });
  };

  return (
    <Main>
      <BaseDm2
        breadcrumb={[
          { title: "Kho", link: "/kho" },
          {
            title: "Quản lý thầu",
            link: "/kho/quan-ly-thau",
          },
        ]}
        title={"Danh sách dịch vụ trong thầu"}
      >
        <Col
          {...(state?.activeTab === 0
            ? fullTableLayout
            : !state.showFullTable
            ? state?.collapseStatus
              ? TABLE_LAYOUT_COLLAPSE
              : TABLE_LAYOUT
            : null)}
          className="pr-3 transition-ease tab-main"
        >
          <Tabs
            defaultActiveKey={state?.activeTab}
            onChange={callback}
            className="table-tab"
          >
            <TabPane tab="Tất cả" key={0}>
              <DanhSach />
            </TabPane>
            <TabPane tab="Danh sách thầu" key={1}>
              <QuyetDinhThau
                handleChangeshowTable={handleChangeshowTable}
                showFullTable={state.showFullTable}
                collapseStatus={state?.collapseStatus}
                handleCollapsePane={handleCollapsePane}
                layerId={refLayerHotKey1.current}
              />
            </TabPane>
            <TabPane tab="Chi tiết thầu" key={2}>
              <ChiTietThau
                handleChangeshowTable={handleChangeshowTable}
                showFullTable={state.showFullTable}
                collapseStatus={state?.collapseStatus}
                handleCollapsePane={handleCollapsePane}
                layerId={refLayerHotKey2.current}
              />
            </TabPane>
          </Tabs>
        </Col>
        {!state.showFullTable && (
          <Col
            {...(state?.collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
            className="mt-3 transition-ease"
            style={
              state.isSelected
                ? { border: "2px solid #c1d8fd", borderRadius: 20 }
                : {}
            }
          >
            {state?.activeTab === 1 && (
              <FormQuyetDinhThau layerId={refLayerHotKey1.current} />
            )}
            {state?.activeTab === 2 && (
              <MultiLevelTab
                listPanel={listPanel}
                isBoxTabs={true}
                activeKey={state.activeKeyTab}
                onChange={(activeKeyTab) => {
                  if (activeKeyTab === "1")
                    onAddLayer({ layerId: refLayerHotKey2.current });
                  else if (activeKeyTab === "2")
                    onAddLayer({ layerId: refLayerHotKey3.current });
                  setState({ activeKeyTab });
                }}
              ></MultiLevelTab>
            )}
          </Col>
        )}
      </BaseDm2>
    </Main>
  );
};

export default Index;
