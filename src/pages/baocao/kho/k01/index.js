import { Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";

/**
 * Báo cáo kho: K01: Bảng kê hóa đơn nhập
 *
 */

const hinhThuc = [
  { id: true, ten: "Trong thầu" },
  { id: false, ten: "Ngoài thầu" },
];

const K01 = ({
  listKhoUser,
  listNCC,
  listAllQuyetDinhThau,
  listSoHoaDon,

  getKhoTheoTaiKhoan,
  getListTongHopNhaSanXuat,
  getListAllQuyetDinhThau,
  getPhieuNhapXuat,
  getk01,
}) => {
  useEffect(() => {
    getKhoTheoTaiKhoan({ nhapTuNcc: true, active: true });
    getListTongHopNhaSanXuat({ loaiNhaSanXuat: 20, active: true });
    getListAllQuyetDinhThau({ active: true });
    getPhieuNhapXuat({ active: true });
  }, []);

  const handleChange = (key, onChange) => (value) => {
    if (key === "khoId") {
      getPhieuNhapXuat({ size: 9999, active: true, khoId: value });

      onChange("soHoaDon")();
      onChange("quyetDinhThauId")();
    }
    if (key === "dsNhaCungCapId") {
      getPhieuNhapXuat({ size: 9999, active: true, dsNhaCungCapId: value });

      onChange("soHoaDon")();
      onChange("quyetDinhThauId")();
    }
    if (key === "trongThau" && !value) {
      onChange("quyetDinhThauId")();
    }
    if (["tuNgay", "denNgay"].some((k) => k === key)) {
      getPhieuNhapXuat({
        size: 9999,
        active: true,
        [key]: moment(value).format("DD-MM-YYYY HH:mm:ss"),
      });
    }
    onChange(key)(value);
  };

  const renderFilter = ({ onChange, _state, onKeyDownDate }) => {
    return (
      <Row>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-date">
            <label className="label-filter">
              Từ ngày <span className="icon-required">*</span>
            </label>
            <DatePicker
              showTime={{ defaultValue: moment().startOf("day") }}
              value={_state.tuNgay}
              onChange={handleChange("tuNgay", onChange)}
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
              Đến ngày <span className="icon-required">*</span>
            </label>
            <DatePicker
              showTime={{ defaultValue: moment().startOf("day") }}
              value={_state.denNgay}
              onChange={handleChange("denNgay", onChange)}
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
              Kho <span className="icon-required">*</span>
            </label>
            <Select
              className="input-filter"
              placeholder={"Chọn kho"}
              data={listKhoUser || []}
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
              onChange={handleChange("dsNhaCungCapId", onChange)}
              value={_state.dsNhaCungCapId}
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
              onChange={onChange("trongThau")}
              value={_state.trongThau}
              className="input-filter"
              placeholder={"Chọn hình thức trong/ ngoài thầu"}
              data={[{ id: "", ten: "Tất cả" }, ...(hinhThuc || [])]}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          {!(_state.trongThau === false) && (
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
                    ten: item.quyetDinhThau,
                  })),
                ]}
              />
            </div>
          )}
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Số hóa đơn</label>
            <Select
              onChange={onChange("soHoaDon")}
              value={_state.soHoaDon}
              className="input-filter"
              mode="multiple"
              placeholder={"Chọn số hóa đơn"}
              data={[{ id: "", ten: "Tất cả" }, ...(listSoHoaDon || [])]}
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
    dsNhaCungCapId: _state.dsNhaCungCapId,
    trongThau: _state.trongThau,
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
        title="K01. Bảng kê hóa đơn nhập"
        renderFilter={renderFilter}
        beforeOk={beforeOk}
        getBc={getk01}
        handleDataSearch={handleDataSearch}
        breadcrumb={[{ title: "K01", link: "/bao-cao/k01" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listKhoUser: state.kho.listKhoUser || [],
    listNCC: state.nhaSanXuat.listNCC || [],
    listAllQuyetDinhThau: state.quyetDinhThau.listAllQuyetDinhThau || [],
    listSoHoaDon: state.nhapKho.listSoHoaDon || [],
  }),
  ({
    kho: { getTheoTaiKhoan: getKhoTheoTaiKhoan },
    nhaSanXuat: { getListTongHopNhaSanXuat },
    nhapKho: { getPhieuNhapXuat },
    quyetDinhThau: { getListAllQuyetDinhThau },
    baoCaoDaIn: { getk01 },
  }) => ({
    getk01,
    getKhoTheoTaiKhoan,
    getListTongHopNhaSanXuat,
    getListAllQuyetDinhThau,
    getPhieuNhapXuat,
  })
)(K01);
