import { Checkbox, Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SelectLoadMore from "components/SelectLoadMore";
import nhomDichVuKhoCap1Provider from "data-access/categories/nhom-dich-vu-kho-cap-1-provider";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";
import tonKhoProvider from "data-access/kho/kho-ton-kho-provider";
import { useTranslation } from "react-i18next";

/**
 * Báo cáo kho: K07. Biên bản kiểm kê tồn kho
 *
 */
const K07 = ({
  listKhoUser = [],
  listAllHangHoa = [],
  listHoiDongKiemKe = [],

  listNuocSanXuat,
  listHangSanXuat,
  listAllPhanLoaiThuoc,

  dataSearch,

  getKhoTheoTaiKhoan,
  onSearchAllDichVuTonKho,
  getAllHoiDongKiemKe,

  getListXuatXu,
  getListNhaSanXuat,
  getListHangHoa,
  getListAllPhanLoaiThuoc,
  getK07,

  ...props
}) => {
  useEffect(() => {
    getKhoTheoTaiKhoan({ page: 0, size: 999, active: true });
    onSearchAllDichVuTonKho({
      page: 0,
      size: 9999,
      dataSearch: {
        active: true,
      },
    });
    getAllHoiDongKiemKe({ page: 0, size: 9999, active: true });

    getListXuatXu({ page: 0, size: 9999, active: true });
    getListNhaSanXuat({ page: 0, size: 9999, active: true });
    getListAllPhanLoaiThuoc({ page: "", size: "", active: true });
    // getListHangHoa({ page: 0, size: 9999, active: true });
  }, []);

  const { t } = useTranslation();
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => ({ ...state, ...data }));
  };

  const customChange = (name, onChange) => (e) => {
    if (name === "khoId") {
      setState({
        paramHangHoa: { khoId: e },
      });
      onChange("dichVuId")();
      // getListHangHoa({ page: 0, size: 9999, active: true, khoId: e });
    }
    onChange(name)(e);
  };

  const renderFilter = ({ onChange, _state, onKeyDownDate }) => {
    return (
      <Row>
        {/* <Col md={6} xl={6} xxl={6}>
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
        </Col> */}
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
              Kho<span className="icon-required">*</span>
            </label>
            <Select
              className="input-filter"
              placeholder={"Chọn kho"}
              data={listKhoUser}
              onChange={customChange("khoId", onChange)}
              value={_state.khoId}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">{t("baoCao.tenHangHoa")}</label>
            <SelectLoadMore
              api={tonKhoProvider.theoLo}
              mapData={(i) => ({
                value: `${i.dichVuId}-${i.khoId}`,
                label: i.ten,
              })}
              onChange={onChange("dichVuId")}
              keySearch={"ten"}
              value={_state.dichVuId}
              className="input-filter"
              placeholder={t("baoCao.chonHangHoa")}
              addParam={state?.paramHangHoa}
              hasAll={true}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Hội đồng</label>
            <Select
              onChange={onChange("hoiDongKiemKeId")}
              value={_state.hoiDongKiemKeId}
              className="input-filter"
              placeholder={"Chọn hội đồng"}
              data={listHoiDongKiemKe}
            />
          </div>
        </Col>
        {/* <Col md={6} xl={6} xxl={6}>
          <div className="item-select checkbox-pl">
            <Checkbox
              checked={_state.hienThiNuocSanXuat}
              onChange={onChange("hienThiNuocSanXuat")}
            >
              Hiển thị nước sản xuất
            </Checkbox>
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select checkbox-pl">
            <Checkbox
              checked={_state.hienThiHangSanXuat}
              onChange={onChange("hienThiHangSanXuat")}
            >
              Hiển thị hãng sản xuất
            </Checkbox>
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select checkbox-pl">
            <Checkbox
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
              checked={_state.hienThiSoDangKy}
              onChange={onChange("hienThiSoDangKy")}
            >
              Hiển thị số đăng ký
            </Checkbox>
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select checkbox-pl">
            <Checkbox
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
              checked={_state.hienThiTenHoatChat}
              onChange={onChange("hienThiTenHoatChat")}
            >
              Hiển thị tên hoạt chất
            </Checkbox>
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select checkbox-pl">
            <Checkbox
              checked={_state.hienThiTien}
              onChange={onChange("hienThiTien")}
            >
              Hiển thị tiền
            </Checkbox>
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select checkbox-pl">
            <Checkbox
              checked={_state.hienThiNgayNhapKho}
              onChange={onChange("hienThiNgayNhapKho")}
            >
              Hiển thị ngày nhập kho
            </Checkbox>
          </div>
        </Col> */}
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Nước sản xuất</label>
            <Select
              onChange={onChange("nuocSanXuatId")}
              value={_state.nuocSanXuatId}
              className="input-filter"
              placeholder={"Chọn nước sản xuất"}
              data={[{ id: "", ten: "Tất cả" }, ...(listNuocSanXuat || [])]}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Hãng sản xuất</label>
            <Select
              onChange={onChange("nhaSanXuatId")}
              value={_state.nhaSanXuatId}
              className="input-filter"
              placeholder={"Chọn hãng sản xuất"}
              data={[{ id: "", ten: "Tất cả" }, ...(listHangSanXuat || [])]}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Phân loại hàng hóa</label>
            <Select
              onChange={onChange("phanLoaiDvKhoId")}
              value={_state.phanLoaiDvKhoId}
              className="input-filter"
              placeholder={"Chọn phân loại hàng hóa"}
              data={
                listAllPhanLoaiThuoc.length === 0
                  ? []
                  : [{ id: "", ten: "Tất cả" }, ...(listAllPhanLoaiThuoc || [])]
              }
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
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select checkbox-pl">
            <label className="label-filter">Phân nhóm thuốc</label>
            <Checkbox
              checked={_state.hienThiNhomThuoc}
              onChange={onChange("hienThiNhomThuoc")}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div
            className="item-select"
            style={_state.hienThiNhomThuoc ? {} : { display: "none" }}
          >
            <label className="label-filter">Nhóm hàng hóa</label>

            <SelectLoadMore
              api={nhomDichVuKhoCap1Provider.searchAll}
              mapData={(i) => ({
                value: i.id,
                label: i.ten,
              })}
              onChange={onChange("dsNhomDvKhoCap1Id")}
              value={_state.dsNhomDvKhoCap1Id}
              keySearch={"ten"}
              placeholder={"Chọn nhóm hàng hóa"}
              className="input-filter"
              mode="multiple"
              // addParam={state.addParamDv}
              blurReset={true}
            />
            {/* <Select
              onChange={onChange("dsNhomDvKhoCap1Id")}
              value={_state.dsNhomDvKhoCap1Id}
              className="input-filter"
              placeholder={"Chọn nhóm hàng hóa"}
              data={[{ id: "", ten: "Tất cả" }, ...(listloaiDichVuKho || [])]}
            /> */}
          </div>
        </Col>
        {/* <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Tên hoạt chất</label>
            <Select
              onChange={onChange("tenHoatChat")}
              value={_state.tenHoatChat}
              className="input-filter"
              placeholder={"Chọn tên hoạt chất"}
              data={[{ id: "", ten: "Tất cả" }, ...(state.listHoatChat || [])]}
            />
          </div>
        </Col> */}
      </Row>
    );
  };

  const handleDataSearch = ({ _state }) => {
    let dichVuId = _state?.dichVuId?.split("-")[0] || null;
    return {
    loaiThoiGian: _state.loaiThoiGian,
    denNgay: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),

    khoId: _state.khoId,
    dichVuId: dichVuId,
    hoiDongKiemKeId: _state.hoiDongKiemKeId,

    nuocSanXuatId: _state.nuocSanXuatId,
    nhaSanXuatId: _state.nhaSanXuatId,
    phanLoaiDvKhoId: _state.phanLoaiDvKhoId,

    hienThiNhomThuoc: _state.hienThiNhomThuoc,
    dsNhomDvKhoCap1Id: _state.hienThiNhomThuoc
      ? _state.dsNhomDvKhoCap1Id
      : null,
    hienThiTenTrungThau: _state.hienThiTenTrungThau,

    // hienThiNuocSanXuat: _state.hienThiNuocSanXuat,
    // hienThiHangSanXuat: _state.hienThiHangSanXuat,
    // hienThiPhanLoaiHangHoa: _state.hienThiPhanLoaiHangHoa,
    // hienThiSoDangKy: _state.hienThiSoDangKy,
    // hienThiMaHangHoa: _state.hienThiMaHangHoa,
    // hienThiTenHoatChat: _state.hienThiTenHoatChat,
    // hienThiTien: _state.hienThiTien,
    // hienThiNgayNhapKho: _state.hienThiNgayNhapKho,
    }
  };

  const beforeOk =
    ({ _state, _beforeOk }) =>
    () => {
      if (!_state.khoId) {
        message.error("Vui lòng chọn kho");
        return false;
      }
      if (!_state.denNgay) {
        message.error("Vui lòng chọn đến ngày");
        return false;
      }
      return true;
    };

  return (
    <Main>
      <BaseBaoCao
        title="K07. Biên bản kiểm kê tồn kho"
        renderFilter={renderFilter}
        beforeOk={beforeOk}
        getBc={getK07}
        handleDataSearch={handleDataSearch}
        initState={{
          hienThiNhomThuoc: false,
          // hienThiNuocSanXuat: false,
          // hienThiHangSanXuat: false,
          // hienThiPhanLoaiHangHoa: false,
          // hienThiSoDangKy: false,
          // hienThiMaHangHoa: false,
          // hienThiTenHoatChat: false,
          // hienThiTien: false,
          // hienThiNgayNhapKho: false,
        }}
        breadcrumb={[{ title: "K07", link: "/bao-cao/k07" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    dataSearch: state.kho.dataSearch,

    listKhoUser: state.kho.listKhoUser,
    listAllHangHoa: state.tonKho.listAllHangHoa,
    listHoiDongKiemKe: state.hoiDongKiemKe._listDataTongHop,

    listNuocSanXuat: state.xuatXu.listAllXuatXu,
    listHangSanXuat: state.nhaSanXuat.listNhaSanXuat,
    listAllPhanLoaiThuoc: state.phanLoaiThuoc.listAllPhanLoaiThuoc || [],
  }),
  ({
    baoCaoDaIn: { getK07 },
    kho: { getTheoTaiKhoan: getKhoTheoTaiKhoan },
    tonKho: { onSearchAllDichVuTonKho },
    hoiDongKiemKe: { _getListTongHop: getAllHoiDongKiemKe },

    xuatXu: { getListXuatXu },
    nhaSanXuat: { getListNhaSanXuat },
    phanLoaiThuoc: { getListAllPhanLoaiThuoc },
    // danhSachDichVuKhoChiTiet: { getListPhieuNhapXuatChiTiet: getListHangHoa },
  }) => ({
    getK07,
    getKhoTheoTaiKhoan,
    onSearchAllDichVuTonKho,
    getAllHoiDongKiemKe,

    getListXuatXu,
    getListNhaSanXuat,
    getListAllPhanLoaiThuoc,
    // getListHangHoa,
  })
)(K07);
