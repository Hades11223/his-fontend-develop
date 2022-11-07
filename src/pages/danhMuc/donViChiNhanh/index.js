import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { Col, Tabs } from "antd";
import BaseDm2 from "../BaseDm2";
import { fullTableLayout } from "./config";
import { FormChiNhanh, FormDonViYTe, ChiNhanh, DonViYTe } from "./components";
import { combineSort } from "utils";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  ADD_LAYOUT,
  TABLE_LAYOUT,
} from "constants/index";
import { SORT_DEFAULT } from "constants/index";
import stringUtils from "mainam-react-native-string-utils";

const { TabPane } = Tabs;
const DonViChiNhanh = ({
  //ChiNhanh
  pageChiNhanh,
  sizeChiNhanh,
  dataEditChiNhanhDefault,
  dataSortChiNhanh,
  dataSearchChiNhanh,
  updateDataChiNhanh,
  createOrEditChiNhanh,
  getListDonViChiNhanh,
  //DonViYTe
  dataEditDonViYTeDefault,
  createOrEditDonViYTe,
  updateDataDonViYTe,
  pageDonViYTe,
  sizeDonViYTe,
  dataSearchDonViYTe,
  dataSortDonViYTe,
  searchListDataDonViYTe,
}) => {
  const refLayerHotKey1 = useRef(stringUtils.guid());
  const refLayerHotKey2 = useRef(stringUtils.guid());
  const { onAddLayer } = useDispatch().phimTat;
  const [editStatus, setEditStatus] = useState(false);
  const formDonViYTeRef = useRef(null);
  const formChiNhanhRef = useRef(null);
  const [collapseStatus, setCollapseStatus] = useState(false);
  const url = new URL(window.location.href);
  const tab = url.searchParams.get("tab");
  const active = url.searchParams.get("active");
  const chiNhanhId = url.searchParams.get("chiNhanhId");

  const [state, _setState] = useState({
    activeTab: "1",
    dataSortColumn: SORT_DEFAULT,
    showFullTable: false,
  });

  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };

  const callback = (key) => {
    setState({ activeTab: `${parseInt(key, 10)}` });

    if (key === "1") onAddLayer({ layerId: refLayerHotKey1.current });
    else if (key === "2") onAddLayer({ layerId: refLayerHotKey2.current });
  };

  useEffect(() => {
    const sort = combineSort(state.dataSortColumn);
    const params = {
      page: pageChiNhanh,
      size: sizeChiNhanh,
      sort,
    };
    getListDonViChiNhanh(params);
    onAddLayer({ layerId: refLayerHotKey1.current });
  }, []);

  useEffect(() => {
    if (state.activeTab === "1") {
      updateDataDonViYTe({ dataSearch: {} });
      searchListDataDonViYTe({
        page: 0,
        size: 10,
        active: active ? true : "",
        chiNhanhId,
      });
    } else if (state.activeTab === "2") {
      updateDataChiNhanh({ dataSearch: {} });
      getListDonViChiNhanh({
        page: 0,
        size: 10,
        active: active ? true : "",
      });
    }
  }, [state.activeTab]);

  useEffect(() => {
    if (tab && parseInt(tab, 10)) {
      callback(tab);
    }
  }, [tab, active, chiNhanhId]);

  //handle create
  const addChiNhanh = (values) => {
    createOrEditChiNhanh({
      ...values,
      active: state.chiNhanhId ? values?.active : true,
      id: state.chiNhanhId,
    }).then(() => {
      getListDonViChiNhanh({
        page: pageChiNhanh,
        size: sizeChiNhanh,
        ...dataSearchChiNhanh,
        sort: combineSort(dataSortChiNhanh),
      });
      // formChiNhanhRef.current.resetFields();
    });
  };

  const addDonViYTe = (values) => {
    const params = {
      ...values,

      id: state.donViYTeId,
    };
    createOrEditDonViYTe(params).then(() => {
      if (!params.id) {
        updateDataDonViYTe({
          dataSort: {
            createdAt: 2,
          },
        });
      }
      searchListDataDonViYTe({
        page: pageDonViYTe,
        size: sizeDonViYTe,
        ...dataSearchDonViYTe,
        sort: combineSort(dataSortDonViYTe),
      });
      // formDonViYTeRef.current.resetFields();
    });
  };
  //handle update
  const onEditChiNhanh = (info) => {
    updateDataChiNhanh({
      dataEditDefault: info,
    });
    setState({ chiNhanhId: info?.id });
    formChiNhanhRef.current.setfields({
      info,
      chiNhanhId: info.id,
    });
  };
  const onEditDonViYTe = (info) => {
    updateDataDonViYTe({
      dataEditDefault: info,
    });
    setState({ donViYTeId: info?.id });
    formDonViYTeRef.current.setfields({
      info: {
        ...info,
        chiNhanh_id: info?.dschiNhanhId,
      },
      donViYTeId: info.id,
    });
  };
  // //handle onPage-Size
  const onChangeSizeChiNhanh = (size) => {
    const params = {
      page: pageChiNhanh,
      size,
    };
    updateDataChiNhanh(params);
    getListDonViChiNhanh({
      ...dataSearchChiNhanh,
      ...params,
      sort: combineSort(dataSortChiNhanh),
    });
  };
  const onChangePageChiNhanh = (page) => {
    const params = { page: page - 1, size: sizeChiNhanh };
    updateDataChiNhanh(params);
    getListDonViChiNhanh({
      ...dataSearchChiNhanh,
      ...params,
      sort: combineSort(dataSortChiNhanh),
    });
  };
  const onChangeSizeDonViYTe = (size) => {
    const params = {
      page: pageDonViYTe,
      size,
    };
    updateDataDonViYTe(params);
    searchListDataDonViYTe({
      ...dataSearchDonViYTe,
      ...params,
      sort: combineSort(dataSortDonViYTe),
    });
  };
  const onChangePageDonViYTe = (page) => {
    const params = { page: page - 1, size: sizeDonViYTe };
    updateDataDonViYTe(params);
    searchListDataDonViYTe({
      ...dataSearchDonViYTe,
      ...params,
      sort: combineSort(dataSortDonViYTe),
    });
  };
  // // handle onreset
  const onResetChiNhanh = () => {
    if (formChiNhanhRef.current) {
      setState({ chiNhanhId: null, editStatus: false });
      formChiNhanhRef.current.resetFields();
      updateDataChiNhanh({ dataEditDefault: null });
    }
  };
  const onResetDonViYTe = () => {
    if (formDonViYTeRef.current) {
      setState({ donViYTeId: null, editStatus: false });
      formDonViYTeRef.current.resetFields();
      updateDataDonViYTe({ dataEditDefault: null });
    }
  };
  // handle onCancel
  const onCancelUpdateChiNhanh = () => {
    if (formChiNhanhRef.current) {
      formChiNhanhRef.current.setfields({
        info: dataEditChiNhanhDefault,
        chiNhanhId: state.chiNhanhId,
      });
    }
  };
  const onCancelUpdateDonViYTe = () => {
    if (formDonViYTeRef.current) {
      formDonViYTeRef.current.setfields({
        info: dataEditDonViYTeDefault,
        donViYTeId: state.donViYTeId,
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
    setCollapseStatus(!collapseStatus);
  };
  return (
    <BaseDm2
      breadcrumb={[
        { title: "Danh mục", link: "/danh-muc" },
        {
          title: "Danh mục đơn vị - chi nhánh",
          link: "/danh-muc/don-vi-chi-nhanh",
        },
      ]}
      title={"Danh mục đơn vị - chi nhánh"}
    >
      <Col
        {...(state.activeTab === "0"
          ? fullTableLayout
          : !state.showFullTable
          ? collapseStatus
            ? TABLE_LAYOUT_COLLAPSE
            : TABLE_LAYOUT
          : null)}
        className={`pr-3 ${state.changeShowFullTbale ? "" : "transition-ease"}`}
      >
        <Tabs
          activeKey={state.activeTab}
          defaultActiveKey={state.activeTab}
          onChange={callback}
          className="table-tab"
        >
          <TabPane tab="Đon vị y tế" key="1">
            <DonViYTe
              handleChangeshowTable={handleChangeshowTable}
              showFullTable={state.showFullTable}
              collapseStatus={collapseStatus}
              handleCollapsePane={handleCollapsePane}
              onPageChange={onChangePageDonViYTe}
              onSizeChange={onChangeSizeDonViYTe}
              onEdit={onEditDonViYTe}
              onReset={onResetDonViYTe}
              setStateParent={setState}
              layerId={refLayerHotKey1.current}
            />
          </TabPane>
          <TabPane tab="Chi nhánh" key="2">
            <ChiNhanh
              handleChangeshowTable={handleChangeshowTable}
              showFullTable={state.showFullTable}
              collapseStatus={collapseStatus}
              handleCollapsePane={handleCollapsePane}
              onEdit={onEditChiNhanh}
              onSizeChange={onChangeSizeChiNhanh}
              onPageChange={onChangePageChiNhanh}
              onReset={onResetChiNhanh}
              setStateParent={setState}
              layerId={refLayerHotKey2.current}
            />
          </TabPane>
        </Tabs>
      </Col>
      {!state.showFullTable && (
        <Col
          {...(collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
          className="mt-3 transition-ease"
          style={
            state.isSelected
              ? { border: "2px solid #c1d8fd", borderRadius: 20 }
              : {}
          }
        >
          {state.activeTab === "1" && (
            <FormDonViYTe
              handleSubmit={addDonViYTe}
              ref={formDonViYTeRef}
              onCancel={onCancelUpdateDonViYTe}
              editStatus={state.editStatus}
              layerId={refLayerHotKey1.current}
            />
          )}
          {state.activeTab === "2" && (
            <FormChiNhanh
              handleSubmit={addChiNhanh}
              ref={formChiNhanhRef}
              onCancel={onCancelUpdateChiNhanh}
              dataSearch={dataSearchChiNhanh}
              editStatus={state.editStatus}
              layerId={refLayerHotKey2.current}
            />
          )}
        </Col>
      )}
    </BaseDm2>
  );
};

const mapStateToProps = (state) => ({
  //donViYTe
  dataEditChiNhanhDefault: state.chiNhanh.dataEditDefault,
  pageChiNhanh: state.chiNhanh.page,
  sizeChiNhanh: state.chiNhanh.size,
  dataSearchChiNhanh: state.chiNhanh.dataSearch,
  dataSortChiNhanh: state.chiNhanh.dataSort,
  //ChiNhanh
  dataEditDonViYTeDefault: state.donViYTe.dataEditDefault,
  pageDonViYTe: state.donViYTe.page,
  sizeDonViYTe: state.donViYTe.size,
  dataSearchDonViYTe: state.donViYTe.dataSearch,
  dataSortDonViYTe: state.donViYTe.dataSort,
});
const mapDispatchToProps = ({
  chiNhanh: {
    updateData: updateDataChiNhanh,
    createOrEdit: createOrEditChiNhanh,
    getListDonViChiNhanh,
  },
  donViYTe: {
    updateData: updateDataDonViYTe,
    createOrEdit: createOrEditDonViYTe,
    search: searchListDataDonViYTe,
  },
}) => ({
  updateDataDonViYTe,
  updateDataChiNhanh,
  createOrEditChiNhanh,
  getListDonViChiNhanh,
  createOrEditDonViYTe,
  searchListDataDonViYTe,
});

export default connect(mapStateToProps, mapDispatchToProps)(DonViChiNhanh);
