import React from "react";
import { Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import { useDispatch } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";
import { useTranslation } from "react-i18next";

/**
 * G03. Báo cáo chi tiết dịch vụ theo phiếu thu thanh toán 
 *
 */

const Index = () => {
  const { t } = useTranslation();
  const {
    baoCaoDaIn: { getG03 },
  } = useDispatch();

  const renderFilter = ({ onChange, _state, onKeyDownDate }) => {
    return (
      <>
        <Row>
          <Col span={6}>
            <div className="item-date">
              <label className="label-filter">
                {t("common.tuNgay")} <span className="icon-required">*</span>
              </label>
              <DatePicker
                showTime={{ defaultValue: moment().startOf("day") }}
                value={_state.tuThoiGian}
                onChange={onChange("tuThoiGian")}
                placeholder={t("common.chonNgay")}
                format="DD/MM/YYYY HH:mm:ss"
                className="input-filter"
                onKeyDown={onKeyDownDate("tuNgay")}
              />
              {!_state.isValidData && !_state.tuThoiGian && (
                <div className="error">{t("baoCao.chonTuNgay")}!</div>
              )}
            </div>
          </Col>
          <Col span={6}>
            <div className="item-date">
              <label className="label-filter">
                {t("common.denNgay")} <span className="icon-required">*</span>
              </label>
              <DatePicker
                showTime={{ defaultValue: moment().startOf("day") }}
                value={_state.denThoiGian}
                onChange={onChange("denThoiGian")}
                placeholder={t("common.chonNgay")}
                format="DD/MM/YYYY HH:mm:ss"
                className="input-filter"
                onKeyDown={onKeyDownDate("denNgay")}
              />
              {!_state.isValidData && !_state.denThoiGian && (
                <div className="error">{t("baoCao.chonDenNgay")}!</div>
              )}
            </div>
          </Col>
          <Col span={6}>
            <div className="item-select">
              <label className="label-filter">
                {t("baoCao.loaiPhieuThu")}
              </label>
              <Select
                onChange={onChange("trongGoi")}
                value={_state.trongGoi}
                className="input-filter"
                placeholder={t("baoCao.chonLoaiPhieuThu")}
                data={[
                  { id: "", ten: "Tất cả" },
                  { id: true, ten: "Phiếu thanh toán gói" },
                  { id: false, ten: "Phiếu thanh toán lẻ" },
                ]}
              />
            </div>
          </Col>
        </Row>
      </>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    tuThoiGian: moment(_state.tuThoiGian).format("YYYY-MM-DD HH:mm:ss"),
    denThoiGian: moment(_state.denThoiGian).format("YYYY-MM-DD HH:mm:ss"),
    trongGoi: _state.trongGoi,
  });

  const beforeOk =
    ({ _state, _beforeOk }) =>
    () => {
      if (!_state.tuNgay) {
        message.error(t("baoCao.chonTuNgay"));
        return false;
      }
      if (!_state.denNgay) {
        message.error(t("baoCao.chonTuNgay"));
        return false;
      }
      return _beforeOk();
    };

  return (
    <Main>
      <BaseBaoCao
        title={t("baoCao.g03")}
        renderFilter={renderFilter}
        getBc={getG03}
        handleDataSearch={handleDataSearch}
        beforeOk={beforeOk}
        breadcrumb={[{ title: "G03", link: "/bao-cao/g-03" }]}
      />
    </Main>
  );
};

export default Index;
