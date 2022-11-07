import React, { useEffect }from "react";
import { Col, DatePicker, message, Row } from "antd";
import { Select } from "components";
import moment from "moment";
import { useDispatch } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { useStore } from "hook";
import { useTranslation } from "react-i18next";
import { concatString } from "utils";

/**
 * KHTH04. Báo cáo công suất sử dụng giường
 *
 */

const Index = () => {
  const { t } = useTranslation();
  const listAllKhoa = useStore("khoa.listAllKhoa", []);   
  const listAllLoaiBenhAn = useStore("loaiBenhAn.listAllLoaiBenhAn", []);
  
  const {
    baoCaoDaIn: { getKhth04 },
    khoa: { getListAllKhoa },
    loaiBenhAn: { getListAllLoaiBenhAn },
  } = useDispatch();

  useEffect(() => {
    let param = { active: true, page: "", size: "" };
    getListAllKhoa({
      dsTinhChatKhoa: 70,
      param
    });
    getListAllLoaiBenhAn(param);
  }, []);

  const renderFilter = ({ onChange, _state, onKeyDownDate }) => {
    return (
      <>
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
              <label className="label-filter">{t("common.khoa")}</label>
              <Select
                onChange={onChange("khoaId")}
                className="input-filter"
                value={_state.khoaId}
                placeholder={t("baoCao.chonKhoa")}
                data={[{ id: "", ten: "Tất cả" }, ...(listAllKhoa || [])]}
              />
            </div>
          </Col>
          <Col md={6} xl={6} xxl={6}>
            <div className="item-select">
              <label className="label-filter">{t("baoCao.benhAn")}</label>
              <Select
                onChange={onChange("loaiBenhAnId")}
                value={_state.loaiBenhAnId}
                className="input-filter"
                placeholder={concatString(t("common.chon"), t("baoCao.benhAn"))}
                data={[{ id: "", ten: "Tất cả" }, ...(listAllLoaiBenhAn || [])]}
              />
            </div>
          </Col>
        </Row>
      </>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    tuThoiGian: moment(_state.tuNgay).format("YYYY-MM-DD HH:mm:ss"),
    denThoiGian: moment(_state.denNgay).format("YYYY-MM-DD HH:mm:ss"),
    khoaId: _state.khoaId,
    loaiBenhAnId: _state.loaiBenhAnId,
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
      title={t("baoCao.khth04")}
      renderFilter={renderFilter}
      getBc={getKhth04}
      handleDataSearch={handleDataSearch}
      beforeOk={beforeOk}
      initState={{
        khoaId: [""],
        loaiBenhAnId: [""],
      }}
      breadcrumb={[{ title: "KHTH04", link: "/bao-cao/khth-04" }]}
    />
  );
};

export default Index;
