import { Col, DatePicker, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { HOA_DON_BBBG, LOAI_VAT_TU } from "constants/index";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";

/**
 * KVT03. Báo cáo sử dụng hàng hóa KTC
 *
 */
const KVT3 = ({
  listAllKho,
  listAllKhoa,
  listHangHoa,

  getAllKho,
  getListAllKhoa,
  getListHangHoa,
  dataSearch,
  getKvt03,
}) => {
  useEffect(() => {
    getAllKho({ nhapTuNcc: true, active: true, kyThuatCao: true });
    getListAllKhoa({ active: true });
    getListHangHoa({ page: 0, size: 9999, active: true });
  }, []);

  const customChange = (name, onChange) => (e) => {
    if (name === "khoId") {
      getListHangHoa({
        dataSearch: {
          ...dataSearch,
          page: 0,
          size: 9999,
          active: true,
          khoId: e,
        },
      });
      onChange("dichVuId")();
    }
    if (name === "khoaChiDinhId") {
      getListHangHoa({
        dataSearch: {
          ...dataSearch,
          page: 0,
          size: 9999,
          active: true,
          khoaId: e,
        },
      });
      onChange("dichVuId")();
    }
    onChange(name)(e);
  };

  const renderFilter = ({ onChange, _state }) => {
    return (
      <Row>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-date">
            <label className="label-filter">
              Từ ngày
              <span className="icon-required">*</span>
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
              <span className="icon-required">*</span>
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
            <label className="label-filter">Kho</label>
            <Select
              className="input-filter"
              placeholder={"Chọn kho"}
              data={[{ id: "", ten: "Tất cả" }, ...(listAllKho || [])]}
              onChange={customChange("khoId", onChange)}
              value={_state.khoId}
            />
          </div>
        </Col>

        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Khoa</label>
            <Select
              className="input-filter"
              placeholder={"Chọn khoa"}
              data={[{ id: "", ten: "Tất cả" }, ...(listAllKhoa || [])]}
              onChange={customChange("khoaChiDinhId", onChange)}
              value={_state.khoaChiDinhId}
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
              data={[{ id: "", ten: "Tất cả" }, ...(listHangHoa || [])]}
            />
          </div>
        </Col>

        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Hóa đơn - BBBG</label>
            <Select
              className="input-filter"
              placeholder={"Chọn"}
              data={HOA_DON_BBBG}
              mode="multiple"
              onChange={customChange("hoaDon", onChange)}
              value={_state.hoaDon}
            />
          </div>
        </Col>

        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Loại vật tư</label>
            <Select
              className="input-filter"
              placeholder={"Chọn loại vật tư"}
              mode="multiple"
              data={LOAI_VAT_TU}
              onChange={onChange("loaiVatTu")}
              value={_state.loaiVatTu}
            />
          </div>
        </Col>
        {/* <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Trạng thái hàng hóa</label>
            <Select
              className="input-filter"
              placeholder={"Chọn trạng thái hàng hóa"}
              mode="multiple"
              data={[
                { id: 1, ten: "NB đã được duyệt lĩnh" },
                { id: 2, ten: "NB chưa được duyệt lĩnh" },
              ]}
              onChange={onChange("trangThaiHangHoa")}
              value={_state.trangThaiHangHoa}
            />
          </div>
        </Col> */}
      </Row>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    // loaiThoiGian: _state.loaiThoiGian,
    tuNgay: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
    denNgay: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
    khoId: _state.khoId,
    khoaChiDinhId: _state.khoaChiDinhId,
    dichVuId: _state.dichVuId,
  });

  return (
    <Main>
      <BaseBaoCao
        title="KVT03. Báo cáo sử dụng hàng hóa KTC"
        renderFilter={renderFilter}
        getBc={getKvt03}
        handleDataSearch={handleDataSearch}
        initState={{
          hoaDon: [1, 2],
        }}
        breadcrumb={[{ title: "KVT03", link: "/bao-cao/kvt03" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listAllKho: state.kho.listAllKho,
    listAllKhoa: state.khoa.listAllKhoa,
    dataSearch: state.tonKho?.dataSearch,
    listHangHoa: state.tonKho.listAllHangHoa,
    listAllHangHoa: state.tonKho.listAllHangHoa,
  }),
  ({
    utils: { getUtils },
    baoCaoDaIn: { getKvt03 },
    kho: { getAllTongHop: getAllKho },
    khoa: { getListAllKhoa },
    tonKho: { onSearchAllDichVuTonKho: getListHangHoa },
  }) => ({
    getUtils,
    getAllKho,
    getListAllKhoa,
    getListHangHoa,
    getKvt03,
    // onSearchAllDichVuTonKho,
  })
)(KVT3);
