import Icon from "@ant-design/icons";
import { Col } from "antd";
import { checkRole } from "utils/role-utils";
import IcCreate from "assets/images/kho/IcCreate.png";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import extendTable from "assets/svg/extendTable.svg";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import {
  ADD_LAYOUT,
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT,
  TABLE_LAYOUT_COLLAPSE,
} from "constants/index";
import stringUtils from "mainam-react-native-string-utils";
import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import ElementTable from "../common/ElementTable";
import MultiLevelTab from "components/MultiLevelTab";

import { Main } from "./styled";

const BaseDmTabForm = ({
  dataEditDefault,

  updateData,
  listPanel = () => [],
  listData,
  getData = () => {},
  getColumns,
  hotKeys,
  totalElements,
  page,
  size,
  customHandleClickedBtnAdded,
  customOnSelectRow,

  title,
  roleSave,
  roleEdit,
  dataSearch = {},
  dataSort = {},
  rowKey,
}) => {
  const [collapseStatus, setCollapseStatus] = useState(false);

  const [state, _setState] = useState({
    showFullTable: false,
    activeKeyTab: "0",
  });

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
  };
  refClickBtnAdd.current = handleClickedBtnAdded;

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
  const onChangeTab = (activeKeyTab) => {
    onAddLayer({ layerId: refLayerHotKey.current[activeKeyTab] });
    setState({ activeKeyTab });
  };
  return (
    <>
      <Col
        {...(!state.showFullTable
          ? collapseStatus
            ? TABLE_LAYOUT_COLLAPSE
            : TABLE_LAYOUT
          : null)}
        span={state.showFullTable ? 24 : null}
        className={`pr-3 ${state.changeShowFullTbale ? "" : "transition-ease"}`}
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
          buttonHeader={
            checkRole(roleSave)
              ? [
                  {
                    title: "Thêm mới [F1]",
                    type: "create",
                    onClick: handleClickedBtnAdded,
                    buttonHeaderIcon: (
                      <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
                    ),
                  },
                  {
                    className: `btn-change-full-table ${
                      state?.showFullTable ? "small" : "large"
                    }`,
                    title: (
                      <Icon
                        component={state.showFullTable ? thuNho : showFull}
                      />
                    ),
                    onClick: handleChangeshowTable,
                  },

                  {
                    className: "btn-collapse",
                    title: (
                      <Icon
                        component={collapseStatus ? extendTable : extendChiTiet}
                      />
                    ),
                    onClick: handleCollapsePane,
                  },
                ]
              : [
                  {
                    className: `btn-change-full-table ${
                      state?.showFullTable ? "small" : "large"
                    }`,
                    title: (
                      <Icon
                        component={state.showFullTable ? thuNho : showFull}
                      />
                    ),
                    onClick: handleChangeshowTable,
                  },
                  {
                    className: "btn-collapse",
                    title: (
                      <Icon
                        component={collapseStatus ? extendTable : extendChiTiet}
                      />
                    ),
                    onClick: handleCollapsePane,
                  },
                ]
          }
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
      {!state.showFullTable && (
        <Col
          {...(collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
          className={`mt-3 ${
            state.changeShowFullTbale ? "" : "transition-ease"
          }`}
        >
          <MultiLevelTab
            listPanel={listPanel({ layerIds: refLayerHotKey.current })}
            isBoxTabs={true}
            activeKey={state.activeKeyTab}
            onChange={onChangeTab}
            layerIds={refLayerHotKey.current}
          />
        </Col>
      )}
    </>
  );
};
export default connect(({ phimTat: { hotKeys } }) => ({ hotKeys }))(
  BaseDmTabForm
);
