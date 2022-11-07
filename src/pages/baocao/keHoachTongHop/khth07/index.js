import React, { useEffect, useMemo }from "react";
import { Col, DatePicker, message, Row } from "antd";
import { Select } from "components";
import moment from "moment";
import { useDispatch } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { useStore } from "hook";
import { useTranslation } from "react-i18next";
import { concatString } from "utils";

/**
 * KHTH07. Phản hồi thông tin người bệnh chuyển tuyến
 *
 */

const Index = () => {
  const { t } = useTranslation();
  const listAllBenhVien = useStore("benhVien.listAllBenhVien", []);

  const {
    baoCaoDaIn: { getKhth07 },
    khoa: { getListAllKhoa },
    benhVien: { getListAllBenhVien },
  } = useDispatch();

  useEffect(() => {
    let param = { active: true, page: "", size: "" };
    getListAllKhoa(param);
    getListAllBenhVien(param);
  }, []);

  const listAllBenhVienCustom = useMemo(() => {
    return (listAllBenhVien || []).map((item) => ({
      id: item?.id,
      ten: `${item?.ma} - ${item?.ten}`,
    }));
  }, [listAllBenhVien]);

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
                onKeyDown={onKeyDownDate("tuNgay")}
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
                onKeyDown={onKeyDownDate("denNgay")}
              />
              {!_state.isValidData && !_state.denNgay && (
                <div className="error">{t("baoCao.chonDenNgay")}!</div>
              )}
            </div>
          </Col>
          <Col md={8} xl={8} xxl={8}>
            <div className="item-select">
              <label className="label-filter">{t("baoCao.noiGioiThieu")}</label>
              <Select
                onChange={onChange("dsDmBenhVienId")}
                className="input-filter"
                value={_state.dsDmBenhVienId}
                placeholder={concatString(t("common.chon"), t("baoCao.noiGioiThieu"))}
                data={listAllBenhVienCustom}
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
    dsDmBenhVienId: _state.dsDmBenhVienId,
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
    <BaseBaoCao
      title={t("baoCao.khth07")}
      renderFilter={renderFilter}
      getBc={getKhth07}
      handleDataSearch={handleDataSearch}
      beforeOk={beforeOk}
      breadcrumb={[{ title: "KHTH07", link: "/bao-cao/khth-07" }]}
    />
  );
};

export default Index;
