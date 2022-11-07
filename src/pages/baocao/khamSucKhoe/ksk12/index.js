import React, { useEffect, useMemo } from "react";
import { Col, DatePicker, Row } from "antd";
import { useDispatch } from "react-redux";
import Select from "components/Select";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";
import { useTranslation } from "react-i18next";
import { ENUM, LOAI_DOI_TAC } from "constants/index";
import { useEnum, useStore } from "hook";
import moment from "moment";

const Ksk12 = () => {
  const { t } = useTranslation();
  const {
    baoCaoDaIn: { getKsk12 },
    doiTac: { getListTongHop },
    hopDongKSK: { getListTongHop: getListTongHopHopDong },
  } = useDispatch();
  const listDataTongHop = useStore("doiTac.listDataTongHop", []);
  const listDataTongHopHopDong = useStore("hopDongKSK.listDataTongHop", []);
  const [listTrangThaiHopDong] = useEnum(ENUM.TRANG_THAI_HOP_DONG);
  useEffect(() => {
    getListTongHop({
      page: "",
      size: "",
      active: true,
      dsLoaiDoiTac: LOAI_DOI_TAC.CONG_TY_KSK,
    });
    getListTongHopHopDong({ page: "", size: "" });
  }, []);
  const customChange = (key, onChange) => (e) => {
    // getListTongHopHopDong({ page: "", size: "", doiTacId: e });
    onChange(key)(e);
  };
  const listDataCongTy = useMemo(() => {
    return (listDataTongHop || []).map((item) => ({
      id: item?.id,
      ten: `${item?.ma} - ${item?.ten}`,
    }));
  }, [listDataTongHop]);

  const listDataHopDong = useMemo(() => {
    return (listDataTongHopHopDong || []).map((item) => ({
      id: item?.id,
      doiTacId: item?.doiTacId,
      tenDoiTac: item?.tenDoiTac,
      ten: `${item?.ma} - ${item?.ten}`,
    }));
  }, [listDataTongHopHopDong]);

  const listTrangThaiHopDongCustom = useMemo(() => {
    return listTrangThaiHopDong.filter((x) => [40, 50].includes(x.id));
  }, [listTrangThaiHopDong]);

  const onCustomChange = (key, onChange, _state) => (e, option) => {
    if (key === "dsHopDongKskId") {
      // getListTongHopHopDong({
      //   page: "",
      //   size: "",
      //   doiTacId: option.lists?.doiTacId,
      // });
      onChange("dsDoiTacId", true)(option.map((item) => item.lists?.doiTacId));
      onChange(key, true)(e);
    }
  };

  const renderFilter = ({ onChange, _state, onKeyDownDate }) => {
    return (
      <Row>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-date">
            <label className="label-filter">
              {t("baoCao.tuNgay")} <span className="icon-required">*</span>
            </label>
            <DatePicker
              showTime={{ defaultValue: moment().startOf("day") }}
              value={_state.tuThoiGian}
              onChange={onChange("tuThoiGian")}
              placeholder="Chọn ngày"
              format="DD/MM/YYYY HH:mm:ss"
              className="input-filter"
              onKeyDown={onKeyDownDate("tuThoiGian")}
            />
            {!_state.isValidData && !_state.tuThoiGian && (
              <div className="error">{t("baoCao.chonTuNgay")}</div>
            )}
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-date">
            <label className="label-filter">
              {t("baoCao.denNgay")} <span className="icon-required">*</span>
            </label>
            <DatePicker
              showTime={{ defaultValue: moment().startOf("day") }}
              value={_state.denThoiGian}
              onChange={onChange("denThoiGian")}
              placeholder="Chọn ngày"
              format="DD/MM/YYYY HH:mm:ss"
              className="input-filter"
              onKeyDown={onKeyDownDate("denThoiGian")}
            />
            {!_state.isValidData && !_state.denThoiGian && (
              <div className="error">{t("baoCao.chonDenNgay")}</div>
            )}
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">{t("baoCao.hopDongKsk")}</label>
            <Select
              data={[{ id: "", ten: t("common.tatCa") }, ...listDataHopDong]}
              onChange={onCustomChange("dsHopDongKskId", onChange, _state)}
              value={_state.dsHopDongKskId}
              placeholder={t("baoCao.chonHopDong")}
              className="input-filter"
              mode="multiple"
              showArrow
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">{t("baoCao.congTyKsk")}</label>
            <Select
              data={[{ id: "", ten: t("common.tatCa") }, ...listDataCongTy]}
              onChange={onChange("dsDoiTacId", true)}
              value={_state.dsDoiTacId}
              placeholder={t("baoCao.chonCongTy")}
              className="input-filter"
              mode="multiple"
              showArrow
              disabled
            />
          </div>
        </Col>
        <Col md={6} xl={6} xxl={6}>
          <div className="item-select">
            <label className="label-filter">
              {t("baoCao.trangThaiThanhLyHopDong")}
            </label>
            <Select
              data={[
                { id: "", ten: t("common.tatCa") },
                ...listTrangThaiHopDongCustom,
              ]}
              onChange={onChange("trangThaiHd")}
              value={_state.trangThaiHd}
              placeholder={t("baoCao.chonHopDong")}
              className="input-filter"
            />
          </div>
        </Col>
      </Row>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    tuThoiGian: moment(_state.tuThoiGian).format("DD-MM-YYYY HH:mm:ss"),
    denThoiGian: moment(_state.denThoiGian).format("DD-MM-YYYY HH:mm:ss"),
    dsHopDongKskId: _state.dsHopDongKskId,
    dsDoiTacId: _state.dsDoiTacId,
    trangThaiHd: _state.trangThaiHd,
  });

  return (
    <Main>
      <BaseBaoCao
        title={t("baoCao.ksk12")}
        renderFilter={renderFilter}
        getBc={getKsk12}
        initState={{
          dsHopDongKskId: [""],
          trangThaiHd: [""],
          dsDoiTacId: [""],
        }}
        handleDataSearch={handleDataSearch}
        breadcrumb={[{ title: "KSK12", link: "/bao-cao/ksk12" }]}
      />
    </Main>
  );
};

export default Ksk12;
