import React, { useEffect, useState, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { Col, Tabs } from "antd";
import { fullTableLayout } from "./config";
import {
  FormNguoiGioiThieu,
  FormNguonNguoiBenh,
  NguoiGioiThieu,
  NguonNguoiBenh,
} from "./components";
import { combineSort } from "utils";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  ADD_LAYOUT,
  TABLE_LAYOUT,
} from "constants/index";
import { SORT_DEFAULT } from "constants/index";
import stringUtils from "mainam-react-native-string-utils";
import BaseDm2 from "../BaseDm2";
import { Main } from "./styled";

const { TabPane } = Tabs;
const NguonGioiThieu = ({
  //nguonNguoiBenh
  pageNguonNguoiBenh,
  sizeNguonNguoiBenh,
  listAllNguonNguoiBenh,
  dataEditNguonNguoiBenhDefault,
  dataSortNguonNguoiBenh,
  dataSearchNguonNguoiBenh,
  updateDataNguonNguoiBenh,
  createOrEditNguonNguoiBenh,
  searchListNguonNguoiBenh,
  getListAllNguonNguoiBenh,
  //nguoiGioiThieu
  dataEditNguoiGioiThieuDefault,
  createOrEditNguoiGioiThieu,
  updateDataNguoiGioiThieu,
  pageNguoiGioiThieu,
  sizeNguoiGioiThieu,
  dataSearchNguoiGioiThieu,
  dataSortNguoiGioiThieu,
  searchListNguoiGioiThieu,
}) => {
  const refLayerHotKey1 = useRef(stringUtils.guid());
  const refLayerHotKey2 = useRef(stringUtils.guid());
  const { onAddLayer } = useDispatch().phimTat;
  const [editStatus, setEditStatus] = useState(false);
  const formNguoiGioiThieuRef = useRef(null);
  const formNguonNguoiBenhRef = useRef(null);
  const [collapseStatus, setCollapseStatus] = useState(false);
  const url = new URL(window.location.href);
  const tab = url.searchParams.get("tab");
  const active = url.searchParams.get("active");
  const nguonNbId = url.searchParams.get("nguonNbId");

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
      page: pageNguonNguoiBenh,
      size: sizeNguonNguoiBenh,
      sort,
    };
    searchListNguonNguoiBenh(params);
    onAddLayer({ layerId: refLayerHotKey1.current });
  }, []);

  useEffect(() => {
    if (state.activeTab === "1") {
      updateDataNguoiGioiThieu({ dataSearch: {} });
      searchListNguoiGioiThieu({
        page: 0,
        size: 10,
        active: active ? true : "",
        nguonNbId,
      });
    } else if (state.activeTab === "2") {
      updateDataNguonNguoiBenh({ dataSearch: {} });
      searchListNguonNguoiBenh({
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
  }, [tab, active, nguonNbId]);

  //handle create
  const addNguonNguoiBenh = (values) => {
    createOrEditNguonNguoiBenh({
      ...values,
      nguoiGioiThieu:
        values?.nguoiGioiThieu != undefined ? values?.nguoiGioiThieu : false,
      active: state.nguonNguoiBenhId ? values?.active : true,
      id: state.nguonNguoiBenhId,
    }).then(() => {
      searchListNguonNguoiBenh({
        page: pageNguonNguoiBenh,
        size: sizeNguonNguoiBenh,
        ...dataSearchNguonNguoiBenh,
        sort: combineSort(dataSortNguonNguoiBenh),
      });
      getListAllNguonNguoiBenh({});
      // formNguonNguoiBenhRef.current.resetFields();
    });
  };

  const addNguoiGioiThieu = (values) => {
    const { nguon_nb_id, ...restValues } = values;
    const dsNguonNb = listAllNguonNguoiBenh?.filter((item) =>
      nguon_nb_id?.includes(item?.id)
    );
    const dsActiveNguonNb = dsNguonNb?.filter((item) => item?.active);
    const params = {
      ...restValues,
      dsNguonNb,
      dsNguonNbId: nguon_nb_id,
      active: !state.nguoiGioiThieuId
        ? dsActiveNguonNb?.length > 0
          ? true
          : false
        : values?.active,
      id: state.nguoiGioiThieuId,
    };
    createOrEditNguoiGioiThieu(params).then(() => {
      if (!params.id) {
        updateDataNguoiGioiThieu({
          dataSort: {
            createdAt: 2,
          },
        });
      }
      searchListNguoiGioiThieu({
        page: pageNguoiGioiThieu,
        size: sizeNguoiGioiThieu,
        ...dataSearchNguoiGioiThieu,
        sort: combineSort(dataSortNguoiGioiThieu),
      });
      getListAllNguonNguoiBenh({});
      // formNguoiGioiThieuRef.current.resetFields();
    });
  };
  //handle update
  const onEditNguonNguoiBenh = (info) => {
    updateDataNguonNguoiBenh({
      dataEditDefault: info,
    });
    setState({ nguonNguoiBenhId: info?.id });
    formNguonNguoiBenhRef.current.setfields({
      info,
      nguonNguoiBenhId: info.id,
    });
  };
  const onEditNguoiGioiThieu = (info) => {
    updateDataNguoiGioiThieu({
      dataEditDefault: info,
    });
    setState({ nguoiGioiThieuId: info?.id });
    formNguoiGioiThieuRef.current.setfields({
      info: {
        ...info,
        nguon_nb_id: info?.dsNguonNbId,
      },
      nguoiGioiThieuId: info.id,
    });
  };
  // //handle onPage-Size
  const onChangeSizeNguonNguoiBenh = (size) => {
    const params = {
      page: pageNguonNguoiBenh,
      size,
    };
    updateDataNguonNguoiBenh(params);
    searchListNguonNguoiBenh({
      ...dataSearchNguonNguoiBenh,
      ...params,
      sort: combineSort(dataSortNguonNguoiBenh),
    });
  };
  const onChangePageNguonNguoiBenh = (page) => {
    const params = { page: page - 1, size: sizeNguonNguoiBenh };
    updateDataNguonNguoiBenh(params);
    searchListNguonNguoiBenh({
      ...dataSearchNguonNguoiBenh,
      ...params,
      sort: combineSort(dataSortNguonNguoiBenh),
    });
  };
  const onChangeSizeNguoiGioiThieu = (size) => {
    const params = {
      page: pageNguoiGioiThieu,
      size,
    };
    updateDataNguoiGioiThieu(params);
    searchListNguoiGioiThieu({
      ...dataSearchNguoiGioiThieu,
      ...params,
      sort: combineSort(dataSortNguoiGioiThieu),
    });
  };
  const onChangePageNguoiGioiThieu = (page) => {
    const params = { page: page - 1, size: sizeNguoiGioiThieu };
    updateDataNguoiGioiThieu(params);
    searchListNguoiGioiThieu({
      ...dataSearchNguoiGioiThieu,
      ...params,
      sort: combineSort(dataSortNguoiGioiThieu),
    });
  };
  // // handle onreset
  const onResetNguonNguoiBenh = () => {
    if (formNguonNguoiBenhRef.current) {
      setState({ nguonNguoiBenhId: null, editStatus: false });
      formNguonNguoiBenhRef.current.resetFields();
      updateDataNguonNguoiBenh({ dataEditDefault: null });
    }
  };
  const onResetNguoiGioiThieu = () => {
    if (formNguoiGioiThieuRef.current) {
      setState({ nguoiGioiThieuId: null, editStatus: false });
      formNguoiGioiThieuRef.current.resetFields();
      updateDataNguoiGioiThieu({ dataEditDefault: null });
    }
  };
  // handle onCancel
  const onCancelUpdateNguonNguoiBenh = () => {
    if (formNguonNguoiBenhRef.current) {
      formNguonNguoiBenhRef.current.setfields({
        info: dataEditNguonNguoiBenhDefault,
        nguonNguoiBenhId: state.nguonNguoiBenhId,
      });
    }
  };
  const onCancelUpdateNguoiGioiThieu = () => {
    if (formNguoiGioiThieuRef.current) {
      formNguoiGioiThieuRef.current.setfields({
        info: dataEditNguoiGioiThieuDefault,
        nguoiGioiThieuId: state.nguoiGioiThieuId,
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
  <Main>
    <BaseDm2
      breadcrumb={[
        { title: "Danh mục", link: "/danh-muc" },
        {
          title: "Danh mục nguồn người bệnh",
          link: "/danh-muc/nguon-nguoi-benh",
        },
      ]}
      title={"Danh mục nguồn người bệnh"}
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
          <TabPane tab="Người giới thiệu" key="1">
            <NguoiGioiThieu
              handleChangeshowTable={handleChangeshowTable}
              showFullTable={state.showFullTable}
              collapseStatus={collapseStatus}
              handleCollapsePane={handleCollapsePane}
              onPageChange={onChangePageNguoiGioiThieu}
              onSizeChange={onChangeSizeNguoiGioiThieu}
              onEdit={onEditNguoiGioiThieu}
              onReset={onResetNguoiGioiThieu}
              setStateParent={setState}
              layerId={refLayerHotKey1.current}
            />
          </TabPane>
          <TabPane tab="Nguồn người bệnh" key="2">
            <NguonNguoiBenh
              handleChangeshowTable={handleChangeshowTable}
              showFullTable={state.showFullTable}
              collapseStatus={collapseStatus}
              handleCollapsePane={handleCollapsePane}
              onEdit={onEditNguonNguoiBenh}
              onSizeChange={onChangeSizeNguonNguoiBenh}
              onPageChange={onChangePageNguonNguoiBenh}
              onReset={onResetNguonNguoiBenh}
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
            <FormNguoiGioiThieu
              handleSubmit={addNguoiGioiThieu}
              ref={formNguoiGioiThieuRef}
              onCancel={onCancelUpdateNguoiGioiThieu}
              editStatus={state.editStatus}
              layerId={refLayerHotKey1.current}
            />
          )}
          {state.activeTab === "2" && (
            <FormNguonNguoiBenh
              handleSubmit={addNguonNguoiBenh}
              ref={formNguonNguoiBenhRef}
              onCancel={onCancelUpdateNguonNguoiBenh}
              dataSearch={dataSearchNguonNguoiBenh}
              editStatus={state.editStatus}
              layerId={refLayerHotKey2.current}
            />
          )}
        </Col>
      )}
    </BaseDm2>
  </Main>
  );
};

const mapStateToProps = (state) => ({
  //nguonNguoiBenh
  listAllNguonNguoiBenh: state.nguonNguoiBenh.listAllNguonNguoiBenh,
  dataEditNguonNguoiBenhDefault: state.nguonNguoiBenh.dataEditDefault,
  pageNguonNguoiBenh: state.nguonNguoiBenh.page,
  sizeNguonNguoiBenh: state.nguonNguoiBenh.size,
  dataSearchNguonNguoiBenh: state.nguonNguoiBenh.dataSearch,
  dataSortNguonNguoiBenh: state.nguonNguoiBenh.dataSort,
  //nguoiGioiThieu
  dataEditNguoiGioiThieuDefault: state.nguoiGioiThieu.dataEditDefault,
  pageNguoiGioiThieu: state.nguoiGioiThieu.page,
  sizeNguoiGioiThieu: state.nguoiGioiThieu.size,
  dataSearchNguoiGioiThieu: state.nguoiGioiThieu.dataSearch,
  dataSortNguoiGioiThieu: state.nguoiGioiThieu.dataSort,
});
const mapDispatchToProps = ({
  nguonNguoiBenh: {
    updateData: updateDataNguonNguoiBenh,
    createOrEdit: createOrEditNguonNguoiBenh,
    search: searchListNguonNguoiBenh,
    getListAllNguonNguoiBenh,
  },
  nguoiGioiThieu: {
    updateData: updateDataNguoiGioiThieu,
    createOrEdit: createOrEditNguoiGioiThieu,
    search: searchListNguoiGioiThieu,
  },
}) => ({
  updateDataNguoiGioiThieu,
  updateDataNguonNguoiBenh,
  createOrEditNguonNguoiBenh,
  searchListNguonNguoiBenh,
  getListAllNguonNguoiBenh,
  createOrEditNguoiGioiThieu,
  searchListNguoiGioiThieu,
});

export default connect(mapStateToProps, mapDispatchToProps)(NguonGioiThieu);
