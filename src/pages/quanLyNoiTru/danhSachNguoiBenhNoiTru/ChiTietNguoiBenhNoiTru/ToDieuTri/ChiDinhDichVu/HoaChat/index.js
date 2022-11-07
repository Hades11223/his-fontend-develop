import React, { useEffect, useMemo, useRef, useState } from "react";
import Select from "components/Select";
import { Main, CollapseWrapper } from "./styled";
import { Input, Collapse } from "antd";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import Header from "./components/Header";
import Table from "./components/Table";
import { useDispatch, useSelector } from "react-redux";
import { LOAI_DICH_VU } from "constants/index";
import IcArrow from "assets/images/khamBenh/icArrow.svg";
import { groupBy, uniqBy } from "lodash";
import ChiDinhDichVuHoatChat from "pages/chiDinhDichVu/DichVuHoaChat";
import { useTranslation } from "react-i18next";
const { Panel } = Collapse;
const HoaChat = () => {
  const { t } = useTranslation();
  const modalKeHoaChatRef = useRef(null);
  const {
    boChiDinh: { getBoChiDinh },
    chiDinhHoaChat: { updateData },
  } = useDispatch();
  const { currentToDieuTri } = useSelector((state) => state.toDieuTri);
  const { listThietLapChonKho } = useSelector((state) => state.thietLapChonKho);
  const {
    auth: { nhanVienId },
  } = useSelector((state) => state.auth);
  const { listDvHoaChat, dataSearch } = useSelector((state) => state.chiDinhHoaChat);
  const [state, _setState] = useState({
    listDichVu: [],
    listSelectedDv: [],
    listGoiDv: [],
    loaiHoaChat: 10,
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const onChiDinhHoaChat = (e) => {
    modalKeHoaChatRef.current &&
      modalKeHoaChatRef.current.show({
        loaiHoaChat: state.loaiHoaChat,
        khoId: dataSearch?.khoId,
        dataKho: uniqBy(listThietLapChonKho || [], "id"),
      });
  };

  const LOAI_HOA_CHAT = [
    {
      ten: "Hóa chất kho",
      id: 10,
    },
  ];
  useEffect(() => {
    getBoChiDinh({
      dsLoaiDichVu: LOAI_DICH_VU.HOA_CHAT,
      bacSiChiDinhId: nhanVienId,
    });
  }, []);

  const listPanel = useMemo(() => {
    const grouped = groupBy(listDvHoaChat);
    return Object.keys(grouped || []).map((key) => {
      let groupByIdArr = grouped[key];
      return {
        header: (
          <Header
            title={"Hóa chất kho"}
            listDvHoaChat={groupByIdArr}
            nbDotDieuTriId={currentToDieuTri?.nbDotDieuTriId}
            soPhieuId={grouped[key]?.[0]?.soPhieuId}
            phieuNhapXuatId={grouped[key]?.[0]?.phieuNhapXuatId}
            chiDinhTuDichVuId={currentToDieuTri?.id}
          />
        ),
        content: (
          <Table
            listDvHoaChat={groupByIdArr}
            nbDotDieuTriId={currentToDieuTri?.nbDotDieuTriId}
          />
        ),
        key,
      };
    });
  }, [listDvHoaChat, currentToDieuTri]);

  const onChangeInput = (key) => (e) => {
    let value = "";
    if (e.target) {
      value = e.target.value;
    } else {
      value = e;
    }
    updateData({ dataSearch: { [key]: value } });
  };

  return (
    <Main>
      <div>
        <h1>{t("quanLyNoiTru.toDieuTri.hoaChat")}</h1>
      </div>
      <div className="selection">
        <span style={{ fontSize: "16px", color: "#172B4D", fontWeight: "700" }}>
          {t("quanLyNoiTru.toDieuTri.themChiDinh")}
        </span>
        <div>&nbsp;&nbsp;&nbsp;</div>
        <div>
          <Select
            placeholder={t("quanLyNoiTru.toDieuTri.chonLoaiHoaChat")}
            data={LOAI_HOA_CHAT}
            onChange={onChangeInput("loaiHoaChat")}
            value={state?.loaiHoaChat}
          />
        </div>
        <div>&nbsp;&nbsp;&nbsp;</div>
        <div>
          <Select
            placeholder={t("quanLyNoiTru.chonKho")}
            data={listThietLapChonKho}
            onChange={onChangeInput("khoId")}
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
              onClick={onChiDinhHoaChat}
            />
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
          {listPanel.map((panel) => (
            <Panel key={panel.key} header={panel.header}>
              {panel.content}
            </Panel>
          ))}
        </CollapseWrapper>
      </div>
      <ChiDinhDichVuHoatChat
        ref={modalKeHoaChatRef}
        listLoaiHoaChat={LOAI_HOA_CHAT}
        dataNb={currentToDieuTri}
        chiDinhTuLoaiDichVu={210}
      />
    </Main>
  );
};

export default HoaChat;
