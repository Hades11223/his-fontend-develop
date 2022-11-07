import React, { useState, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { Col, Tabs } from "antd";
import { fullTableLayout } from "./config";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  ADD_LAYOUT,
  TABLE_LAYOUT,
} from "constants/index";
import { Main } from "./styled"
import {
  TongHop,
  ChuongTrinh,
  FormChuongTrinh,
  Voucher,
  FormVoucher,
} from "./components";
import { combineSort } from "utils";
import stringUtils from "mainam-react-native-string-utils";
import BaseDm2 from "../BaseDm2";
const { TabPane } = Tabs;

const Index = ({
  //ChuongTrinh
  getListChuongTrinhGiamGia,
  dataEditChuongTrinhDefault,
  updateDataChuongTrinhGiamGia,
  dataSearchChuongTrinhGiamGia,
  dataSortChuongTrinhGiamGia,
  createOrEditChuongTrinhGiamGia,
  pageChuongTrinhGiamGia,
  sizeChuongTrinhGiamGia,
  totalChuongTrinhGiamGia,

  //Voucher
  getListVoucher,
  dataEditVoucherDefault,
  createOrEditVoucher,
  dataSearchVoucher,
  dataSortVoucher,
  updateDataVoucher,
  pageVoucher,
  sizeVoucher,
  totalVoucher,
  createMultipleVoucher,
}) => {
  const refLayerHotKey1 = useRef(stringUtils.guid());
  const refLayerHotKey2 = useRef(stringUtils.guid());
  const { onAddLayer } = useDispatch().phimTat;
  const [editStatus, setEditStatus] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [chuongTrinhId, setChuongTrinhId] = useState(null);
  const [voucherId, setVoucherId] = useState(null);
  const formChuongTrinh = useRef(null);
  const formVoucher = useRef(null);
  const [edited, setEdited] = useState(false);
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [state, _setState] = useState({
    showFullTable: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const callback = (key) => {
    setActiveTab(parseInt(key, 10));

    if (key === "1") onAddLayer({ layerId: refLayerHotKey1.current });
    else if (key === "2") onAddLayer({ layerId: refLayerHotKey2.current });
  };

  //-----------------------Chuong Trinh-----------------------
  const onSizeChangeTabChuongTrinh = (size) => {
    const params = {
      page: pageChuongTrinhGiamGia,
      size: size,
    };
    updateDataChuongTrinhGiamGia(params);
    getListChuongTrinhGiamGia({
      ...params,
      ...dataSearchChuongTrinhGiamGia,
      sort: combineSort(dataSortChuongTrinhGiamGia),
    });
  };

  const onChangePageTabChuongTrinh = (page) => {
    const params = { page: page - 1, size: sizeChuongTrinhGiamGia };
    updateDataChuongTrinhGiamGia(params);
    getListChuongTrinhGiamGia({
      ...params,
      ...dataSearchChuongTrinhGiamGia,
      sort: combineSort(dataSortChuongTrinhGiamGia),
    });
  };

  const onSaveChuongTrinh = (values) => {
    values.tuNgay = values.tuNgay?.format("YYYY-MM-DD");
    values.denNgay = values.denNgay?.format("YYYY-MM-DD");
    createOrEditChuongTrinhGiamGia({ ...values, id: chuongTrinhId })
      .then(() => {
        getListChuongTrinhGiamGia({
          page: pageChuongTrinhGiamGia,
          size: sizeChuongTrinhGiamGia,
          ...dataSearchChuongTrinhGiamGia,
          sort: combineSort(dataSortChuongTrinhGiamGia),
        });
        setEdited(false);
      })
      .catch((err) => console.error(err));
  };

  const onEditChuongTrinh = (info) => {
    updateDataChuongTrinhGiamGia({ dataEditDefault: info });
    setChuongTrinhId(info.id);
    formChuongTrinh.current.setfields({
      info,
      chuongTrinhGiamGiaId: info.id,
    });
  };

  const onCancelChuongTrinh = () => {
    if (formChuongTrinh.current) {
      setEdited(false);
      formChuongTrinh.current.setfields({
        info: dataEditChuongTrinhDefault,
        chuongTrinhId,
      });
    }
  };

  const onResetChuongTrinh = () => {
    if (formChuongTrinh.current) {
      setEditStatus(false);
      setChuongTrinhId(null);
      formChuongTrinh.current.resetFields();
    }
  };

  const onFieldsChangeForm = () => {
    setEdited(true);
  };

  //---------------Voucher-----------------
  const onSizeChangeTabVoucher = (size) => {
    const params = {
      page: pageVoucher,
      size: size,
    };
    updateDataVoucher(params);
    getListVoucher({
      ...params,
      ...dataSearchVoucher,
      sort: combineSort(dataSortVoucher),
    });
  };

  const onChangePageTabVoucher = (page) => {
    const params = { page: page - 1, size: sizeVoucher };
    updateDataVoucher(params);
    getListVoucher({
      ...params,
      ...dataSearchVoucher,
      sort: combineSort(dataSortVoucher),
    });
  };

  const onSaveVoucher = (values) => {
    createOrEditVoucher({ ...values, id: voucherId })
      .then(() => {
        getListVoucher({
          page: pageVoucher,
          size: sizeVoucher,
          ...dataSearchVoucher,
          sort: combineSort(dataSortVoucher),
        });
        setEdited(false);
      })
      .catch((err) => console.error(err));
  };

  const onCreateVouchers = (values) => {
    createMultipleVoucher(values)
      .then(() => {
        getListVoucher({
          page: pageVoucher,
          size: sizeVoucher,
          ...dataSearchVoucher,
          sort: combineSort(dataSortVoucher),
        });
        setEdited(false);
        formVoucher.current.resetFields();
      })
      .catch((err) => console.error(err));
  };

  const onEditVoucher = (info) => {
    updateDataVoucher({ dataEditDefault: info });
    setVoucherId(info.id);
    formVoucher.current.setfields({
      info,
      voucherId: info.id,
    });
  };

  const onCancelVoucher = () => {
    if (formVoucher.current) {
      setEdited(false);
      formVoucher.current.setfields({
        info: dataEditVoucherDefault,
        voucherId,
      });
    }
  };

  const onResetVoucher = () => {
    if (formVoucher.current) {
      setEditStatus(false);
      setVoucherId(null);
      formVoucher.current.resetFields();
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
  //-------------------------------------
  return (
  <Main>
    <BaseDm2
      breadcrumb={[
        { title: "Danh mục", link: "/danh-muc" },
        {
          title: "Chương trình giảm giá",
          link: "/danh-muc/chuong-trinh-giam-gia",
        },
      ]}
      title={"Chương trình giảm giá"}
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
          state.changeCollapseStatus ? "transition-ease" : ""
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
          <TabPane tab="Chương trình" key={1}>
            <ChuongTrinh
              handleChangeshowTable={handleChangeshowTable}
              showFullTable={state.showFullTable}
              collapseStatus={state.collapseStatus}
              handleCollapsePane={handleCollapsePane}
              dataSort={dataSortChuongTrinhGiamGia || []}
              dataSearch={dataSearchChuongTrinhGiamGia}
              dataEditDefault={dataEditChuongTrinhDefault}
              onEdit={onEditChuongTrinh}
              onSizeChange={onSizeChangeTabChuongTrinh}
              onPageChange={onChangePageTabChuongTrinh}
              onReset={onResetChuongTrinh}
              page={pageChuongTrinhGiamGia}
              size={sizeChuongTrinhGiamGia}
              total={totalChuongTrinhGiamGia}
              updateData={updateDataChuongTrinhGiamGia}
              setEditStatus={setEditStatus}
              layerId={refLayerHotKey1.current}
            />
          </TabPane>
          <TabPane tab="Voucher" key={2}>
            <Voucher
              handleChangeshowTable={handleChangeshowTable}
              showFullTable={state.showFullTable}
              collapseStatus={state.collapseStatus}
              handleCollapsePane={handleCollapsePane}
              dataSort={dataSortVoucher || []}
              dataSearch={dataSearchVoucher}
              onEdit={onEditVoucher}
              onSizeChange={onSizeChangeTabVoucher}
              onPageChange={onChangePageTabVoucher}
              onReset={onResetVoucher}
              dataEditDefault={dataEditVoucherDefault || []}
              page={pageVoucher}
              size={sizeVoucher}
              total={totalVoucher}
              updateData={updateDataVoucher}
              setEditStatus={setEditStatus}
              layerId={refLayerHotKey2.current}
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
        >
          {activeTab === 1 && (
            <FormChuongTrinh
              handleSubmit={onSaveChuongTrinh}
              ref={formChuongTrinh}
              onCancel={onCancelChuongTrinh}
              onFieldsChangeForm={onFieldsChangeForm}
              edited={edited}
              editStatus={editStatus}
              layerId={refLayerHotKey1.current}
            />
          )}
          {activeTab === 2 && (
            <FormVoucher
              handleSubmit={onSaveVoucher}
              ref={formVoucher}
              onCancel={onCancelVoucher}
              onFieldsChangeForm={onFieldsChangeForm}
              onCreateMulti={onCreateVouchers}
              edited={edited}
              editStatus={editStatus}
              layerId={refLayerHotKey2.current}
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
    chuongTrinhGiamGia: {
      listChuongTrinhGiamGia,
      dataEditDefault: dataEditChuongTrinhDefault,
      dataSearch: dataSearchChuongTrinhGiamGia,
      dataSort: dataSortChuongTrinhGiamGia,
      page: pageChuongTrinhGiamGia,
      size: sizeChuongTrinhGiamGia,
      totalElements: totalChuongTrinhGiamGia,
    },
    maGiamGia: {
      listMaGiamGia: listVoucher,
      dataEditDefault: dataEditVoucherDefault,
      dataSearch: dataSearchVoucher,
      dataSort: dataSortVoucher,
      page: pageVoucher,
      size: sizeVoucher,
      totalElements: totalVoucher,
    },
  } = state;

  return {
    listChuongTrinhGiamGia,
    dataEditChuongTrinhDefault,
    dataSearchChuongTrinhGiamGia,
    dataSortChuongTrinhGiamGia,
    pageChuongTrinhGiamGia,
    sizeChuongTrinhGiamGia,
    totalChuongTrinhGiamGia,
    listVoucher,
    dataEditVoucherDefault,
    dataSearchVoucher,
    dataSortVoucher,
    pageVoucher,
    sizeVoucher,
    totalVoucher,
  };
};
const mapDispatchToProps = ({
  chuongTrinhGiamGia: {
    getListChuongTrinhGiamGia,
    getListAllChuongTrinhGiamGia,
    createOrEdit: createOrEditChuongTrinhGiamGia,
    updateData: updateDataChuongTrinhGiamGia,
  },
  maGiamGia: {
    getListMaGiamGia: getListVoucher,
    createOrEdit: createOrEditVoucher,
    updateData: updateDataVoucher,
    createMultiple: createMultipleVoucher,
  },
}) => ({
  getListChuongTrinhGiamGia,
  getListAllChuongTrinhGiamGia,
  createOrEditChuongTrinhGiamGia,
  updateDataChuongTrinhGiamGia,
  getListVoucher,
  createOrEditVoucher,
  updateDataVoucher,
  createMultipleVoucher,
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
