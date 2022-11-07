import { Col, DatePicker, Row, message } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";

/**
 * K13. Báo cáo tổng hợp nhập
 *
 */
const K13 = ({
  listKhoUser,
  listSoPhieuXuat,

  getKhoTheoTaiKhoan,
  getListPhieuXuat,
  getK13,
}) => {
  useEffect(() => {
    getKhoTheoTaiKhoan({ page: 0, size: 999, active: true });
    getListPhieuXuat({
      page: 0,
      size: 9999,
      dataSearch: {
        active: true,
        dsLoaiNhapXuat: 20,
      },
    });
  }, []);

  const customChange = (name, onChange) => (e) => {
    if (name === "khoId") {
      getListPhieuXuat({
        page: 0,
        size: 9999,
        dataSearch: {
          active: true,
          dsLoaiNhapXuat: 20,
          khoId: e,
        },
      });
      onChange("soPhieu")(null);
      onChange(name)(e);
    }
  };

  const renderFilter = ({ onChange, _state, onKeyDownDate }) => {
    return (
      <Row>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-date">
            <label className="label-filter">
              Từ ngày
              <span className="icon-required"> *</span>
            </label>
            <DatePicker
              showTime={{ defaultValue: moment().startOf("day") }}
              value={_state.tuNgay}
              onChange={onChange("tuNgay")}
              placeholder="Chọn ngày"
              format="DD/MM/YYYY HH:mm:ss"
              className="input-filter"
              onKeyDown={onKeyDownDate("tuNgay")}
            />
            {!_state.isValidData && !_state.tuNgay && (
              <div className="error">Vui lòng chọn thời gian từ ngày!</div>
            )}
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-date">
            <label className="label-filter">
              Đến ngày
              <span className="icon-required"> *</span>
            </label>
            <DatePicker
              showTime={{ defaultValue: moment().endOf("day") }}
              value={_state.denNgay}
              onChange={onChange("denNgay")}
              placeholder="Chọn ngày"
              format="DD/MM/YYYY HH:mm:ss"
              className="input-filter"
              onKeyDown={onKeyDownDate("denNgay")}
            />
            {!_state.isValidData && !_state.denNgay && (
              <div className="error">Vui lòng chọn thời gian đến ngày!</div>
            )}
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">
              Kho nhập <span className="icon-required">*</span>
            </label>
            <Select
              className="input-filter"
              placeholder={"Chọn kho"}
              data={listKhoUser || []}
              onChange={customChange("khoId", onChange)}
              value={_state.khoId}
            />
          </div>
        </Col>

        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Số phiếu xuất</label>
            <Select
              onChange={onChange("soPhieu")}
              value={_state.soPhieu}
              className="input-filter"
              placeholder={"Chọn số phiếu xuất"}
              data={listSoPhieuXuat || []}
            />
          </div>
        </Col>
      </Row>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    tuNgay: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
    denNgay: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
    khoId: _state.khoId,
    soPhieu: _state.soPhieu,
  });

  const beforeOk =
    ({ _state, _beforeOk }) =>
    () => {
      if (!_state.khoId) {
        message.error("Vui lòng chọn kho nhập");
        return false;
      }
      return _beforeOk();
    };

  return (
    <Main>
      <BaseBaoCao
        title="K13. Báo cáo tổng hợp nhập"
        renderFilter={renderFilter}
        getBc={getK13}
        handleDataSearch={handleDataSearch}
        beforeOk={beforeOk}
        breadcrumb={[{ title: "K13", link: "/bao-cao/k13" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listKhoUser: state.kho.listKhoUser || [],
    listSoPhieuXuat: state.phieuXuat.listSoPhieu,
  }),
  ({
    baoCaoDaIn: { getK13 },
    kho: { getTheoTaiKhoan: getKhoTheoTaiKhoan },
    phieuXuat: { getListPhieuXuat },
  }) => ({
    getK13,
    getKhoTheoTaiKhoan,
    getListPhieuXuat,
  })
)(K13);
