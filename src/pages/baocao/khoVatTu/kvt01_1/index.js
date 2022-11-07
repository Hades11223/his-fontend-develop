import { Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";

/**
 * KVT01.1. Báo cáo nhập kho theo nhà cung cấp
 *
 */

const hinhThuc = [
  { id: true, ten: "Trong thầu" },
  { id: false, ten: "Ngoài thầu" },
];

const K01 = ({
  listAllKho,
  listNCC,
  listAllQuyetDinhThau,
  listAllSoHoaDon,

  getUtils,
  getAllKho,
  getListTongHopNhaSanXuat,
  getListAllQuyetDinhThau,
  getAllSoHoaDon,
  getk01,
  ...props
}) => {
  useEffect(() => {
    getAllKho({ nhapTuNcc: true, active: true });
    getListTongHopNhaSanXuat({ loaiNhaSanXuat: 20, active: true });
    getListAllQuyetDinhThau({ active: true });
    getAllSoHoaDon({ size: 9999, active: true });
  }, []);

  const handleChange = (key, onChange) => (value) => {
    if (key === "khoId") {
      getAllSoHoaDon({ size: 9999, active: true, khoId: value });
    }
    if (key === "nhaCungCapIds") {
      getAllSoHoaDon({ size: 9999, active: true, nhaCungCapId: value });
    }
    onChange(key)(value);
  };

  const renderFilter = ({ onChange, _state }) => {
    return (
      <Row>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-date">
            <label
              // onClick={() => openInNewTab("/danh-muc/quay-tiep-don")}
              style={{ color: _state.tuNgay ? "" : "red" }}
              className="label-filter"
            >
              Từ ngày
              <span style={{ color: "red" }}>*</span>
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
        <Col md={6} xl={6} xxl={6}>
          <div className="item-date">
            <label
              style={{ color: _state.denNgay ? "" : "red" }}
              className="label-filter"
            >
              Đến ngày
              <span style={{ color: "red" }}>*</span>
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
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">
              Kho <span className="icon-required">*</span>
            </label>
            <Select
              className="input-filter"
              placeholder={"Chọn kho"}
              data={listAllKho || []}
              onChange={handleChange("khoId", onChange)}
              value={_state.khoId}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Nhà cung cấp</label>
            <Select
              mode="multiple"
              showArrow
              onChange={handleChange("nhaCungCapIds", onChange)}
              value={_state.nhaCungCapIds}
              className="input-filter"
              placeholder={"Chọn nhà cung cấp"}
              data={[{ id: "", ten: "Tất cả" }, ...(listNCC || [])]}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Hình thức trong/ ngoài thầu</label>
            <Select
              onChange={onChange("hinhThucThau")}
              value={_state.hinhThucThau}
              className="input-filter"
              placeholder={"Chọn hình thức trong/ ngoài thầu"}
              data={[{ id: "", ten: "Tất cả" }, ...(hinhThuc || [])]}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Quyết định thầu</label>
            <Select
              onChange={onChange("quyetDinhThauId")}
              value={_state.quyetDinhThauId}
              className="input-filter"
              placeholder={"Chọn quyết định thầu"}
              data={[
                { id: "", ten: "Tất cả" },
                ...(listAllQuyetDinhThau || []).map((item) => ({
                  ...item,
                  ten: item.goiThau,
                })),
              ]}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Số hóa đơn</label>
            <Select
              onChange={onChange("soHoaDon")}
              value={_state.soHoaDon}
              className="input-filter"
              placeholder={"Chọn số hóa đơn"}
              data={[{ id: "", ten: "Tất cả" }, ...(listAllSoHoaDon || [])]}
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
    nhaCungCapIds: _state.nhaCungCapIds,
    trongThau: _state.hinhThucThau,
    quyetDinhThauId: _state.quyetDinhThauId,
    soHoaDon: _state.soHoaDon,
    loaiThoiGian: _state.loaiThoiGian,
  });

  const beforeOk =
    ({ _state, _beforeOk }) =>
    () => {
      if (!_state.khoId) {
        message.error("Vui lòng chọn kho");
        return false;
      }
      return _beforeOk();
    };
  return (
    <Main>
      <BaseBaoCao
        title="KVT01.1. Báo cáo nhập kho theo nhà cung cấp"
        renderFilter={renderFilter}
        beforeOk={beforeOk}
        // getBc={getk01}
        handleDataSearch={handleDataSearch}
        breadcrumb={[{ title: "KVT01.1", link: "/bao-cao/kvt01_1" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listAllKho: state.kho.listAllKho || [],
    listNCC: state.nhaSanXuat.listNCC || [],
    listAllQuyetDinhThau: state.quyetDinhThau.listAllQuyetDinhThau || [],
    listAllSoHoaDon: state.nhapKho.listAllSoHoaDon || [],
  }),
  ({
    utils: { getUtils },
    nhaSanXuat: { getListTongHopNhaSanXuat },
    quyetDinhThau: { getListAllQuyetDinhThau },
    nhapKho: { getAllSoHoaDon },
    baoCaoDaIn: { getk01 },
    ...state
  }) => ({
    getk01,
    getAllKho: state.kho.getAllTongHop,
    getListTongHopNhaSanXuat,
    getListAllQuyetDinhThau,
    getAllSoHoaDon,
  })
)(K01);
