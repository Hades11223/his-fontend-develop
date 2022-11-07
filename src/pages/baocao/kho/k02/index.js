import { Col, DatePicker, message, Row, Checkbox } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";
import SelectLoadMore from "components/SelectLoadMore";
import tonKhoProvider from "data-access/kho/kho-ton-kho-provider";
import { useTranslation } from "react-i18next";
import { useStore } from "hook";
import { LOAI_DICH_VU } from "constants/index";

/**
 * Báo cáo kho: K02. Báo cáo xuất nhập tồn kho
 *
 */
const K02 = () => {
  const { t } = useTranslation();
  const { listKhoUser } = useSelector((state) => state.kho);
  const { listAllXuatXu: listNuocSanXuat } = useSelector(
    (state) => state.xuatXu
  );
  const { listAllNhaSanXuat: listHangSanXuat } = useSelector(
    (state) => state.doiTac
  );
  const { listAllPhanLoaiThuoc = [] } = useSelector(
    (state) => state.phanLoaiThuoc
  );

  const {
    baoCaoDaIn: { getK02 },
    kho: { getTheoTaiKhoan: getKhoTheoTaiKhoan },
    xuatXu: { getListAllXuatXu },
    doiTac: { getListAllNhaSanXuat },
    phanLoaiThuoc: { getListAllPhanLoaiThuoc },
    nhomDichVuKho: { getListAllNhomDichVuKhoCap1 },
  } = useDispatch();
  const listNhomDichVuKhoCap1 = useStore(
    "nhomDichVuKho.listAllNhomDichVuKhoCap1",
    []
  );
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => ({ ...state, ...data }));
  };

  useEffect(() => {
    getKhoTheoTaiKhoan({ active: true });
    getListAllXuatXu({ page: "", size: "", active: true });
    getListAllNhaSanXuat({
      page: "",
      size: "",
      active: true,
      dsLoaiDoiTac: [10],
    });
    getListAllPhanLoaiThuoc({ page: "", size: "", active: true });
    getListAllNhomDichVuKhoCap1({
      active: true,
      page: "",
      size: "",
      loaiDichVu: LOAI_DICH_VU.THUOC,
    });
  }, []);

  const customChange = (name, onChange) => (e) => {
    if (name === "dsKhoId") {
      setState({
        paramHangHoa: { dsKhoId: e },
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
              className="label-filter"
            >
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
              Kho
              <span className="icon-required">*</span>
            </label>
            <Select
              className="input-filter"
              placeholder={"Chọn kho"}
              data={listKhoUser || []}
              mode="multiple"
              onChange={customChange("dsKhoId", onChange)}
              value={_state.dsKhoId}
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
          <div className="item-select checkbox-pl">
            <label className="label-filter">Hiển thị nước sản xuất</label>
            <Checkbox
              checked={_state.hienThiNuocSanXuat}
              onChange={onChange("hienThiNuocSanXuat")}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select checkbox-pl">
            <label className="label-filter">Hiển thị hãng sản xuất</label>
            <Checkbox
              checked={_state.hienThiHangSanXuat}
              onChange={onChange("hienThiHangSanXuat")}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select checkbox-pl">
            <label className="label-filter">Hiển thị phân loại hàng hóa</label>
            <Checkbox
              checked={_state.hienThiPhanLoai}
              onChange={onChange("hienThiPhanLoai")}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select checkbox-pl">
            <label className="label-filter">Hiển thị Nhóm thuốc</label>
            <Checkbox
              checked={_state.hienThiNhomThuoc}
              onChange={onChange("hienThiNhomThuoc")}
            />
          </div>
        </Col>

        <Col md={6} xl={6} xxl={6}>
          <div
            className="item-select"
            style={_state.hienThiNuocSanXuat ? {} : { display: "none" }}
          >
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
          <div
            className="item-select"
            style={_state.hienThiHangSanXuat ? {} : { display: "none" }}
          >
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
          <div
            className="item-select"
            style={_state.hienThiPhanLoai ? {} : { display: "none" }}
          >
            <label className="label-filter">Phân loại hàng hóa</label>
            <Select
              onChange={onChange("dsPhanLoaiDvKhoId", true)}
              value={_state.dsPhanLoaiDvKhoId}
              className="input-filter"
              mode="multiple"
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
          <div
            className="item-select"
            style={_state.hienThiNhomThuoc ? {} : { display: "none" }}
          >
            <label className="label-filter">Nhóm thuốc</label>
            <Select
              onChange={onChange("dsNhomDvKhoCap1Id")}
              value={_state.dsNhomDvKhoCap1Id}
              className="input-filter"
              placeholder={"Chọn nhóm thuốc"}
              mode="multiple"
              showArrow
              data={listNhomDichVuKhoCap1}
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
        <Col md={3} xl={3} xxl={3}>
          <div className="item-select checkbox-pl">
            <label className="label-filter">Hiển thị tiền</label>
            <Checkbox
              checked={_state.hienThiTien}
              onChange={onChange("hienThiTien")}
            />
          </div>
        </Col>
        <Col md={3} xl={3} xxl={3}>
          <div className="item-select checkbox-pl">
            <label className="label-filter">Hiển thị Mã quản lý</label>
            <Checkbox
              checked={_state.hienThiMaQuanLy}
              onChange={onChange("hienThiMaQuanLy")}
            />
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
      dsKhoId: _state.dsKhoId,
      dichVuId: dichVuId,
      hienThiNuocSanXuat: _state.hienThiNuocSanXuat,
      hienThiHangSanXuat: _state.hienThiHangSanXuat,
      hienThiTien: _state.hienThiTien,
      hienThiPhanLoai: _state.hienThiPhanLoai,
      hienThiMaQuanLy: _state.hienThiMaQuanLy,
      xuatXuId: _state.xuatXuId,
      nhaSanXuatId: _state.nhaSanXuatId,
      dsPhanLoaiDvKhoId: _state.dsPhanLoaiDvKhoId,
      hienThiTenTrungThau: _state.hienThiTenTrungThau,
      dsNhomDvKhoCap1Id: _state.dsNhomDvKhoCap1Id,
      hienThiNhomThuoc: _state.hienThiNhomThuoc,
    };
  };

  const beforeOk =
    ({ _state, _beforeOk }) =>
    () => {
      if (!_state.dsKhoId || _state.dsKhoId.length === 0) {
        message.error("Vui lòng chọn kho");
        return false;
      }
      return _beforeOk();
    };

  return (
    <Main>
      <BaseBaoCao
        title="K02. Báo cáo xuất nhập tồn kho"
        renderFilter={renderFilter}
        beforeOk={beforeOk}
        getBc={getK02}
        handleDataSearch={handleDataSearch}
        initState={{
          hienThiNuocSanXuat: true,
          hienThiHangSanXuat: true,
          hienThiPhanLoai: true,
          hienThiTien: true,
          hienThiNhomThuoc: false,
          dsPhanLoaiDvKhoId: [""],
        }}
        breadcrumb={[{ title: "K02", link: "/bao-cao/k02" }]}
      />
    </Main>
  );
};

export default K02;
