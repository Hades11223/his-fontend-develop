import React, { useEffect, useMemo } from "react";
import { Col, Row } from "antd";
import { useDispatch } from "react-redux";
import Select from "components/Select";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { useTranslation } from "react-i18next";
import { LOAI_DOI_TAC } from "constants/index";
import { useStore } from "hook";
const Ksk05 = () => {
  const { t } = useTranslation();
  const {
    baoCaoDaIn: { getKsk05 },
    doiTac: { getListTongHop },
    hopDongKSK: { getListTongHop: getListTongHopHopDong },
  } = useDispatch();
  const listDataTongHop = useStore("doiTac.listDataTongHop", []);
  const listDataTongHopHopDong = useStore("hopDongKSK.listDataTongHop", []);
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
    getListTongHopHopDong({ page: "", size: "", doiTacId: e });
    onChange(key)(e);
  };
  const listDataCongTy = useMemo(() => {
    return (listDataTongHop || []).map((item) => ({
      id: item?.id,
      ten: `${item?.ma} - ${item?.ten}`,
    }));
  }, [listDataTongHop]);

  const listDataCHopDong = useMemo(() => {
    return (listDataTongHopHopDong || []).map((item) => ({
      id: item?.id,
      ten: `${item?.ma} - ${item?.ten}`,
    }));
  }, [listDataTongHopHopDong]);
  const renderFilter = ({ onChange, _state }) => {
    return (
      <Row>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-select">
            <label className="label-filter">{t("baoCao.congTyKsk")}</label>
            <Select
              data={listDataCongTy}
              onChange={customChange("doiTacId", onChange)}
              value={_state.doiTacId}
              placeholder={t("baoCao.chonCongTy")}
              className="input-filter"
            />
          </div>
        </Col>
        <Col md={12} xl={12} xxl={12}>
          <div className="item-select">
            <label className="label-filter">{t("baoCao.hopDongKsk")}</label>
            <Select
              data={listDataCHopDong}
              onChange={onChange("hopDongKskId")}
              value={_state.hopDongKskId}
              placeholder={t("baoCao.chonHopDong")}
              className="input-filter"
            />
          </div>
        </Col>
      </Row>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    doiTacId: _state.doiTacId,
    hopDongKskId: _state.hopDongKskId,
  });

  return (
    <BaseBaoCao
      title={t("baoCao.ksk05")}
      renderFilter={renderFilter}
      getBc={getKsk05}
      handleDataSearch={handleDataSearch}
      breadcrumb={[{ title: "KSK05", link: "/bao-cao/ksk05" }]}
    />
  );
};

export default Ksk05;
