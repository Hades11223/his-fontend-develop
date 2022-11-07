import { Col, DatePicker, Row, message } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";
import { useTranslation } from "react-i18next";

const Index = ({
  listToaNha,
  getTc18,
  getListAllToaNha,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    getListAllToaNha({})
  }, []);

  const renderFilter = ({ onChange, _state }) => {
    return (
      <>
        <Row>
          <Col span={6}>
            <div className="item-date">
              <label className="label-filter">
                {t("baoCao.denNgay")}<span className="red required">*</span>
              </label>
              <DatePicker
                showTime={{ defaultValue: moment().endOf("day") }}
                value={_state.denNgay}
                onChange={onChange("denNgay")}
                placeholder={t("baoCao.chonNgay")}
                format="DD/MM/YYYY HH:mm:ss"
                className="input-filter"
              />
              {!_state.isValidData && !_state.denNgay && (
                <div className="error">{t("baoCao.chonDenNgay")}</div>
              )}
            </div>
          </Col>
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


  const handleDataSearch = ({ _state }) => {
    return ({
      denThoiGian: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
      dsToaNhaId: _state.dsToaNhaId,
    })
  };

  const beforeOk =
    ({ _state, _beforeOk }) =>
      () => {
        return _beforeOk();
      };


  return (
    <Main>
      <BaseBaoCao
        title={t("baoCao.tc18BaoCaoSoDuTamUngLuyKe")}
        renderFilter={renderFilter}
        getBc={getTc18}
        handleDataSearch={handleDataSearch}
        initState={{
          dsToaNhaId: [""],
        }}
        beforeOk={beforeOk}
        breadcrumb={[{ title: "TC18", link: "/bao-cao/tc18" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listToaNha: state.toaNha.listAllToaNha || [],
  }),
  ({
    baoCaoDaIn: { getTc18 },
    toaNha: { getListAllToaNha },
  }) => ({
    getTc18,
    getListAllToaNha,
  })
)(Index);
