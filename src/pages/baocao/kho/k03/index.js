import { Col, DatePicker, message, Row, Checkbox } from "antd";
import Select from "components/Select";
import { useStore } from "hook";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";
import { useTranslation } from "react-i18next";
import phieuNhapXuatProvider from "data-access/kho/phieu-nhap-xuat-provider";
import SelectLoadMore from "components/SelectLoadMore";
import tonKhoProvider from "data-access/kho/kho-ton-kho-provider";

/**
 * Báo cáo kho: K03. Báo cáo chi tiết xuất kho
 *
 */
const K03 = () => {
  const { t } = useTranslation();
  const { listKhoUser } = useStore("kho", []);
  const { listAllKhoa } = useStore("khoa", []);
  const {
    baoCaoDaIn: { getK03 },
    kho: { getTheoTaiKhoan: getKhoTheoTaiKhoan },
    khoa: { getListAllKhoa },
  } = useDispatch();

  const [state, _setState] = useState({
    paramPhieuXuat: { active: true, trangThai: 30 },
  });
  const setState = (data = {}) => {
    _setState((state) => ({ ...state, ...data }));
  };

  useEffect(() => {
    getKhoTheoTaiKhoan({ active: true });
    getListAllKhoa({ page: "", size: "", active: true });
  }, []);

  const customChange = (name, onChange) => (e) => {
    if (name === "khoId") {
      setState({
        paramHangHoa: { khoId: e },
        paramPhieuXuat: { ...state?.paramPhieuXuat, khoId: e },
      });
      onChange("khoDoiUngId")();
      onChange("dichVuId")();
    }
    if (name === "khoDoiUngId") {
      setState({ paramHangHoa: { khoDoiUngId: e } });
      onChange("dichVuId")();
    }
    if (name === "khoaNhanId") {
      setState({ paramHangHoa: { khoaNhanId: e } });
      onChange("dichVuId")();
    }
    onChange(name)(e);
  };
  const renderFilter = ({ onChange, _state, onKeyDownDate }) => {
    return (
      <Row>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-date">
            <label className="label-filter">
              {t("baoCao.tuNgay")}
              <span className="icon-required"> *</span>
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
            <label className="label-filter">
              {t("baoCao.denNgay")}
              <span className="icon-required"> *</span>
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
            <label className="label-filter">
              {t("baoCao.khoXuat")}
              <span className="icon-required"> *</span>
            </label>
            <Select
              className="input-filter"
              placeholder={t("baoCao.chonKhoXuat")}
              data={listKhoUser || []}
              onChange={customChange("khoId", onChange)}
              value={_state.khoId}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">{t("baoCao.khoaNhan")}</label>
            <Select
              className="input-filter"
              placeholder={t("baoCao.chonKhoaNhan")}
              data={[{ id: "", ten: "Tất cả" }, ...(listAllKhoa || [])]}
              onChange={customChange("khoaNhanId", onChange)}
              value={_state.khoaNhanId}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">{t("baoCao.soPhieuXuat")}</label>
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
              placeholder={t("baoCao.chonSoPhieuXuat")}
              mode="multiple"
              addParam={state?.paramPhieuXuat}
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

  const handleDataSearch = ({ _state }) =>  {
      let dichVuId = _state?.dichVuId?.split("-")[0] || null;
    return {
      loaiThoiGian: _state.loaiThoiGian,
      tuNgay: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
      denNgay: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
      khoId: _state.khoId,
      khoaNhanId: _state.khoaNhanId,
      dsPhieuNhapXuatId: _state.dsPhieuNhapXuatId,
      dichVuId: dichVuId,
      hienThiTenTrungThau: _state.hienThiTenTrungThau,
    }
  };

  const beforeOk =
    ({ _state, _beforeOk }) =>
    () => {
      if (!_state.khoId) {
        message.error(t("baoCao.vuiLongChonKhoXuat"));
        return false;
      }
      return _beforeOk();
    };

  return (
    <Main>
      <BaseBaoCao
        title={t("baoCao.k03")}
        renderFilter={renderFilter}
        beforeOk={beforeOk}
        getBc={getK03}
        handleDataSearch={handleDataSearch}
        breadcrumb={[{ title: "K03", link: "/bao-cao/k03" }]}
      />
    </Main>
  );
};

export default K03;
