import React, { useEffect, useMemo, useRef, useState } from "react";
import Select from "components/Select";
import { Main, CollapseWrapper } from "./styled";
import { Input, Collapse } from "antd";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import Header from "./components/Header";
import Table from "./components/Table";
import ChiDinhDichVuThuoc from "pages/chiDinhDichVu/DichVuThuoc";
import { useDispatch, useSelector } from "react-redux";
import IcArrow from "assets/images/khamBenh/icArrow.svg";
import { groupBy, uniqBy } from "lodash";
import ModalChuyenDichVu from "pages/phauThuatThuThuat/ChiTietNguoiBenh/ModalChuyenDichVu";
import useThongTinNb from "../hook/useThongTinNb";
import { useEnum } from "hook";
import { ENUM } from "constants/index";
import { useTranslation } from "react-i18next";
const { Panel } = Collapse;
const ChiDinhThuoc = () => {
  const modalKeThuocRef = useRef(null);
  const refChuyenDichVu = useRef(null);
  const { listDvThuoc } = useSelector((state) => state.chiDinhDichVuThuoc);
  const { listThietLapChonKho } = useSelector((state) => state.thietLapChonKho);
  const [listLoaiDonThuoc] = useEnum(ENUM.LOAI_DON_THUOC);
  const { dataDetail } = useSelector((state) => state.pttt);
  const { getListDichVuThuoc, chinhSuaChiDinhDichVuKho } =
    useDispatch().chiDinhDichVuThuoc;
  const disabledAll = useMemo(
    () =>
      [25, 43, 155].some((i) => i === dataDetail.trangThai) ||
      dataDetail?.trangThaiHoan === 40,
    [dataDetail.trangThai, dataDetail.khongThucHien]
  );
  const [thongTinBenhNhan] = useThongTinNb();
  const { t } = useTranslation();
  const [state, _setState] = useState({
    listDichVu: [],
    listSelectedDv: [],
    listGoiDv: [],
    loaiDonThuoc: 30,
    khoId: listThietLapChonKho.length === 1 ? listThietLapChonKho[0].id : null,
    errors: {
      kho: "",
    },
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const onChiDinhThuoc = (e) => {
    if (state.khoId) {
      !disabledAll &&
        modalKeThuocRef.current &&
        modalKeThuocRef.current.show({
          loaiDonThuoc: state.loaiDonThuoc,
          khoId: state.khoId,
          dataKho: uniqBy(listThietLapChonKho || [], "id"),
        });
    } else {
      setState({ errors: { kho: "Vui lòng chọn kho!" } });
    }
  };

  const onSelectThuocKeNgoai = (listSelected) => {
    setState({
      listSelectedDv: listSelected,
    });
  };
  const LOAI_DON_THUOC = [
    {
      ten: "Thuốc kho",
      id: 20,
    },
    {
      ten: "Thuốc tủ trực",
      id: 30,
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
      errors: {
        kho: "",
      },
    });
  };
  useEffect(() => {
    getListDichVuThuoc({
      nbDotDieuTriId: dataDetail?.nbDotDieuTriId,
      chiDinhTuDichVuId: dataDetail?.id,
      dsTrangThaiHoan: [0, 10, 20],
      chiDinhTuLoaiDichVu: 40,
    });
  }, [dataDetail?.id]);

  const onChuyenThuoc = (data) => () => {
    refChuyenDichVu.current &&
      refChuyenDichVu.current.show(data, () => {
        getListDichVuThuoc({
          nbDotDieuTriId: data?.nbDotDieuTriId,
          chiDinhTuDichVuId: data?.chiDinhTuDichVuId,
          chiDinhTuLoaiDichVu: data?.chiDinhTuLoaiDichVu,
          dsTrangThaiHoan: [0, 10, 20],
        });
      });
  };
  const listPanel = useMemo(() => {
    let grouped = groupBy(listDvThuoc, "tenDon");
    return Object.keys(grouped || []).map((key) => {
      let groupByIdArr = grouped[key];
      const { loaiDonThuoc, tenDon } = (grouped && grouped[key][0]) || {};
      return {
        header: (
          <Header
            title={tenDon}
            listDvThuoc={groupByIdArr}
            nbDotDieuTriId={dataDetail?.nbDotDieuTriId}
            soPhieuId={grouped[key]?.[0]?.soPhieuId}
            phieuNhapXuatId={grouped[key]?.[0]?.phieuNhapXuatId}
            loaiDonThuoc={loaiDonThuoc}
            chiDinhTuDichVuId={dataDetail?.id}
            disabledAll={disabledAll}
            onChuyenThuoc={onChuyenThuoc(groupByIdArr)}
          />
        ),
        content: (
          <Table
            title={t("khamBenh.donThuoc.thuocDieuTri")}
            listDvThuoc={groupByIdArr}
            nbDotDieuTriId={dataDetail?.nbDotDieuTriId}
            listLoaiDonThuoc={LOAI_DON_THUOC}
            disabledAll={disabledAll}
          />
        ),
        key,
      };
    });
  }, [listDvThuoc, dataDetail, listLoaiDonThuoc]);
  return (
    <Main>
      <div className="selection">
        <span style={{ fontSize: "16px", color: "#172B4D", fontWeight: "700" }}>
          {t("khamBenh.donThuoc.themChiDinh")}
        </span>
        <div>&nbsp;&nbsp;&nbsp;</div>
        <div>
          <Select
            placeholder={t("pttt.chonLoaiThuoc")}
            data={LOAI_DON_THUOC}
            onChange={onSelectLoaiDonThuoc}
            value={state?.loaiDonThuoc}
            id={state?.loaiDonThuoc}
            disabled={disabledAll}
          />
          {!state?.loaiDonThuoc && (
            <label style={{ color: "red" }}>
              {t("pttt.chuaChonLoaiThuoc")}!
            </label>
          )}
        </div>
        <div>&nbsp;&nbsp;&nbsp;</div>
        <div>
          <Select
            placeholder={t("pttt.chonKho")}
            data={listThietLapChonKho}
            onChange={onSelectKho}
            value={state?.khoId}
            id={state?.khoId}
            disabled={disabledAll}
          />
          {state.errors.kho && (
            <label style={{ color: "red" }}>{state.errors.kho}</label>
          )}
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
      <ChiDinhDichVuThuoc
        ref={modalKeThuocRef}
        listLoaiDonThuoc={LOAI_DON_THUOC}
        onSelectThuocKeNgoai={onSelectThuocKeNgoai}
        dataNb={{ ...dataDetail, khoaChiDinhId: dataDetail?.khoaThucHienId }}
        chiDinhTuLoaiDichVu={40}
        thongTinNguoiBenh={thongTinBenhNhan}
      />
      <ModalChuyenDichVu
        ref={refChuyenDichVu}
        chinhSuaDichVu={chinhSuaChiDinhDichVuKho}
      />
    </Main>
  );
};

export default ChiDinhThuoc;
