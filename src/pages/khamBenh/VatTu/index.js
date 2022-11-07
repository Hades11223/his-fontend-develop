import React, { useEffect, useMemo, useRef, useState } from "react";
import Select from "components/Select";
import { Main, CollapseWrapper } from "./styled";
import { Input, Collapse } from "antd";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import Header from "./components/Header";
import Table from "./components/Table";
import { useDispatch } from "react-redux";
import IcArrow from "assets/images/khamBenh/icArrow.svg";
import { groupBy, isEmpty, uniqBy } from "lodash";
import { useTranslation } from "react-i18next";
import ChiDinhDichVuVatTu from "pages/chiDinhDichVu/DichVuVatTu";
import { useStore } from "hook";
import { LOAI_DICH_VU } from "constants/index";

const { Panel } = Collapse;
const VatTu = (props) => {
  const modalKeVatTuRef = useRef(null);
  const { t } = useTranslation();
  const { isReadonly } = props;
  const {
    donViTinh: { getListAllDonViTinh },
    chiDinhVatTu: { updateData },
    thietLapChonKho: { getListThietLapChonKhoTheoTaiKhoan },
    chiDinhVatTu: { getListDichVuVatTu },
  } = useDispatch();
  const infoNb = useStore("khamBenh.infoNb", {});
  const thongTinChiTiet = useStore("khamBenh.thongTinChiTiet", {});
  const dataSearch = useStore("chiDinhVatTu.dataSearch");

  const listThietLapChonKho = useStore(
    "thietLapChonKho.listThietLapChonKho",
    []
  );
  const listDvVatTu = useStore("chiDinhVatTu.listDvVatTu", []);
  const khoaChiDinhId = thongTinChiTiet.nbDichVu?.khoaChiDinhId;
  const phongThucHienId = thongTinChiTiet.nbDvKyThuat?.phongThucHienId;

  const nhanVienId = useStore("auth.auth.nhanVienId", null);
  const chucVuId = useStore("auth.auth.chucVuId", null);
  const [state, _setState] = useState({
    loaiDonVatTu: 10,
  });

  useEffect(() => {
    if (!isEmpty(infoNb) && !isEmpty(thongTinChiTiet)) {
      getListThietLapChonKhoTheoTaiKhoan({
        loaiDoiTuongId: infoNb?.loaiDoiTuongId,
        loaiDichVu: LOAI_DICH_VU.VAT_TU, // thuốc
        khoaNbId: infoNb?.khoaNbId,
        khoaChiDinhId: khoaChiDinhId,
        doiTuong: infoNb?.doiTuong,
        noiTru: infoNb?.noiTru,
        capCuu: infoNb?.capCuu,
        phongId: phongThucHienId,
        nhanVienId: nhanVienId,
        chucVuId: chucVuId,
        canLamSang: false,
      });
    }
  }, [infoNb, thongTinChiTiet]);

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const onChiDinhThuoc = (e) => {
    if (!state.khoId) {
      return;
    }
    modalKeVatTuRef.current &&
      modalKeVatTuRef.current.show({
        loaiDonVatTu: state.loaiDonVatTu,
        khoId: state.khoId,
        dataKho: uniqBy(listThietLapChonKho || [], "id"),
      });
  };
  useEffect(() => {
    if (listThietLapChonKho.length === 1) {
      updateData({ dataSearch: { khoId: listThietLapChonKho[0]?.id } });
      setState({  khoId: listThietLapChonKho[0]?.id });
    }
  }, [listThietLapChonKho]);
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
    setState({ [key]: value });
  };
  useEffect(() => {
    getListAllDonViTinh({ page: "", size: "" });
  }, []);

  useEffect(() => {
    getListDichVuVatTu({
      nbDotDieuTriId: thongTinChiTiet?.nbDotDieuTriId,
      chiDinhTuDichVuId: thongTinChiTiet?.id,
      chiDinhTuLoaiDichVu: LOAI_DICH_VU.KHAM,
    });
  }, [thongTinChiTiet]);

  const listPanel = useMemo(() => {
    const grouped = groupBy(listDvVatTu, "loaiDonThuoc");
    return Object.keys(grouped || []).map((key) => {
      let groupByIdArr = grouped[key];
      return {
        header: (
          <Header
            title={"Vật tư"}
            listDvVatTu={groupByIdArr}
            nbDotDieuTriId={infoNb?.nbDotDieuTriId}
            soPhieuId={grouped[key]?.[0]?.soPhieuId}
            phieuNhapXuatId={grouped[key]?.[0]?.phieuNhapXuatId}
            chiDinhTuDichVuId={infoNb?.id}
            isReadonly={isReadonly}
          />
        ),
        content: (
          <Table
            listDvVatTu={groupByIdArr}
            nbDotDieuTriId={infoNb?.nbDotDieuTriId}
            isReadonly={isReadonly}
          />
        ),
        key,
      };
    });
  }, [listDvVatTu, thongTinChiTiet]);
  return (
    <Main>
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
              value={state?.khoId}
            />
            {listThietLapChonKho?.length && !state.khoId ? (
              <div
                style={{
                  height: 18,
                  color: "red",
                  visibility: "inherit",
                }}
              >
                {t("khamBenh.donThuoc.vuiLongChonKho")}
              </div>
            ) : null}
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
        dataNb={thongTinChiTiet}
        chiDinhTuLoaiDichVu={LOAI_DICH_VU.KHAM}
        khoaChiDinhId={khoaChiDinhId}
      />
    </Main>
  );
};

export default VatTu;
