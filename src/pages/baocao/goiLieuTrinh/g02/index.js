import React, { useEffect, useState } from "react";
import { Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import { useDispatch } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";
import { useStore } from "hook";
import { useTranslation } from "react-i18next";
import { ENUM } from "constants/index";
import { useEnum } from "hook";
import SelectLoadMore from "components/SelectLoadMore";
import dichVuProvider from "data-access/categories/dm-dich-vu-provider";

/**
 * G02. Báo cáo chi tiết thực hiện dịch vụ
 *
 */

const Index = () => {
  const { t } = useTranslation();
  const {
    khoa: { getListAllKhoa },
    baoCaoDaIn: { getG02 },
    utils: { getUtils },
    thietLap: { getThietLap },
    nhanVien: { getListNhanVienTongHop, getListNhanVien },
    nhomDichVuCap1: { getAllTongHopDichVuCap1 },
  } = useDispatch();

  const listAllKhoa = useStore("khoa.listAllKhoa");
  const listLoaiThoiGian = useStore("utils.listLoaiThoiGian", []);
  const listAllNhanVien = useStore("nhanVien.listNhanVien", []);
  const listAllNhomDichVuCap1 = useStore(
    "nhomDichVuCap1.listAllNhomDichVuCap1",
    []
  );

  const [state, _setState] = useState({
    addParamDv: {},
  });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  const handleChange = (key, onChange, _state) => (value) => {
    if (key === "dsNhomDichVuCap1Id") {
      setState({
        addParamDv: { ...state.addParamDv, dsdsNhomDichVuCap1Id: value },
      });
      onChange(key, true)(value);
    }
  };

  useEffect(() => {
    let param = { active: true, page: "", size: "" };
    getListAllKhoa(param);
    getUtils({ name: "LoaiThoiGian" });

    getThietLap({ ma: "bs" }).then((data) => {
      getListNhanVienTongHop({
        active: true,
        "vanBang.ma": data,
      });
    });

    getAllTongHopDichVuCap1({ ...param, page: 0 });
  }, []);

  const renderFilter = ({ onChange, _state }) => {
    return (
      <>
        <Row>
          <Col span={6}>
            <div className="item-select">
              <label className="label-filter">
                {t("baoCao.loaiThoiGian")}
                <span className="icon-required">*</span>
              </label>
              <Select
                className="input-filter"
                placeholder={t("baoCao.chonThoiGianThanhToan")}
                data={(listLoaiThoiGian || []).filter((item) =>
                  [20, 30, 40].includes(item.id)
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
          <Col span={6}>
            <div className="item-date">
              <label className="label-filter">
                {t("common.tuNgay")} <span className="icon-required">*</span>
              </label>
              <DatePicker
                showTime={{ defaultValue: moment().startOf("day") }}
                value={_state.tuThoiGian}
                onChange={onChange("tuThoiGian")}
                placeholder={t("common.chonNgay")}
                format="DD/MM/YYYY HH:mm:ss"
                className="input-filter"
              />
              {!_state.isValidData && !_state.tuThoiGian && (
                <div className="error">{t("baoCao.chonTuNgay")}!</div>
              )}
            </div>
          </Col>
          <Col span={6}>
            <div className="item-date">
              <label className="label-filter">
                {t("common.denNgay")} <span className="icon-required">*</span>
              </label>
              <DatePicker
                showTime={{ defaultValue: moment().startOf("day") }}
                value={_state.denThoiGian}
                onChange={onChange("denThoiGian")}
                placeholder={t("common.chonNgay")}
                format="DD/MM/YYYY HH:mm:ss"
                className="input-filter"
              />
              {!_state.isValidData && !_state.denThoiGian && (
                <div className="error">{t("baoCao.chonDenNgay")}!</div>
              )}
            </div>
          </Col>
          <Col span={6}>
            <div className="item-select">
              <label className="label-filter">{t("baoCao.khoaChiDinh")}</label>
              <Select
                mode="multiple"
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
          <Col span={6}>
            <div className="item-select">
              <label className="label-filter">{t("baoCao.khoaThucHien")}</label>
              <Select
                mode="multiple"
                className="input-filter"
                placeholder={t("baoCao.chonKhoaThucHien")}
                data={[{ id: "", ten: t("common.tatCa") }, ...listAllKhoa]}
                onChange={onChange("dsKhoaThucHienId", true)}
                value={_state.dsKhoaThucHienId}
              />
            </div>
          </Col>
          <Col span={6}>
            <div className="item-select">
              <label className="label-filter">{t("baoCao.bacSiChiDinh")}</label>
              <Select
                onChange={onChange("bacSiChiDinhId")}
                value={_state.bacSiChiDinhId}
                className="input-filter"
                placeholder={t("baoCao.chonBacSi")}
                data={listAllNhanVien}
              />
            </div>
          </Col>
          <Col span={6}>
            <div className="item-select">
              <label className="label-filter">
                {t("baoCao.bacSiThucHien")}
              </label>
              <Select
                onChange={onChange("bacSiThucHienId")}
                value={_state.bacSiThucHienId}
                className="input-filter"
                placeholder={t("baoCao.chonBacSi")}
                data={listAllNhanVien}
              />
            </div>
          </Col>
          <Col span={6}>
            <div className="item-select">
              <label className="label-filter">{t("baoCao.nhomDichVu")}</label>
              <Select
                onChange={handleChange("dsNhomDichVuCap1Id", onChange, _state)}
                value={_state.dsNhomDichVuCap1Id}
                className="input-filter"
                mode="multiple"
                placeholder={t("baoCao.chonNhomDichVu")}
                data={[
                  { id: "", ten: "Tất cả" },
                  ...(listAllNhomDichVuCap1 || []),
                ]}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <div className="item-select">
              <label className="label-filter">{t("baoCao.tenDichVu")}</label>
              <SelectLoadMore
                api={dichVuProvider.searchAll}
                mapData={(i) => ({
                  value: i.id,
                  label: i.ten,
                })}
                onChange={onChange("dsDichVuId")}
                value={_state.dsDichVuId}
                keySearch={"ten"}
                placeholder={t("baoCao.chonDichVu")}
                className="input-filter"
                mode="multiple"
                // hasAll={true}
                addParam={state.addParamDv}
                blurReset={true}
              />
            </div>
          </Col>
          <Col span={6}>
            <div className="item-select">
              <label className="label-filter">
                {t("baoCao.dichVuThuocGoi")}
              </label>
              <Select
                onChange={onChange("trongGoi")}
                value={_state.trongGoi}
                className="input-filter"
                placeholder={t("baoCao.dichVuThuocGoi")}
                data={[
                  { id: "", ten: "Tất cả" },
                  { id: true, ten: "Dịch vụ thuộc gói" },
                  { id: false, ten: "Dịch vụ lẻ" },
                ]}
              />
            </div>
          </Col>
        </Row>
      </>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    loaiThoiGian: _state.loaiThoiGian,
    tuThoiGian: moment(_state.tuThoiGian).format("YYYY-MM-DD HH:mm:ss"),
    denThoiGian: moment(_state.denThoiGian).format("YYYY-MM-DD HH:mm:ss"),
    dsKhoaChiDinhId: _state.dsKhoaChiDinhId,
    dsKhoaThucHienId: _state.dsKhoaThucHienId,
    bacSiChiDinhId: _state.bacSiChiDinhId,
    bacSiThucHienId: _state.bacSiThucHienId,
    dsNhomDichVuCap1Id: _state.dsNhomDichVuCap1Id,
    dsDichVuId: _state.dsDichVuId,
    trongGoi: _state.trongGoi,
  });

  const beforeOk =
    ({ _state, _beforeOk }) =>
    () => {
      if (!_state.tuNgay) {
        message.error(t("baoCao.chonTuNgay"));
        return false;
      }
      if (!_state.denNgay) {
        message.error(t("baoCao.chonTuNgay"));
        return false;
      }
      if (!_state.loaiThoiGian) {
        message.error(t("baoCao.vuiLongChonLoaiThoiGian"));
        return false;
      }
      return _beforeOk();
    };

  return (
    <Main>
      <BaseBaoCao
        title={t("baoCao.g02")}
        renderFilter={renderFilter}
        getBc={getG02}
        handleDataSearch={handleDataSearch}
        beforeOk={beforeOk}
        breadcrumb={[{ title: "G02", link: "/bao-cao/g-02" }]}
        initState={{
          loaiThoiGian: 20,
        }}
      />
    </Main>
  );
};

export default Index;
