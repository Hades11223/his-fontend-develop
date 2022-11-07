import { Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";

/**
 * KNT06. Sổ theo dõi khách hàng mua thuốc kiểm soát đặt biệt
 *
 */

const KNT06 = ({
  listAllKho = [],
  listAllHangHoa,
  listNhanVien,

  getAllKho,
  getListNhanVien,
  onSearchAllDichVuTonKho,
  getKnt06,
}) => {
  useEffect(() => {
    getAllKho({ nhaThuoc: true, active: true });
    getListNhanVien({ page: 0, size: 9999, active: true, "vanBang.ma": "bs" });
    onSearchAllDichVuTonKho({
      page: 0,
      size: 9999,
      dataSearch: {
        active: true,
      },
    });
  }, []);

  const handleChange = (key, onChange) => (value) => {
    if (key === "dsKhoId") {
      onSearchAllDichVuTonKho({
        page: 0,
        size: 9999,
        dataSearch: {
          active: true,
          dsKhoId: value,
        },
      });
      onChange("dichVuId")();
    }
    onChange(key)(value);
  };

  const renderFilter = ({ onChange, _state }) => {
    return (
      <Row>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-date">
            <label className="label-filter">
              Từ ngày<span className="icon-required"> *</span>
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
            <label className="label-filter">
              Đến ngày<span className="icon-required"> *</span>
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
              Kho <span className="icon-required"> *</span>
            </label>
            <Select
              className="input-filter"
              placeholder={"Chọn kho"}
              data={listAllKho || []}
              onChange={handleChange("dsKhoId", onChange)}
              value={_state.dsKhoId}
              mode="multiple"
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Tên hàng hóa</label>
            <Select
              onChange={onChange("dichVuId")}
              value={_state.dichVuId}
              className="input-filter"
              placeholder={"Chọn hàng hóa"}
              data={[{ id: "", ten: "Tất cả" }, ...(listAllHangHoa || [])]}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Bác sĩ khám</label>
            <Select
              onChange={onChange("dsBacSiChiDinhId", true)}
              value={_state.dsBacSiChiDinhId}
              mode="multiple"
              className="input-filter"
              placeholder={"Chọn bác sĩ khám"}
              data={[{ id: "", ten: "Tất cả" }, ...(listNhanVien || [])]}
            />
          </div>
        </Col>
      </Row>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    loaiThoiGian: _state.loaiThoiGian,
    tuNgay: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
    denNgay: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
    dsKhoId: _state.dsKhoId,
    dichVuId: _state.dichVuId,
    dsBacSiChiDinhId: _state.dsBacSiChiDinhId,
  });

  const beforeOk =
    ({ _state, _beforeOk }) =>
    () => {
      if (!_state.dsKhoId || _state.dsKhoId?.length === 0) {
        message.error("Vui lòng chọn kho");
        return false;
      }
      return _beforeOk();
    };
  return (
    <Main>
      <BaseBaoCao
        title="KNT06. Sổ theo dõi khách hàng mua thuốc kiểm soát đặt biệt"
        renderFilter={renderFilter}
        beforeOk={beforeOk}
        getBc={getKnt06}
        handleDataSearch={handleDataSearch}
        breadcrumb={[{ title: "Knt06", link: "/bao-cao/knt06" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    dataSearch: state.kho.dataSearch,
    listAllKho: state.kho.listAllKho,
    listNhanVien: state.nhanVien.listNhanVien,
    listAllHangHoa: state.tonKho.listAllHangHoa,
  }),
  ({
    baoCaoDaIn: { getKnt06 },
    kho: { getAllTongHop: getAllKho },
    nhanVien: { getListNhanVien },
    tonKho: { onSearchAllDichVuTonKho },
  }) => ({
    getKnt06,
    getAllKho,
    getListNhanVien,
    onSearchAllDichVuTonKho,
  })
)(KNT06);
