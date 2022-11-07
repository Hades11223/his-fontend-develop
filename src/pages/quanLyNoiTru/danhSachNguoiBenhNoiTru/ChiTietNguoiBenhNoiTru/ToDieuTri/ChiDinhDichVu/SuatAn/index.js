import React, { useState, useRef, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Main, CollapseWrapper } from "./styled";
import ChiDinhDichVuSuatAn from "pages/chiDinhDichVu/DichVuSuatAn";
import { useDispatch, useSelector } from "react-redux";
import IcArrow from "assets/images/khamBenh/icArrow.svg";
import { Input, Collapse } from "antd";
import { groupBy, uniqBy } from "lodash";
import Header from "./components/Header";
import Table from "./components/Table";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import { ModalTraSuatAn } from "../../modals";

const LOAI_VAT_TU = [
  {
    ten: "Vật tư kho",
    id: 10,
  },
];

const { Panel } = Collapse;
let timer = null;

const SuatAn = (props) => {
  const { t } = useTranslation();

  const modalKeSuatAnRef = useRef(null);
  const refModalTraSuatAn = useRef(null);
  const { currentToDieuTri } = useSelector((state) => state.toDieuTri);
  const { listDvSuatAn } = useSelector((state) => state.chiDinhSuatAn);
  const { listThietLapChonKho } = useSelector((state) => state.thietLapChonKho);
  const { getListAllLoaiBuaAn } = useDispatch().loaiBuaAn;
  const { getDsSuatAn } = useDispatch().chiDinhSuatAn;

  const [state, _setState] = useState({});

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useEffect(() => {
    getListAllLoaiBuaAn({ page: "", size: "" });
  }, []);

  useEffect(() => {
    if (currentToDieuTri?.nbDotDieuTriId) {
      getDsSuatAn({
        nbDotDieuTriId: currentToDieuTri?.nbDotDieuTriId,
        chiDinhTuLoaiDichVu: 210,
        chiDinhTuDichVuId: currentToDieuTri?.id,
      });
    }
  }, [currentToDieuTri]);

  const onChiDinhThuoc = (e) => {
    modalKeSuatAnRef.current &&
      modalKeSuatAnRef.current.show({
        loaiDonThuoc: state.loaiDonVatTu,
        khoId: state.khoId,
        dataKho: uniqBy(listThietLapChonKho || [], "id"),
      });
  };

  const onTraSuatAn = (type, traDotXuat) => {
    refModalTraSuatAn.current &&
      refModalTraSuatAn.current.show(
        {
          type, //1: trả, 2: hủy trả
          traDotXuat,
        },
        refreshList
      );
  };

  const listPanel = useMemo(() => {
    const grouped = groupBy(listDvSuatAn, "loaiDonThuoc");
    return Object.keys(grouped || []).map((key) => {
      let groupByIdArr = grouped[key];
      return {
        header: (
          <Header
            title={"Suất ăn"}
            listDvSuatAn={groupByIdArr}
            nbDotDieuTriId={currentToDieuTri?.nbDotDieuTriId}
            soPhieuId={grouped[key]?.[0]?.soPhieuId}
            phieuNhapXuatId={grouped[key]?.[0]?.phieuNhapXuatId}
            chiDinhTuDichVuId={currentToDieuTri?.id}
            traSuatAn={onTraSuatAn}
          />
        ),
        content: (
          <Table
            listDvSuatAn={groupByIdArr}
            nbDotDieuTriId={currentToDieuTri?.nbDotDieuTriId}
            chiDinhTuDichVuId={currentToDieuTri?.id}
          />
        ),
        key,
      };
    });
  }, [listDvSuatAn, currentToDieuTri]);

  const refreshList = () => {
    if (currentToDieuTri?.nbDotDieuTriId) {
      getDsSuatAn({
        nbDotDieuTriId: currentToDieuTri?.nbDotDieuTriId,
        chiDinhTuLoaiDichVu: 210,
        chiDinhTuDichVuId: currentToDieuTri?.id,
      });
    }
  };

  return (
    <Main>
      <div>
        <h1>{t("common.suatAn")}</h1>
      </div>

      <div className="selection">
        <span style={{ fontSize: "16px", color: "#172B4D", fontWeight: "700" }}>
          {t("khamBenh.donThuoc.themChiDinh")}
        </span>
        <div>&nbsp;&nbsp;&nbsp;</div>

        <div>
          <div className="input-box">
            <img src={IconSearch} alt="IconSearch" className="ic-down" />
            <Input placeholder={t("common.timKiem")} onClick={onChiDinhThuoc} />
          </div>
        </div>
      </div>

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

      <ChiDinhDichVuSuatAn
        ref={modalKeSuatAnRef}
        listLoaiVatTu={LOAI_VAT_TU}
        dataNb={currentToDieuTri}
        chiDinhTuLoaiDichVu={210}
        refreshList={refreshList}
      />

      <ModalTraSuatAn ref={refModalTraSuatAn} />
    </Main>
  );
};

export default SuatAn;
