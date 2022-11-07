import { Col, DatePicker, Row, message } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useStore } from "hook";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { GlobalStyle, Main } from "./styled";
import { useTranslation } from "react-i18next";
/**
 * TC17.1. Báo cáo theo dõi tình hình tạm ứng trong tháng
 *
 */

const Index = () => {
  const { t } = useTranslation();

  const {
    baoCaoDaIn: { getTc17_1 },
    toaNha: { getListAllToaNha },
  } = useDispatch();

  const listAllToaNha = useStore("toaNha.listAllToaNha", []);

  useEffect(() => {
    let param = { active: true, page: "", size: "" };
    getListAllToaNha({ ...param, page: 0 });
  }, []);

  const onCustomChange = (key, onChange) => (e) => {
    if (key === "thangNam") {
      onChange("thang")(moment(e).startOf("month"));
      onChange("nam")(moment(e).endOf("year"));
    }
    onChange(key)(e);
  };

  const renderFilter = ({ onChange, _state }) => {
    return (
      <>
        <GlobalStyle />
        <Row>
          <Col span={6}>
            <div className="item-date">
              <label className="label-filter">
                {`${t("baoCao.thang")}/${t("baoCao.nam").toLowerCase()}`}
                <span className="red required">*</span>
              </label>
              <DatePicker
                value={_state.thangNam}
                onChange={onCustomChange("thangNam", onChange)}
                placeholder={t("baoCao.chonThangNam")}
                format="MM/YYYY"
                className="input-filte"
                picker="month"
                dropdownClassName="bc-input-month"
              />
              {!_state.isValidData &&
                (!_state.thangNam) && (
                  <div className="error">{t("baoCao.vuiLongChonThangNam")}</div>
                )}
            </div>
          </Col>
          <Col span={6}>
            <div className="item-select">
              <label className="label-filter">
                {t("baoCao.nha")}
                <span className="red required">*</span>
              </label>
              <Select
                mode="multiple"
                className="input-filter"
                placeholder={t("baoCao.chonToaNha")}
                data={[{ id: "", ten: "Tất cả" }, ...listAllToaNha]}
                onChange={onChange("dsToaNhaId", true)}
                value={_state.dsToaNhaId}
              />
              {!_state.isValidData &&
                (!_state.dsToaNhaId) && (
                  <div className="error">{t("baoCao.vuiLongChonToaNha")}</div>
                )}
            </div>
          </Col>
        </Row>
      </>
    );
  };

  const handleDataSearch = ({ _state }) => {
    return {
      nam: moment(_state.nam).format("YYYY"),
      thang: moment(_state.thang).format("MM"),
      dsToaNhaId: _state.dsToaNhaId,
    };
  };

  const beforeOk =
    ({ _state, _beforeOk }) =>
    () => {
      if (!_state.thangNam) {
        message.error(t("baoCao.vuiLongChonThangNam"));
        return false;
      }
      if (!_state.dsToaNhaId) {
        message.error(t("baoCao.vuiLongChonToaNha"));
        return false;
      }
      return _beforeOk();
    };

  return (
    <Main>
      <BaseBaoCao
        title={t("baoCao.tc17.1")}
        renderFilter={renderFilter}
        getBc={getTc17_1}
        handleDataSearch={handleDataSearch}
        initState={{
          thangNam: moment(),
          dsToaNhaId: [""],
        }}
        beforeOk={beforeOk}
        breadcrumb={[{ title: "TC17.1", link: "/bao-cao/tc17.1" }]}
      />
    </Main>
  );
};

export default Index;
