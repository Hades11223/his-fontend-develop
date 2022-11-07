import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Tabs } from "antd";
import { fullTableLayout } from "./config";
import BaseDm2 from "../BaseDm2";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  ADD_LAYOUT,
  TABLE_LAYOUT,
} from "constants/index";
import { SORT_DEFAULT } from "constants/index";
import stringUtils from "mainam-react-native-string-utils";
import { FormGoiPtTt, GoiPtTt, GoiPtTtChiTiet } from "./components";

const { TabPane } = Tabs;
const DMGoiPtTt = ({}) => {
  const refLayerHotKey1 = useRef(stringUtils.guid());
  const refLayerHotKey2 = useRef(stringUtils.guid());
  const refLayerHotKey3 = useRef(stringUtils.guid());
  const { onAddLayer } = useDispatch().phimTat;

  const refFormGoiPtTt = useRef(null);

  const {
    _listData: listGoiPtTt,
    _totalElements: totalGoiPtTt,
    _page: pageGoiPtTt,
    _size: sizeGoiPtTt,
    _dataEdit,
    _dataSearch,
  } = useSelector((state) => state.goiPttt);
  const {
    _listData: listGoiPtTtChiTiet,
    _totalElements: totalGoiPtTtChiTiet,
    _page: pageGoiPtTtChiTiet,
    _size: sizeGoiPtTtChiTiet,
  } = useSelector((state) => state.goiPtttChiTiet);
  const { _getList: searchGoiPtTt, _createOrEdit: createOrEditGoiPtTt } =
    useDispatch().goiPttt;
  const {
    _getList: searchGoiPtTtChiTiet,
    _createOrEdit: createOrEditGoiPtTtChiTiet,
    _onDelete: deleteGoiPtTtChiTiet,
  } = useDispatch().goiPtttChiTiet;
  const { getListAllPhong } = useDispatch().phong;

  const { listAllPhong } = useSelector((state) => state.phong);

  const [activeTab, setActiveTab] = useState("0");
  const [dataSortColumn] = useState(SORT_DEFAULT);
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [editGoiPtTtId, setEditGoiPtTtId] = useState(null);

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
    if (activeTab === "1") {
    }
  }, [activeTab]);

  useEffect(() => {
    if (level != null && level != undefined) callback(level);
  }, [level]);

  useEffect(() => {
    getListAllPhong({ page: 0, size: 9999, active: true });
  }, []);

  const callback = (key) => {
    setActiveTab(`${parseInt(key, 10)}`);

    if (key === "1") onAddLayer({ layerId: refLayerHotKey1.current });
    else if (key === "2") onAddLayer({ layerId: refLayerHotKey2.current });
    else onAddLayer({ layerId: refLayerHotKey3.current });
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

  const onEditGoiPtTt = (info) => {
    // updateDataGroup1({
    //   dataEditGroupService1Default: info,
    // });
    setEditGoiPtTtId(info.id);
    refFormGoiPtTt.current.setfields({
      info,
      editGoiPtTtId: info.id,
    });
  };

  const addNewGoiPtTt = (values) => {
    createOrEditGoiPtTt({ ...values, id: editGoiPtTtId })
      .then(() => {
        searchGoiPtTt({
          page: 0,
          size: 10,
        });
      })
      .catch((err) => console.error(err));
  };

  const onCancelUpdateGoiPtTtForm = () => {
    if (refFormGoiPtTt.current) {
      refFormGoiPtTt.current.setfields({
        // info: dataEditGroupService1Default,
        editGoiPtTtId,
      });
    }
  };

  const onResetGoiPtTt = () => {
    setEditGoiPtTtId(null);
    setEditStatus(false);
    if (refFormGoiPtTt.current) {
      refFormGoiPtTt.current.resetFields();
    }
  };

  const onDeleteGoiPtTtChiTiet = (id) => {
    deleteGoiPtTtChiTiet(id);
  };

  return (
    <BaseDm2
      breadcrumb={[
        { title: "Danh mục", link: "/danh-muc" },
        {
          title: "Danh mục gói mổ 10 ngày",
          link: "/danh-muc/goi-pt-tt",
        },
      ]}
      title={"Danh mục gói mổ 10 ngày"}
    >
      <Col
        {...(activeTab === "1"
          ? fullTableLayout
          : !state.showFullTable
          ? state.collapseStatus
            ? TABLE_LAYOUT_COLLAPSE
            : TABLE_LAYOUT
          : null)}
        className={`pr-3 ${
          state.changeCollapseStatus || activeTab == "1"
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
          <TabPane tab="Danh mục gói 10 ngày" key="0">
            <GoiPtTt
              collapseStatus={state.collapseStatus}
              showFullTable={state.showFullTable}
              handleCollapsePane={handleCollapsePane}
              handleChangeshowTable={handleChangeshowTable}
              setEditStatus={setEditStatus}
              onEditGoiPtTt={onEditGoiPtTt}
              page={pageGoiPtTt}
              size={sizeGoiPtTt}
              total={totalGoiPtTt}
              searchGoiPtTt={searchGoiPtTt}
              listGoiPtTt={listGoiPtTt}
              listAllPhong={listAllPhong}
              onReset={onResetGoiPtTt}
            />
          </TabPane>
          <TabPane tab="Danh mục dịch vụ chung" key="1">
            <GoiPtTtChiTiet
              page={pageGoiPtTtChiTiet}
              size={sizeGoiPtTtChiTiet}
              total={totalGoiPtTtChiTiet}
              searchGoiPtTtChiTiet={searchGoiPtTtChiTiet}
              listGoiPtTtChiTiet={listGoiPtTtChiTiet}
              onDeleteGoiPtTtChiTiet={onDeleteGoiPtTtChiTiet}
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
          {activeTab === "0" && (
            <FormGoiPtTt
              layerId={refLayerHotKey1.current}
              handleSubmit={addNewGoiPtTt}
              ref={refFormGoiPtTt}
              onCancel={onCancelUpdateGoiPtTtForm}
              listAllPhong={listAllPhong}
              editStatus={editStatus}
            />
          )}
        </Col>
      )}
    </BaseDm2>
  );
};

export default DMGoiPtTt;
