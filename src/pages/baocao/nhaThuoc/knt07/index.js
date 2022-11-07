import { Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";
import { t } from "i18next";
import tonKhoProvider from "data-access/kho/kho-ton-kho-provider";
import SelectLoadMore from "components/SelectLoadMore";

/**
 * KNT07. Sổ theo dõi xuất nhập tồn thuốc kiểm soát đặc biệt
 *
 */

const KNT07 = () => {
  const {
    baoCaoDaIn: { getKnt07 },
    kho: { getAllTongHop: getAllKho },
  } = useDispatch();
  const {
    kho: { listAllKho },
  } = useSelector((state) => state);

  const [state, _setState] = useState();
  const setState = (data = {}) => {
    _setState((state) => ({ ...state, ...data }));
  };

  useEffect(() => {
    getAllKho({ nhaThuoc: true, active: true, page: "", size: "" });
  }, []);

  const handleChange = (key, onChange) => (value) => {
    if (key === "khoId") {
      setState({ paramHangHoa: { khoId: value, active: true } });
      onChange("dichVuId")();
    }
    onChange(key)(value);
  };

  const renderFilter = ({ onChange, _state }) => {
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
            />
            {!_state.isValidData && !_state.tuNgay && (
              <div className="error">{t("baoCao.chonTuNgay")}</div>
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
            />
            {!_state.isValidData && !_state.denNgay && (
              <div className="error">{t("baoCao.chonDenNgay")}</div>
            )}
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">
              {t("baoCao.kho")} <span className="icon-required"> *</span>
            </label>
            <Select
              className="input-filter"
              placeholder={t("baoCao.chonKho")}
              data={listAllKho || []}
              onChange={handleChange("khoId", onChange)}
              value={_state.dsKhoId}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">
              {t("baoCao.tenHangHoa")} <span className="icon-required"> *</span>
            </label>
            <SelectLoadMore
              api={tonKhoProvider.searchAll}
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
      tuThoiGian: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
      denThoiGian: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
      khoId: _state.khoId,
      dichVuId: dichVuId,
    };
  };

  const beforeOk =
    ({ _state, _beforeOk }) =>
    () => {
      if (!_state.khoId) {
        message.error(t("baoCao.vuiLongChonKho"));
        return false;
      }
      return _beforeOk();
    };
  return (
    <Main>
      <BaseBaoCao
        title={t("baoCao.knt07")}
        renderFilter={renderFilter}
        beforeOk={beforeOk}
        getBc={getKnt07}
        handleDataSearch={handleDataSearch}
        breadcrumb={[{ title: "Knt07", link: "/bao-cao/knt07" }]}
      />
    </Main>
  );
};

export default KNT07;
