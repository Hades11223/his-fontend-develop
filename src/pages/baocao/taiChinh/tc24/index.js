import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useEnum, useStore } from "hook";
import { Col, DatePicker, Row, message } from "antd";
import Select from "components/Select";
import BaseBaoCao from "../../BaseBaoCao";
import { Main, GlobalStyle } from "./styled";
import { useTranslation } from "react-i18next";
import { LOAI_PHIEU_THU, DA_THANH_TOAN } from "pages/baocao/utils";
import moment from "moment";
import { concatString } from "utils";
import {
  DS_DOI_TUONG_BAO_HIEM,
  ENUM
} from "constants/index";
/**
 * TC24. Phân tích cơ cấu thu chi theo khoa chỉ định
 *
 */

const Index = () => {
  const { t } = useTranslation();
  const {
    baoCaoDaIn: { getTc24 },
    khoa: { getListAllKhoa },
  } = useDispatch();

  const listAllKhoa = useStore("khoa.listAllKhoa", []);
  const [listDoiTuongKcb] = useEnum(ENUM.DOI_TUONG_KCB);

  useEffect(() => {
  let param = { active: true, page: "", size: "" };
    getListAllKhoa({ ...param, page: 0 });
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
              <label className="label-filter">{t("baoCao.doiTuong")}</label>
              <Select
                className="input-filter"
                placeholder={t("baoCao.chonDoiTuong")}
                data={[
                  { id: "", ten: t("common.tatCa") },
                  ...DS_DOI_TUONG_BAO_HIEM,
                ]}
                onChange={onChange("doiTuong", true)}
                value={_state.doiTuong}
              />
            </div>
          </Col>
          <Col md={6} xl={6} xxl={6}>
            <div className="item-select">
              <label className="label-filter">{t("baoCao.khoaChiDinh")}</label>
              <Select
                mode="multiple"
                hasAll={true}
                onChange={onChange("dsKhoaChiDinhId", true)}
                className="input-filter"
                value={_state.dsKhoaChiDinhId}
                placeholder={t("baoCao.chonKhoa")}
                data={[{ id: "", ten: "Tất cả" }, ...(listAllKhoa || [])]}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6} xl={6} xxl={6}>
            <div className="item-select">
              <label className="label-filter">{t("baoCao.loaiDoiTuongKCB")}</label>
              <Select
                mode="multiple"
                hasAll={true}
                onChange={onChange("dsDoiTuongKcb", true)}
                value={_state.dsDoiTuongKcb}
                className="input-filter"
                placeholder={concatString(t("common.chon"), t("baoCao.doiTuongNguoiBenh"))}
                data={[{ id: "", ten: t("common.tatCa") }, ...(listDoiTuongKcb || [])]}
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
                defaultValue={_state.nhaThuoc}
                className="input-filter"
                placeholder={t("baoCao.chonLoaiPhieuThu")}
                data={LOAI_PHIEU_THU}
              />
            </div>
          </Col>
          <Col md={6} xl={6} xxl={6}>
            <div className="item-select">
              <label className="label-filter">
                {t("baoCao.trangThaiThanhToan")}
              </label>
              <Select
                onChange={onChange("thanhToan")}
                value={_state.thanhToan}
                defaultValue={_state.thanhToan}
                className="input-filter"
                placeholder={t("baoCao.chonTrangThaiThanhToan")}
                data={DA_THANH_TOAN}
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
      dsKhoaChiDinhId: _state.dsKhoaChiDinhId,
      nhaThuoc: _state.nhaThuoc,
      doiTuong: _state.doiTuong,
      dsDoiTuongKcb: _state.dsDoiTuongKcb,
      thanhToan: _state.thanhToan,
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
        title={t("baoCao.tc24")}
        breadcrumb={[{ title: "TC24", link: "/bao-cao/tc24" }]}
        renderFilter={renderFilter}
        getBc={getTc24}
        initState={{
          dsKhoaChiDinhId: [""],
          doiTuong: [""],
          dsDoiTuongKcb: [""],
          thanhToan: null,
          nhaThuoc: false,
        }}
        handleDataSearch={handleDataSearch}
        beforeOk={beforeOk}
      />
    </Main>
  );
};

export default Index