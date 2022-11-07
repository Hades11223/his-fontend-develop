import React, { useEffect, useRef, useState } from "react";
import { Col, Input } from "antd";
import { HeaderSearch, HomeWrapper, TableWrapper } from "components";
import { Main } from "./styled";
import { ADD_LAYOUT, ROLES, TABLE_LAYOUT } from "constants/index";
import {
  SORT_DEFAULT,
  TABLE_LAYOUT_COLLAPSE,
  ADD_LAYOUT_COLLAPSE,
  FULL_LAYOUT_COLLAPSE,
} from "./configs";

import { checkRole } from "utils/role-utils";
import IcCreate from "assets/images/kho/IcCreate.png";
import { useDispatch, useSelector } from "react-redux";
import stringUtils from "mainam-react-native-string-utils";
import { useTranslation } from "react-i18next";
import MultiLevelTab from "components/MultiLevelTab";
import ThongTinChiTiet from "./components/ThongTinChiTiet";
import TabsCpn from "./components/TabsCpn";
import TableCpn from "./components/TableCpn";
import Icon from "@ant-design/icons";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";

const ChiPhiHapSayVTYTTaiSuDung = () => {
  const { t } = useTranslation();

  const {
    chiPhiHapSayVTYT: { updateData, onSearch },
    phimTat: { onAddLayer, onRemoveLayer, onRegisterHotkey },
  } = useDispatch();

  const [state, _setState] = useState({
    showFullTable: false,
    collapseStatus: false,
    editStatus: false,
  });

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const handleTransitionChangeTable = () => {
    setState({
      changeShowFullTable: true,
      showFullTable: !state.showFullTable,
    });
    setTimeout(() => {
      setState({
        changeShowFullTable: false,
      });
    }, 1000);
  };

  const iconExpandMinimize = [
    {
      className: `btn-change-full-table ${
        state.showFullTable ? "small" : "large"
      }`,
      title: <Icon component={state.showFullTable ? thuNho : showFull} />,
      onClick: handleTransitionChangeTable,
    },
    {
      className: "btn-collapse",
      title: (
        <Icon component={state.collapseStatus ? extendTable : extendChiTiet} />
      ),
      onClick: () => setState({ collapseStatus: !state.collapseStatus }),
    },
  ];

  // console.log("state", state);

  return (
    <Main>
      <HomeWrapper title="Danh mục">
        <Col
          {...(state.showFullTable
            ? FULL_LAYOUT_COLLAPSE
            : state.collapseStatus
            ? TABLE_LAYOUT_COLLAPSE
            : TABLE_LAYOUT)}
          className={`pr-3 ${
            state.changeShowFullTbale ? "" : "transition-ease"
          }`}
        >
          <TableCpn iconExpandMinimize={iconExpandMinimize} />
        </Col>
        {!state.showFullTable && (
          <Col
            {...(state.collapseStatus ? TABLE_LAYOUT : TABLE_LAYOUT_COLLAPSE)}
            className={`mt-3 ${
              state.changeShowFullTbale ? "" : "transition-ease"
            }`}
          >
            <TabsCpn />
          </Col>
        )}
      </HomeWrapper>
    </Main>
  );
};

export default ChiPhiHapSayVTYTTaiSuDung;
