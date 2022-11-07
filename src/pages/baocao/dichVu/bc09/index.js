import { Checkbox, Col, DatePicker, Row } from "antd";
import Select from "components/Select";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import SelectLoadMore from "components/SelectLoadMore";
import BaseBaoCao from "pages/baocao/BaseBaoCao";
import { Main } from "./styled";
import { useStore } from "hook";
import { useTranslation } from "react-i18next";
import nbDotDieuTriProvider from "data-access/nb-dot-dieu-tri-provider";

/**
 * BC09. Báo cáo thống kê dịch vụ theo NB
 *
 */

const Index = () => {
  const { t } = useTranslation();
  const {
    khoa: { getListAllKhoa },
    phong: { getListAllPhong },
    baoCaoDaIn: { getBc09 },
  } = useDispatch();
  const { listAllKhoa } = useStore("khoa", []);
  const { listAllPhong } = useStore("phong", []);

  useEffect(() => {
    let param = { active: true, page: "", size: "" };
    getListAllKhoa(param);
    getListAllPhong(param);
  }, []);

  const renderFilter = ({ onChange, _state }) => {
    return (
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
            />
            {!_state.isValidData && !_state.denNgay && (
              <div className="error">{t("baoCao.chonDenNgay")}!</div>
            )}
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">{t("baoCao.khoaThucHien")}</label>
            <Select
              onChange={onChange("khoaThucHienId", true)}
              className="input-filter"
              value={_state.khoaThucHienId}
              placeholder={t("baoCao.chonKhoaThucHien")}
              data={[{ id: "", ten: "Tất cả" }, ...(listAllKhoa || [])]}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">
              {t("baoCao.phongThucHien")}
            </label>
            <Select
              className="input-filter"
              placeholder={t("baoCao.chonPhongThucHien")}
              data={listAllPhong}
              onChange={onChange("phongThucHienId")}
            />
          </div>
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <div className="item-select">
            <label className="label-filter">{t("common.tenNb")}</label>
            <SelectLoadMore
              api={nbDotDieuTriProvider.searchNBDotDieuTriTongHop}
              mapData={(i) => ({
                value: i.id,
                label: i.tenNb,
              })}
              onChange={onChange("dsNbDotDieuTriId", true)}
              value={_state.dsNbDotDieuTriId}
              keySearch={"tenNb"}
              placeholder={t("baoCao.chonTenNb")}
              className="input-filter"
              mode="multiple"
              blurReset={true}
            />
          </div>
        </Col>
        <Col
          md={8}
          xl={8}
          xxl={8}
          style={{
            display: "flex",
            marginBottom: "10px",
            alignItems: "center",
          }}
        >
          <Checkbox onChange={onChange("gopTheoDichVu")}>
            {t("baoCao.hienThiDichVuKhongTrung")}
          </Checkbox>
        </Col>
      </Row>
    );
  };

  const handleDataSearch = ({ _state }) => ({
    tuThoiGian: moment(_state.tuNgay).format("DD-MM-YYYY HH:mm:ss"),
    denThoiGian: moment(_state.denNgay).format("DD-MM-YYYY HH:mm:ss"),
    phongThucHienId: _state.phongThucHienId,
    khoaThucHienId: _state.khoaThucHienId,
    gopTheoDichVu: _state.gopTheoDichVu,
    dsNbDotDieuTriId: _state.dsNbDotDieuTriId,
  });

  return (
    <Main>
      <BaseBaoCao
        title={t("baoCao.bc09")}
        renderFilter={renderFilter}
        getBc={getBc09}
        handleDataSearch={handleDataSearch}
        initState={{
          khoaThucHienId: [""],
        }}
        breadcrumb={[{ title: "Bc09", link: "/bao-cao/bc09" }]}
      />
    </Main>
  );
};

export default Index;
