import React, { useEffect } from "react";
import { Main } from "../styled";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "antd";
import Notifications from "../notifications";
import { useTranslation } from "react-i18next";

const Layout = (props) => {
  const { t } = useTranslation();
  const auth = useSelector((state) => state.auth.auth);
  const { updateData: updateDataThuocKho } = useDispatch().thuocKho;

  const { homePage, modal } = props;
  const renderBody = () => {
    return (
      <div className="content-left">
        <div className="title">
          {t("common.chaoMung")}, <b>{auth?.full_name}</b>
          <div className="content-title">{t("common.hayLuaChonChucNang")}</div>
        </div>
        {props.children}
      </div>
    );
  };
  useEffect(() => {
    updateDataThuocKho({
      dataSortColumn: {},
      dsTrangThai: [15],
      dataSearch: { dsKhoId: [] },
      tenNb: null,
    });
  }, []);
  return (
    <Main modal={modal}>
      <Row className="page-home">
        {homePage ? (
          <Col xs={24} lg={24} xl={24}>
            {renderBody()}
          </Col>
        ) : (
          <>
            <Col xs={24} lg={14} xl={12}>
              {renderBody()}
            </Col>
            <Col xs={24} lg={10} xl={12}>
              <Notifications />
            </Col>
          </>
        )}
      </Row>
    </Main>
  );
};

export default Layout;
