import { Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";

/**
 * KNT05. Bảng kê bán hàng tổng hợp
 *
 */
const KNT05 = ({
  listAllKho,
  listloaiDichVuKho,
  listAllHangHoa,

  getAllKho,
  onSearchAllDichVuTonKho,
  getListPhanLoaiThuoc,

  getKnt05,
}) => {
  useEffect(() => {
    // getAllKho({ nhapTuNcc: true, active: true });
    // getListHangHoa({ page: 0, size: 9999, active: true });
    getListPhanLoaiThuoc({ active: true, size: 999 });
    getAllKho({ nhaThuoc: true, active: true });
    onSearchAllDichVuTonKho({
      page: 0,
      size: 9999,
      dataSearch: {
        active: true,
      },
    });
  }, []);

  // const customChange = (name, onChange) => (e) => {
  //   if (name === "khoId") {
  //     getListHangHoa({ page: 0, size: 9999, active: true, khoId: e });
  //   }
  //   onChange(name)(e);
  // };

  const customChange = (key, onChange) => (value) => {
    if (key === "khoId") {
      onSearchAllDichVuTonKho({
        page: 0,
        size: 9999,
        dataSearch: {
          active: true,
          khoId: value,
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
              onChange={customChange("khoId", onChange)}
              value={_state.khoId}
            />
          </div>
        </Col>
        {/* <Col md={6} xl={6} xxl={6}></Col>

        <Col md={6} xl={6} xxl={6}>
          <div className="item-select checkbox-pl">
            <Checkbox
              className="label-filter"
              checked={_state.hienThiPhanLoaiHangHoa}
              onChange={onChange("hienThiPhanLoaiHangHoa")}
            >
              Hiển thị phân loại hàng hóa
            </Checkbox>
          </div>
        </Col>

        <Col md={6} xl={6} xxl={6}>
          <div className="item-select checkbox-pl">
            <Checkbox
              className="label-filter"
              checked={_state.hienThiMaHangHoa}
              onChange={onChange("hienThiMaHangHoa")}
            >
              Hiển thị mã hàng hóa
            </Checkbox>
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select checkbox-pl">
            <Checkbox
              className="label-filter"
              checked={_state.hienThiTenHoatChat}
              onChange={onChange("hienThiTenHoatChat")}
            >
              Hiển thị tên hoạt chất
            </Checkbox>
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}></Col>

         */}
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Phân loại hàng hóa</label>
            <Select
              onChange={onChange("phanLoaiDvKhoId")}
              value={_state.phanLoaiDvKhoId}
              className="input-filter"
              placeholder={"Chọn phân loại hàng hóa"}
              mode="multiple"
              data={[...(listloaiDichVuKho || [])]}
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
      </Row>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    loaiThoiGian: _state.loaiThoiGian,
    tuNgay: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
    denNgay: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
    khoId: _state.khoId,
    dichVuId: _state.dichVuId,
    dsPhanLoaiDvKhoId: _state.phanLoaiDvKhoId,
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
        title="KNT05. Bảng kê bán hàng tổng hợp"
        renderFilter={renderFilter}
        beforeOk={beforeOk}
        getBc={getKnt05}
        handleDataSearch={handleDataSearch}
        // initState={{
        //   hienThiPhanLoaiHangHoa: true,
        //   hienThiMaHangHoa: true,
        //   hienThiTenHoatChat: true,
        // }}
        breadcrumb={[{ title: "KNT05", link: "/bao-cao/knt05" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listAllKho: state.kho.listAllKho,
    listloaiDichVuKho: state.phanLoaiThuoc.listPhanLoaiThuoc,
    listAllHangHoa: state.tonKho.listAllHangHoa,
  }),
  ({
    kho: { getAllTongHop: getAllKho },
    tonKho: { onSearchAllDichVuTonKho },
    baoCaoDaIn: { getKnt05 },
    phanLoaiThuoc: { getListPhanLoaiThuoc },
  }) => ({
    getAllKho,
    getListPhanLoaiThuoc,
    onSearchAllDichVuTonKho,
    getKnt05,
  })
)(KNT05);
