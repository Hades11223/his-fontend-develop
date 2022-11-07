import React, { useEffect }from "react";
import { Col, DatePicker, message, Row } from "antd";
import { Select } from "components";
import moment from "moment";
import { useDispatch } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";
import { useStore } from "hook";
import { useTranslation } from "react-i18next";
import { concatString } from "utils";

/**
 * G04. Báo cáo Tổng hợp doanh thu
 *
 */

const Index = () => {
  const { t } = useTranslation();
  const listKhoaTheoTaiKhoan = useStore("khoa.listKhoaTheoTaiKhoan", []);
  const {
    khoa: { getKhoaTheoTaiKhoan },
    baoCaoDaIn: { getG04 },
  } = useDispatch();

  useEffect(() => {
    let param = { active: true, page: "", size: "" };
    getKhoaTheoTaiKhoan(param);
  }, []);

  const renderFilter = ({ onChange, _state, onKeyDownDate }) => {
    return (
      <>
        <Row>
          <Col span={6}>
            <div className="item-date">
              <label className="label-filter">
                {concatString(t("common.tuNgay"),t("common.thanhToan"))} <span className="icon-required">*</span>
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
                {concatString(t("common.denNgay"),t("common.thanhToan"))} <span className="icon-required">*</span>
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
                {t("baoCao.coSo")} <span className="icon-required">*</span>
              </label>
              <Select
                className="input-filter"
                placeholder={concatString(t("common.chon"), t("baoCao.coSo"))}
                data={listKhoaTheoTaiKhoan}
                onChange={onChange("khoaNbId")}
                value={_state.khoaNbId}
              />
              {!_state.isValidData && !_state.khoaNbId && (
                <div className="error">{t("baoCao.vuiLongChonCoSo")}!</div>
              )}
            </div>
          </Col>
        </Row>
      </>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    tuThoiGian: moment(_state.tuThoiGian).format("YYYY-MM-DD HH:mm:ss"),
    denThoiGian: moment(_state.denThoiGian).format("YYYY-MM-DD HH:mm:ss"),
    khoaNbId: _state.khoaNbId,
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
      if (!_state.khoaNbId) {
        message.error(t("baoCao.vuiLongChonCoSo"));
        return false;
      }
      return _beforeOk();
    };

  return (
    <Main>
      <BaseBaoCao
        title={t("baoCao.g04")}
        renderFilter={renderFilter}
        getBc={getG04}
        handleDataSearch={handleDataSearch}
        beforeOk={beforeOk}
        initState={{
          khoaNbId: 58,
        }}
        breadcrumb={[{ title: "G04", link: "/bao-cao/g-04" }]}
      />
    </Main>
  );
};

export default Index;
