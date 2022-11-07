import React, { useEffect, useState, useRef } from "react";
import { Tabs } from "components";
import DsDichVu from "./containers/DsDichVu";
import ThuocHoSoBenhAn from "./containers/ThuocHoSoBenhAn";
import VatTuHoSoBenhAn from "./containers/VatTuHoSoBenhAn";
import HoSoKhamBenh from "./containers/HoSoKhamBenh";
import LichSuKham from "./containers/LichSuKham";
import HoaChat from "./containers/HoaChat";
import { Main } from "./styled";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import DanhSachSuatAn from "./containers/DanhSachSuatAn";

const Content = (props) => {
  const { t } = useTranslation();
  const refThuocHoSoBenhAn = useRef(null);
  const refVatTuHoSoBenhAn = useRef(null);
  const refDanhSachDichVu = useRef(null);
  const refHoaChatHoSoBenhAn = useRef(null);
  const refDanhSachSuatAn = useRef(null);

  const [activeTab, setActiveTab] = useState(0);
  const { nbDotDieuTriId } = props;

  const {
    dsThuoc: { onChangeInputSearch: onChangeInputSearchThuoc },
    dsVatTu: { onChangeInputSearch: onChangeInputSearchVatTu },
    chiDinhSuatAn: { getDsSuatAn },
    chiDinhHoaChat: { getListDichVuHoaChat },
  } = useDispatch();

  useEffect(() => {
    if (nbDotDieuTriId) {
      onChangeInputSearchThuoc({ nbDotDieuTriId: nbDotDieuTriId });
      onChangeInputSearchVatTu({ nbDotDieuTriId: nbDotDieuTriId });
      getDsSuatAn({ nbDotDieuTriId: nbDotDieuTriId });
      getListDichVuHoaChat({ nbDotDieuTriId: nbDotDieuTriId });
    }
  }, [nbDotDieuTriId]);
  const onChangeTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Main>
      <div className="left-body">
        <LichSuKham />
      </div>
      <div className="right-body">
        <Tabs defaultActiveKey={activeTab} onChange={onChangeTab}>
          <Tabs.TabPane
            tab={<div className="tab-title">{t("hsba.hoSoKhamChuaBenh")}</div>}
            key={1}
          >
            <HoSoKhamBenh nbDotDieuTriId={nbDotDieuTriId} />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={<div className="tab-title">{t("hsba.danhSachDichVu")}</div>}
            key={2}
          >
            <DsDichVu ref={refDanhSachDichVu} tableName={"TABLE_HSBA_DSDV"} />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={<div className="tab-title">{t("hsba.danhSachThuoc")}</div>}
            key={3}
          >
            <ThuocHoSoBenhAn
              ref={refThuocHoSoBenhAn}
              tableName={"TABLE_HSBA_THUOC"}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={<div className="tab-title">{t("hsba.danhSachVatTu")}</div>}
            key={4}
          >
            <VatTuHoSoBenhAn
              ref={refVatTuHoSoBenhAn}
              tableName={"VATTU_HSBA_THUOC"}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={<div className="tab-title">{t("hsba.danhSachHoaChat")}</div>}
            key={5}
          >
            <HoaChat
              ref={refHoaChatHoSoBenhAn}
              tableName={"TABLE_HSBA_HOACHAT"}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={<div className="tab-title">{t("hsba.danhSachSuatAn")}</div>}
            key={6}
          >
            <DanhSachSuatAn
              ref={refDanhSachSuatAn}
              tableName={"TABLE_HSBA_SUAT_AN"}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Main>
  );
};

export default Content;
