import React, { useEffect, useMemo, useRef, useState } from "react";
import Select from "components/Select";
import { Main, CollapseWrapper } from "./styled";
import { Input, Collapse } from "antd";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import Header from "./components/Header";
import Table from "./components/Table";
import ChiDinhDichVuVatTu from "pages/chiDinhDichVu/DichVuVatTu";
import { useDispatch, useSelector } from "react-redux";
import IcArrow from "assets/images/khamBenh/icArrow.svg";
import { groupBy, uniqBy } from "lodash";
import { useTranslation } from "react-i18next";
import { useStore } from "hook";
import ModalChuyenDichVu from "pages/phauThuatThuThuat/ChiTietNguoiBenh/ModalChuyenDichVu";

const { Panel } = Collapse;
const ChiDinhVatTu = (props) => {
  const modalKeVatTuRef = useRef(null);
  const refChuyenDichVu = useRef(null);
  const { listDvVatTu } = useSelector((state) => state.chiDinhVatTu);
  const listThietLapChonKho = useStore(
    "thietLapChonKho.listThietLapChonKho",
    []
  );
  const { dataDetail } = useSelector((state) => state.pttt);
  const { getListDichVuVatTu, upgradeParam, themThongTin } = useDispatch().chiDinhVatTu;
  const dataSearch = useStore("chiDinhVatTu.dataSearch");

  const disabledAll = useMemo(
    () => [25, 43, 155].some((i) => i === dataDetail.trangThai)|| dataDetail?.trangThaiHoan === 40,
    [dataDetail.trangThai, dataDetail.khongThucHien]
  );

  const { t } = useTranslation();
  const [state, _setState] = useState({
    loaiDonVatTu: 20,
    clickChiDinh: false,
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const onChiDinhVatTu = (e) => {
    if (dataSearch?.khoId) {
      !disabledAll &&
        modalKeVatTuRef.current &&
        modalKeVatTuRef.current.show({
          loaiDonVatTu: state.loaiDonVatTu,
          dataKho: uniqBy(listThietLapChonKho || [], "id"),
          khoId: dataSearch.khoId,
        });
    } else {
      setState({ clickChiDinh: true });
    }
  };

  const onSelectLoaiVatTu = (value) => {
    setState({
      loaiVatTu: value,
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
    getListDichVuVatTu({
      nbDotDieuTriId: dataDetail.nbDotDieuTriId,
      chiDinhTuDichVuId: dataDetail?.id,
      dsTrangThaiHoan: [0, 10, 20],
      chiDinhTuLoaiDichVu: 40,
    });
  }, [dataDetail?.id]);

  const onChuyenVatTu= (data) => () => {
    refChuyenDichVu.current &&
      refChuyenDichVu.current.show(data, () => {
        getListDichVuVatTu({
          nbDotDieuTriId: data?.nbDotDieuTriId,
          chiDinhTuDichVuId: data?.chiDinhTuDichVuId,
          chiDinhTuLoaiDichVu: data?.chiDinhTuLoaiDichVu,
          dsTrangThaiHoan: [0, 10, 20],
        });
      });
  };

  const listPanel = useMemo(() => {
    const grouped = groupBy(listDvVatTu, "loaiDonThuoc");
    return Object.keys(grouped || []).map((key) => {
      let groupByIdArr = grouped[key];
      return {
        header: (
          <Header
            title={"Vật tư"}
            listDvVatTu={groupByIdArr}
            nbDotDieuTriId={dataDetail?.nbDotDieuTriId}
            soPhieuId={grouped[key]?.[0]?.soPhieuId}
            phieuNhapXuatId={grouped[key]?.[0]?.phieuNhapXuatId}
            chiDinhTuDichVuId={dataDetail?.id}
            disabledAll={disabledAll}
            onChuyenVatTu={onChuyenVatTu(groupByIdArr)}

          />
        ),
        content: (
          <Table
            listDvVatTu={groupByIdArr}
            nbDotDieuTriId={dataDetail?.nbDotDieuTriId}
            disabledAll={disabledAll}
            chiDinhTuDichVuId={dataDetail?.id}
          />
        ),
        key,
      };
    });
  }, [listDvVatTu, dataDetail]);

  const LOAI_VAT_TU = [
    {
      ten: "Vật tư kho",
      id: 10,
    },
    {
      ten: "Vật tư tủ trực",
      id: 20,
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
            data={LOAI_VAT_TU}
            onChange={onSelectLoaiVatTu}
            value={state?.loaiDonVatTu}
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
              onClick={onChiDinhVatTu}
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
      <ChiDinhDichVuVatTu
        ref={modalKeVatTuRef}
        listLoaiVatTu={LOAI_VAT_TU}
        dataNb={{ ...dataDetail, khoaChiDinhId: dataDetail?.khoaThucHienId }}
        chiDinhTuLoaiDichVu={40}
      />
      <ModalChuyenDichVu
        ref={refChuyenDichVu}
        chinhSuaDichVu={themThongTin}
      />
    </Main>
  );
};

export default ChiDinhVatTu;
