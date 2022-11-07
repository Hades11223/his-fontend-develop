import React, { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useEnum, useStore } from "hook";
import { Col, DatePicker, Row, message } from "antd";
import Select from "components/Select";
import BaseBaoCao from "../../BaseBaoCao";
import { Main, GlobalStyle } from "./styled";
import { useTranslation } from "react-i18next";
import { LOAI_PHIEU_THU } from "pages/baocao/utils";
import dichVuProvider from "data-access/categories/dm-dich-vu-provider";
import SelectLoadMore from "components/SelectLoadMore";
import moment from "moment";
import {
  DS_DOI_TUONG_BAO_HIEM,
  ENUM,
} from "constants/index";
/**
 * TC21. Bảng tổng hợp thu dịch vụ KCB
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
    baoCaoDaIn: { getTc21 },
    khoa: { getListAllKhoa },
    nhomDichVuCap1: { getAllTongHopDichVuCap1 },
    phong: { getListAllPhong },
    nhanVien: { getListAllNhanVien },
    toaNha: { getListAllToaNha },
    thietLap: { getThietLap }
  } = useDispatch();

  const listAllKhoa = useStore("khoa.listAllKhoa", []);
  const listAllPhong = useStore("phong.listAllPhong", []);
  const listAllToaNha = useStore("toaNha.listAllToaNha", []);
  const listAllNhanVien = useStore("nhanVien.listAllNhanVien", []);
  const [listDoiTuongKcb] = useEnum(ENUM.DOI_TUONG_KCB);
  const listAllNhomDichVuCap1 = useStore(
    "nhomDichVuCap1.listAllNhomDichVuCap1",
    []
  );

  const listThuNgan = useMemo(() => {
    return [
      { id: "", ten: "Tất cả" },
      ...(listAllNhanVien || []).map((item) => ({
        ...item,
        ten: `${item.taiKhoan || ""}_${item.ma}_${item.ten}`,
      })),
    ];
    
  }, [listAllNhanVien]);

  useEffect(() => {
    let param = { active: true, page: "", size: "" };
    getListAllKhoa({ ...param, page: 0 });
    getListAllPhong({ ...param, page: 0 });
    getListAllToaNha({ ...param, page: 0 });
    getThietLap({ ma: "bs" }).then((data) => {
      getListAllNhanVien({
        active: true,
        "vanBang.ma": data,
      });
    });
    getAllTongHopDichVuCap1({ ...param, page: 0 });
  }, []);

  const handleChange = (key, onChange, _state) => (value) => {
    if (key === "dsNhomDichVuCap1Id") {
      setState({
        addParamDv: { ...state.addParamDv, dsNhomDichVuCap1Id: value },
      });
      onChange(key, true)(value);
    }
  };

  const renderFilter = ({ onChange, _state }) => {
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
              <label className="label-filter">
                {t("baoCao.khoaThucHien")}</label>
              <Select
                mode="multiple"
                hasAll={true}
                onChange={onChange("dsKhoaThucHienId", true)}
                className="input-filter"
                value={_state.dsKhoaThucHienId}
                placeholder={t("baoCao.chonKhoaThucHien")}
                data={[{ id: "", ten: t("common.tatCa") }, ...(listAllKhoa || [])]}
              />
            </div>
          </Col>
          <Col md={6} xl={6} xxl={6}>
            <div className="item-select">
              <label className="label-filter">
                {t("baoCao.phongThucHien")}
              </label>
              <Select
                className="input-filter"
                placeholder={t("baoCao.chonPhongThucHien")}
                value={_state.dsPhongThucHienId}
                onChange={onChange("dsPhongThucHienId")}
                data={[{ id: "", ten: t("common.tatCa") }, ...(listAllPhong || [])]}
              />
            </div>
          </Col>
        <Row/>
        <Row>
          <Col md={6} xl={6} xxl={6}>
            <div className="item-select">
              <label className="label-filter">{t("baoCao.khoaChiDinh")}</label>
              <Select
                onChange={onChange("dsKhoaChiDinhId", true)}
                className="input-filter"
                value={_state.dsKhoaChiDinhId}
                placeholder={t("baoCao.chonKhoaChiDinh")}
                data={[{ id: "", ten: t("common.tatCa") }, ...(listAllKhoa || [])]}
              />
            </div>
          </Col>
          <Col md={6} xl={6} xxl={6}>
            <div className="item-select">
              <label className="label-filter">
                {t("baoCao.phongChiDinh")}
              </label>
              <Select
                className="input-filter"
                placeholder={t("baoCao.chonPhongChiDinh")}
                onChange={onChange("dsPhongChiDinhId")}
                value={_state.dsPhongChiDinhId}
                data={[{ id: "", ten: t("common.tatCa") }, ...(listAllPhong || [])]}
              />
            </div>
          </Col>
          <Col md={6} xl={6} xxl={6}>
            <div className="item-select">
              <label className="label-filter">
                {t("baoCao.bacSiChiDinh")}
              </label>
              <Select
                onChange={onChange("bacSiChiDinhId")}
                value={_state.bacSiChiDinhId}
                className="input-filter"
                placeholder={t("baoCao.chonBacSi")}
                data={[{ id: "", ten: t("common.tatCa") }, ...(listAllNhanVien || [])]}
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
            <label className="label-filter">{t("baoCao.thuNgan")}</label>
            <Select
              onChange={onChange("dsThuNganId")}
              value={_state.dsThuNganId}
              className="input-filter"
              placeholder={t("baoCao.chonThuNgan")}
              data={listThuNgan}
            />
          </div>
          </Col>
          <Col md={6} xl={6} xxl={6}>
            <div className="item-select">
              <label className="label-filter">{t("baoCao.loaiDoiTuongKCB")}</label>
              <Select
                onChange={onChange("dsDoiTuongKcb")}
                value={_state.dsDoiTuongKcb}
                className="input-filter"
                placeholder={"Chọn loại phiếu thu"}
                data={[{ id: "", ten: t("common.tatCa") }, ...(listDoiTuongKcb || [])]}
              />
            </div>
          </Col>
          <Col md={6} xl={6} xxl={6}>
            <div className="item-select">
              <label className="label-filter">{t("baoCao.doiTuong")}</label>
              <Select
                className="input-filter"
                placeholder={t("baoCao.doiTuong")}
                data={[
                  { id: "", ten: t("common.tatCa") },
                  ...DS_DOI_TUONG_BAO_HIEM,
                ]}
                onChange={onChange("doiTuong")}
                value={_state.doiTuong}
              />
            </div>
          </Col>
        </Row>
          <Col md={6} xl={6} xxl={6}>
            <div className="item-select">
              <label className="label-filter">{t("baoCao.nhomDichVu")}</label>
              <Select
                onChange={handleChange("dsNhomDichVuCap1Id", onChange, _state)}
                value={_state.dsNhomDichVuCap1Id}
                className="input-filter"
                placeholder={t("baoCao.chonNhomDichVu")}
                data={[
                  { id: "", ten: t("common.tatCa") },
                  ...(listAllNhomDichVuCap1 || []),
                ]}
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
                onChange={onChange("dsDichVuId")}
                value={_state.dsDichVuId}
                keySearch={"ten"}
                placeholder={t("baoCao.chonDichVu")}
                className="input-filter"
                addParam={state.addParamDv}
                blurReset={true}
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
      dsPhongThucHienId: _state.dsPhongThucHienId,
      dsKhoaChiDinhId: _state.dsKhoaChiDinhId,
      dsPhongChiDinhId: _state.dsPhongChiDinhId,
      bacSiChiDinhId: _state.bacSiChiDinhId,
      nhaThuoc: _state.nhaThuoc,
      dsNhaThuNganId: _state.dsNhaThuNganId,
      dsThuNganId: _state.dsThuNganId,
      dsDoiTuongKcb: _state.dsDoiTuongKcb,
      doiTuong: _state.doiTuong,
      dsNhomDichVuCap1Id: _state.dsNhomDichVuCap1Id,
      dsDichVuId: _state.dsDichVuId,
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
        title={t("baoCao.tc21")}
        breadcrumb={[{ title: "TC21", link: "/bao-cao/tc21" }]}
        renderFilter={renderFilter}
        getBc={getTc21}
        initState={{
          dsKhoaThucHienId: [""],
          dsPhongThucHienId: [""],  
          dsKhoaChiDinhId: [""],
          dsPhongChiDinhId: [""],
          bacSiChiDinhId: [""],
          nhaThuoc: [""],
          dsDoiTuongKcb: [""],
          dsNhomDichVuCap1Id: [""],
        }}
        handleDataSearch={handleDataSearch}
        beforeOk={beforeOk}
      />
    </Main>
  );
};

export default Index