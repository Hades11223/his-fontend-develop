import { Input } from "antd";
import React, { useEffect, useMemo, useRef } from "react";
import { MainPage, Main, InputSearch } from "./styled";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import stringUtils from "mainam-react-native-string-utils";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import TrangThai from "pages/kho/components/TrangThai";
import { useTranslation } from "react-i18next";
const ChiTietDonThuoc = (props) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const {
    themMoiThuoc: { macDinh },
    thuocChiTiet: {
      searchDonThuoc,
      updateData: updateDataThuocChiTiet,
      getPhuongThucTT,
    },
    utils: { getUtils },
    lieuDung: { getListAllLieuDung },
    phimTat: { onAddLayer, onRemoveLayer },
  } = useDispatch();
  const {
    thuocChiTiet: { infoPatient },
  } = useSelector((state) => state);

  const refLayerHotKey = useRef(stringUtils.guid());

  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  const isThemMoi = useMemo(() => {
    return id == undefined;
  }, [id]);
  useEffect(() => {
    macDinh();
    getUtils({ name: "trangThaiHoan" });
    getPhuongThucTT({ page: "", size: "", active: true });
    getListAllLieuDung({ page: "", size: "" });
    return () => {
      updateDataThuocChiTiet({
        // reset chi tiet
        infoPatient: [],
        dsThuocEdit: [],
        selectedDonThuoc: [],
        nguoiBenhId: null,
        isAdvised: false,
      });
    };
  }, []);
  useEffect(() => {
    if (id) {
      searchDonThuoc(id);
    }
  }, [id]);
  return (
    <MainPage
      breadcrumb={[
        { title: t("kho.kho"), link: "/kho" },
        {
          title: t("kho.phatThuocNgoaiTru"),
          link: "/kho/phat-thuoc-ngoai-tru",
        },
        {
          title: t("kho.thongTinDonThuoc"),
          link: `/kho/phat-thuoc-ngoai-tru/chi-tiet/${id}`,
        },
      ]}
      rightBreadcrumbContent={
        <TrangThai
          type={5}
          times={[
            infoPatient?.phieuXuat?.thoiGianTaoPhieu,
            infoPatient?.phieuXuat?.thoiGianDuyet,
          ]}
        />
      }
      title={
        <div style={{ display: "flex" }}>
          {t("kho.thongTinDonThuoc")}
          <InputSearch style={{ marginLeft: 10 }}>
            <img src={IconSearch} alt="IconSearch" className="icon-search" />
            <Input
              // ref={refThongTin}
              placeholder={t("kho.quetQrNguoiBenhHoacNhapMaHoSoDeTimKiem")}
              autoFocus
              // onChange={onChange("qrBN", true)}
              // onKeyDown={onKeyDown}
            />
            {/* <img src={IconQR} alt="IconQrCode" className="qr-search" /> */}
          </InputSearch>
        </div>
      }
    >
      <Main>
        <LeftPanel isThemMoi={isThemMoi} layerId={refLayerHotKey.current} />
        <RightPanel isThemMoi={isThemMoi} layerId={refLayerHotKey.current} />
      </Main>
    </MainPage>
  );
};

export default ChiTietDonThuoc;
