import { Col, DatePicker, message, Row, Checkbox } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";
import SelectLoadMore from "components/SelectLoadMore";
import tonKhoProvider from "data-access/kho/kho-ton-kho-provider";
import { useTranslation } from "react-i18next";

/**
 * Báo cáo kho: K08. Biên bản kiểm nhập
 *
 */
const K08 = ({
  listKhoUser = [],

  listNCC,
  listAllHangHoa = [],
  listNuocSanXuat,
  listHangSanXuat,

  listHoiDongKiemKe = [],
  listAllPhanLoaiThuoc,

  getKhoTheoTaiKhoan,

  getListTongHopNhaSanXuat,
  onSearchAllDichVuTonKho,
  getListXuatXu,
  getListNhaSanXuat,

  getListAllPhanLoaiThuoc,
  getAllHoiDongKiemKe,
  getK08,
}) => {
  useEffect(() => {
    getKhoTheoTaiKhoan({ page: 0, size: 999, active: true });

    getListTongHopNhaSanXuat({ loaiNhaSanXuat: 20, active: true });
    onSearchAllDichVuTonKho({
      page: 0,
      size: 9999,
      dataSearch: {
        active: true,
      },
    });
    getListXuatXu({ page: 0, size: 9999, active: true });
    getListNhaSanXuat({
      page: 0,
      size: 9999,
      active: true,
      loaiNhaSanXuat: 10,
    });

    getListAllPhanLoaiThuoc({ page: "", size: "", active: true });
    getAllHoiDongKiemKe({ page: 0, size: 9999, active: true });
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
    }
    onChange(name)(e);
  };

  const renderFilter = ({ onChange, _state, onKeyDownDate }) => {
    return (
      <Row>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-date">
            <label
              // onClick={() => openInNewTab("/danh-muc/quay-tiep-don")}
              style={{ color: _state.tuNgay ? "" : "red" }}
              className="label-filter"
            >
              Từ ngày <span className="required">*</span>
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
              Đến ngày <span className="required">*</span>
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
              Kho <span className="required">*</span>
            </label>
            <Select
              className="input-filter"
              placeholder={"Chọn kho"}
              data={listKhoUser || []}
              onChange={customChange("khoId", onChange)}
              value={_state.khoId}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}></Col>

        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Nhà cung cấp</label>
            <Select
              mode="multiple"
              onChange={onChange("dsNhaCungCapId")}
              value={_state.dsNhaCungCapId}
              className="input-filter"
              placeholder={"Chọn nhà cung cấp"}
              data={[{ id: "", ten: "Tất cả" }, ...(listNCC || [])]}
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
            <label className="label-filter">Nước sản xuất</label>
            <Select
              onChange={onChange("xuatXuId")}
              value={_state.xuatXuId}
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
        {/* <Col md={6} xl={6} xxl={6}>
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
              checked={_state.hienThiNgayNhapKho}
              onChange={onChange("hienThiNgayNhapKho")}
            >
              Hiển thị ngày nhập kho
            </Checkbox>
          </div>
        </Col> */}

        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Phân loại hàng hóa</label>
            <Select
              onChange={onChange("dsPhanLoaiDvKhoId")}
              value={_state.dsPhanLoaiDvKhoId}
              className="input-filter"
              placeholder={"Chọn phân loại hàng hóa"}
              mode="multiple"
              data={
                listAllPhanLoaiThuoc.length === 0
                  ? []
                  : [{ id: "", ten: "Tất cả" }, ...(listAllPhanLoaiThuoc || [])]
              }
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
              data={[{ id: "", ten: "Tất cả" }, ...(listHoiDongKiemKe || [])]}
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
    );
  };

  const handleDataSearch = ({ _state }) => {
    let dichVuId = _state?.dichVuId?.split("-")[0] || null;
    return {
      loaiThoiGian: _state.loaiThoiGian,
      tuNgay: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
      denNgay: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
      khoId: _state.khoId,

      dsNhaCungCapId: _state.dsNhaCungCapId,
      xuatXuId: _state.xuatXuId,
      dichVuId: dichVuId,
      nhaSanXuatId: _state.nhaSanXuatId,

      dsPhanLoaiDvKhoId: _state.dsPhanLoaiDvKhoId,
      hoiDongKiemKeId: _state.hoiDongKiemKeId,
      hienThiTenTrungThau: _state.hienThiTenTrungThau,
    }
  };

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
        title="K08. Biên bản kiểm nhập"
        renderFilter={renderFilter}
        beforeOk={beforeOk}
        getBc={getK08}
        handleDataSearch={handleDataSearch}
        // initState={{
        //   hienThiNuocSanXuat: true,
        //   hienThiHangSanXuat: true,
        //   hienThiPhanLoaiHangHoa: true,
        //   hienThiSoDangKy: true,
        //   hienThiMaHangHoa: true,
        //   hienThiTenHoatChat: true,
        //   hienThiTien: true,
        //   hienThiNgayNhapKho: true,
        // }}
        breadcrumb={[{ title: "K08", link: "/bao-cao/k08" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    dataSearch: state.kho.dataSearch,

    listKhoUser: state.kho.listKhoUser,

    listNCC: state.nhaSanXuat.listNCC || [],
    listAllHangHoa: state.tonKho.listAllHangHoa,
    listNuocSanXuat: state.xuatXu.listAllXuatXu,
    listHangSanXuat: state.nhaSanXuat.listNhaSanXuat,

    listAllPhanLoaiThuoc: state.phanLoaiThuoc.listAllPhanLoaiThuoc || [],
    listHoiDongKiemKe: state.hoiDongKiemKe._listDataTongHop,
  }),
  ({
    baoCaoDaIn: { getK08 },
    kho: { getTheoTaiKhoan: getKhoTheoTaiKhoan },
    tonKho: { onSearchAllDichVuTonKho },
    hoiDongKiemKe: { _getListTongHop: getAllHoiDongKiemKe },
    nhaSanXuat: { getListTongHopNhaSanXuat },
    xuatXu: { getListXuatXu },
    nhaSanXuat: { getListNhaSanXuat },
    phanLoaiThuoc: { getListAllPhanLoaiThuoc },
  }) => ({
    getK08,
    getKhoTheoTaiKhoan,

    getListTongHopNhaSanXuat,
    onSearchAllDichVuTonKho,
    getListXuatXu,
    getListNhaSanXuat,

    getListAllPhanLoaiThuoc,
    getAllHoiDongKiemKe,
  })
)(K08);
