import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Main } from "./styled";
import { Row, Col, Drawer } from "antd";
import TheoPhongKham from "../TheoPhongKham";
import DanhSachGoiNho from "../DanhSachGoiNho";
import DaTiepDon from "../DaTiepDon";
import { ROLES } from "constants/index";
import AuthWrapper from "components/AuthWrapper";
import Icon from "@ant-design/icons";
import extendTable from "assets/svg/extendTable.svg";
import { useTranslation } from "react-i18next";

const TabThongTin = ({ ...props }, ref) => {
  const { t } = useTranslation();
  const [state, _setState] = useState({ show: false });

  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };

  useImperativeHandle(ref, () => ({
    show: ({ show, ...props }) => {
      setState({ show });
    },
  }));
  const onClose = () => {
    setState({
      show: false,
    });
  };
  return (
    <Drawer
      open={!!state.show}
      width={700}
      onClose={onClose}
      title={t("tiepDon.thongKeNguoiBenh")}
      bodyStyle={{ padding: 0 }}
      headerStyle={{ paddingLeft: 5 }}
    >
      {state.show && (
        <Main>
          <AuthWrapper accessRoles={[ROLES["TIEP_DON"].DS_NHO]}>
            <DanhSachGoiNho getListGoiNho={props.getListGoiNho} />
          </AuthWrapper>
          <AuthWrapper accessRoles={[ROLES["TIEP_DON"].SL_THEO_PHONG]}>
            <TheoPhongKham />
          </AuthWrapper>
          <AuthWrapper accessRoles={[ROLES["TIEP_DON"].DS_DA_TIEP_DON]}>
            <DaTiepDon setStateParent={setState} />
          </AuthWrapper>
        </Main>
      )}
    </Drawer>
  );
};

export default forwardRef(TabThongTin);
