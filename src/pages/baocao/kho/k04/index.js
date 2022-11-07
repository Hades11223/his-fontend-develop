import { Col, DatePicker, message, Row } from "antd";
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
 * Báo cáo kho: K04. Báo cáo thẻ kho
 *
 */
const K04 = ({
  listKhoUser,
  listHangHoa = [],

  getKhoTheoTaiKhoan,
  getListHangHoa,
  dataSearch,
  getK04,
}) => {
  useEffect(() => {
    getKhoTheoTaiKhoan({ page: 0, size: 9999, active: true });
    getListHangHoa({ page: 0, size: 9999, active: true });
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
              className="label-filter"
            >
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
              data={listKhoUser || []}
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
      dichVuId: dichVuId,
    }
  };

  const beforeOk =
    ({ _state, _beforeOk }) =>
    () => {
      if (!_state.khoId) {
        message.error("Vui lòng chọn kho");
        return false;
      }
      if (!_state.dichVuId) {
        message.error("Vui lòng chọn hàng hóa");
        return false;
      }
      return _beforeOk();
    };

  return (
    <Main>
      <BaseBaoCao
        title="K04. Báo cáo thẻ kho"
        renderFilter={renderFilter}
        beforeOk={beforeOk}
        getBc={getK04}
        handleDataSearch={handleDataSearch}
        breadcrumb={[{ title: "K04", link: "/bao-cao/k04" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listKhoUser: state.kho.listKhoUser || [],
    dataSearch: state.tonKho?.dataSearch,
    listHangHoa: state.tonKho.listAllHangHoa,
  }),
  ({
    baoCaoDaIn: { getK04 },
    tonKho: { onSearchAllDichVuTonKho: getListHangHoa },
    kho: { getTheoTaiKhoan: getKhoTheoTaiKhoan },
  }) => ({
    getK04,
    getKhoTheoTaiKhoan,
    getListHangHoa,
  })
)(K04);
