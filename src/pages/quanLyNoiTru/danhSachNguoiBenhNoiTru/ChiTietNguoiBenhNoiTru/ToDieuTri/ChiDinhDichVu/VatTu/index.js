import React, { useEffect, useMemo, useRef, useState } from "react";
import Select from "components/Select";
import { Main, CollapseWrapper } from "./styled";
import { Input, Collapse } from "antd";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import Header from "./components/Header";
import Table from "./components/Table";
import { useDispatch } from "react-redux";
import IcArrow from "assets/images/khamBenh/icArrow.svg";
import { groupBy, uniqBy } from "lodash";
import { useTranslation } from "react-i18next";
import ChiDinhDichVuVatTu from "pages/chiDinhDichVu/DichVuVatTu";
import { useStore } from "hook";

const { Panel } = Collapse;
const VatTu = (props) => {
  const modalKeVatTuRef = useRef(null);
  const { t } = useTranslation();
  const { isReadonly } = props;
  const {
    donViTinh: { getListAllDonViTinh },
    chiDinhVatTu: { updateData },
  } = useDispatch();
  const currentToDieuTri = useStore("toDieuTri.currentToDieuTri", {});
  const listThietLapChonKho = useStore(
    "thietLapChonKho.listThietLapChonKho",
    []
  );
  const listDvVatTu = useStore("chiDinhVatTu.listDvVatTu", []);

  const [state, _setState] = useState({
    loaiDonVatTu: 10,
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const onChiDinhThuoc = (e) => {
    modalKeVatTuRef.current &&
      modalKeVatTuRef.current.show({
        loaiDonVatTu: state.loaiDonVatTu,
        khoId: state.khoId,
        dataKho: uniqBy(listThietLapChonKho || [], "id"),
      });
  };

  const LOAI_VAT_TU = [
    {
      ten: "Vật tư kho",
      id: 10,
    },
  ];
  const onChangeInput = (key) => (e) => {
    let value = "";
    if (e.target) {
      value = e.target.value;
    } else {
      value = e;
    }
    updateData({ dataSearch: { [key]: value } });
  };
  useEffect(() => {
    getListAllDonViTinh({ page: "", size: "" });
  }, []);

  const listPanel = useMemo(() => {
    const grouped = groupBy(listDvVatTu, "loaiDonThuoc");
    return Object.keys(grouped || []).map((key) => {
      let groupByIdArr = grouped[key];
      return {
        header: (
          <Header
            title={"Vật tư"}
            listDvVatTu={groupByIdArr}
            nbDotDieuTriId={currentToDieuTri?.nbDotDieuTriId}
            soPhieuId={grouped[key]?.[0]?.soPhieuId}
            phieuNhapXuatId={grouped[key]?.[0]?.phieuNhapXuatId}
            chiDinhTuDichVuId={currentToDieuTri?.id}
            isReadonly={isReadonly}
          />
        ),
        content: (
          <Table
            listDvVatTu={groupByIdArr}
            nbDotDieuTriId={currentToDieuTri?.nbDotDieuTriId}
            isReadonly={isReadonly}
          />
        ),
        key,
      };
    });
  }, [listDvVatTu, currentToDieuTri]);
  return (
    <Main>
      <div>
        <h1>{t("common.vatTu")}</h1>
      </div>
      {!isReadonly && (
        <div className="selection">
          <span
            style={{ fontSize: "16px", color: "#172B4D", fontWeight: "700" }}
          >
            {t("khamBenh.donThuoc.themChiDinh")}
          </span>
          <div>&nbsp;&nbsp;&nbsp;</div>
          <div>
            <Select
              placeholder={t("khamBenh.donThuoc.vuiLongChonLoaiDonThuoc")}
              data={LOAI_VAT_TU}
              onChange={onChangeInput("loaiDonVatTu")}
              value={state?.loaiDonVatTu}
            />
            {!state?.loaiDonVatTu && (
              <label style={{ color: "red" }}>
                {t("khamBenh.donThuoc.chuaChonLoaiVatTu")}!
              </label>
            )}
          </div>
          <div>&nbsp;&nbsp;&nbsp;</div>
          <div>
            <Select
              placeholder={t("khamBenh.donThuoc.vuiLongChonLoaiDonThuoc")}
              data={listThietLapChonKho}
              onChange={onChangeInput("khoId")}
            />
          </div>
          <div>&nbsp;&nbsp;&nbsp;</div>
          <div>
            <div className="input-box">
              <img src={IconSearch} alt="IconSearch" className="ic-down" />
              <Input
                placeholder={t("common.timKiem")}
                onClick={onChiDinhThuoc}
              />
            </div>
          </div>
        </div>
      )}
      <div className="collapse-content">
        <CollapseWrapper
          bordered={false}
          expandIcon={({ isActive }) => (
            <IcArrow
              style={
                isActive
                  ? { transform: "rotate(90deg)" }
                  : { transform: "unset" }
              }
            />
          )}
          className="site-collapse-custom-collapse"
        >
          {(listPanel || []).map((panel) => (
            <Panel key={panel.key} header={panel.header}>
              {panel.content}
            </Panel>
          ))}
        </CollapseWrapper>
      </div>

      <ChiDinhDichVuVatTu
        ref={modalKeVatTuRef}
        listLoaiVatTu={LOAI_VAT_TU}
        dataNb={currentToDieuTri}
        chiDinhTuLoaiDichVu={210}
      />
    </Main>
  );
};

export default VatTu;
