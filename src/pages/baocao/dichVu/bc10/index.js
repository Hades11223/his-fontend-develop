import { Checkbox, Col, DatePicker, message, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import SelectLoadMore from "components/SelectLoadMore";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";
import { useEnum, useStore } from "hook";
import { useTranslation } from "react-i18next";
import nbDotDieuTriProvider from "data-access/nb-dot-dieu-tri-provider";
import { DA_THANH_TOAN } from "pages/baocao/utils";
import dichVuProvider from "data-access/categories/dm-dich-vu-provider";
import { useState } from "react";
import { concatString } from "utils";
import {
  TRANG_THAI_THANH_TOAN,
  THUC_HIEN_DICH_VU,
  SO_LUONG_DICH_VU,
} from "constants/index";

/**
 * BC10. Báo cáo chi tiết dịch vụ
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
    khoa: { getListAllKhoa },
    phong: { getListAllPhong },
    nhomDichVuCap1: { getAllDichVuCap1 },
    baoCaoDaIn: { getBc10 },
    thietLap: { getThietLap },
    nhanVien: { getListNhanVien },
    dichVu: { getAllDichVu },
  } = useDispatch();
  const { listAllKhoa } = useStore("khoa", []);
  const { listAllPhong } = useStore("phong", []);
  const [listLoaiThoiGian] = useEnum("LoaiThoiGian", []);
  const [listDoiTuong] = useEnum("DoiTuong", []);
  const listAllNhomDichVuCap1 = useStore(
    "nhomDichVuCap1.listAllNhomDichVuCap1",
    []
  );
  const listAllNhanVien = useStore("nhanVien.listNhanVien", []);
  const listAllDichVu = useStore("dichVu.listAllDichVu", []);

  useEffect(() => {
    let param = { active: true, page: "", size: "" };
    getListAllKhoa(param);
    getListAllPhong(param);
    getAllDichVuCap1({ ...param, page: 0 });
    getAllDichVu({ active: true });

    getThietLap({ ma: "BAC_SI" }).then((data) => {
      getListNhanVien({
        active: true,
        "vanBang.ma": data,
      });
    });
  }, []);

  const handleChange = (key, onChange, _state) => (value) => {
    if (key === "nhomDichVuCap1Id") {
      setState({
        addParamDv: { ...state.addParamDv, dsNhomDichVuCap1Id: value },
      });
      onChange(key, true)(value);
    }
  };

  const renderFilter = ({ onChange, _state }) => {
    return (
      <Row>
        <Col span={6}>
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
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">
              {t("baoCao.doiTuongNguoiBenh")}
            </label>
            <Select
              className="input-filter"
              placeholder={t("baoCao.chonDoiTuong")}
              data={[{ id: "", ten: "Tất cả" }, ...(listDoiTuong || [])]}
              onChange={onChange("doiTuong")}
              value={_state.doiTuong}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">{t("baoCao.khoaChiDinh")}</label>
            <Select
              onChange={onChange("khoaChiDinhId")}
              className="input-filter"
              value={_state.khoaChiDinhId}
              placeholder={t("baoCao.chonKhoa")}
              data={[{ id: "", ten: "Tất cả" }, ...(listAllKhoa || [])]}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">{t("baoCao.nhomDichVu")}</label>
            <Select
              onChange={handleChange("nhomDichVuCap1Id", onChange, _state)}
              value={_state.nhomDichVuCap1Id}
              className="input-filter"
              // mode="multiple"
              placeholder={t("baoCao.chonNhomDichVu")}
              data={[
                { id: "", ten: "Tất cả" },
                ...(listAllNhomDichVuCap1 || []),
              ]}
            />
          </div>
        </Col>
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
          <div className="item-select">
            <label className="label-filter">
              {t("baoCao.trangThaiThanhToan")}
            </label>
            <Select
              onChange={onChange("thanhToan")}
              value={_state.thanhToan}
              className="select input-filter"
              placeholder={t("baoCao.chonTrangThaiThanhToan")}
              data={[
                { id: "", ten: t("common.tatCa") },
                { id: false, ten: TRANG_THAI_THANH_TOAN.CHUA_THANH_TOAN.ten },
                { id: true, ten: TRANG_THAI_THANH_TOAN.DA_THANH_TOAN.ten },
              ]}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">{t("baoCao.bacSiChiDinh")}</label>
            <Select
              onChange={onChange("bacSiChiDinhId")}
              value={_state.bacSiChiDinhId}
              className="input-filter"
              placeholder={t("baoCao.chonBacSi")}
              data={[{ id: "", ten: "Tất cả" }, ...(listAllNhanVien || [])]}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
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
              // mode="multiple"
              // hasAll={true}
              addParam={state.addParamDv}
              blurReset={true}
            />
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
            <label className="label-filter">
              {t("baoCao.trangThaiDichVu")}
            </label>
            <Select
              onChange={onChange("thucHienDichVu")}
              value={_state.thucHienDichVu}
              defaultValue={_state.thucHienDichVu}
              className="select input-filter"
              placeholder={concatString(t("common.chon"), t("baoCao.trangThaiDichVu"))}
              data={THUC_HIEN_DICH_VU}
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">
              {t("baoCao.soLuongDichVu")}
            </label>
            <Select
              onChange={onChange("dichVuHoan")}
              value={_state.dichVuHoan}
              defaultValue={_state.dichVuHoan}
              className="select input-filter"
              placeholder={concatString(t("common.chon"), t("baoCao.soLuongDichVu"))}
              data={SO_LUONG_DICH_VU}
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
    doiTuong: _state.doiTuong,
    khoaChiDinhId: _state.khoaChiDinhId,
    nhomDichVuCap1Id: _state.nhomDichVuCap1Id,
    thanhToan: _state.thanhToan,
    bacSiChiDinhId: _state.bacSiChiDinhId,
    dichVuId: _state.dichVuId,
    thucHienDichVu: _state.thucHienDichVu,
    dichVuHoan: _state.dichVuHoan,
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
        title={t("baoCao.bc10")}
        renderFilter={renderFilter}
        getBc={getBc10}
        handleDataSearch={handleDataSearch}
        beforeOk={beforeOk}
        initState={{
          loaiThoiGian: 10,
          khoaChiDinhId: [""],
          doiTuong: [""],
          bacSiChiDinhId: [""],
          thanhToan: [""],
          nhomDichVuCap1Id: [""],
          thucHienDichVu: [""],
          dichVuHoan: [""],
        }}
        breadcrumb={[{ title: "Bc10", link: "/bao-cao/bc10" }]}
      />
    </Main>
  );
};

export default Index;
