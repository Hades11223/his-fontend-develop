import { Checkbox, Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";
import SelectLoadMore from "components/SelectLoadMore";
import tonKhoProvider from "data-access/kho/kho-ton-kho-provider";
import { useTranslation } from "react-i18next";

/**
 * K11. Báo cáo tồn kho theo lô
 *
 */
const K11 = ({
  listAllKho,
  listHangHoa,
  listSoLo,

  getAllKho,
  getListHangHoa,
  getPhieuNhapXuat,

  getK11,
}) => {
  useEffect(() => {
    getAllKho({ active: true });
    getListHangHoa({
      page: 0,
      size: 9999,
      dataSearch: {
        active: true,
      },
    });
    getPhieuNhapXuat({});
  }, []);

  const { t } = useTranslation();
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => ({ ...state, ...data }));
  };

  const customChange = (key, onChange) => (value) => {
    if (key === "khoId") {
      setState({
        paramHangHoa: { khoId: value },
      });
      getPhieuNhapXuat({ khoId: value });

      onChange("dsDichVuId")([]);
      onChange("soLo")();
    }
    onChange(key)(value);
  };

  const renderFilter = ({ onChange, _state, onKeyDownDate }) => {
    return (
      <Row>
        {/* <Col md={6} xl={6} xxl={6}>
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
        </Col> */}
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
            <label className="label-filter">{t("baoCao.tenHangHoa")}</label>
            <SelectLoadMore
              api={tonKhoProvider.theoLo}
              mapData={(i) => ({
                value: `${i.dichVuId}-${i.khoId}`,
                label: i.ten,
              })}
              onChange={onChange("dsDichVuId")}
              keySearch={"ten"}
              value={_state.dsDichVuId}
              className="input-filter"
              placeholder={t("baoCao.chonHangHoa")}
              addParam={state?.paramHangHoa}
              hasAll={true}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">Số lô</label>
            <Select
              onChange={onChange("soLo")}
              value={_state.soLo}
              className="input-filter"
              placeholder={"Chọn số lô"}
              data={listSoLo || []}
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
    let dsDichVuId = _state?.dsDichVuId.length
      ? _state?.dsDichVuId?.split("-")[0]
      : null;
    return {
      loaiThoiGian: _state.loaiThoiGian,
      // tuNgay: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
      denNgay: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
      khoId: _state.khoId,
      dsDichVuId: dsDichVuId,
      soLo: _state.soLo,
      hienThiTenTrungThau: _state.hienThiTenTrungThau,
    };
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
        title="K11. Báo cáo tồn kho theo lô"
        renderFilter={renderFilter}
        beforeOk={beforeOk}
        getBc={getK11}
        handleDataSearch={handleDataSearch}
        breadcrumb={[{ title: "K11", link: "/bao-cao/k11" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listAllKho: state.kho.listAllKho,
    listHangHoa: state.tonKho.listAllHangHoa,
    listSoLo: state.nhapKho.listSoHoaDon || [],
  }),
  ({
    baoCaoDaIn: { getK11 },
    tonKho: { onSearchAllDichVuTonKho: getListHangHoa },
    kho: { getAllTongHop: getAllKho },
    nhapKho: { getPhieuNhapXuat },
  }) => ({
    getAllKho,
    getListHangHoa,
    getPhieuNhapXuat,

    getK11,
  })
)(K11);
