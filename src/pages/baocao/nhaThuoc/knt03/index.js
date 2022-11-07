import { Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";

/**
 * KNT03. Bảng chi tiết thu quầy thuốc theo ngày
 *
 */
const KNT03 = ({
  listAllKho,
  listloaiDichVuKho,
  listAllHangHoa,
  listNhanVien,
  MA_THU_NGAN,

  getAllKho,
  onSearchAllDichVuTonKho,
  getListPhanLoaiThuoc,
  getThietLap,
  getListNhanVienTongHop,

  getKnt03,
}) => {
  useEffect(() => {
    // getAllKho({ nhapTuNcc: true, active: true });
    // getListHangHoa({ page: 0, size: 9999, active: true });
    getThietLap({ ma: "MA_THU_NGAN" }).then((dsMaVaiTro) => {
      getListNhanVienTongHop({ dsMaVaiTro });
    });
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
      getListNhanVienTongHop({ dsMaVaiTro: MA_THU_NGAN, khoId: value });
      onChange("khoId")();
    }
    onChange(key)(value);
  };
  const handleChange = (key, onChange) => (value) => {
    if (["dsThuNganId"].some((item) => item === key)) {
      if (value.length > 0) onChange(key)(value.filter((item) => item));
      else onChange(key)([""]);
    }
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
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label
              // onClick={() => openInNewTab("/danh-muc/quay-tiep-don")}
              className="label-filter"
            >
              Thu ngân<span className="required">*</span>
            </label>
            <Select
              mode="multiple"
              onChange={handleChange("dsThuNganId", onChange)}
              value={_state.dsThuNganId}
              className="input-filter"
              placeholder={"Chọn thu ngân"}
              data={[{ id: "", ten: "Tất cả" }, ...(listNhanVien || [])]}
            />
            {_state.clickedSubmit && !_state.dsThuNganId && (
              <div className="error">Vui lòng chọn thu ngân!</div>
            )}
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
    dsThuNganId: _state.dsThuNganId,
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
        title="KNT03. Bảng chi tiết thu quầy thuốc theo ngày"
        renderFilter={renderFilter}
        beforeOk={beforeOk}
        getBc={getKnt03}
        handleDataSearch={handleDataSearch}
        initState={{
          dsThuNganId: "",
        }}
        breadcrumb={[{ title: "KNT03", link: "/bao-cao/knt03" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listAllKho: state.kho.listAllKho,
    listloaiDichVuKho: state.phanLoaiThuoc.listPhanLoaiThuoc,
    listAllHangHoa: state.tonKho.listAllHangHoa,
    listNhanVien: state.nhanVien.listNhanVien || [],
    MA_THU_NGAN: state.thietLap.dataMA_THU_NGAN || "",
  }),
  ({
    kho: { getAllTongHop: getAllKho },
    tonKho: { onSearchAllDichVuTonKho },
    baoCaoDaIn: { getKnt03 },
    phanLoaiThuoc: { getListPhanLoaiThuoc },
    thietLap: { getThietLap },
    nhanVien: { getListNhanVienTongHop },
  }) => ({
    getAllKho,
    getListPhanLoaiThuoc,
    onSearchAllDichVuTonKho,
    getKnt03,
    getThietLap,
    getListNhanVienTongHop,
  })
)(KNT03);
