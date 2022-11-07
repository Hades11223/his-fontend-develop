import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useStore } from "hook";
import { Col, DatePicker, Row, message } from "antd";
import Select from "components/Select";
import BaseBaoCao from "../../BaseBaoCao";
import { Main, GlobalStyle } from "./styled";
import { useTranslation } from "react-i18next";
import { LOAI_PHIEU_THU } from "pages/baocao/utils";
import moment from "moment";
import {
  DS_DOI_TUONG_BAO_HIEM,
} from "constants/index";
/**
 * TC23. Bảng tổng hợp thu dịch vụ theo khoa thực hiện
 *
 */

const Index = () => {
  const { t } = useTranslation();
  const {
    baoCaoDaIn: { getTc23 },
    khoa: { getListAllKhoa },
    toaNha: { getListAllToaNha },
  } = useDispatch();

  const listAllKhoa = useStore("khoa.listAllKhoa", []);
  const listAllToaNha = useStore("toaNha.listAllToaNha", []);

  useEffect(() => {
  let param = { active: true, page: "", size: "" };
    getListAllKhoa({ ...param, page: 0 });
    getListAllToaNha({ ...param, page: 0 });
  }, []);

  const renderFilter = ({ onChange, _state, onKeyDownDate }) => {
    return (
      <>
        <GlobalStyle />
        <Row>
          <Col md={6} xl={6} xxl={6}>
            <div className="item-date">
              <label className="label-filter">
                {t("common.tuNgay")} <span className="icon-required">*</span>
              </label>
              <DatePicker
                showTime={{ defaultValue: moment().startOf("day") }}
                value={_state.tuNgay}
                onChange={onChange("tuNgay")}
                placeholder={t("common.chonNgay")}
                format="DD/MM/YYYY HH:mm:ss"
                className="input-filter"
                onKeyDown={onKeyDownDate("tuNgay")}
              />
              {!_state.isValidData && !_state.tuNgay && (
                <div className="error">{t("baoCao.chonTuNgay")}!</div>
              )}
            </div>
          </Col>
          <Col md={6} xl={6} xxl={6}>
            <div className="item-date">
              <label className="label-filter">
                {t("common.denNgay")} <span className="icon-required">*</span>
              </label>
              <DatePicker
                showTime={{ defaultValue: moment().startOf("day") }}
                value={_state.denNgay}
                onChange={onChange("denNgay")}
                placeholder={t("common.chonNgay")}
                format="DD/MM/YYYY HH:mm:ss"
                className="input-filter"
                onKeyDown={onKeyDownDate("denNgay")}
              />
              {!_state.isValidData && !_state.denNgay && (
                <div className="error">{t("baoCao.chonDenNgay")}!</div>
              )}
            </div>
          </Col>
          <Col md={6} xl={6} xxl={6}>
            <div className="item-select">
              <label className="label-filter">{t("baoCao.doiTuongNb")}</label>
              <Select
                className="input-filter"
                placeholder={t("baoCao.chonDoiTuong")}
                data={[
                  { id: "", ten: t("common.tatCa") },
                  ...DS_DOI_TUONG_BAO_HIEM,
                ]}
                onChange={onChange("doiTuong")}
                value={_state.doiTuong}
              />
            </div>
          </Col>
          <Col md={6} xl={6} xxl={6}>
            <div className="item-select">
              <label className="label-filter">
                {t("baoCao.khoaThucHien")}</label>
              <Select
                onChange={onChange("dsKhoaThucHienId", true)}
                className="input-filter"
                value={_state.dsKhoaThucHienId}
                placeholder={t("baoCao.chonKhoaThucHien")}
                data={[{ id: "", ten: t("common.tatCa") }, ...(listAllKhoa || [])]}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6} xl={6} xxl={6}>
            <div className="item-select">
              <label className="label-filter">
                {t("baoCao.nhaThuNgan")}
              </label>
              <Select
                className="input-filter"
                placeholder={t("baoCao.chonNhaThuNgan")}
                onChange={onChange("dsNhaThuNganId")}
                value={_state.dsNhaThuNganId}
                data={listAllToaNha}
              />
            </div>
          </Col>
          <Col md={6} xl={6} xxl={6}>
            <div className="item-select">
              <label className="label-filter">
                {t("baoCao.loaiPhieuThu")}
              </label>
              <Select
                onChange={onChange("nhaThuoc")}
                value={_state.nhaThuoc}
                className="input-filter"
                placeholder={t("baoCao.chonLoaiPhieuThu")}
                data={LOAI_PHIEU_THU}
              />
            </div>
          </Col>
        </Row>
      </>
    );
  };

  const handleDataSearch = ({ _state }) => {
    return {
      tuThoiGian: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
      denThoiGian: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
      dsKhoaThucHienId: _state.dsKhoaThucHienId,
      nhaThuoc: _state.nhaThuoc,
      dsNhaThuNganId: _state.dsNhaThuNganId,
      doiTuong: _state.doiTuong,
    };
  };

  const beforeOk =
  ({ _state, _beforeOk }) =>
  () => {
    if (!_state.tuNgay) {
      message.error("Vui lòng chọn từ ngày");
      return false;
    }
    if (!_state.denNgay) {
      message.error("Vui lòng chọn đến ngày");
      return false;
    }
    return _beforeOk();
  };

  return (
    <Main>
      <BaseBaoCao
        title={t("baoCao.tc23")}
        breadcrumb={[{ title: "TC23", link: "/bao-cao/tc23" }]}
        renderFilter={renderFilter}
        getBc={getTc23}
        initState={{
          dsKhoaThucHienId: [""],
          doiTuong: [""],
          nhaThuoc: false,
        }}
        handleDataSearch={handleDataSearch}
        beforeOk={beforeOk}
      />
    </Main>
  );
};

export default Index