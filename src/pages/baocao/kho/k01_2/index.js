import { Checkbox, Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";

/**
 * K01.2. Báo cáo nhập theo hàng hóa
 *
 */

const hinhThuc = [
  { id: true, ten: "Trong thầu" },
  { id: false, ten: "Ngoài thầu" },
];

const Index = ({
  listKhoUser = [],
  listNCC,
  listAllQuyetDinhThau,
  listAllSoHoaDon,
  listloaiDichVuKho,
  listAllHangHoa = [],

  getKhoTheoTaiKhoan,
  getListTongHopNhaSanXuat,
  getUtils,
  getListAllQuyetDinhThau,
  onSearchAllDichVuTonKho,
  getk01_2,
  ...props
}) => {
  useEffect(() => {
    getKhoTheoTaiKhoan({ page: 0, size: 999, active: true, nhapTuNcc: true });
    getListTongHopNhaSanXuat({ loaiNhaSanXuat: 20, active: true });
    getUtils({ name: "loaiDichVuKho", active: true });
    getListAllQuyetDinhThau({ active: true });
    onSearchAllDichVuTonKho({
      page: 0,
      size: 9999,
      dataSearch: {
        active: true,
      },
    });
  }, []);

  const handleChange = (key, onChange) => (value) => {
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

  const renderFilter = ({ onChange, _state, onKeyDownDate }) => {
    return (
      <>
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
                onKeyDown={onKeyDownDate("tuNgay")}
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
              <label className="label-filter">
                Hình thức trong/ ngoài thầu
              </label>
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
                    ten: item.quyetDinhThau,
                  })),
                ]}
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
    nhaCungCapIds: _state.nhaCungCapIds,
    trongThau: _state.hinhThucThau,
    quyetDinhThauId: _state.quyetDinhThauId,
    dichVuId: _state.dichVuId,
    // soHoaDon: _state.soHoaDon,
    // hienThiPhanLoai: _state.hienThiPhanLoai,
    // hienThiSoPhieu: _state.hienThiSoPhieu,
    // hienThiSoQuyetDinh: _state.hienThiSoQuyetDinh,
    // hienThiKyHieuHD: _state.hienThiKyHieuHD,
    // hienThiDVT: _state.hienThiDVT,
    // hienThiHSD: _state.hienThiHSD,
    // phanLoaiDvKhoId: _state.phanLoaiDvKhoId,
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
        title="K01.2. Báo cáo nhập theo hàng hóa"
        renderFilter={renderFilter}
        beforeOk={beforeOk}
        getBc={getk01_2}
        handleDataSearch={handleDataSearch}
        // initState={{
        //   hienThiPhanLoai: true,
        //   hienThiSoPhieu: true,
        //   hienThiSoQuyetDinh: true,
        //   hienThiKyHieuHD: true,
        //   hienThiDVT: true,
        //   hienThiHSD: true,
        // }}
        breadcrumb={[{ title: "K01.2", link: "/bao-cao/k01_2" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listKhoUser: state.kho.listKhoUser || [],
    listNCC: state.nhaSanXuat.listNCC || [],
    listAllQuyetDinhThau: state.quyetDinhThau.listAllQuyetDinhThau || [],
    listAllSoHoaDon: state.nhapKho.listAllSoHoaDon || [],
    listloaiDichVuKho: state.utils.listloaiDichVuKho || [],
    listAllHangHoa: state.tonKho.listAllHangHoa,
  }),
  ({
    baoCaoDaIn: { getk01_2 },
    kho: { getTheoTaiKhoan: getKhoTheoTaiKhoan },
    nhaSanXuat: { getListTongHopNhaSanXuat },
    utils: { getUtils },
    quyetDinhThau: { getListAllQuyetDinhThau },
    tonKho: { onSearchAllDichVuTonKho },
  }) => ({
    getk01_2,
    getKhoTheoTaiKhoan,
    getListTongHopNhaSanXuat,
    getUtils,
    getListAllQuyetDinhThau,
    onSearchAllDichVuTonKho,
  })
)(Index);
