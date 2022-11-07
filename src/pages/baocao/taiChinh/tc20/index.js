import { Col, DatePicker, Row, message } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BaseBaoCao from "../../BaseBaoCao";
import { Main, GlobalStyle } from "./styled";
import { useTranslation } from "react-i18next";
import { useEnum, useStore } from "hook";
import {
  DS_DOI_TUONG_BAO_HIEM,
  ENUM,
  TRANG_THAI_THANH_TOAN,
} from "constants/index";

const Index = () => {
  const { t } = useTranslation();

  const {
    nhomDichVuCap3: { listAllNhomDichVuCap3 = [] },
  } = useSelector((state) => state);

  const {
    baoCaoDaIn: { getTc20 },
    khoa: { getListAllKhoa },
    nhomDichVuCap3: { getAllTongHopDichVuCap3 },
  } = useDispatch();

  const { listAllKhoa } = useStore("khoa", []);

  const [listLoaiThoiGian] = useEnum(ENUM.LOAI_THOI_GIAN);

  useEffect(() => {
    let param = { active: true, page: "", size: "" };
    getListAllKhoa(param);
    getAllTongHopDichVuCap3();
  }, []);

  const onCustomChange = (key, onChange) => (e) => {
    if (key === "thangNam") {
      onChange("tuThoiGian")(moment(e).startOf("month"));
      onChange("denThoiGian")(moment(e).endOf("month"));
    }
    onChange(key)(e);
  };

  const renderFilter = ({ onChange, _state }) => {
    return (
      <>
        <GlobalStyle />
        <Row>
          <Col span={6}>
            <div className="item-select">
              <label className="label-filter">
                {t("baoCao.theoThoiGian")}
                <span className="red required">*</span>
              </label>
              <Select
                className="input-filter"
                placeholder={t("baoCao.chonThoiGianThanhToan")}
                data={listLoaiThoiGian.filter((item) =>
                  [20, 30, 40, 60].includes(item.id)
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
                {`${t("baoCao.thang")}/${t("baoCao.nam").toLowerCase()}`}
                <span className="red required">*</span>
              </label>
              <DatePicker
                // showTime={{ defaultValue: moment().endOf("month") }}
                value={_state.thangNam}
                onChange={onCustomChange("thangNam", onChange)}
                placeholder={t("baoCao.chonThangNam")}
                format="MM/YYYY"
                className="input-filte"
                picker="month"
                dropdownClassName="bc-input-month"
              />
              {!_state.isValidData &&
                (!_state.tuThoiGian || !_state.denThoiGian) && (
                  <div className="error">{t("baoCao.vuiLongChonThangNam")}</div>
                )}
            </div>
          </Col>
          <Col span={6}>
            <div className="item-select">
              <label className="label-filter">
                {t("baoCao.khoaThucHien")}
                <span className="red required">*</span>
              </label>
              <Select
                mode="multiple"
                className="input-filter"
                placeholder={t("baoCao.chonKhoaThucHien")}
                data={[{ id: "", ten: t("common.tatCa") }, ...listAllKhoa]}
                onChange={onChange("dsKhoaId", true)}
                value={_state.dsKhoaId}
              />
              {!_state.isValidData && !_state.dsKhoaId && (
                <div className="error">{t("baoCao.vuiLongChonKhoa")}</div>
              )}
            </div>
          </Col>
          <Col span={6}>
            <div className="item-select">
              <label className="label-filter">
                {t("baoCao.trangThaiThanhToan")}
              </label>
              <Select
                className="input-filter"
                placeholder={t("baoCao.chonTrangThaiThanhToan")}
                data={[
                  { id: "", ten: t("common.tatCa") },
                  { id: false, ten: TRANG_THAI_THANH_TOAN.CHUA_THANH_TOAN.ten },
                  { id: true, ten: TRANG_THAI_THANH_TOAN.DA_THANH_TOAN.ten },
                ]}
                onChange={onChange("thanhToan")}
                value={_state.thanhToan}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
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
          <Col span={6}>
            <div className="item-select">
              <label className="label-filter">
                {t("baoCao.nhomDichVuCap3")}
              </label>
              <Select
                mode="multiple"
                className="input-filter"
                placeholder={t("baoCao.nhomDichVuCap3")}
                data={[
                  { id: "", ten: t("common.tatCa") },
                  ...listAllNhomDichVuCap3,
                ]}
                onChange={onChange("dsNhomDvCap3Id", true)}
                value={_state.dsNhomDvCap3Id}
              />
            </div>
          </Col>
        </Row>
      </>
    );
  };

  const handleDataSearch = ({ _state }) => {
    return {
      loaiThoiGian: _state.loaiThoiGian,
      tuThoiGian: moment(_state.tuThoiGian).format("DD-MM-YYYY HH:mm:ss"),
      denThoiGian: moment(_state.denThoiGian).format("DD-MM-YYYY HH:mm:ss"),
      dsKhoaId: _state.dsKhoaId,
      thanhToan: _state.thanhToan,
      doiTuong: _state.doiTuong,
      dsNhomDvCap3Id: _state.dsNhomDvCap3Id,
    };
  };

  const beforeOk =
    ({ _state, _beforeOk }) =>
    () => {
      if (!_state.loaiThoiGian) {
        message.error("Vui lòng chọn loại thời gian!");
        return false;
      }
      if (!_state.tuThoiGian || !_state.denThoiGian) {
        message.error("Vui lòng chọn tháng/năm!");
        return false;
      }
      // if (!_state.dsKhoaId) {
      //   message.error("Vui lòng chọn khoa!");
      //   return false;
      // }
      return _beforeOk();
    };

  return (
    <Main>
      <BaseBaoCao
        title={t("baoCao.tc20BangChamCongCacDichVuTheoYeuCauNgayThuong")}
        listLink={[
          { link: "/bao-cao", title: t("baoCao.baoCao") },
          {
            link: "/bao-cao/tc20",
            title: t("baoCao.tc20BangChamCongCacDichVuTheoYeuCauNgayThuong"),
          },
        ]}
        renderFilter={renderFilter}
        getBc={getTc20}
        handleDataSearch={handleDataSearch}
        initState={{
          loaiThoiGian: 30,
          thangNam: moment(),
          dsKhoaId: [""],
          thanhToan: [""],
          tuThoiGian: moment().startOf("month"),
          denThoiGian: moment().endOf("month"),
          doiTuong: "",
          dsNhomDvCap3Id: "",
        }}
        beforeOk={beforeOk}
      />
    </Main>
  );
};

export default Index;
