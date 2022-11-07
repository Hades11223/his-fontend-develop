import React, { useState } from "react";
import { Col, Row } from "antd";
import dmDoiTacProvider from "data-access/categories/dm-doi-tac-provider";
import dmHopDongKskProvider from "data-access/dm-hop-dong-ksk-provider";
import { connect } from "react-redux";
import SelectLoadMore from "components/SelectLoadMore";
import BaseBaoCao from "pages/baocao/BaseBaoCao";

// const addParamHopDong = { active: true };
const addParamDoiTac = { dsLoaiDoiTac: 40, active: true };
const mapData = (i) => ({
  value: i.id,
  label: i.ma + " - " + i.ten,
});

const Index = ({ getKsk01 }) => {
  const [addParamHopDong, setParamHopDong] = useState({ active: true });
  const onChangeDoiTac = (onChange) => (value) => {
    setParamHopDong({ ...addParamHopDong, doiTacId: value });
    onChange("doiTacId")(value);
    onChange("hopDongKskId")(null);
  };

  const renderFilter = ({ onChange, _state }) => {
    return (
      <Row>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-select">
            <label className="label-filter">
              Công ty KSK<span className="icon-required"> *</span>
            </label>
            <SelectLoadMore
              api={dmDoiTacProvider.searchAll}
              mapData={mapData}
              addParam={addParamDoiTac}
              onChange={onChangeDoiTac(onChange)}
              value={_state.doiTacId}
              keySearch={"ten"}
              placeholder="Chọn công ty"
              className="input-filter"
            />
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-select">
            <label className="label-filter">
              Hợp đồng KSK<span className="icon-required"> *</span>
            </label>
            <SelectLoadMore
              api={dmHopDongKskProvider.searchAll}
              mapData={mapData}
              addParam={addParamHopDong}
              onChange={onChange("hopDongKskId")}
              value={_state.hopDongKskId}
              keySearch={"ten"}
              placeholder="Chọn hợp đồng"
              className="input-filter"
            />
          </div>
        </Col>
      </Row>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    doiTacId: _state.doiTacId,
    hopDongKskId: _state.hopDongKskId,
  });

  return (
    <BaseBaoCao
      title="KSK01. Báo cáo kết quả khám sức khỏe hợp đồng"
      renderFilter={renderFilter}
      getBc={getKsk01}
      handleDataSearch={handleDataSearch}
      breadcrumb={[{ title: "KSK01", link: "/bao-cao/ksk01" }]}
    />
  );
};

export default connect(
  () => ({}),
  ({ baoCaoDaIn: { getKsk01 } }) => ({
    getKsk01,
  })
)(Index);
