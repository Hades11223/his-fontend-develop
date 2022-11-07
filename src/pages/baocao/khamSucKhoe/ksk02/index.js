import React, { useState } from "react";
import { Col, message, Row } from "antd";
import dmDoiTacProvider from "data-access/categories/dm-doi-tac-provider";
import dmHopDongKskProvider from "data-access/dm-hop-dong-ksk-provider";
import { connect } from "react-redux";
import SelectLoadMore from "components/SelectLoadMore";
import BaseBaoCao from "pages/baocao/BaseBaoCao";

const mapData = (i) => ({
  value: i.id,
  label: i.ma + " - " + i.ten,
});

const addParam = { dsLoaiDoiTac: 40, active: true };
// const addParamHopDong = { active: true };

const Index = ({ getKsk02 }) => {
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
              addParam={addParam}
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

  const beforeOk =
    ({ _state, _beforeOk }) =>
    () => {
      if (!_state.hopDongKskId) {
        message.error("Vui lòng chọn hợp đồng ksk");
        return false;
      }
      if (!_state.doiTacId) {
        message.error("Vui lòng chọn công ty ksk");
        return false;
      }
      return _beforeOk();
    };

  return (
    <BaseBaoCao
      title="KSK02. Báo cáo thanh toán chi phí khám sức khỏe hợp đồng theo công ty"
      renderFilter={renderFilter}
      getBc={getKsk02}
      handleDataSearch={handleDataSearch}
      beforeOk={beforeOk}
      breadcrumb={[{ title: "KSK02", link: "/bao-cao/ksk02" }]}
    />
  );
};

export default connect(
  () => ({}),
  ({ baoCaoDaIn: { getKsk02 } }) => ({
    getKsk02,
  })
)(Index);
