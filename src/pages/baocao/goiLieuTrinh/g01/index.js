import React, { useEffect } from "react";
import { Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import { useDispatch } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";
import { useStore } from "hook";
import { useTranslation } from "react-i18next";
import { ENUM } from "constants/index"
import { useEnum } from "hook";
/**
 * G01. Báo cáo chi tiết thực hiện dịch vụ gói theo người bệnh
 *
 */

const Index = () => {
  const { t } = useTranslation();
  const {
    khoa: { getListAllKhoa },
    baoCaoDaIn: { getG01 },
  } = useDispatch();
  const listAllKhoa = useStore("khoa.listAllKhoa");
  const [listTrangThaiNbGoiDv] = useEnum(ENUM.TRANG_THAI_NB_GOI_DV);

  useEffect(() => {
    let param = { active: true, page: "", size: "" };
    getListAllKhoa(param);
  }, []);

  const renderFilter = ({ onChange, _state }) => {
    return (
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
            />
            {!_state.isValidData && !_state.denNgay && (
              <div className="error">{t("baoCao.chonDenNgay")}!</div>
            )}
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">{t("baoCao.khoaChiDinh")}</label>
            <Select
              onChange={onChange("khoaChiDinhId", true)}
              className="input-filter"
              value={_state.khoaChiDinhId}
              placeholder={t("baoCao.chonKhoa")}
              data={[{ id: "", ten: "Tất cả" }, ...(listAllKhoa || [])]}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">
              {t("baoCao.trangThaiGoi")}
            </label>
            <Select
              onChange={onChange("trangThaiNbGoiDv", true)}
              value={_state.trangThaiNbGoiDv}
              className="select input-filter"
              placeholder={t("baoCao.chonTrangThaiGoi")}
              data={[{ id: "", ten: "Tất cả" }, ...(listTrangThaiNbGoiDv || [])]}
            />
          </div>
        </Col>
      </Row>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    tuThoiGian: moment(_state.tuNgay).format("YYYY-MM-DD HH:mm:ss"),
    denThoiGian: moment(_state.denNgay).format("YYYY-MM-DD HH:mm:ss"),
    khoaChiDinhId: _state.khoaChiDinhId,
    trangThaiNbGoiDv: _state.trangThaiNbGoiDv,
  });

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
        title={t("baoCao.g01")}
        renderFilter={renderFilter}
        getBc={getG01}
        handleDataSearch={handleDataSearch}
        beforeOk={beforeOk}
        breadcrumb={[{ title: "G01", link: "/bao-cao/g-01" }]}
      />
    </Main>
  );
};

export default Index;
