import Icon from "@ant-design/icons";
import { Col } from "antd";
import { checkRole } from "utils/role-utils";
import IcCreate from "assets/images/kho/IcCreate.png";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import extendTable from "assets/svg/extendTable.svg";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import HomeWrapper from "components/HomeWrapper";
import { BASE_LAYOUT, PAGE_DEFAULT } from "constants/index";
import {
  ADD_LAYOUT,
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT,
  TABLE_LAYOUT_COLLAPSE,
} from "constants/index";
import stringUtils from "mainam-react-native-string-utils";
import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import ElementTable from "../common/ElementTable";
import MultiLevelTab from "components/MultiLevelTab";

const DanhMucCap2 = ({
  // bắt buộc
  storeName,

  listPanel = () => [],
  getColumns,
  hotKeys,
  initFormValue= {},
  customOnSelectRow,

  title,
  roleSave,
  roleEdit,
  rowKey,
  flexHanCheKhoaChiDinh,
}) => {
  const refTab = useRef();
  const {
    _listData: listData,
    _totalElements: totalElements,
    _page: page,
    _size: size,
    _dataEdit: dataEditDefault,
    _dataSearch: dataSearch,
    _dataSort: dataSort,
  } = useSelector((state) => state[storeName]);
  const { updateData, _getList: getData } = useDispatch()[storeName];

  const [state, _setState] = useState({
    showFullTable: false,
    activeKeyTab: "1",
    editStatus: false,
    dataSortColumn: { active: 2, createdAt: 2 },
    disabledBtnOk: true,
    layoutMode: "default", // collapse, fullTable
  });
  const { editStatus, dataSortColumn, layoutMode } = state;

  useEffect(() => {
    if (
      flexHanCheKhoaChiDinh &&
      !dataEditDefault?.hanCheKhoaChiDinh &&
      state.activeKeyTab === "khoaChiDinh"
    ) {
      setState({ activeKeyTab: "1" });
    }
  }, [dataEditDefault]);

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const generateHotkeyArr = () => {
    const output = [];
    if (listPanel) {
      for (let i = 0; i < listPanel({}).length; i++) {
        output[i] = stringUtils.guid();
      }
    }
    return output;
  };
  const refLayerHotKey = useRef(generateHotkeyArr());
  const refClickBtnAdd = useRef();
  const { onAddLayer } = useDispatch().phimTat;
  // register layerId
  useEffect(() => {
    getData({ ...dataSearch, page: 0 });
    onAddLayer({ layerId: refLayerHotKey.current[0] });
  }, []);

  const handleClickedBtnAdded = () => {
    setState({
      mauBaoCao: null,
      defaultFileList: [],
      invalidMauBaoCao: false,
    });

    const _hotkey = hotKeys.find(
      (hotkey) =>
        hotkey.layerId === refLayerHotKey.current[state.activeKeyTab] &&
        hotkey.keyCode === 112
    );

    if (_hotkey && _hotkey.onEvent) {
      _hotkey.onEvent();
    }
    updateData({
      _dataEdit: initFormValue || {},
    });
  };
  refClickBtnAdd.current = handleClickedBtnAdded;

  const onChangeTab = (activeKeyTab) => {
    onAddLayer({ layerId: refLayerHotKey.current[activeKeyTab] });
    setState({ activeKeyTab });
  };

  const changeFullScreen = () => {
    setState({
      layoutMode: layoutMode === "fullTable" ? "default" : "fullTable",
    });
  };
  const handleCollapsePane = () => {
    if (layoutMode !== "fullTable") {
      setState({
        layoutMode: layoutMode === "default" ? "collapse" : "default",
      });
    }
  };

  return (
    <>
      <Col
        {...BASE_LAYOUT[layoutMode].table} // layout
        className={`pr-3 transition-ease`}
      >
        <ElementTable
          title={title}
          scroll={{ x: 1000 }}
          classNameHeader={"custom-header"}
          styleMain={{ marginTop: 0 }}
          styleContainerButtonHeader={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingRight: 35,
          }}
          buttonHeader={[
            ...(checkRole(roleSave)
              ? [
                  {
                    type: "create",
                    title: "Thêm mới [F1]",
                    onClick: handleClickedBtnAdded,
                    buttonHeaderIcon: (
                      <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
                    ),
                  },
                ]
              : []),
            {
              className: `btn-change-full-table ${
                layoutMode === "fullTable" ? "small" : "large"
              }`,
              title: (
                <Icon
                  component={layoutMode === "fullTable" ? thuNho : showFull}
                />
              ),
              onClick: changeFullScreen,
            },
            {
              className: "btn-collapse",
              title: (
                <Icon
                  component={
                    layoutMode === "collapse" ? extendTable : extendChiTiet
                  }
                />
              ),
              onClick: handleCollapsePane,
            },
          ]}
          getColumns={getColumns}
          dataSource={listData}
          layerIds={refLayerHotKey.current}
          dataEdit={dataEditDefault}
          refClickBtnAdd={refClickBtnAdd}
          rowKey={rowKey}
          updateData={updateData}
          page={page}
          size={size}
          totalElements={totalElements}
          getData={getData}
          dataSearch={dataSearch}
          dataSort={dataSort}
          customOnSelectRow={customOnSelectRow}
        />
      </Col>
      <Col
        {...BASE_LAYOUT[layoutMode].form}
        className={`mt-3 transition-ease dm-focus-border`}
      >
        <MultiLevelTab
          ref={refTab}
          listPanel={listPanel({ layerIds: refLayerHotKey.current })}
          isBoxTabs={true}
          activeKey={state.activeKeyTab}
          onChange={onChangeTab}
          layerIds={refLayerHotKey.current}
        />
      </Col>
    </>
  );
};
export default connect(({ phimTat: { hotKeys } }) => ({ hotKeys }))(
  DanhMucCap2
);
