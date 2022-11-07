import React, { useEffect, memo, useRef, useState } from "react";
import { Main } from "./styled";
import { Col } from "antd";
import Select from "components/Select";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const QuayTiepDon = ({ disabled, ...props }) => {
  const { t } = useTranslation();

  const [state, _setState] = useState({
    dimensionContainer: { width: 0 },
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refContainer = useRef(null);
  const { checkValidate } = useSelector((state) => state.tiepDon);
  const quayTiepDonId = useSelector((state) => state.goiSo.quayTiepDonId);
  const listAllQuayTiepDon = useSelector(
    (state) => state.quayTiepDon.listAllQuayTiepDon
  );
  const { dongQuay, tuChonQuayTiepDon } = useDispatch().goiSo;

  const onChange = (quayMoi) => {
    dongQuay({ quayHienTai: quayTiepDonId, quayMoi });
  };
  useEffect(() => {
    if (refContainer.current) {
      setState({
        dimensionContainer: refContainer.current.getBoundingClientRect(),
      });
    }
  }, [refContainer]);
  useEffect(() => {
    if (listAllQuayTiepDon?.length) tuChonQuayTiepDon(); //check chỉ khi load xong quầy tiếp đón rồi thì mới tự động chọn quầy
  }, [listAllQuayTiepDon]);
  return (
    <Main ref={refContainer}>
      <Col md={24} xl={24} xxl={24} style={{ padding: 0 }}>
        <div className="item-select">
          {!quayTiepDonId && checkValidate && (
            <label className="error">{t("tiepDon.vuiLongChonQuayTiepDon")} *</label>
          )}
          <Select
            disabled={disabled}
            getPopupContainer={(trigger) => trigger.parentNode}
            onChange={onChange}
            value={quayTiepDonId}
            className="select"
            placeholder={t("tiepDon.quayTuChon")}
            data={listAllQuayTiepDon}
            allowClear={false}
            dropdownStyle={{
              top: 40,
              width: state?.dimensionContainer?.width,
              minWidth: state?.dimensionContainer?.width,
              boxShadow: "0px 4px 4px 0px #00000040",
            }}
          ></Select>
        </div>
      </Col>
      {/* <Col md={8} style={{ paddingRight: 0, paddingLeft: 7 }}>
        <div className="button-close" onClick={() => onSave(null)}>
          <span>Đóng</span>
          <img src={require("assets/images/welcome/close.png")}></img>
        </div>
      </Col> */}
    </Main>
  );
};
export default memo(QuayTiepDon);
