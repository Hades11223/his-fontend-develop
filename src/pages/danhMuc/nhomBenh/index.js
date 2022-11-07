import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { Col, Tabs } from "antd";
import { fullTableLayout } from "./config";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  ADD_LAYOUT,
  TABLE_LAYOUT,
} from "constants/index";
import {
  NhomBenhChinh,
  ChuongBenh,
  NhomBenhPhu1,
  NhomBenhPhu2,
  LoaiBenh,
  TenBenh,
  FormChuongBenh,
  FormNhomBenhChinh,
  FormNhomBenhPhu1,
  FormNhomBenhPhu2,
  FormLoaiBenh,
  FormTenBenh,
  TongHop,
} from "./components";
import { combineSort } from "utils";
import { SORT_DEFAULT } from "constants/index";
import stringUtils from "mainam-react-native-string-utils";
import BaseDm2 from "../BaseDm2";
import { Main } from "./styled";

const { TabPane } = Tabs;
const Index = (props) => {
  const refLayerHotKey1 = useRef(stringUtils.guid());
  const refLayerHotKey2 = useRef(stringUtils.guid());
  const refLayerHotKey3 = useRef(stringUtils.guid());
  const refLayerHotKey4 = useRef(stringUtils.guid());
  const refLayerHotKey5 = useRef(stringUtils.guid());
  const refLayerHotKey6 = useRef(stringUtils.guid());

  const { onAddLayer } = useDispatch().phimTat;
  const [activeTab, setActiveTab] = useState(0);
  const formChuongBenhRef = useRef(null);
  const formNhomBenhChinhRef = useRef(null);
  const formNhomBenh1Ref = useRef(null);
  const formNhomBenh2Ref = useRef(null);
  const formTypePartientRef = useRef(null);
  const formTenBenhRef = useRef(null);
  const [state, _setState] = useState({
    changeCollapseStatus: false,
    collapseStatus: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const url = new URL(window.location.href);
  let nhomBenh = url.searchParams.get("nhomBenh");
  nhomBenh =
    (/(true|false)/.test(nhomBenh) && JSON.parse(nhomBenh)) || undefined;

  useEffect(() => {
    const sort = combineSort(SORT_DEFAULT);
    if (activeTab === 6 || activeTab === 0) {
      props.searchTenBenh({
        page: 0,
        size: 10,
        sort,
        nhomBenhPhu: nhomBenh,
      });
    } else if (activeTab === 2 || activeTab === 3 || activeTab === 4) {
      let loaiNhomBenh = 10;
      switch (activeTab) {
        case 2:
          loaiNhomBenh = 10;
          break;
        case 3:
          loaiNhomBenh = 20;
          break;
        default:
          loaiNhomBenh = 30;
          break;
      }
      props.searchNhomBenh({
        page: 0,
        size: 10,
        sort,
        loaiNhomBenh,
      });
    }
  }, [activeTab]);
  useEffect(() => {
    props.getAllChuongBenh({});
    props.getAllNhomBenh({ loaiNhomBenh: 10 });
    props.getAllNhomBenh({ loaiNhomBenh: 20 });
    props.getAllNhomBenh({ loaiNhomBenh: 30 });
    props.getNhomBenh({
      loaiNhomBenh: 10,
    });
    props.getNhomBenh({
      loaiNhomBenh: 20,
    });
    props.getNhomBenh({
      loaiNhomBenh: 30,
    });
  }, []);
  const callback = (key) => {
    setActiveTab(parseInt(key, 10));
    if (key === "1") onAddLayer({ layerId: refLayerHotKey1.current });
    else if (key === "2") onAddLayer({ layerId: refLayerHotKey2.current });
    else if (key === "3") onAddLayer({ layerId: refLayerHotKey3.current });
    else if (key === "4") onAddLayer({ layerId: refLayerHotKey4.current });
    else if (key === "5") onAddLayer({ layerId: refLayerHotKey5.current });
    else onAddLayer({ layerId: refLayerHotKey6.current });
  };
  //onRow
  const onEdit = (key) => (info) => {
    if (key === "nhomChinh") {
      if (formNhomBenhChinhRef.current) {
        formNhomBenhChinhRef.current.setfields(info);
      }
    } else if (key === "nhom1") {
      if (formNhomBenh1Ref.current) {
        formNhomBenh1Ref.current.setfields(info);
      }
    } else if (key === "nhom2") {
      if (formNhomBenh2Ref.current) {
        formNhomBenh2Ref.current.setfields(info);
      }
    } else if (key === "chuongBenh") {
      if (formChuongBenhRef.current) {
        formChuongBenhRef.current.setfields(info);
      }
    } else if (key === "tenBenh") {
      if (formTenBenhRef.current) {
        formTenBenhRef.current.setfields(info);
      }
    } else if (key === "loaiBenh") {
      if (formTypePartientRef.current) {
        formTypePartientRef.current.setfields(info);
      }
    }
  };
  //reset data
  const onReset = (key) => {
    if (key === "nhomChinh") {
      if (formNhomBenhChinhRef.current) {
        formNhomBenhChinhRef.current.resetFields();
      }
    } else if (key === "nhom1") {
      if (formNhomBenh1Ref.current) {
        formNhomBenh1Ref.current.resetFields();
      }
    } else if (key === "nhom2") {
      if (formNhomBenh2Ref.current) {
        formNhomBenh2Ref.current.resetFields();
      }
    } else if (key === "chuongBenh") {
      if (formChuongBenhRef.current) {
        formChuongBenhRef.current.resetFields();
      }
    } else if (key === "tenBenh") {
      if (formTenBenhRef.current) {
        formTenBenhRef.current.resetFields();
      }
    } else if (key === "loaiBenh") {
      if (formTypePartientRef.current) {
        formTypePartientRef.current.resetFields();
      }
    }
  };
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
    setState({
      changeCollapseStatus: true,
      collapseStatus: !state.collapseStatus,
    });
    setTimeout(() => {
      setState({
        changeCollapseStatus: false,
      });
    }, 500);
  };
  return (
  <Main>
    <BaseDm2
      breadcrumb={[
        { title: "Danh mục", link: "/danh-muc" },
        {
          title: "Danh mục nhóm bệnh tật",
          link: "/danh-muc/nhom-benh-tat",
        },
      ]}
      title={"Danh mục nhóm bệnh tật"}
    >
      <Col
        {...(activeTab === 0
          ? fullTableLayout
          : !state.showFullTable
          ? state.collapseStatus
            ? TABLE_LAYOUT_COLLAPSE
            : TABLE_LAYOUT
          : null)}
        className={`pr-3 ${
          state.changeCollapseStatus || activeTab == 0 ? "transition-ease" : ""
        }`}
      >
        <Tabs
          defaultActiveKey={activeTab}
          onChange={callback}
          className="table-tab"
        >
          <TabPane tab="Tất cả" key={0}>
            <TongHop />
          </TabPane>
          <TabPane tab="Chương bệnh" key={1}>
            <ChuongBenh
              handleChangeshowTable={handleChangeshowTable}
              showFullTable={state.showFullTable}
              collapseStatus={state.collapseStatus}
              handleCollapsePane={handleCollapsePane}
              onEdit={onEdit("chuongBenh")}
              onReset={() => onReset("chuongBenh")}
              layerId={refLayerHotKey1.current}
            />
          </TabPane>
          <TabPane tab="Nhóm bệnh chính" key={2}>
            <NhomBenhChinh
              handleChangeshowTable={handleChangeshowTable}
              showFullTable={state.showFullTable}
              collapseStatus={state.collapseStatus}
              handleCollapsePane={handleCollapsePane}
              onEdit={onEdit("nhomChinh")}
              onReset={() => onReset("nhomChinh")}
              layerId={refLayerHotKey2.current}
            />
          </TabPane>
          <TabPane tab="Nhóm bệnh phụ I" key={3}>
            <NhomBenhPhu1
              handleChangeshowTable={handleChangeshowTable}
              showFullTable={state.showFullTable}
              collapseStatus={state.collapseStatus}
              handleCollapsePane={handleCollapsePane}
              onEdit={onEdit("nhom1")}
              onReset={() => onReset("nhom1")}
              layerId={refLayerHotKey3.current}
            />
          </TabPane>
          <TabPane tab="Nhóm bệnh phụ II" key={4}>
            <NhomBenhPhu2
              handleChangeshowTable={handleChangeshowTable}
              showFullTable={state.showFullTable}
              collapseStatus={state.collapseStatus}
              handleCollapsePane={handleCollapsePane}
              onEdit={onEdit("nhom2")}
              onReset={() => onReset("nhom2")}
              layerId={refLayerHotKey4.current}
            />
          </TabPane>
          <TabPane tab="Loại bệnh" key={5}>
            <LoaiBenh
              handleChangeshowTable={handleChangeshowTable}
              showFullTable={state.showFullTable}
              collapseStatus={state.collapseStatus}
              handleCollapsePane={handleCollapsePane}
              onEdit={onEdit("loaiBenh")}
              onReset={() => onReset("loaiBenh")}
              layerId={refLayerHotKey5.current}
            />
          </TabPane>
          <TabPane tab="Tên bệnh" key={6}>
            <TenBenh
              handleChangeshowTable={handleChangeshowTable}
              showFullTable={state.showFullTable}
              collapseStatus={state.collapseStatus}
              handleCollapsePane={handleCollapsePane}
              onEdit={onEdit("tenBenh")}
              onReset={() => onReset("tenBenh")}
              layerId={refLayerHotKey6.current}
            />
          </TabPane>
        </Tabs>
      </Col>
      {!state.showFullTable && (
        <Col
          {...(state.collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
          className={`mt-3  ${
            state.changeCollapseStatus ? "transition-ease" : ""
          } `}
          style={
            state.isSelected
              ? { border: "2px solid #c1d8fd", borderRadius: 20 }
              : {}
          }
        >
          {activeTab === 1 && (
            <FormChuongBenh
              ref={formChuongBenhRef}
              layerId={refLayerHotKey1.current}
            />
          )}
          {activeTab === 2 && (
            <FormNhomBenhChinh
              ref={formNhomBenhChinhRef}
              layerId={refLayerHotKey2.current}
            />
          )}
          {activeTab === 3 && (
            <FormNhomBenhPhu1
              ref={formNhomBenh1Ref}
              layerId={refLayerHotKey3.current}
            />
          )}
          {activeTab === 4 && (
            <FormNhomBenhPhu2
              ref={formNhomBenh2Ref}
              layerId={refLayerHotKey4.current}
            />
          )}
          {activeTab === 5 && (
            <FormLoaiBenh
              ref={formTypePartientRef}
              layerId={refLayerHotKey5.current}
            />
          )}
          {activeTab === 6 && (
            <FormTenBenh
              ref={formTenBenhRef}
              layerId={refLayerHotKey6.current}
            />
          )}
        </Col>
      )}
    </BaseDm2>
  </Main>
  );
};

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = ({
  chuongBenh: { getAll: getAllChuongBenh },
  nhomBenh: { getNhomBenh, onSearch: searchNhomBenh, getAllNhomBenh },
  maBenh: { onSearch: searchTenBenh },
}) => ({
  getAllNhomBenh,
  getAllChuongBenh,
  getNhomBenh,
  searchNhomBenh,
  searchTenBenh,
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
