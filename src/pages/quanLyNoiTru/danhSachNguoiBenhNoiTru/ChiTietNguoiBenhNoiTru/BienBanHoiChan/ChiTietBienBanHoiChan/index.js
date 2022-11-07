import React, { memo, useEffect, useMemo, useState } from "react";
import { MainPage } from "./styled";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import BienBanHoiChan from "../BienBanHoiChan";
import { useDispatch } from "react-redux";
import { useStore } from "hook";
import cacheUtils from "utils/cache-utils";
import { ROLES, TRANG_THAI_NB } from "constants/index";
import { checkRole } from "utils/role-utils";
const ChiTietBienBanHoiChan = (props) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const nbBienBanHoiChan = useStore("nbBienBanHoiChan.nbBienBanHoiChan", {});

  const {
    nbBienBanHoiChan: { getById },
    danhSachNguoiBenhNoiTru: { getNbNoiTruById },
  } = useDispatch();
  const infoPatient = useStore("danhSachNguoiBenhNoiTru.infoPatient", {});

  const [state, _setState] = useState();

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    if (id) {
      getById(id);
    }
  }, [id]);

  useEffect(() => {
    if (nbBienBanHoiChan?.nbDotDieuTriId) {
      getNbNoiTruById(nbBienBanHoiChan?.nbDotDieuTriId);
    }
  }, [nbBienBanHoiChan]);

  useEffect(() => {
    async function fetchData() {
      let khoaLamViec = await cacheUtils.read(
        "DATA_KHOA_LAM_VIEC",
        "",
        null,
        false
      );
      setState({ khoaLamViec });
    }
    fetchData();
  }, []);

  const isReadonly = useMemo(() => {
    return (
      (infoPatient?.khoaNbId !== state?.khoaLamViec?.id ||
        [
          TRANG_THAI_NB.DANG_CHUYEN_KHOA,
          TRANG_THAI_NB.HEN_DIEU_TRI,
          TRANG_THAI_NB.DA_RA_VIEN,
          TRANG_THAI_NB.DA_THANH_TOAN_RA_VIEN,
          TRANG_THAI_NB.DA_THANH_TOAN_HEN_DIEU_TRI,
        ].includes(infoPatient?.trangThai)) &&
      !checkRole([ROLES["QUAN_LY_NOI_TRU"].THAO_TAC_NB_KHAC_KHOA])
    );
  }, [infoPatient, state?.khoaLamViec]);

  return (
    <MainPage
      breadcrumb={[
        { link: "/quan-ly-noi-tru", title: t("quanLyNoiTru.quanLyNoiTru") },
        {
          link: "/quan-ly-noi-tru/danh-sach-nguoi-benh-noi-tru",
          title: t("quanLyNoiTru.danhSachNguoiBenhNoiTru"),
        },
      ]}
    >
      <BienBanHoiChan
        id={id}
        nbDotDieuTriId={nbBienBanHoiChan?.nbDotDieuTriId}
        nbBienBanHoiChan={nbBienBanHoiChan}
        isShowTuVan={true}
        isReadonly={isReadonly}
      />
    </MainPage>
  );
};
export default memo(ChiTietBienBanHoiChan);
