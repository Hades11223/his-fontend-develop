import { Col, DatePicker, message, Row, Checkbox } from "antd";
import Select from "components/Select";
import SelectLoadMore from "components/SelectLoadMore";
import { useStore } from "hook";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";
import phieuNhapXuatProvider from "data-access/kho/phieu-nhap-xuat-provider";
import tonKhoProvider from "data-access/kho/kho-ton-kho-provider";
import { useTranslation } from "react-i18next";

/**
 * Báo cáo kho: K05. Báo cáo chi tiết nhập kho
 *
 */
const K05 = () => {
  const { t } = useTranslation();
  const { listKhoUser } = useStore("kho", []);
  const { listAllKhoa } = useStore("khoa", []);
  const {
    baoCaoDaIn: { getK05 },
    kho: { getTheoTaiKhoan: getKhoTheoTaiKhoan },
    khoa: { getListAllKhoa },
  } = useDispatch();

  const [state, _setState] = useState({
    paramPhieuNhap: { active: true, trangThai: 30 },
  });
  const setState = (data = {}) => {
    _setState((state) => ({ ...state, ...data }));
  };

  useEffect(() => {
    getKhoTheoTaiKhoan();
    getListAllKhoa({ page: "", size: "", active: true });
  }, []);

  const customChange = (name, onChange) => (e) => {
    if (name === "khoId") {
      setState({ paramHangHoa: { khoId: e } });
      onChange("khoDoiUngId")();
      onChange("dichVuId")();
    }
    if (name === "khoDoiUngId") {
      setState({ paramHangHoa: { khoDoiUngId: e } });
      onChange("dichVuId")();
    }
    if (name === "khoaId") {
      setState({ paramHangHoa: { khoaId: e } });
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
              {t("baoCao.tuNgay")}
              <span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              showTime={{ defaultValue: moment().startOf("day") }}
              value={_state.tuNgay}
              onChange={onChange("tuNgay")}
              placeholder={t("baoCao.chonNgay")}
              format="DD/MM/YYYY HH:mm:ss"
              className="input-filter"
              onKeyDown={onKeyDownDate("tuNgay")}
            />
            {!_state.isValidData && !_state.tuNgay && (
              <div className="error">{"baoCao.chonTuNgay"}</div>
            )}
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-date">
            <label
              style={{ color: _state.denNgay ? "" : "red" }}
              className="label-filter"
            >
              {t("baoCao.denNgay")}
              <span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              showTime={{ defaultValue: moment().endOf("day") }}
              value={_state.denNgay}
              onChange={onChange("denNgay")}
              placeholder={t("baoCao.chonNgay")}
              format="DD/MM/YYYY HH:mm:ss"
              className="input-filter"
              onKeyDown={onKeyDownDate("denNgay")}
            />
            {!_state.isValidData && !_state.denNgay && (
              <div className="error">{t("baoCao.chonDenNgay")}</div>
            )}
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label
              className="label-filter"
              style={{ color: _state.khoDoiUngId ? "" : "red" }}
            >
              {t("baoCao.khoNhap")}
              <span style={{ color: "red" }}>*</span>
            </label>
            <Select
              className="input-filter"
              placeholder={t("baoCao.chonKhoNhap")}
              data={listKhoUser || []}
              onChange={customChange("khoId", onChange)}
              value={_state.khoId}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">{t("baoCao.khoaXuat")}</label>
            <Select
              className="input-filter"
              placeholder={t("baoCao.chonKhoaXuat")}
              data={
                listAllKhoa.length > 0
                  ? [{ id: "", ten: "Tất cả" }, ...(listAllKhoa || [])]
                  : []
              }
              onChange={customChange("khoaId", onChange)}
              value={_state.khoaId}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select checkbox-pl">
            <label className="label-filter">
              {t("baoCao.hienThiMaQuanLy")}
            </label>
            <Checkbox
              checked={_state.hienThiMaQuanLy}
              onChange={onChange("hienThiMaQuanLy")}
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
            <label className="label-filter">{t("baoCao.soPhieuNhap")}</label>
            <SelectLoadMore
              api={phieuNhapXuatProvider.search}
              mapData={(i) => ({
                value: i.id,
                label: i.soPhieu,
              })}
              onChange={onChange("dsPhieuNhapXuatId")}
              keySearch={"soPhieu"}
              value={_state.dsPhieuNhapXuatId}
              className="input-filter"
              placeholder={t("baoCao.chonSoPhieuNhap")}
              mode="multiple"
              addParam={state?.paramPhieuNhap}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select checkbox-pl">
            <Checkbox
              checked={_state.hienThiTenTrungThau}
              onChange={onChange("hienThiTenTrungThau")}
            >
              {t("baoCao.hienThiTenTangHoaTheoThau")}
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
      khoaId: _state.khoaId,
      hienThiPhanLoai: _state.hienThiPhanLoai,
      hienThiMaQuanLy: _state.hienThiMaQuanLy,
      dichVuId: dichVuId,
      dsPhieuNhapXuatId: _state.dsPhieuNhapXuatId,
      hienThiTenTrungThau: _state.hienThiTenTrungThau,
    };
  };

  const beforeOk =
    ({ _state, _beforeOk }) =>
    () => {
      if (!_state.khoId) {
        message.error(t("baoCao.vuiLongChonKhoNhap"));
        return false;
      }
      return _beforeOk();
    };

  return (
    <Main>
      <BaseBaoCao
        title={t("baoCao.k05")}
        renderFilter={renderFilter}
        beforeOk={beforeOk}
        getBc={getK05}
        handleDataSearch={handleDataSearch}
        // initState={{
        //   hienThiPhanLoai: true,
        // }}
        breadcrumb={[{ title: "K05", link: "/bao-cao/k05" }]}
      />
    </Main>
  );
};

export default K05;
