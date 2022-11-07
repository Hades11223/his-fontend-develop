import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { Col, Tabs } from "antd";
import { fullTableLayout } from "./config";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  ADD_LAYOUT,
  TABLE_LAYOUT,
} from "constants/index";
import {
  MeGrLv,
  MeGrLv1,
  MeGrLv2,
  FormMeGrLv1,
  FormMeGrLv2,
} from "./components";
import { ROLES } from "constants/index";
import { checkRole } from "utils/role-utils";
import BaseDm2 from "../BaseDm2";
import { Main } from "./styled"

const { TabPane } = Tabs;

const GroupMedicineByLevel = ({
  listSelectMeGrLv1,
  listMeGrLv,
  totalMeGrLv,
  pageMeGrLv,
  sizeMeGrLv,
  sortMeGrLv,
  listMeGrLv1,
  totalMeGrLv1,
  pageMeGrLv1,
  sizeMeGrLv1,
  sortMeGrLv1,
  listMeGrLv2,
  pageMeGrLv2,
  sizeMeGrLv2,
  sortMeGrLv2,
  totalMeGrLv2,
  dataEditMeGrLv1Default,
  dataEditMeGrLv2Default,
  dataSearchMeGrLv,
  dataSearchMeGrLv1,
  dataSearchMeGrLv2,
  editStatusMeGrLv1,
  editStatusMeGrLv2,
  getListMeGrLv1,
  getListMeGrLv2,
  createOrEditMeGrLv1,
  createOrEditMeGrLv2,
  updateData,
}) => {
  const [editStatus, setEditStatus] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const formMeGrLv1Ref = useRef(null);
  const formMeGrLv2Ref = useRef(null);
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
          title: "Nhóm thuốc",
          link: "danh-muc/nhom-thuoc",
        },
      ]}
      title={"Danh mục nhóm thuốc"}
    >
      <Col
        {...(activeTab === 1
          ? fullTableLayout
          : !state.showFullTable
          ? state.collapseStatus
            ? TABLE_LAYOUT_COLLAPSE
            : TABLE_LAYOUT
          : null)}
        className={`pr-3 ${
          state.changeCollapseStatus || activeTab == 1 ? "transition-ease" : ""
        }`}
      >
        <Tabs
          defaultActiveKey={activeTab}
          onChange={callback}
          className="table-tab"
        >
          <TabPane tab="Tất cả" key={1}>
            <MeGrLv
              handleChangeshowTable={handleChangeshowTable}
              showFullTable={state.showFullTable}
              collapseStatus={state.collapseStatus}
              handleCollapsePane={handleCollapsePane}
              listMeGrLv={listMeGrLv}
              page={pageMeGrLv}
              size={sizeMeGrLv}
              sortData={sortMeGrLv}
              searchData={dataSearchMeGrLv}
              total={totalMeGrLv}
              updateData={updateData}
              getListMeGrLv={getListMeGrLv2}
              setEditStatus={setEditStatus}
              editStatus={editStatus}
            />
          </TabPane>
          <TabPane tab="Nhóm thuốc cấp 1" key={2}>
            <MeGrLv1
              handleChangeshowTable={handleChangeshowTable}
              showFullTable={state.showFullTable}
              collapseStatus={state.collapseStatus}
              handleCollapsePane={handleCollapsePane}
              listMeGrLv1={listMeGrLv1}
              page={pageMeGrLv1}
              size={sizeMeGrLv1}
              sortData={sortMeGrLv1}
              searchData={dataSearchMeGrLv1}
              dataEdit={dataEditMeGrLv1Default}
              total={totalMeGrLv1}
              updateData={updateData}
              getListMeGrLv1={getListMeGrLv1}
              formMeGrLv1Ref={formMeGrLv1Ref}
              setEditStatus={setEditStatus}
              editStatus={editStatus}
            />
          </TabPane>
          <TabPane tab="Nhóm thuốc cấp 2" key={3}>
            <MeGrLv2
              handleChangeshowTable={handleChangeshowTable}
              showFullTable={state.showFullTable}
              collapseStatus={state.collapseStatus}
              handleCollapsePane={handleCollapsePane}
              listSelectMeGrLv1={listSelectMeGrLv1}
              listMeGrLv2={listMeGrLv2}
              page={pageMeGrLv2}
              size={sizeMeGrLv2}
              sortData={sortMeGrLv2}
              searchData={dataSearchMeGrLv2}
              dataEdit={dataEditMeGrLv2Default}
              total={totalMeGrLv2}
              updateData={updateData}
              getListMeGrLv1={getListMeGrLv1}
              getListMeGrLv2={getListMeGrLv2}
              formMeGrLv2Ref={formMeGrLv2Ref}
              dataEditMeGrLv1Default={dataEditMeGrLv1Default}
              setEditStatus={setEditStatus}
              editStatus={editStatus}
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
          {activeTab === 2 && (
            <FormMeGrLv1
              editStatus={editStatusMeGrLv1}
              dataEditDefault={dataEditMeGrLv1Default}
              dataSearch={dataSearchMeGrLv1}
              ref={formMeGrLv1Ref}
              getListMeGrLv1={getListMeGrLv1}
              page={pageMeGrLv1}
              size={sizeMeGrLv1}
              dataSort={sortMeGrLv1}
              createOrEdit={createOrEditMeGrLv1}
              setEditStatus={setEditStatus}
              editStatus2={
                editStatus
                  ? !checkRole([ROLES["DANH_MUC"].NHOM_THUOC_SUA])
                  : !checkRole([ROLES["DANH_MUC"].NHOM_THUOC_THEM])
              }
            />
          )}
          {activeTab === 3 && (
            <FormMeGrLv2
              listSelectMeGrLv1={listSelectMeGrLv1}
              editStatus={editStatusMeGrLv2}
              dataEditDefault={dataEditMeGrLv2Default}
              dataSearch={dataSearchMeGrLv2}
              ref={formMeGrLv2Ref}
              getListMeGrLv2={getListMeGrLv2}
              page={pageMeGrLv2}
              size={sizeMeGrLv2}
              dataSort={sortMeGrLv2}
              createOrEdit={createOrEditMeGrLv2}
              setEditStatus={setEditStatus}
              editStatus2={
                editStatus
                  ? !checkRole([ROLES["DANH_MUC"].NHOM_THUOC_SUA])
                  : !checkRole([ROLES["DANH_MUC"].NHOM_THUOC_THEM])
              }
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
    nhomDichVuKho: {
      listSelectMeGrLv1,
      listMeGrLv,
      totalMeGrLv,
      pageMeGrLv,
      sizeMeGrLv,
      sortMeGrLv,
      listMeGrLv1,
      totalMeGrLv1,
      pageMeGrLv1,
      sizeMeGrLv1,
      sortMeGrLv1,
      listMeGrLv2,
      pageMeGrLv2,
      sizeMeGrLv2,
      sortMeGrLv2,
      totalMeGrLv2,
      dataEditMeGrLv1Default,
      dataEditMeGrLv2Default,
      dataSearchMeGrLv,
      dataSearchMeGrLv1,
      dataSearchMeGrLv2,
      editStatusMeGrLv1,
      editStatusMeGrLv2,
    },
  } = state;

  return {
    listSelectMeGrLv1,
    listMeGrLv,
    totalMeGrLv,
    pageMeGrLv,
    sizeMeGrLv,
    sortMeGrLv,
    listMeGrLv1,
    totalMeGrLv1,
    pageMeGrLv1,
    sizeMeGrLv1,
    sortMeGrLv1,
    listMeGrLv2,
    pageMeGrLv2,
    sizeMeGrLv2,
    sortMeGrLv2,
    totalMeGrLv2,
    dataEditMeGrLv1Default,
    dataEditMeGrLv2Default,
    dataSearchMeGrLv,
    dataSearchMeGrLv1,
    dataSearchMeGrLv2,
    editStatusMeGrLv1,
    editStatusMeGrLv2,
  };
};
const mapDispatchToProps = ({
  nhomDichVuKho: {
    getListMeGrLv1,
    getListMeGrLv2,
    createOrEditMeGrLv1,
    createOrEditMeGrLv2,
    updateData,
  },
}) => ({
  getListMeGrLv1,
  getListMeGrLv2,
  createOrEditMeGrLv1,
  createOrEditMeGrLv2,
  updateData,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupMedicineByLevel);
