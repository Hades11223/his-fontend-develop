import React, { useEffect }from "react";
import { Col, DatePicker, message, Row } from "antd";
import { Select } from "components";
import moment from "moment";
import { useDispatch } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";
import { useStore } from "hook";
import { useTranslation } from "react-i18next";
import { concatString } from "utils";
import {
  DS_DOI_TUONG_BAO_HIEM,
} from "constants/index";

/**
 * KHTH05. Thống kê người bệnh chuyển tuyến
 *
 */

const Index = () => {
  const { t } = useTranslation();
  const listAllKhoa = useStore("khoa.listAllKhoa", []);
  const listLoaiDoiTuong = useStore("loaiDoiTuong.listLoaiDoiTuong", []);

  const {
    khoa: { getListAllKhoa },
    loaiDoiTuong: { getListLoaiDoiTuong },
    baoCaoDaIn: { getKhth05 },
  } = useDispatch();

  useEffect(() => {
    let param = { active: true, page: "", size: "" };
    getListAllKhoa(param);
    getListLoaiDoiTuong();
  }, []);

  const renderFilter = ({ onChange, _state, onKeyDownDate }) => {
    return (
      <>
        <Row>
          <Col md={8} xl={8} xxl={8}>
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
          <Col md={8} xl={8} xxl={8}>
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
          <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">{t("baoCao.khoaNguoiBenh")}</label>
            <Select
              onChange={onChange("dsKhoaNbId")}
              className="input-filter"
              value={_state.dsKhoaNbId}
              placeholder={t("baoCao.chonKhoa")}
              data={listAllKhoa}
            />
          </div>
          </Col>
          <Col md={8} xl={8} xxl={8}>
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
              defaultValue={_state.doiTuong}
              value={_state.doiTuong}
            />
            </div>
          </Col>
          <Col md={8} xl={8} xxl={8}>
            <div className="item-select">
              <label className="label-filter">{t("baoCao.loaiDoiTuong")}</label>
              <Select
                className="input-filter"
                placeholder={concatString(t("common.chon"), t("baoCao.loaiDoiTuong"))}
                data={listLoaiDoiTuong}
                onChange={onChange("loaiDoiTuongId")}
                value={_state.loaiDoiTuongId}
              />
            </div>
          </Col>
        </Row>
      </>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    tuNgay: moment(_state.tuNgay).format("YYYY-MM-DD HH:mm:ss"),
    denNgay: moment(_state.denNgay).format("YYYY-MM-DD HH:mm:ss"),
    dsKhoaNbId: _state.dsKhoaNbId,
    doiTuong: _state.doiTuong,
    loaiDoiTuongId: _state.loaiDoiTuongId,
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
        title={t("baoCao.khth05")}
        renderFilter={renderFilter}
        getBc={getKhth05}
        handleDataSearch={handleDataSearch}
        beforeOk={beforeOk}
        initState={{
          doiTuong: [""],
        }}
        breadcrumb={[{ title: "KHTH05", link: "/bao-cao/khth-05" }]}
      />
    </Main>
  );
};

export default Index;
