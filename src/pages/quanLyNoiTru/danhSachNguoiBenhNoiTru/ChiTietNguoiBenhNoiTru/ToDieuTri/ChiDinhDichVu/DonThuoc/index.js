import React, { useEffect, useMemo, useRef, useState } from "react";
import Select from "components/Select";
import { Main, CollapseWrapper } from "./styled";
import { Input, Collapse } from "antd";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import Header from "./components/Header";
import Table from "./components/Table";
import { useDispatch, useSelector } from "react-redux";
import { ENUM, LOAI_DICH_VU } from "constants/index";
import IcArrow from "assets/images/khamBenh/icArrow.svg";
import { uniqBy } from "lodash";
import ChiDinhDichVuThuoc from "pages/chiDinhDichVu/DichVuThuoc";
import { useEnum, useStore } from "hook";
import { groupBy } from "lodash";
import HeaderThuocKeNgoai from "./components/HeaderThuocKeNgoai";
import TableThuocKeNgoai from "./components/TableThuocKeNgoai";
import { useTranslation } from "react-i18next";

const { Panel } = Collapse;
const DonThuoc = (props) => {
  const { isReadonly } = props;
  const { t } = useTranslation();
  const modalKeThuocRef = useRef(null);
  const { getBoChiDinh } = useDispatch().boChiDinh;
  const [listLoaiDonThuoc] = useEnum(ENUM.LOAI_DON_THUOC);
  const { currentToDieuTri } = useSelector((state) => state.toDieuTri);
  const { listThietLapChonKho } = useSelector((state) => state.thietLapChonKho);
  const {
    auth: { nhanVienId },
  } = useSelector((state) => state.auth);
  const { _getListTongHop } = useDispatch().lieuDung;
  const infoPatient = useStore("danhSachNguoiBenhNoiTru.infoPatient", {});
  const listDvThuoc = useStore("chiDinhDichVuThuoc.listDvThuoc", []);
  const listDvThuocKeNgoai = useStore(
    "chiDinhDichVuThuoc.listDvThuocKeNgoai",
    []
  );

  const [state, _setState] = useState({
    listDichVu: [],
    listSelectedDv: [],
    listGoiDv: [],
    loaiDonThuoc: 20,
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const onChiDinhThuoc = (e) => {
    modalKeThuocRef.current &&
      modalKeThuocRef.current.show({
        loaiDonThuoc: state.loaiDonThuoc,
        khoId: state.khoId,
        dataKho: uniqBy(listThietLapChonKho || [], "id"),
      });
  };

  const onSelectThuocKeNgoai = (listSelected) => {
    setState({
      listSelectedDv: listSelected,
    });
  };
  const LOAI_DON_THUOC = [
    {
      ten: "Thuốc nhà thuốc",
      id: 10,
    },
    {
      ten: "Thuốc kho",
      id: 20,
    },
    {
      ten: "Thuốc kê ngoài",
      id: 150,
    },
  ];
  const onSelectLoaiDonThuoc = (value) => {
    setState({
      loaiDonThuoc: value,
      khoId: null,
    });
  };

  const onSelectKho = (value) => {
    setState({
      khoId: value,
    });
  };
  useEffect(() => {
    getBoChiDinh({
      dsLoaiDichVu: LOAI_DICH_VU.THUOC,
      bacSiChiDinhId: nhanVienId,
    });
    _getListTongHop({ active: true, page: "", size: "" });
  }, []);
  const disabled = [10, 150].includes(state?.loaiDonThuoc);

  const listPanel = useMemo(() => {
    let grouped = groupBy(listDvThuoc, "tenDon");
    return Object.keys(grouped || []).map((key) => {
      let groupByIdArr = grouped[key];
      const { loaiDonThuoc, tenDon, nhaThuoc } =
        (grouped && grouped[key][0]) || {};
      return {
        header: (
          <Header
            title={tenDon}
            listDvThuoc={groupByIdArr}
            nbDotDieuTriId={currentToDieuTri?.nbDotDieuTriId}
            soPhieuId={grouped[key]?.[0]?.soPhieuId}
            phieuNhapXuatId={grouped[key]?.[0]?.phieuNhapXuatId}
            loaiDonThuoc={loaiDonThuoc}
            chiDinhTuDichVuId={currentToDieuTri?.id}
            nhaThuoc={nhaThuoc}
            isReadonly={isReadonly}
          />
        ),
        content: (
          <Table
            title="Thuốc điều trị"
            listDvThuoc={groupByIdArr}
            nbDotDieuTriId={currentToDieuTri?.nbDotDieuTriId}
            listLoaiDonThuoc={LOAI_DON_THUOC}
            isReadonly={isReadonly}
          />
        ),
        key,
      };
    });
  }, [listDvThuoc, currentToDieuTri, listLoaiDonThuoc]);

  const listPanelThuocKeNgoai = useMemo(() => {
    const tableBacsi = groupBy(listDvThuocKeNgoai, "bacSiChiDinhId");
    return {
      header: (
        <HeaderThuocKeNgoai
          title={t("khamBenh.donThuoc.donThuocKeNgoai")}
          listDvThuoc={listDvThuocKeNgoai || []}
          nbDotDieuTriId={currentToDieuTri?.nbDotDieuTriId}
        />
      ),
      content: (
        <>
          {Object.keys(tableBacsi).map((keyBs) => (
            <TableThuocKeNgoai
              title={`Bác sĩ chỉ định: ${tableBacsi[keyBs][0]?.tenBacSiChiDinh}`}
              listDvThuoc={tableBacsi[keyBs]}
              nbDotDieuTriId={currentToDieuTri?.nbDotDieuTriId}
              key={keyBs}
            />
          ))}
        </>
      ),
      key: 150,
    };
  }, [listDvThuocKeNgoai, currentToDieuTri]);

  return (
    <Main>
      <div>
        <h1>THUỐC</h1>
      </div>
      {!isReadonly && (
        <div className="selection">
          <span
            style={{ fontSize: "16px", color: "#172B4D", fontWeight: "700" }}
          >
            Thêm chỉ định
          </span>
          <div>&nbsp;&nbsp;&nbsp;</div>
          <div>
            <Select
              placeholder="Chọn loại thuốc"
              data={LOAI_DON_THUOC}
              onChange={onSelectLoaiDonThuoc}
              value={state?.loaiDonThuoc}
            />
            {!state?.loaiDonThuoc && (
              <label style={{ color: "red" }}>Chưa chọn loại thuốc!</label>
            )}
          </div>
          <div>&nbsp;&nbsp;&nbsp;</div>
          <div>
            <Select
              placeholder="Chọn kho"
              data={listThietLapChonKho}
              onChange={onSelectKho}
              disabled={disabled}
              value={state?.khoId}
            />
          </div>
          <div>&nbsp;&nbsp;&nbsp;</div>
          <div>
            <div className="input-box">
              <img src={IconSearch} alt="IconSearch" className="ic-down" />
              <Input
                placeholder="Tìm kiếm"
                onKeyPress={(e) => {
                  e.preventDefault();
                  e.target.value = "";
                  return null;
                }}
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
          {listPanel.map((panel) => (
            <Panel key={panel.key} header={panel.header}>
              {panel.content}
            </Panel>
          ))}
        </CollapseWrapper>
      </div>

      {listDvThuocKeNgoai?.length > 0 && (
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
            <Panel
              key={listPanelThuocKeNgoai.key}
              header={listPanelThuocKeNgoai.header}
            >
              {listPanelThuocKeNgoai.content}
            </Panel>
          </CollapseWrapper>
        </div>
      )}

      <ChiDinhDichVuThuoc
        ref={modalKeThuocRef}
        listLoaiDonThuoc={LOAI_DON_THUOC}
        onSelectThuocKeNgoai={onSelectThuocKeNgoai}
        dataNb={currentToDieuTri}
        chiDinhTuLoaiDichVu={210}
        thongTinNguoiBenh={infoPatient}
      />
    </Main>
  );
};

export default DonThuoc;
