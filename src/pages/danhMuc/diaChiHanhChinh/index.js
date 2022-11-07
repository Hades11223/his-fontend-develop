import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router";
import { connect, useDispatch } from "react-redux";
import { Col, Tabs } from "antd";
import BaseDm2 from "../BaseDm2";
import { fullTableLayout } from "./config";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  ADD_LAYOUT,
  TABLE_LAYOUT,
} from "constants/index";
import { Main } from "./styled"
import {
  Tinh,
  QuocGia,
  Huyen,
  FormQuocGia,
  FormTinh,
  FormHuyen,
  XaPhuong,
  FormXaPhuong,
} from "./components";
import { combineSort } from "utils";
import stringUtils from "mainam-react-native-string-utils";

const { TabPane } = Tabs;
const DiaChiHanhChinh = ({
  pageQuocGia,
  sizeQuocGia,
  totalQuocGia,
  dataEditQuocGiaDefault,
  datagetListQuocGia,
  dataSortQuocGia,
  // group 2
  listTinh,
  totalTinh,
  pageTinh,
  sizeTinh,
  dataEditTinhDefault,
  dataSearchTinh,
  dataSortTinh,
  //
  dataEditQuanHuyenDefault,
  updateData,
  createOrEditQuanHuyen,
  createOrEditQuocGia,
  createOrEditTinh,
  createOrEditXaPhuong,
  searchTinh,
  getListQuocGia,
  dataEditXaPhuongDefault,
  //
  getListAllQuocGia,
  huyenTongHopDataSearch,
  xaTongHopDataSearch,
  updateDataXaTongHop,
}) => {
  const refLayerHotKey1 = useRef(stringUtils.guid());
  const refLayerHotKey2 = useRef(stringUtils.guid());
  const refLayerHotKey3 = useRef(stringUtils.guid());
  const refLayerHotKey4 = useRef(stringUtils.guid());
  const { onAddLayer } = useDispatch().phimTat;

  const [editStatus, setEditStatus] = useState(false);
  const [activeTab, setActiveTab] = useState("0");
  const [quocGiaId, setQuocGiaId] = useState(null);
  const [tinhId, setTinhId] = useState(null);
  const [editQuanHuyenId, setQuanHuyenId] = useState(null);
  const [editXaPhuongId, setXaPhuongId] = useState(null);
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [state, _setState] = useState({
    showFullTable: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { push } = useHistory();
  // const [dataEditQuanHuyenDefault, setdataEditQuanHuyenDefault] = useState(
  //   null
  // );
  // const [dataEditXaPhuongDefault, setdataEditXaPhuongDefault] = useState(null);
  const formQuocGiaRef = useRef(null);
  const formTinhRef = useRef(null);
  const formQuanHuyenRef = useRef(null);
  const formXaPhuongRef = useRef(null);

  const url = new URL(window.location.href);
  const mode = url.searchParams.get("level");

  useEffect(() => {
    if (mode) setActiveTab(mode);
  }, [mode]);

  const callback = (key) => {
    push("/danh-muc/dia-chi-hanh-chinh");
    let mode = parseInt(key, 10);
    setActiveTab(`${mode}`);

    if (key === "1") onAddLayer({ layerId: refLayerHotKey1.current });
    else if (key === "2") onAddLayer({ layerId: refLayerHotKey2.current });
    else if (key === "3") onAddLayer({ layerId: refLayerHotKey3.current });
    else if (key === "4") onAddLayer({ layerId: refLayerHotKey4.current });
  };
  useEffect(() => {
    getListAllQuocGia();
  }, []);
  useEffect(() => {
    if (activeTab === "2") {
      updateData({
        dataSearchTinh: {},
      });
    }
    if (activeTab === "0") {
      updateDataXaTongHop({
        dataSortColumn: { active: 2 },
      });
    } else if (activeTab === "4") {
      updateDataXaTongHop({
        dataSortColumn: { active: 2 },
        page: 0,
        size: 10,
      });
    }
  }, [activeTab]);
  const addQuocGia = (values) => {
    createOrEditQuocGia({ ...values, id: quocGiaId })
      .then(() => {
        getListQuocGia({
          pageQuocGia,
          sizeQuocGia,
          ...datagetListQuocGia,
          sort: combineSort(delete dataSortQuocGia.createdAt),
        });
        // formQuocGiaRef.current.resetFields();
      })
      .catch((err) => console.error(err));
  };
  const addQuanHuyen = (values) => {
    createOrEditQuanHuyen({ ...values, id: editQuanHuyenId })
      .then(() => {
        // formQuanHuyenRef.current.resetFields({ data: huyenTongHopDataSearch });
      })
      .catch((err) => console.error(err));
  };
  const addTinh = (values) => {
    createOrEditTinh({ ...values, id: tinhId })
      .then(() => {
        searchTinh({
          pageTinh,
          sizeTinh,
          ...dataSearchTinh,
          sort: combineSort(delete dataSortTinh.createdAt),
        });
        // formTinhRef.current.resetFields({ data: dataSearchTinh });
      })
      .catch((err) => console.error(err));
  };
  const addXaPhuong = (values) => {
    createOrEditXaPhuong({ ...values, id: editXaPhuongId })
      .then(() => {
        // formXaPhuongRef.current.resetFields({ data: xaTongHopDataSearch });
      })
      .catch((err) => console.error(err));
  };

  const onEditQuocGia = (info) => {
    updateData({
      dataEditQuocGiaDefault: info,
    });
    setQuocGiaId(info.id);
    formQuocGiaRef.current.setfields({
      info,
      quocGiaId: info.id,
    });
  };

  const onEditTinh = (info) => {
    updateData({
      dataEditTinhDefault: info,
    });
    setTinhId(info.id);
    formTinhRef.current.setfields({ info, tinhId: info.id });
  };
  const onEditQuanHuyen = (info) => {
    // setdataEditQuanHuyenDefault(info);
    updateData({
      dataEditQuanHuyenDefault: info,
    });
    setQuanHuyenId(info.id);
    formQuanHuyenRef.current.setfields({ info, editQuanHuyenId: info.id });
  };
  const onEditXaPhuong = (info) => {
    updateData({ dataEditXaPhuongDefault: info });
    // setdataEditXaPhuongDefault(info);
    setXaPhuongId(info.id);
    formXaPhuongRef.current.setfields({ info, editXaPhuongId: info.id });
  };
  //handle onPage-Size
  const onSizeChangeQuocGia = (size) => {
    const params = {
      pageQuocGia,
      sizeQuocGia: size,
    };
    updateData(params);
    getListQuocGia({
      ...params,
      ...datagetListQuocGia,
      sort: combineSort(dataSortQuocGia),
    });
  };
  const onChangePageQuocGia = (page) => {
    const params = { pageQuocGia: page - 1, sizeQuocGia };
    updateData(params);
    getListQuocGia({
      ...params,
      ...datagetListQuocGia,
      sort: combineSort(dataSortQuocGia),
    });
  };
  const onSizeChangeTinh = (size) => {
    const params = { pageTinh, sizeTinh: size };
    updateData(params);
    searchTinh({
      ...params,
      ...dataSearchTinh,
      sort: combineSort(dataSortTinh),
    });
  };

  const onChangePageTinh = (page) => {
    const params = { pageTinh: page - 1, sizeTinh };
    updateData(params);
    searchTinh({
      ...params,
      ...dataSearchTinh,
      sort: combineSort(dataSortTinh),
    });
  };
  // handle onreset
  const onResetTinh = () => {
    if (formTinhRef.current) {
      setEditStatus(false);
      setTinhId(null);
      formTinhRef.current.resetFields();
      updateData({ dataEditTinhDefault: null });
    }
  };
  const onResetXaPhuong = () => {
    if (formXaPhuongRef.current) {
      setEditStatus(false);
      setXaPhuongId(null);
      formXaPhuongRef.current.resetFields();
      updateData({ dataEditXaPhuongDefault: null });
    }
  };
  const onResetQuocGia = () => {
    if (formQuocGiaRef.current) {
      setQuocGiaId(null);
      setEditStatus(false);
      formQuocGiaRef.current.resetFields();
      updateData({ dataEditQuocGiaDefault: null });
    }
  };
  const onResetQuanHuyen = () => {
    if (formQuanHuyenRef.current) {
      setEditStatus(false);
      setQuanHuyenId(null);
      formQuanHuyenRef.current.resetFields();
      updateData({ dataEditQuanHuyenDefault: null });
    }
  };
  // handle onCancel
  const onCancelUpdateQuanHuyen = () => {
    if (formQuanHuyenRef.current) {
      formQuanHuyenRef.current.setfields({
        info: dataEditQuanHuyenDefault,
        editQuanHuyenId,
      });
    }
  };
  const onCancelUpdateTinh = () => {
    if (formTinhRef.current) {
      formTinhRef.current.setfields({
        info: dataEditTinhDefault,
        tinhId,
      });
    }
  };
  const onCancelUpdateXaPhuong = () => {
    if (formXaPhuongRef.current) {
      formXaPhuongRef.current.setfields({
        info: dataEditXaPhuongDefault,
        editXaPhuongId,
      });
    }
  };

  const onCancelUpdateQuocGia = () => {
    if (formQuocGiaRef.current) {
      formQuocGiaRef.current.setfields({
        info: dataEditQuocGiaDefault,
        quocGiaId,
      });
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
          title: "Danh mục địa chỉ hành chính",
          link: "/danh-muc/dia-chi-hanh-chinh",
        },
      ]}
      title={"Danh mục địa chỉ hành chính"}
    >
      <Col
        {...(activeTab === "0"
          ? fullTableLayout
          : !state.showFullTable
          ? state.collapseStatus
            ? TABLE_LAYOUT_COLLAPSE
            : TABLE_LAYOUT
          : null)}
        className={`pr-3 ${
          state.changeCollapseStatus ? "transition-ease" : ""
        }`}
      >
        <Tabs
          defaultActiveKey={activeTab}
          activeKey={activeTab}
          onChange={callback}
          className="table-tab"
        >
          <TabPane tab="Tất cả" key="0">
            <XaPhuong />
          </TabPane>
          <TabPane tab="Quốc gia" key="1">
            <QuocGia
              handleChangeshowTable={handleChangeshowTable}
              sortData={dataSortQuocGia}
              showFullTable={state.showFullTable}
              collapseStatus={state.collapseStatus}
              handleCollapsePane={handleCollapsePane}
              page={pageQuocGia}
              size={sizeQuocGia}
              onEditQuocGia={onEditQuocGia}
              onSizeChange={onSizeChangeQuocGia}
              onPageChange={onChangePageQuocGia}
              total={totalQuocGia}
              updateData={updateData}
              onReset={onResetQuocGia}
              setEditStatus={setEditStatus}
              layerId={refLayerHotKey1.current}
            />
          </TabPane>
          <TabPane tab="Tỉnh/TP" key="2">
            <Tinh
              handleChangeshowTable={handleChangeshowTable}
              sortData={dataSortQuocGia}
              showFullTable={state.showFullTable}
              collapseStatus={state.collapseStatus}
              handleCollapsePane={handleCollapsePane}
              listTinh={listTinh}
              searchTinh={searchTinh}
              pageTinh={pageTinh}
              sizeTinh={sizeTinh}
              onEditTinh={onEditTinh}
              page={pageTinh}
              size={sizeTinh}
              total={totalTinh}
              onSizeChange={onSizeChangeTinh}
              onPageChange={onChangePageTinh}
              onReset={onResetTinh}
              updateData={updateData}
              dataSearch={dataSearchTinh}
              sortData={dataSortTinh}
              setEditStatus={setEditStatus}
              layerId={refLayerHotKey2.current}
            />
          </TabPane>
          <TabPane tab="Quận/huyện" key="3">
            <Huyen
              handleChangeshowTable={handleChangeshowTable}
              sortData={dataSortQuocGia}
              showFullTable={state.showFullTable}
              collapseStatus={state.collapseStatus}
              handleCollapsePane={handleCollapsePane}
              onReset={onResetQuanHuyen}
              onEditQuanHuyen={onEditQuanHuyen}
              setEditStatus={setEditStatus}
              layerId={refLayerHotKey3.current}
            />
          </TabPane>
          <TabPane tab="Xã/Phường" key="4">
            <XaPhuong
              handleChangeshowTable={handleChangeshowTable}
              sortData={dataSortQuocGia}
              showFullTable={state.showFullTable}
              collapseStatus={state.collapseStatus}
              handleCollapsePane={handleCollapsePane}
              onEditXaPhuong={onEditXaPhuong}
              onReset={onResetXaPhuong}
              type="xaPhuong"
              setEditStatus={setEditStatus}
              layerId={refLayerHotKey4.current}
            />
          </TabPane>
        </Tabs>
      </Col>
      {!state.showFullTable && (
        <Col
          {...(state.collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
          className={`mt-3  ${
            state.changeCollapseStatus ? "transition-ease" : ""
          }`}
          style={
            state.isSelected
              ? { border: "2px solid #c1d8fd", borderRadius: 20 }
              : {}
          }
        >
          {activeTab === "1" && (
            <FormQuocGia
              handleSubmit={addQuocGia}
              ref={formQuocGiaRef}
              onCancel={onCancelUpdateQuocGia}
              editStatus={editStatus}
              layerId={refLayerHotKey1.current}
            />
          )}
          {activeTab === "2" && (
            <FormTinh
              handleSubmit={addTinh}
              ref={formTinhRef}
              onCancel={onCancelUpdateTinh}
              dataSearch={dataSearchTinh}
              editStatus={editStatus}
              layerId={refLayerHotKey2.current}
            />
          )}
          {activeTab === "3" && (
            <FormHuyen
              handleSubmit={addQuanHuyen}
              ref={formQuanHuyenRef}
              onCancel={onCancelUpdateQuanHuyen}
              dataSearch={huyenTongHopDataSearch}
              editStatus={editStatus}
              layerId={refLayerHotKey3.current}
            />
          )}
          {activeTab === "4" && (
            <FormXaPhuong
              handleSubmit={addXaPhuong}
              ref={formXaPhuongRef}
              onCancel={onCancelUpdateXaPhuong}
              dataSearch={xaTongHopDataSearch}
              editStatus={editStatus}
              layerId={refLayerHotKey4.current}
            />
          )}
        </Col>
      )}
    </BaseDm2>
  </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    ttHanhChinh: {
      pageQuocGia,
      sizeQuocGia,
      totalQuocGia,
      dataEditQuocGiaDefault,
      datagetListQuocGia,
      dataSortQuocGia,
      //
      listTinh,
      totalTinh,
      pageTinh,
      sizeTinh,
      dataEditTinhDefault,
      dataSearchTinh,
      dataSortTinh,
      //
      dataEditQuanHuyenDefault,
      dataEditXaPhuongDefault,
    },
    huyenTongHop: { dataSearch: huyenTongHopDataSearch },
    xaTongHop: { dataSearch: xaTongHopDataSearch },
  } = state;

  return {
    pageQuocGia,
    sizeQuocGia,
    totalQuocGia,

    dataEditQuocGiaDefault,
    datagetListQuocGia,
    dataSortQuocGia,
    // group 2
    listTinh,
    totalTinh,
    pageTinh,
    sizeTinh,
    dataEditTinhDefault,
    dataSearchTinh,
    dataSortTinh,
    // group 3
    dataEditQuanHuyenDefault,
    dataEditXaPhuongDefault,
    //utils
    huyenTongHopDataSearch,
    xaTongHopDataSearch,
  };
};
const mapDispatchToProps = ({ ttHanhChinh, xaTongHop, address }) => ({
  updateData: ttHanhChinh.updateData,
  //
  getListQuocGia: ttHanhChinh.getListQuocGia,
  createOrEditQuocGia: ttHanhChinh.createOrEditQuocGia,
  //
  searchTinh: ttHanhChinh.searchTinh,
  createOrEditTinh: ttHanhChinh.createOrEditTinh,
  //
  searchQuanHuyen: ttHanhChinh.searchQuanHuyen,
  createOrEditQuanHuyen: ttHanhChinh.createOrEditQuanHuyen,
  //
  searchXaPhuong: ttHanhChinh.searchXaPhuong,
  createOrEditXaPhuong: ttHanhChinh.createOrEditXaPhuong,
  //
  getListHuyen: ttHanhChinh.getListHuyen,
  getListTinh: ttHanhChinh.getListTinh,
  getListAllQuocGia: ttHanhChinh.getListAllQuocGia,
  //
  updateDataXaTongHop: xaTongHop.updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(DiaChiHanhChinh);
