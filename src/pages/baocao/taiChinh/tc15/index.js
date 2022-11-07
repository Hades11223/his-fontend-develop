import { Col, DatePicker, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";

const Index = ({
  listToaNha,
  getTc15,
  getListAllToaNha,
}) => {

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
                Từ ngày<span className="red required">*</span>
              </label>
              <DatePicker
                showTime={{ defaultValue: moment().startOf("day") }}
                value={_state.tuNgay}
                onChange={onChange("tuNgay")}
                placeholder="Chọn ngày"
                format="DD/MM/YYYY HH:mm:ss"
                className="input-filter"
              />
              {!_state.isValidData && !_state.tuNgay && (
                <div className="error">Vui lòng chọn thời gian từ ngày!</div>
              )}
            </div>
          </Col>
          <Col span={6}>
            <div className="item-date">
              <label className="label-filter">
                Đến ngày<span className="red required">*</span>
              </label>
              <DatePicker
                showTime={{ defaultValue: moment().endOf("day") }}
                value={_state.denNgay}
                onChange={onChange("denNgay")}
                placeholder="Chọn ngày"
                format="DD/MM/YYYY HH:mm:ss"
                className="input-filter"
              />
              {!_state.isValidData && !_state.denNgay && (
                <div className="error">Vui lòng chọn thời gian đến ngày!</div>
              )}
            </div>
          </Col>
          <Col span={6}>
            <div className="item-select">
              <label className="label-filter">Nhà</label>
              <Select
                mode="multiple"
                className="input-filter"
                placeholder={"Chọn toà nhà"}
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

  const handleDataSearch = ({ _state }) => ({
    tuThoiGian: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
    denThoiGian: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
    dsToaNhaId: _state.dsToaNhaId,
  });

  const beforeOk =
    ({ _state, _beforeOk }) =>
      () => {
        return _beforeOk();
      };


  return (
    <Main>
      <BaseBaoCao
        title="TC15. Báo cáo thu và hoàn tạm ứng"
        renderFilter={renderFilter}
        getBc={getTc15}
        handleDataSearch={handleDataSearch}
        initState={{
          dsToaNhaId: [""],
        }}
        beforeOk={beforeOk}
        breadcrumb={[{ title: "TC15", link: "/bao-cao/tc15" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listToaNha: state.toaNha.listAllToaNha || [],
  }),
  ({
    baoCaoDaIn: { getTc15 },
    toaNha: { getListAllToaNha },
  }) => ({
    getTc15,
    getListAllToaNha,
  })
)(Index);
