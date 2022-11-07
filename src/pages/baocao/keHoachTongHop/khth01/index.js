import React from "react";
import { Col, DatePicker, message, Row } from "antd";
import { Select } from "components";
import moment from "moment";
import { useDispatch } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { useTranslation } from "react-i18next";
import { Main } from "./styled";

/**
 * KHTH01. Báo cáo hoạt động chuyên môn của trung tâm
 *
 */

const Index = () => {
  const { t } = useTranslation();
  const {
    baoCaoDaIn: { getKhth01 },
  } = useDispatch();

  const renderFilter = ({ onChange, _state }) => {
    return (
      <>
        <Row>
          <Col span={6}>
            <div className="item-date">
              <label className="label-filter">
                {t("baoCao.nam")}
                <span className="red required">*</span>
              </label>
              <DatePicker
                showTime={{ defaultValue: moment().startOf("year") }}
                value={_state.nam}
                onChange={onChange("nam")}
                placeholder={t("baoCao.chonNam")}
                className="input-filter"
                picker="year"
              />
              {!_state.isValidData && !_state.nam && (
                <div className="error">{t("baoCao.vuiLongChonNam")}</div>
              )}
            </div>
          </Col>
          <Col span={6}>
            <div className="item-select">
              <label className="label-filter">
                {t("baoCao.quy")}
              </label>
              <Select
                className="input-filter"
                placeholder={t("baoCao.chonQuy")}
                data={[
                  { id: "", ten: t("common.tatCa") },
                  { id: 1, ten: `${t("baoCao.quy")} 1 (Tháng 1, 2, 3)` },
                  { id: 2, ten: `${t("baoCao.quy")} 2 (Tháng 4, 5, 6)` },
                  { id: 3, ten: `${t("baoCao.quy")} 3 (Tháng 7, 8, 9)` },
                  { id: 4, ten: `${t("baoCao.quy")} 4 (Tháng 10, 11, 12)` },
                ]}
                onChange={onChange("quy")}
                value={_state.quy}
              />
              {!_state.isValidData && !_state.quy && (
                <div className="error">{t("baoCao.vuiLongChonQuy")}</div>
              )}
            </div>
          </Col>
          <Col span={6}>
            <div className="item-select">
              <label className="label-filter">
                {t("baoCao.thang")}
              </label>
              <Select
                value={_state.thang}
                onChange={onChange("thang")}
                placeholder={t("baoCao.chonThang")}
                className="input-filter"
                data={[
                  { id: "", ten: t("common.tatCa") },
                  { id: 1, ten: `${t("baoCao.thang")} 1` },
                  { id: 2, ten: `${t("baoCao.thang")} 2` },
                  { id: 3, ten: `${t("baoCao.thang")} 3` },
                  { id: 4, ten: `${t("baoCao.thang")} 4` },
                  { id: 5, ten: `${t("baoCao.thang")} 5` },
                  { id: 6, ten: `${t("baoCao.thang")} 6` },
                  { id: 7, ten: `${t("baoCao.thang")} 7` },
                  { id: 8, ten: `${t("baoCao.thang")} 8` },
                  { id: 9, ten: `${t("baoCao.thang")} 9` },
                  { id: 10, ten: `${t("baoCao.thang")} 10` },
                  { id: 11, ten: `${t("baoCao.thang")} 11` },
                  { id: 12, ten: `${t("baoCao.thang")} 12` },
                ]}
              />
              {!_state.isValidData && !_state.thang && (
                <div className="error">{t("baoCao.vuiLongChonThang")}</div>
              )}
            </div>
          </Col>
        </Row>
      </>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    nam: moment(_state.nam).format("YYYY"),
    thang: _state.thang,
    quy: _state.quy,
  });

  const beforeOk =
    ({ _state, _beforeOk }) =>
    () => {
      if (!_state.nam) {
        message.error(t("baoCao.vuiLongChonNam"));
        return false;
      }
      return _beforeOk();
    };

  return (
  <Main>
    <BaseBaoCao
      title={t("baoCao.khth01")}
      renderFilter={renderFilter}
      getBc={getKhth01}
      handleDataSearch={handleDataSearch}
      beforeOk={beforeOk}
      initState={{
        nam: moment(moment(), "YYYY"),
        thang: [""],
        quy: [""],
      }}
      breadcrumb={[{ title: "KHTH01", link: "/bao-cao/khth-01" }]}
    />
  </Main>
  );
};

export default Index;
