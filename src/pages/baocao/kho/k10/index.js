import { Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";
import { useTranslation } from "react-i18next";

/**
 * K10. Báo cáo tổng hợp xuất
 *
 */
const K10 = ({
  listKhoUser,
  listPhieuXuat,

  getKhoTheoTaiKhoan,
  getListPhieuXuat,

  getK10,
}) => {
  const { t } = useTranslation();
  useEffect(() => {
    getKhoTheoTaiKhoan({ active: true });
    getListPhieuXuat({ dataSearch: { size: 500 } });
  }, []);

  const customChange = (key, onChange) => (value) => {
    if (key === "khoId") {
      getListPhieuXuat({ dataSearch: { size: 500, dsKhoXuatId: [value] } });

      onChange("phieuNhapXuatId")();
    }
    onChange(key)(value);
  };

  const renderFilter = ({ onChange, _state, onKeyDownDate }) => {
    return (
      <Row>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-date">
            <label className="label-filter">
              {t("common.tuNgay")}
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
              <div className="error">{t("baoCao.chonTuNgay")}</div>
            )}
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-date">
            <label className="label-filter">
              {t("common.denNgay")}
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
              <div className="error">{t("baoCao.chonDenNgay")}</div>
            )}
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">
              {t("baoCao.khoXuat")}
              <span className="icon-required">*</span>
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
            <label className="label-filter">{t("baoCao.soPhieu")}</label>
            <Select
              onChange={onChange("phieuNhapXuatId")}
              value={_state.phieuNhapXuatId}
              className="input-filter"
              placeholder={"Chọn số phiếu"}
              data={(listPhieuXuat || []).map((item) => ({
                ten: item.soPhieu,
                id: item.id,
              }))}
            />
          </div>
        </Col>
      </Row>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    loaiThoiGian: _state.loaiThoiGian,
    tuNgay: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
    denNgay: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
    khoId: _state.khoId,
    phieuNhapXuatId: _state.phieuNhapXuatId,
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
        title={t("baoCao.k10")}
        renderFilter={renderFilter}
        beforeOk={beforeOk}
        getBc={getK10}
        handleDataSearch={handleDataSearch}
        breadcrumb={[{ title: "K10", link: "/bao-cao/k10" }]}
      />
    </Main>
  );
};

export default connect(
  (state) => ({
    listKhoUser: state.kho.listKhoUser || [],
    listPhieuXuat: state.phieuXuat.listPhieuXuat || [],
  }),
  ({
    baoCaoDaIn: { getK10 },
    kho: { getTheoTaiKhoan: getKhoTheoTaiKhoan },
    phieuXuat: { getListPhieuXuat },
  }) => ({
    getKhoTheoTaiKhoan,
    getListPhieuXuat,

    getK10,
  })
)(K10);
