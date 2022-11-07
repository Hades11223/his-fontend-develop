import { Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";

/**
 * KNT04. Báo cáo chi tiết thu tiền quầy thuốc
 *
 */

const KNT04 = ({
  listAllKho = [],
  listAllHangHoa,
  listNhanVien,

  getAllKho,
  getListNhanVienTongHop,
  onSearchAllDichVuTonKho,
  getKnt04,
}) => {
  useEffect(() => {
    getAllKho({ nhaThuoc: true, active: true });
    getListNhanVienTongHop({
      page: 0,
      size: 9999,
      active: true,
      "vanBang.ma": "bs",
    });
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
      onChange("dichVuId")([""]);
    }
    if (["dsKhoId", "dichVuId", "dsBacSiId"].some((k) => k === key)) {
      if (value.length > 0) onChange(key)(value.filter((item) => item));
      else onChange(key)([""]);
    } else onChange(key)(value);
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
              onChange={handleChange("dsKhoId", onChange)}
              value={_state.dsKhoId}
              mode="multiple"
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">
              Tên hàng hóa
              <span className="icon-required"> *</span>
            </label>
            <Select
              onChange={handleChange("dichVuId", onChange)}
              value={_state.dichVuId}
              className="input-filter"
              placeholder={"Chọn hàng hóa"}
              data={[{ id: "", ten: "Tất cả" }, ...(listAllHangHoa || [])]}
              mode="multiple"
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Bác sĩ</label>
            <Select
              onChange={handleChange("dsBacSiId", onChange)}
              value={_state.dsBacSiId}
              className="input-filter"
              placeholder={"Chọn bác sĩ khám"}
              data={[{ id: "", ten: "Tất cả" }, ...(listNhanVien || [])]}
              mode="multiple"
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
    dsBacSiId: _state.dsBacSiId,
    sort: "",
  });

  const beforeOk =
    ({ _state, _beforeOk }) =>
    () => {
      if (!_state.dsKhoId && _state.dsKhoId != "") {
        message.error("Vui lòng chọn kho");
        return false;
      }
      if (!_state.dichVuId && _state.dichVuId != "") {
        message.error("Vui lòng chọn hàng hóa");
        return false;
      }
      return _beforeOk();
    };
  return (
    <Main>
      <BaseBaoCao
        title="KNT04. Báo cáo chi tiết thu tiền quầy thuốc"
        renderFilter={renderFilter}
        beforeOk={beforeOk}
        getBc={getKnt04}
        handleDataSearch={handleDataSearch}
        initState={{
          dichVuId: [""],
          dsBacSiId: [""],
        }}
        breadcrumb={[{ title: "KNT04", link: "/bao-cao/knt04" }]}
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
    baoCaoDaIn: { getKnt04 },
    kho: { getAllTongHop: getAllKho },
    nhanVien: { getListNhanVienTongHop },
    tonKho: { onSearchAllDichVuTonKho },
  }) => ({
    getKnt04,
    getAllKho,
    getListNhanVienTongHop,
    onSearchAllDichVuTonKho,
  })
)(KNT04);
