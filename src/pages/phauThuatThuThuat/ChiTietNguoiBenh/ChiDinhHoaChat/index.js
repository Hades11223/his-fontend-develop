import React, { useEffect, useMemo, useRef, useState } from "react";
import Select from "components/Select";
import { Main, CollapseWrapper } from "./styled";
import { Input, Collapse } from "antd";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import Header from "./components/Header";
import Table from "./components/Table";
import ChiDinhDichVuHoaChat from "pages/chiDinhDichVu/DichVuHoaChat";
import { useDispatch, useSelector } from "react-redux";
import IcArrow from "assets/images/khamBenh/icArrow.svg";
import { groupBy, uniqBy } from "lodash";
import { useTranslation } from "react-i18next";
import { useStore } from "hook";

const { Panel } = Collapse;
const ChiDinhHoaChat = (props) => {
  const modalKeHoaChatRef = useRef(null);
  const { listDvHoaChat } = useSelector((state) => state.chiDinhHoaChat);
  const listThietLapChonKho = useStore(
    "thietLapChonKho.listThietLapChonKho",
    []
  );
  const { dataDetail } = useSelector((state) => state.pttt);
  const { getListDichVuHoaChat, upgradeParam } = useDispatch().chiDinhHoaChat;
  const dataSearch = useStore("chiDinhHoaChat.dataSearch");

  const disabledAll = useMemo(
    () =>
      [25, 43, 155].some((i) => i === dataDetail.trangThai) ||
      dataDetail?.trangThaiHoan === 40,
    [dataDetail.trangThai, dataDetail.khongThucHien]
  );

  const { t } = useTranslation();
  const [state, _setState] = useState({
    loaiHoaChat: 10,
    clickChiDinh: false,
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const onChiDinhHoaChat = (e) => {
    if (dataSearch?.khoId) {
      !disabledAll &&
        modalKeHoaChatRef.current &&
        modalKeHoaChatRef.current.show({
          loaiHoaChat: state.loaiHoaChat,
          dataKho: uniqBy(listThietLapChonKho || [], "id"),
          khoId: dataSearch.khoId,
        });
    } else {
      setState({ clickChiDinh: true });
    }
  };

  const onSelectLoaiHoaChat = (value) => {
    setState({
      loaiHoaChat: value,
      khoId: null,
    });
  };

  const onSelectKho = (khoId) => {
    upgradeParam({ khoId });
    if (!khoId && !state.clickChiDinh) {
      setState({ clickChiDinh: true });
    } else if (khoId && state.clickChiDinh) {
      setState({ clickChiDinh: false });
    }
  };

  useEffect(() => {
    getListDichVuHoaChat({
      nbDotDieuTriId: dataDetail.nbDotDieuTriId,
      chiDinhTuDichVuId: dataDetail?.id,
      dsTrangThaiHoan: [0, 10, 20],
      chiDinhTuLoaiDichVu: 40,
    });
  }, [dataDetail?.id]);

  const listPanel = useMemo(() => {
    const grouped = groupBy(listDvHoaChat, "loaiDonThuoc");
    return Object.keys(grouped || []).map((key) => {
      let groupByIdArr = grouped[key];
      return {
        header: (
          <Header
            title={"Hóa chất kho"}
            listDvHoaChat={groupByIdArr}
            nbDotDieuTriId={dataDetail?.nbDotDieuTriId}
            soPhieuId={grouped[key]?.[0]?.soPhieuId}
            phieuNhapXuatId={grouped[key]?.[0]?.phieuNhapXuatId}
            chiDinhTuDichVuId={dataDetail?.id}
            disabledAll={disabledAll}
          />
        ),
        content: (
          <Table
            listDvHoaChat={groupByIdArr}
            nbDotDieuTriId={dataDetail?.nbDotDieuTriId}
            disabledAll={disabledAll}
            chiDinhTuDichVuId={dataDetail?.id}
          />
        ),
        key,
      };
    });
  }, [listDvHoaChat, dataDetail]);

  const LOAI_HOA_CHAT = [
    {
      ten: "Hóa chất kho",
      id: 10,
    },
  ];

  return (
    <Main>
      <div className="selection">
        <span style={{ fontSize: "16px", color: "#172B4D", fontWeight: "700" }}>
          {t("khamBenh.donThuoc.themChiDinh")}
        </span>
        <div>&nbsp;&nbsp;&nbsp;</div>
        <div>
          <Select
            placeholder={t("khamBenh.donThuoc.vuiLongChonLoaiDonThuoc")}
            data={LOAI_HOA_CHAT}
            onChange={onSelectLoaiHoaChat}
            value={state?.loaiHoaChat}
            disabled={disabledAll}
          />
        </div>
        <div>&nbsp;&nbsp;&nbsp;</div>
        <div>
          <Select
            placeholder={t("khamBenh.donThuoc.vuiLongChonLoaiDonThuoc")}
            data={listThietLapChonKho}
            onChange={onSelectKho}
            value={dataSearch?.khoId}
            disabled={disabledAll}
          />
          {state.clickChiDinh && (
            <div className="ant-form-item-explain-error">Vui lòng chọn kho</div>
          )}
        </div>
        <div>&nbsp;&nbsp;&nbsp;</div>
        <div>
          <div className="input-box">
            <img src={IconSearch} alt="IconSearch" className="ic-down" />
            <Input
              placeholder={t("common.timKiem")}
              onClick={onChiDinhHoaChat}
              disabled={disabledAll}
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
      <ChiDinhDichVuHoaChat
        ref={modalKeHoaChatRef}
        listLoaiHoaChat={LOAI_HOA_CHAT}
        dataNb={{ ...dataDetail, khoaChiDinhId: dataDetail?.khoaThucHienId }}
        chiDinhTuLoaiDichVu={40}
      />
    </Main>
  );
};

export default ChiDinhHoaChat;
