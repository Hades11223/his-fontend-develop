import { Checkbox, Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";

/**
 * Báo cáo kho: K01.1 Bảng kê chi tiết nhập theo nhà cung cấp
 *
 */

const hinhThuc = [
  { id: true, ten: "Trong thầu" },
  { id: false, ten: "Ngoài thầu" },
];

const Index = ({
  listAllKho,
  listNhaSanXuat,
  listAllQuyetDinhThau,
  listSoHoaDon,
  listloaiDichVuKho,
  listAllPhanLoaiThuoc,

  getAllKho,
  getListTongHopNhaSanXuat,
  getListAllQuyetDinhThau,
  getPhieuNhapXuat,
  getUtils,
  getk01_1,
  getListAllPhanLoaiThuoc,
}) => {
  useEffect(() => {
    getAllKho({ nhapTuNcc: true });
    getListTongHopNhaSanXuat({ dsLoaiDoiTac: 20 });
    getListAllQuyetDinhThau({ active: true });
    getPhieuNhapXuat({ active: true });
    getUtils({ name: "loaiDichVuKho" });
    getListAllPhanLoaiThuoc({ page: "", size: "", active: true });
  }, []);

  const customChange = (key, onChange) => (value) => {
    if (key === "khoId") {
      getPhieuNhapXuat({ size: 9999, active: true, khoId: value });

      onChange("soHoaDon")();
      onChange("dsQuyetDinhThauId")([]);
    }
    if (key === "dsNhaCungCapId") {
      getPhieuNhapXuat({ size: 9999, active: true, dsNhaCungCapId: value });

      onChange("soHoaDon")();
      onChange("dsQuyetDinhThauId")([]);
    }
    // if (key === "trongThau" && !value) {
    //   onChange("dsQuyetDinhThauId")([]);
    // }
    onChange(key)(value);
  };

  const renderFilter = ({ onChange, _state, onKeyDownDate }) => {
    return (
      <>
        <Row>
          <Col md={6} xl={6} xxl={6}>
            <div className="item-date">
              <label className="label-filter">
                Từ ngày <span className="icon-required">*</span>
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
                Đến ngày <span className="icon-required">*</span>
              </label>
              <DatePicker
                showTime
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
                Kho <span className="icon-required">*</span>
              </label>
              <Select
                className="input-filter"
                placeholder={"Chọn kho"}
                data={listAllKho || []}
                onChange={customChange("khoId", onChange)}
              />
            </div>
          </Col>
          <Col md={6} xl={6} xxl={6}>
            <div className="item-select">
              <label className="label-filter">Nhà cung cấp</label>
              <Select
                mode="multiple"
                showArrow
                onChange={customChange("dsNhaCungCapId", onChange)}
                value={_state.dsNhaCungCapId}
                className="input-filter"
                placeholder={"Chọn nhà cung cấp"}
                data={[{ id: "", ten: "Tất cả" }, ...(listNhaSanXuat || [])]}
              />
            </div>
          </Col>
          <Col md={6} xl={6} xxl={6}>
            <div className="item-select">
              <label className="label-filter">
                Hình thức trong/ ngoài thầu
              </label>
              <Select
                onChange={customChange("trongThau", onChange)}
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
                  onChange={onChange("dsQuyetDinhThauId", true)}
                  value={_state.dsQuyetDinhThauId}
                  className="input-filter"
                  placeholder={"Chọn quyết định thầu"}
                  mode="multiple"
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
                placeholder={"Chọn số hóa đơn"}
                data={[{ id: "", ten: "Tất cả" }, ...(listSoHoaDon || [])]}
              />
            </div>
          </Col>
          <Col md={6} xl={6} xxl={6}>
            <div className="item-select">
              <label className="label-filter">Phân loại hàng hóa</label>
              <Select
                onChange={onChange("phanLoaiDvKhoId", true)}
                value={_state.phanLoaiDvKhoId}
                className="input-filter"
                placeholder={"Chọn phân loại hàng hóa"}
                // mode="multiple"
                data={[
                  { id: "", ten: "Tất cả" },
                  ...(listAllPhanLoaiThuoc || []),
                ]}
              />
            </div>
          </Col>
          <Col md={6} xl={6} xxl={6}>
            <div className="item-select checkbox-pl">
              <Checkbox
                checked={_state.hienThiTenTrungThau}
                onChange={onChange("hienThiTenTrungThau")}
              >
                Hiển thị tên hàng hóa theo thầu
              </Checkbox>
            </div>
          </Col>
        </Row>
        {/* <Row>
          <Col md={18} xl={18} xxl={18}>
            <Row>
              <Col md={8} xl={8} xxl={8}>
                <div className="item-select">
                  <Checkbox
                    checked={_state.hienThiKyHieuHD}
                    onChange={onChange("hienThiKyHieuHD")}
                  >
                    Hiển thị Kí hiệu hóa đơn
                  </Checkbox>
                </div>
              </Col>
              <Col md={8} xl={8} xxl={8}>
                <div className="item-select">
                  <Checkbox
                    checked={_state.hienThiHSD}
                    onChange={onChange("hienThiHSD")}
                  >
                    Hiển thị HSD
                  </Checkbox>
                </div>
              </Col>
              <Col md={8} xl={8} xxl={8}>
                <div className="item-select">
                  <Checkbox
                    checked={_state.hienThiPhanLoai}
                    onChange={onChange("hienThiPhanLoai")}
                  >
                    Hiển thị phân phân loại hàng hóa
                  </Checkbox>
                </div>
              </Col>
              <Col md={8} xl={8} xxl={8}>
                <div className="item-select">
                  <Checkbox
                    checked={_state.hienThiDVT}
                    onChange={onChange("hienThiDVT")}
                  >
                    Hiển thị ĐVT
                  </Checkbox>
                </div>
              </Col>
              <Col md={8} xl={8} xxl={8}>
                <div className="item-select">
                  <Checkbox
                    checked={_state.hienThiSoQuyetDinh}
                    onChange={onChange("hienThiSoQuyetDinh")}
                  >
                    Hiển thị số quyết định
                  </Checkbox>
                </div>
              </Col>
              <Col md={8} xl={8} xxl={8}>
                <div className="item-select">
                  <Checkbox
                    checked={_state.hienThiSoPhieu}
                    onChange={onChange("hienThiSoPhieu")}
                  >
                    Hiển thị số phiếu
                  </Checkbox>
                </div>
              </Col>
            </Row>
          </Col>
        </Row> */}
      </>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    loaiThoiGian: _state.loaiThoiGian,
    tuNgay: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
    denNgay: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
    khoId: _state.khoId,
    dsNhaCungCapId: _state.dsNhaCungCapId,
    trongThau: _state.trongThau,
    dsQuyetDinhThauId:
      _state.trongThau === false ? null : _state.dsQuyetDinhThauId,
    soHoaDon: _state.soHoaDon,
    // hienThiPhanLoai: _state.hienThiPhanLoai,
    // hienThiSoPhieu: _state.hienThiSoPhieu,
    // hienThiSoQuyetDinh: _state.hienThiSoQuyetDinh,
    // hienThiKyHieuHD: _state.hienThiKyHieuHD,
    // hienThiDVT: _state.hienThiDVT,
    // hienThiHSD: _state.hienThiHSD,
    // dsPhanLoaiDvKhoId: _state.dsPhanLoaiDvKhoId,
    phanLoaiDvKhoId: _state.phanLoaiDvKhoId,
    hienThiTenTrungThau: _state.hienThiTenTrungThau,
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
        title="K01.1 Bảng kê chi tiết nhập theo nhà cung cấp"
        renderFilter={renderFilter}
        beforeOk={beforeOk}
        getBc={getk01_1}
        handleDataSearch={handleDataSearch}
        // initState={{
        //   hienThiPhanLoai: true,
        //   hienThiSoPhieu: true,
        //   hienThiSoQuyetDinh: true,
        //   hienThiKyHieuHD: true,
        //   hienThiDVT: true,
        //   hienThiHSD: true,
        // }}
        breadcrumb={[{ title: "K01.1", link: "/bao-cao/k01_1" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listAllKho: state.kho.listAllKho || [],
    listNhaSanXuat: state.nhaSanXuat.listNhaSanXuat || [],
    listAllQuyetDinhThau: state.quyetDinhThau.listAllQuyetDinhThau || [],
    listSoHoaDon: state.nhapKho.listSoHoaDon || [],
    listloaiDichVuKho: state.utils.listloaiDichVuKho || [],
    listAllPhanLoaiThuoc: state.phanLoaiThuoc.listAllPhanLoaiThuoc || [],
  }),
  ({
    kho: { getAllTongHop: getAllKho },
    nhaSanXuat: { getListTongHopNhaSanXuat },
    nhapKho: { getPhieuNhapXuat },
    utils: { getUtils },
    baoCaoDaIn: { getk01_1 },
    quyetDinhThau: { getListAllQuyetDinhThau },
    phanLoaiThuoc: { getListAllPhanLoaiThuoc },
  }) => ({
    getk01_1,
    getAllKho,
    getListTongHopNhaSanXuat,
    getPhieuNhapXuat,
    getUtils,
    getListAllQuyetDinhThau,
    getListAllPhanLoaiThuoc,
  })
)(Index);
