import React, { useEffect, useMemo, useRef, useState } from "react";
import Select from "components/Select";
import { Main } from "./styled";
import { Input } from "antd";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { LOAI_DICH_VU_CHI_DINH } from "pages/khamBenh/configs";
import { DOI_TUONG_KCB, LOAI_DICH_VU } from "constants/index";
import useThongTinNb from "../hook/useThongTinNb";
import ModalChiDinhDichVu from "pages/khamBenh/ChiDinhDichVu/ModalChiDinhDichVu";
import { useStore } from "hook";
import DichVuDaChiDinh from "pages/khamBenh/ChiDinhDichVu/DichVuDaChiDinh";
const ChiDinhDichVuKyThuat = () => {
  const refModalChiDinhDichVu = useRef(null);

  const { t } = useTranslation();

  const {
    benhPham: { getListAllBenhPham },
    nhomDichVuCap1: { getListAllNhomDichVuCap1 },
    chiDinhKhamBenh: { updateConfigData },
    loaiDoiTuongLoaiHinhTT: { getListLoaiDoiTuongTT },
  } = useDispatch();
  const thongTinBenhNhan = useThongTinNb();
  const dataDetail = useStore("pttt.dataDetail", {});
  const configData = useStore("chiDinhKhamBenh.configData", null);

  const [state, _setState] = useState({
    loaiDichVu: "",
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useEffect(() => {
    if (thongTinBenhNhan[0]?.loaiDoiTuongId)
      getListLoaiDoiTuongTT({
        page: "",
        size: "",
        loaiDoiTuongId: thongTinBenhNhan[0]?.loaiDoiTuongId,
        active: true,
      });
  }, [thongTinBenhNhan[0]]);

  const disabledAll = useMemo(
    () =>
      [25, 43, 155].some((i) => i === dataDetail.trangThai) ||
      dataDetail?.trangThaiHoan === 40,
    [dataDetail.trangThai, dataDetail.khongThucHien]
  );

  const onChiDinhDichVu = () => {
    refModalChiDinhDichVu.current &&
      refModalChiDinhDichVu.current.show({
        loaiDichVu: state.loaiDichVu,
        dsDoiTuongSuDung:
          thongTinBenhNhan[0]?.doiTuongKcb === DOI_TUONG_KCB.NGOAI_TRU
            ? 20
            : 30,
        nbThongTinId: dataDetail.nbThongTinId,
        nbDotDieuTriId: dataDetail.nbDotDieuTriId,
        khoaChiDinhId: dataDetail.khoaThucHienId,
        isPhauThuat: dataDetail.phauThuat,
        chiDinhTuDichVuId: dataDetail.id,
        chiDinhTuLoaiDichVu: LOAI_DICH_VU.PHAU_THUAT_THU_THUAT,
        disableChiDinh: disabledAll,
        listLoaiChiDinhDV: listLoaiChiDinhDV,
        isHiddenTyLett: false,
        dsLoaiDichVu: [
          LOAI_DICH_VU.XET_NGHIEM,
          LOAI_DICH_VU.CDHA,
          LOAI_DICH_VU.PHAU_THUAT_THU_THUAT,
        ],
        doiTuong: thongTinBenhNhan[0]?.doiTuong,
      });
  };

  const onChangeInput = (key) => (e) => {
    let value = "";
    if (e.target) {
      value = e.target.value;
    } else {
      value = e;
    }
    setState({ [key]: value });
  };
  useEffect(() => {
    if (configData) {
      getListAllBenhPham({ page: "", size: "", active: true });
    }
  }, [configData]);

  useEffect(() => {
    getListAllNhomDichVuCap1({ page: "", size: "", active: true });
    return () => {
      updateConfigData({
        configData: null,
      });
    };
  }, []);

  useEffect(() => {
    if (dataDetail.id) {
      updateConfigData({
        configData: {
          chiDinhTuDichVuId: dataDetail.id,
          nbDotDieuTriId: dataDetail.nbDotDieuTriId,
          nbThongTinId: dataDetail.nbThongTinId,
          chiDinhTuLoaiDichVu: 40,
          dsChiDinhTuLoaiDichVu: 40,
          khoaChiDinhId: dataDetail.khoaChiDinhId,
          thongTinNguoiBenh: dataDetail,
        },
      });
    }
  }, [dataDetail]);

  const listLoaiChiDinhDV = useMemo(() => {
    const list = LOAI_DICH_VU_CHI_DINH.filter(
      (x) => x.id !== LOAI_DICH_VU.KHAM && x.id !== LOAI_DICH_VU.NGOAI_DIEU_TRI
    ).map((item) => {
      item.ten = t(item.i18n);
      return item;
    });
    return list;
  }, [t]);
  console.log("disabledAll", disabledAll);
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
            data={listLoaiChiDinhDV}
            onChange={onChangeInput("loaiDichVu")}
            value={state?.loaiDichVu}
            id={state?.loaiDichVu}
            disabled={disabledAll}
          />
        </div>
        <div>&nbsp;&nbsp;&nbsp;</div>
        <div>
          <div className="input-box">
            <img src={IconSearch} alt="IconSearch" className="ic-down" />
            <Input
              placeholder={t("common.timKiem")}
              onClick={onChiDinhDichVu}
              disabled={disabledAll}
            />
          </div>
        </div>
      </div>
      <DichVuDaChiDinh
        isHiddenTyLett={false}
        isDisplayLoaiPttt={true}
        isDisplayIconHoan={true}
        isPhauThuat={dataDetail.phauThuat}
        disabledAll={disabledAll}
      />
      <ModalChiDinhDichVu ref={refModalChiDinhDichVu} />
    </Main>
  );
};

export default ChiDinhDichVuKyThuat;
