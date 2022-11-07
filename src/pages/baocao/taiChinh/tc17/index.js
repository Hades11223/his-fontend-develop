import { Col, DatePicker, Row, message } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { GlobalStyle, Main } from "./styled";
import { useTranslation } from "react-i18next";

const Index = ({ listToaNha, getTc17, getListAllToaNha }) => {
  const { t } = useTranslation();

  useEffect(() => {
    getListAllToaNha({});
  }, []);

  const renderFilter = ({ onChange, _state }) => {
    return (
      <>
        <GlobalStyle />
        <Row>
          <Col span={6}>
            <div className="item-select">
              <label className="label-filter">
                {t("baoCao.chonLoaiThoiGian")}
                <span className="red required">*</span>
              </label>
              <Select
                className="input-filter"
                placeholder={t("baoCao.chonLoaiThoiGian")}
                data={[
                  { id: 1, ten: t("baoCao.theoThang") },
                  { id: 2, ten: t("baoCao.theoQuy") },
                ]}
                onChange={onChange("loaiThoiGianId", true)}
                value={_state.loaiThoiGianId}
              />
            </div>
          </Col>
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
          {_state.loaiThoiGianId === 1 ? (
            <Col span={6}>
              <div className="item-date">
                <label className="label-filter">
                  {t("baoCao.thang")}
                  <span className="red required">*</span>
                </label>
                <DatePicker
                  showTime={{ defaultValue: moment().endOf("month") }}
                  value={_state.thang}
                  onChange={onChange("thang")}
                  placeholder={t("baoCao.chonThang")}
                  format="MM"
                  className="input-filte"
                  picker="month"
                  dropdownClassName="bc-input-month"
                />
                {!_state.isValidData && !_state.thang && (
                  <div className="error">{t("baoCao.vuiLongChonThang")}</div>
                )}
              </div>
            </Col>
          ) : (
            <Col span={6}>
              <div className="item-select">
                <label className="label-filter">
                  {t("baoCao.chonQuy")}
                  <span className="red required">*</span>
                </label>
                <Select
                  className="input-filter"
                  placeholder={t("baoCao.chonQuy")}
                  data={[
                    { id: 1, ten: `${t("baoCao.quy")} 1 (Tháng 1, 2, 3)` },
                    { id: 2, ten: `${t("baoCao.quy")} 2 (Tháng 4, 5, 6)` },
                    { id: 3, ten: `${t("baoCao.quy")} 3 (Tháng 7, 8, 9)` },
                    { id: 4, ten: `${t("baoCao.quy")} 4 (Tháng 10, 11, 12)` },
                  ]}
                  onChange={onChange("quy", true)}
                  value={_state.quy}
                />
                {!_state.isValidData && !_state.quy && (
                  <div className="error">{t("baoCao.vuiLongChonQuy")}</div>
                )}
              </div>
            </Col>
          )}

          <Col span={6}>
            <div className="item-select">
              <label className="label-filter">{t("baoCao.nha")}</label>
              <Select
                mode="multiple"
                className="input-filter"
                placeholder={t("baoCao.chonToaNha")}
                data={[{ id: "", ten: "Tất cả" }, ...listToaNha]}
                onChange={onChange("dsToaNhaId", true)}
                value={_state.dsToaNhaId}
              />
            </div>
          </Col>
        </Row>
      </>
    );
  };

  function formatMonth(month) {
    const [first, second] = month;
    if (first === "0") return second;
    return month;
  }

  const handleDataSearch = ({ _state }) => {
    const obj = {
      nam: moment(_state.nam).format("YYYY"),
      dsToaNhaId: _state.dsToaNhaId,
    };

    if (_state.loaiThoiGianId === 1) {
      obj.thang = formatMonth(moment(_state.thang).format("MM"));
    } else obj.quy = _state.quy;

    return obj;
  };

  const beforeOk =
    ({ _state, _beforeOk }) =>
    () => {
      if (!_state.nam) {
        message.error("Vui lòng chọn năm!");
        return false;
      }
      // if (!_state.thang) {
      //   message.error("Vui lòng chọn tháng!");
      //   return false;
      // }
      return _beforeOk();
    };

  return (
    <Main>
      <BaseBaoCao
        title={t("baoCao.tc17BaoCaoTheoDoiTinhHinhTamUngTheoNhaThuNgan")}
        renderFilter={renderFilter}
        getBc={getTc17}
        handleDataSearch={handleDataSearch}
        initState={{
          loaiThoiGianId: 1,
          nam: moment(moment(), "YYYY"),
          thang: moment(moment(), "MM"),
          quy: moment().quarter(),
          dsToaNhaId: [""],
        }}
        beforeOk={beforeOk}
        breadcrumb={[{ title: "TC17", link: "/bao-cao/tc17" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listToaNha: state.toaNha.listAllToaNha || [],
  }),
  ({ baoCaoDaIn: { getTc17 }, toaNha: { getListAllToaNha } }) => ({
    getTc17,
    getListAllToaNha,
  })
)(Index);
