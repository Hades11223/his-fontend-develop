import React, { useEffect, useState, useRef, useMemo } from "react";
import { connect, useDispatch } from "react-redux";
import { Col, Tabs } from "antd";
import { fullTableLayout } from "./config";
import BaseDm2 from "../BaseDm2";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  ADD_LAYOUT,
  TABLE_LAYOUT,
} from "constants/index";
import { Main } from "./styled"
import {
  Group2,
  Group1,
  Group3,
  FormGroup1,
  FormGroup2,
  FormGroup3,
  Group,
} from "./components";
import { combineSort } from "utils";
import { SORT_DEFAULT } from "constants/index";
import stringUtils from "mainam-react-native-string-utils";

const { TabPane } = Tabs;
const NhomDichVu = ({
  createOrEditGroupService1,
  searchDichVuCap1,
  listGroupService1,
  pageGroupService1,
  sizeGroupService1,
  totalGroupService1,
  updateDataGroup1,
  dataEditGroupService1Default,
  dataSortGroupService1,
  dataSearchGroupService1,
  //group 2
  createOrEditGroupService2,
  searchDichVuCap2,
  updateDataGroup2,
  pageGroupService2,
  sizeGroupService2,
  totalGroupService2,
  listGroupService2,
  dataSortGroupService2,
  dataSearchGroupService2,
  dataEditGroupService2Default,
  //utils
  getUtils,
  listtrangThaiHoanThanh,
  listtrangThaiDichVu,
  //group3
  searchDichVuCap3,
  updateDataGroup3,
  listGroupService3,
  totalGroupService3,
  pageGroupService3,
  sizeGroupService3,
  dataEditGroupService3Default,
  dataSearchGroupService3,
  dataSortGroupService3,
  createOrEditGroupService3,
  //get all
  getAllDichVuCap2,
  listAllNhomDichVuCap2,
  getAllDichVuCap1,
  listAllNhomDichVuCap1,
  listAllBaoCao = [],
  getListAllBaoCao,
}) => {
  const refLayerHotKey1 = useRef(stringUtils.guid());
  const refLayerHotKey2 = useRef(stringUtils.guid());
  const refLayerHotKey3 = useRef(stringUtils.guid());
  const { onAddLayer } = useDispatch().phimTat;

  const [editStatus, setEditStatus] = useState(false);
  const [activeTab, setActiveTab] = useState("0");
  const [editGroupService1Id, setEditGroupService1Id] = useState(null);
  const [editGroup2Id, setEditGroup2Id] = useState(null);
  const [editGroup3Id, setEditGroup3Id] = useState(null);
  const [dataSortColumn] = useState(SORT_DEFAULT);
  const formGroupService1Ref = useRef(null);
  const formGroup2Ref = useRef(null);
  const formGroup3Ref = useRef(null);
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [state, _setState] = useState({
    showFullTable: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const url = new URL(window.location.href);
  const level = url.searchParams.get("level");

  useEffect(() => {
    getUtils({ name: "trangThaiHoanThanh" });
    getUtils({ name: "trangThaiDichVu" });
    // searchDichVuCap3({
    //   pageGroupService3: 0,
    //   sizeGroupService3: 10,
    //   sort: combineSort(dataSortColumn),
    // });
  }, []);
  useEffect(() => {
    if (activeTab === "2") {
      updateDataGroup2({
        dataSearchGroupService2: {},
      });
      if (!listAllNhomDichVuCap1?.length) {
        getAllDichVuCap1({ page: 0, size: 9999, active: true });
      }
    } else if (activeTab === "3") {
      updateDataGroup3({
        dataSearchGroupService3: {},
        dataSortGroupService3: dataSortColumn,
      });
    }
  }, [activeTab]);

  useEffect(() => {
    if (level != null && level != undefined) callback(level);
  }, [level]);

  const callback = (key) => {
    setActiveTab(`${parseInt(key, 10)}`);

    if (key === "1") onAddLayer({ layerId: refLayerHotKey1.current });
    else if (key === "2") onAddLayer({ layerId: refLayerHotKey2.current });
    else onAddLayer({ layerId: refLayerHotKey3.current });
  };

  const addNewGroupService1 = (values) => {
    createOrEditGroupService1({ ...values, id: editGroupService1Id })
      .then(() => {
        getAllDichVuCap1({
          pageGroupService1,
          sizeGroupService1,
          ...dataSearchGroupService1,
          sort: combineSort(dataSortGroupService1),
        }).then(() => {
          const params = {
            pageGroupService1: editGroupService1Id ? pageGroupService1 : 0,
            sizeGroupService1,
          };
          const sort = editGroupService1Id
            ? { ...dataSortGroupService1 }
            : { createdAt: 2 };
          searchDichVuCap1({
            ...params,
            ...dataSearchGroupService1,
            sort: combineSort(sort),
          });
          if (!editGroupService1Id) {
            formGroupService1Ref.current.resetFields();
          }
        });
      })
      .catch((err) => console.error(err));
  };
  const addNewGroup3 = (values) => {
    createOrEditGroupService3({ ...values, id: editGroup3Id })
      .then(() => {
        searchDichVuCap3({
          pageGroupService3: editGroup3Id ? pageGroupService3 : 0,
          sizeGroupService3,
          ...dataSearchGroupService3,
          sort: combineSort(
            editGroup3Id ? dataSortGroupService3 : { createdAt: "desc" }
          ),
        }).then(() => {
          if (!editGroup3Id) {
            formGroup3Ref.current.resetFields();
          }
        });
      })
      .catch((err) => console.error(err));
  };
  const addNewGroup2 = (values) => {
    createOrEditGroupService2({ ...values, id: editGroup2Id })
      .then(() => {
        searchDichVuCap2({
          pageGroupService2: editGroup2Id ? pageGroupService2 : 0,
          sizeGroupService2,
          ...dataSearchGroupService2,
          sort: combineSort(
            editGroup2Id
              ? dataSortGroupService2
              : { createdAt: "desc", active: "asc" }
          ),
        }).then(() => {
          if (!editGroup2Id) {
            formGroup2Ref.current.resetFields();
          }
        });
      })
      .catch((err) => console.error(err));
  };

  const onEditGroupService1 = (info) => {
    updateDataGroup1({
      dataEditGroupService1Default: info,
    });
    setEditGroupService1Id(info.id);
    formGroupService1Ref.current.setfields({
      info,
      editGroupService1Id: info.id,
    });
  };

  const onEditGroup2 = (info) => {
    updateDataGroup2({
      dataEditGroupService2Default: info,
    });
    setEditGroup2Id(info.id);
    formGroup2Ref.current.setfields({ info, editGroup2Id: info.id });
  };
  const onEditGroup3 = (info) => {
    updateDataGroup3({
      dataEditGroupService3Default: info,
    });
    setEditGroup3Id(info.id);
    formGroup3Ref.current.setfields({ info, editGroup3Id: info.id });
  };
  const onSizeChangeGroupService1 = (size) => {
    const params = {
      pageGroupService1,
      sizeGroupService1: size,
    };
    updateDataGroup1(params);
    searchDichVuCap1({
      ...params,
      ...dataSearchGroupService1,
      sort: combineSort(dataSortGroupService1),
    });
  };

  const onChangePageGroupService1 = (values) => {
    const params = { pageGroupService1: values - 1, sizeGroupService1 };
    updateDataGroup1(params);
    searchDichVuCap1({
      ...params,
      ...dataSearchGroupService1,
      sort: combineSort(dataSortGroupService1),
    });
  };

  const onSizeChangeGroup2 = (size) => {
    const params = { pageGroupService2, sizeGroupService2: size };
    updateDataGroup2(params);
    searchDichVuCap2({
      ...params,
      ...dataSearchGroupService2,
      sort: combineSort(dataSortGroupService2),
    });
  };

  const onChangePageGroup2 = (page) => {
    const params = { pageGroupService2: page - 1, sizeGroupService2 };
    updateDataGroup2(params);
    searchDichVuCap2({
      ...params,
      ...dataSearchGroupService2,
      sort: combineSort(dataSortGroupService2),
    });
  };

  const onResetGroup2Form = () => {
    setEditGroup2Id(null);
    setEditStatus(false);
    if (formGroup2Ref.current) {
      formGroup2Ref.current.resetFields();
    }
  };

  const onResetGroupService1Form = () => {
    setEditGroupService1Id(null);
    setEditStatus(false);
    if (formGroupService1Ref.current) {
      formGroupService1Ref.current.resetFields();
    }
  };
  const onCancelUpdateGroup3Form = () => {
    if (formGroup3Ref.current) {
      formGroup3Ref.current.setfields({
        info: dataEditGroupService3Default,
        editGroup3Id,
      });
    }
  };
  const onCancelUpdateGroup2Form = () => {
    if (formGroup2Ref.current) {
      formGroup2Ref.current.setfields({
        info: dataEditGroupService2Default,
        editGroup2Id,
      });
    }
  };

  const onCancelUpdateGroupService1Form = () => {
    if (formGroupService1Ref.current) {
      formGroupService1Ref.current.setfields({
        info: dataEditGroupService1Default,
        editGroupService1Id,
      });
    }
  };

  const onSizeChangeGroup3 = (size) => {
    const params = { pageGroupService3, sizeGroupService3: size };
    updateDataGroup3(params);
    searchDichVuCap3({
      ...params,
      ...dataSearchGroupService3,
      sort: combineSort(dataSortGroupService3),
    });
  };

  const onChangePageGroup3 = (page) => {
    const params = { pageGroupService3: page - 1, sizeGroupService3 };
    updateDataGroup3(params);
    searchDichVuCap3({
      ...params,
      ...dataSearchGroupService3,
      sort: combineSort(dataSortGroupService3),
    });
  };
  const onResetGroup3Form = () => {
    setEditGroup3Id(null);
    setEditStatus(false);
    if (formGroup3Ref.current) {
      formGroup3Ref.current.resetFields();
    }
  };
  const getlistTrangThaiHoanThanhDV = (item) => {
    let res = (listtrangThaiHoanThanh || []).filter((el) => el.id === item);
    return (res.length && res[0].ten) || "";
  };

  const listTrangThaiKhongHoanThanh = useMemo(() => {
    return listtrangThaiDichVu?.filter((value) => {
      return listtrangThaiHoanThanh.map((e) => e.id).indexOf(value.id) === -1;
    });
  }, [listtrangThaiDichVu, listtrangThaiHoanThanh]);
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
          title: "Danh mục nhóm dịch vụ",
          link: "/danh-muc/nhom-dich-vu",
        },
      ]}
      title={"Danh mục nhóm dịch vụ"}
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
          state.changeCollapseStatus || activeTab == "0"
            ? "transition-ease"
            : ""
        }`}
      >
        <Tabs
          activeKey={activeTab}
          defaultActiveKey={activeTab}
          onChange={callback}
          className="table-tab"
        >
          <TabPane tab="Tất cả" key="0">
            <Group />
          </TabPane>
          <TabPane tab="Nhóm dịch vụ cấp 1" key="1">
            <Group1
              layerId={refLayerHotKey1.current}
              handleChangeshowTable={handleChangeshowTable}
              showFullTable={state.showFullTable}
              collapseStatus={state.collapseStatus}
              handleCollapsePane={handleCollapsePane}
              listGroupService1={listGroupService1}
              page={pageGroupService1}
              size={sizeGroupService1}
              total={totalGroupService1}
              onEditGroupService1={onEditGroupService1}
              updateData={updateDataGroup1}
              onSizeChange={onSizeChangeGroupService1}
              onPageChange={onChangePageGroupService1}
              onReset={onResetGroupService1Form}
              searchDichVuCap1={searchDichVuCap1}
              dataSearch={dataSearchGroupService1}
              sortData={dataSortGroupService1}
              listtrangThaiHoanThanh={listtrangThaiHoanThanh}
              listtrangThaiKhongHoanThanh={listTrangThaiKhongHoanThanh}
              listtrangThaiDichVu={listtrangThaiDichVu}
              getlistTrangThaiHoanThanhDV={getlistTrangThaiHoanThanhDV}
              setEditStatus={setEditStatus}
            />
          </TabPane>
          <TabPane tab="Nhóm dịch vụ cấp 2" key="2">
            <Group2
              layerId={refLayerHotKey2.current}
              handleChangeshowTable={handleChangeshowTable}
              showFullTable={state.showFullTable}
              collapseStatus={state.collapseStatus}
              handleCollapsePane={handleCollapsePane}
              listGroupService2={listGroupService2}
              searchDichVuCap2={searchDichVuCap2}
              onEditGroup2={onEditGroup2}
              page={pageGroupService2}
              size={sizeGroupService2}
              total={totalGroupService2}
              onSizeChange={onSizeChangeGroup2}
              onPageChange={onChangePageGroup2}
              onReset={onResetGroup2Form}
              updateData={updateDataGroup2}
              dataSearch={dataSearchGroupService2}
              editGroupService1Id={editGroupService1Id}
              sortData={dataSortGroupService2}
              getlistTrangThaiHoanThanhDV={getlistTrangThaiHoanThanhDV}
              listtrangThaiHoanThanh={listtrangThaiHoanThanh}
              listtrangThaiKhongHoanThanh={listTrangThaiKhongHoanThanh}
              listtrangThaiDichVu={listtrangThaiDichVu}
              listAllNhomDichVuCap1={listAllNhomDichVuCap1}
              searchDichVuCap1={searchDichVuCap1}
              listAllBaoCao={listAllBaoCao}
              getListAllBaoCao={getListAllBaoCao}
              setEditStatus={setEditStatus}
            />
          </TabPane>
          <TabPane tab="Nhóm dịch vụ cấp 3" key="3">
            <Group3
              layerId={refLayerHotKey3.current}
              handleChangeshowTable={handleChangeshowTable}
              showFullTable={state.showFullTable}
              collapseStatus={state.collapseStatus}
              handleCollapsePane={handleCollapsePane}
              listGroupService3={listGroupService3}
              searchDichVuCap3={searchDichVuCap3}
              onEditGroup3={onEditGroup3}
              page={pageGroupService3}
              size={sizeGroupService3}
              total={totalGroupService3}
              onSizeChange={onSizeChangeGroup3}
              onPageChange={onChangePageGroup3}
              onReset={onResetGroup3Form}
              updateData={updateDataGroup3}
              dataSearch={dataSearchGroupService3}
              sortData={dataSortGroupService3}
              getlistTrangThaiHoanThanhDV={getlistTrangThaiHoanThanhDV}
              listtrangThaiHoanThanh={listtrangThaiHoanThanh}
              listtrangThaiKhongHoanThanh={listTrangThaiKhongHoanThanh}
              listtrangThaiDichVu={listtrangThaiDichVu}
              getAllDichVuCap2={getAllDichVuCap2}
              listAllNhomDichVuCap1={listAllNhomDichVuCap1}
              listAllNhomDichVuCap2={listAllNhomDichVuCap2}
              getAllDichVuCap1={getAllDichVuCap1}
              listAllBaoCao={listAllBaoCao}
              getListAllBaoCao={getListAllBaoCao}
              setEditStatus={setEditStatus}
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
            <FormGroup1
              layerId={refLayerHotKey1.current}
              handleSubmit={addNewGroupService1}
              ref={formGroupService1Ref}
              onCancel={onCancelUpdateGroupService1Form}
              listtrangThaiHoanThanh={listtrangThaiHoanThanh}
              listtrangThaiKhongHoanThanh={listTrangThaiKhongHoanThanh}
              listtrangThaiDichVu={listtrangThaiDichVu}
              editStatus={editStatus}
            />
          )}
          {activeTab === "2" && (
            <FormGroup2
              layerId={refLayerHotKey2.current}
              handleSubmit={addNewGroup2}
              ref={formGroup2Ref}
              listAllNhomDichVuCap1={listAllNhomDichVuCap1}
              onCancel={onCancelUpdateGroup2Form}
              listtrangThaiHoanThanh={listtrangThaiHoanThanh}
              listtrangThaiKhongHoanThanh={listTrangThaiKhongHoanThanh}
              listtrangThaiDichVu={listtrangThaiDichVu}
              dataSearch={dataSearchGroupService2}
              listAllBaoCao={listAllBaoCao}
              getListAllBaoCao={getListAllBaoCao}
              editStatus={editStatus}
            />
          )}
          {activeTab === "3" && (
            <FormGroup3
              layerId={refLayerHotKey3.current}
              handleSubmit={addNewGroup3}
              ref={formGroup3Ref}
              listAllNhomDichVuCap1={listAllNhomDichVuCap1}
              listAllNhomDichVuCap2={listAllNhomDichVuCap2}
              onCancel={onCancelUpdateGroup3Form}
              listtrangThaiHoanThanh={listtrangThaiHoanThanh}
              listtrangThaiKhongHoanThanh={listTrangThaiKhongHoanThanh}
              listtrangThaiDichVu={listtrangThaiDichVu}
              dataSearch={dataSearchGroupService3}
              getAllDichVuCap2={getAllDichVuCap2}
              listAllBaoCao={listAllBaoCao}
              getListAllBaoCao={getListAllBaoCao}
              editStatus={editStatus}
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
    nhomDichVuCap1: {
      listGroupService1,
      totalGroupService1,
      pageGroupService1,
      sizeGroupService1,
      dataEditGroupService1Default,
      dataSearchGroupService1,
      dataSortGroupService1,
      listAllNhomDichVuCap1,
    },
    nhomDichVuCap2: {
      listGroupService2,
      totalGroupService2,
      pageGroupService2,
      sizeGroupService2,
      dataEditGroupService2Default,
      dataSearchGroupService2,
      dataSortGroupService2,
      listAllNhomDichVuCap2,
    },
    nhomDichVuCap3: {
      listGroupService3,
      totalGroupService3,
      pageGroupService3,
      sizeGroupService3,
      dataEditGroupService3Default,
      dataSearchGroupService3,
      dataSortGroupService3,
      listAllNhomDichVuCap3,
    },
    utils: { listtrangThaiHoanThanh = [], listtrangThaiDichVu },
    baoCao: { listAllBaoCao },
  } = state;

  return {
    listGroupService1,
    totalGroupService1,
    pageGroupService1,
    sizeGroupService1,
    dataEditGroupService1Default,
    dataSearchGroupService1,
    dataSortGroupService1,
    // group 2
    listGroupService2,
    totalGroupService2,
    pageGroupService2,
    sizeGroupService2,
    dataEditGroupService2Default,
    dataSearchGroupService2,
    dataSortGroupService2,
    //gr3
    listGroupService3,
    totalGroupService3,
    pageGroupService3,
    sizeGroupService3,
    dataEditGroupService3Default,
    dataSearchGroupService3,
    dataSortGroupService3,
    //utils
    listtrangThaiHoanThanh,
    listtrangThaiDichVu,
    //
    listAllNhomDichVuCap1,
    listAllNhomDichVuCap2,
    listAllNhomDichVuCap3,
    listAllBaoCao,
  };
};
const mapDispatchToProps = ({
  nhomDichVuCap1,
  nhomDichVuCap2,
  nhomDichVuCap3,
  utils: { getUtils },
  baoCao: { getListAllBaoCao },
}) => ({
  updateDataGroup1: nhomDichVuCap1.updateData,
  searchDichVuCap1: nhomDichVuCap1.searchDichVuCap1,
  createOrEditGroupService1: nhomDichVuCap1.createOrEditGroupService1,
  getAllDichVuCap1: nhomDichVuCap1.getAllDichVuCap1,
  updateDataGroup2: nhomDichVuCap2.updateData,
  searchDichVuCap2: nhomDichVuCap2.searchDichVuCap2,
  createOrEditGroupService2: nhomDichVuCap2.createOrEditGroupService2,
  getAllDichVuCap2: nhomDichVuCap2.getAllDichVuCap2,
  updateDataGroup3: nhomDichVuCap3.updateData,
  searchDichVuCap3: nhomDichVuCap3.searchDichVuCap3,
  createOrEditGroupService3: nhomDichVuCap3.createOrEditGroupService3,
  getAllDichVuCap3: nhomDichVuCap3.getAllDichVuCap3,
  getUtils,
  getListAllBaoCao,
});

export default connect(mapStateToProps, mapDispatchToProps)(NhomDichVu);
