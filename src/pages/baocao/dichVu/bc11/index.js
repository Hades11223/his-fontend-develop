import { Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import SelectLoadMore from "components/SelectLoadMore";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";
import { useEnum, useStore } from "hook";
import { useTranslation } from "react-i18next";
import dichVuProvider from "data-access/categories/dm-dich-vu-provider";
import { useState } from "react";
/**
 * BC11. Báo cáo chi tiết dịch vụ
 *
 */

const Index = () => {
  const [state, _setState] = useState({
    addParamDv: {},
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };
  const { t } = useTranslation();
  const {
    nhomDichVuCap1: { getAllDichVuCap1 },
    baoCaoDaIn: { getBc11 },
    dichVu: { getAllDichVu },
    loaiHinhThanhToan: { getListAllLoaiHinhThanhToan },
  } = useDispatch();

  const [listLoaiThoiGian] = useEnum("LoaiThoiGian", []);
  const listAllNhomDichVuCap1 = useStore(
    "nhomDichVuCap1.listAllNhomDichVuCap1",
    []
  );
  const listAllLoaiHinhThanhToan = useStore(
    "loaiHinhThanhToan.listAllLoaiHinhThanhToan",
    []
  );

  useEffect(() => {
    let param = { active: true, page: "", size: "" };
    getAllDichVuCap1({ ...param, page: 0 });
    getListAllLoaiHinhThanhToan({ ...param, page: 0 });
    getAllDichVu({ active: true });
  }, []);

  const handleChange = (key, onChange, _state) => (value) => {
    if (key === "nhomDichVuCap1Id") {
      setState({
        addParamDv: { ...state.addParamDv, dsNhomDichVuCap1Id: value },
      });
      onChange(key, true)(value);
    }
  };

  const renderFilter = ({ onChange, _state, onKeyDownDate }) => {
    return (
      <Row>
        <Col md={6} xl={8} xxl={8}>
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
        <Col md={6} xl={8} xxl={8}>
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
        <Col md={6} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">{t("baoCao.nhomDichVu")}</label>
            <Select
              onChange={handleChange("nhomDichVuCap1Id", onChange, _state)}
              value={_state.nhomDichVuCap1Id}
              className="input-filter"
              placeholder={t("baoCao.chonNhomDichVu")}
              data={[
                { id: "", ten: "Tất cả" },
                ...(listAllNhomDichVuCap1 || []),
              ]}
            />
          </div>
        </Col>
        <Col md={6} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">
              {t("baoCao.theoThoiGian")}
              <span className="icon-required">*</span>
            </label>
            <Select
              className="input-filter"
              placeholder={t("baoCao.chonThoiGianThanhToan")}
              data={listLoaiThoiGian.filter((item) =>
                [10, 20, 30, 40].includes(item.id)
              )}
              onChange={onChange("loaiThoiGian")}
              value={_state.loaiThoiGian}
            />
            {!_state.isValidData && !_state.loaiThoiGian && (
              <div className="error">
                {t("baoCao.vuiLongChonThoiGianThanhToan")}
              </div>
            )}
          </div>
        </Col>
        <Col md={6} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">
              {t("baoCao.loaiHinhThanhToan")}
            </label>
            <Select
              onChange={onChange("loaiHinhThanhToanId", true)}
              value={_state.loaiHinhThanhToanId}
              className="select input-filter"
              placeholder={t("baoCao.chonLoaiHinhThanhToan")}
              data={[
                { id: "", ten: "Tất cả" },
                ...(listAllLoaiHinhThanhToan || []),
              ]}
            />
          </div>
        </Col>
        <Col md={6} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">{t("baoCao.tenDichVu")}</label>
            <SelectLoadMore
              api={dichVuProvider.searchAll}
              mapData={(i) => ({
                value: i.id,
                label: i.ten,
              })}
              onChange={onChange("dichVuId")}
              value={_state.dichVuId}
              keySearch={"ten"}
              placeholder={t("baoCao.chonDichVu")}
              className="input-filter"
              addParam={state.addParamDv}
              blurReset={true}
            />
          </div>
        </Col>
      </Row>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    loaiThoiGian: _state.loaiThoiGian,
    tuThoiGian: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
    denThoiGian: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
    nhomDichVuCap1Id: _state.nhomDichVuCap1Id,
    loaiHinhThanhToanId: _state.loaiHinhThanhToanId,
    dichVuId: _state.dichVuId,
  });

  const beforeOk =
    ({ _state, _beforeOk }) =>
    () => {
      if (!_state.loaiThoiGian && _state.loaiThoiGian != "") {
        message.error("Vui lòng chọn loại thời gian");
        return false;
      }
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
        title={t("baoCao.bc11")}
        renderFilter={renderFilter}
        getBc={getBc11}
        handleDataSearch={handleDataSearch}
        beforeOk={beforeOk}
        initState={{
          loaiThoiGian: 10,
        }}
        breadcrumb={[{ title: "Bc11", link: "/bao-cao/bc11" }]}
      />
    </Main>
  );
};

export default Index;
