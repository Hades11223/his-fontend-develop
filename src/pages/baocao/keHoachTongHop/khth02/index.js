import React, { useEffect, useMemo }from "react";
import { Col, DatePicker, message, Row } from "antd";
import { Select } from "components";
import moment from "moment";
import { useDispatch } from "react-redux";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";
import { useEnum, useStore, useListAll } from "hook";
import { useTranslation } from "react-i18next";
import { concatString } from "utils";
import { ENUM } from "constants/index";

/**
 * KHTH02. Thống kê người bệnh theo mặt bệnh
 *
 */

const Index = () => {
  const { t } = useTranslation();
  const listAllKhoa = useStore("khoa.listAllKhoa", []);
  const [listLoaiDoiTuong] = useListAll("loaiDoiTuong");
  const [listDoiTuongKcb] = useEnum(ENUM.DOI_TUONG_KCB);
  const [listAllMaBenh] = useListAll("maBenh");

  const {
    baoCaoDaIn: { getKhth02 },
    khoa: { getListAllKhoa },
  } = useDispatch();

  useEffect(() => {
    let param = { active: true, page: "", size: "" };
    getListAllKhoa(param);
  }, []);

  const listAllMaBenhCustom = useMemo(() => {
    return (listAllMaBenh || []).map((item) => ({
      id: item?.id,
      ten: `${item?.ma} - ${item?.ten}`,
    }));
  }, [listAllMaBenh]);

  listAllMaBenhCustom.sort(function(a, b) { 
    return a.id - b.id  ||  a.name.localeCompare(b.name);
  });

  const listLoaiDoiTuongCustom = useMemo(() => {
    return (listLoaiDoiTuong || []).map((item) => ({
      id: item?.id,
      ten: `${item?.ma} - ${item?.ten}`,
    }));
  }, [listLoaiDoiTuong]);

  listLoaiDoiTuongCustom.sort(function(a, b) { 
    return a.id - b.id  ||  a.name.localeCompare(b.name);
  });

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
        </Row>
        <Row>
          <Col md={8} xl={8} xxl={8}>
            <div className="item-select">
              <label className="label-filter">{t("baoCao.loaiDoiTuong")}</label>
              <Select
                className="input-filter"
                placeholder={concatString(t("common.chon"), t("baoCao.loaiDoiTuong"))}
                data={[{ id: "", ten: "Tất cả" }, ...(listLoaiDoiTuongCustom || [])]}
                onChange={onChange("loaiDoiTuongId")}
                value={_state.loaiDoiTuongId}
              />
            </div>
          </Col>
          <Col md={8} xl={8} xxl={8}>
            <div className="item-select">
              <label className="label-filter">{t("baoCao.doiTuongKcb")}</label>
              <Select
                onChange={onChange("doiTuongKcb")}
                value={_state.doiTuongKcb}
                className="input-filter"
                placeholder={t("baoCao.chonDoiTuong")}
                data={[{ id: "", ten: "Tất cả" }, ...(listDoiTuongKcb || [])]}
              />
            </div>
          </Col>
          <Col md={8} xl={8} xxl={8}>
            <div className="item-select">
              <label className="label-filter">{t("baoCao.chanDoanBenh")}</label>
              <Select
                onChange={onChange("dsCdChinhId", true)}
                value={_state.dsCdChinhId}
                className="input-filter"
                placeholder={t("baoCao.chonTenNhomBenh")}
                mode="multiple"
                data={[{ id: "", ten: "Tất cả" }, ...(listAllMaBenhCustom || [])]}
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
    dsCdChinhId: _state.dsCdChinhId,
    loaiDoiTuongId: _state.loaiDoiTuongId,
    doiTuongKcb: _state.doiTuongKcb,
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
        title={t("baoCao.khth02")}
        renderFilter={renderFilter}
        getBc={getKhth02}
        handleDataSearch={handleDataSearch}
        beforeOk={beforeOk}
        initState={{
          khoaId: [""],
          dsCdChinhId: [""],
          loaiDoiTuongId: [""],
          doiTuongKcb: [""],
        }}
        breadcrumb={[{ title: "KHTH02", link: "/bao-cao/khth-02" }]}
      />
    </Main>
  );
};

export default Index;
