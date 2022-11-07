import React, { useEffect, useMemo, useRef, useState } from "react";
import Select from "components/Select";
import { Main } from "./styled";
import { Input } from "antd";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { LOAI_DICH_VU_CHI_DINH } from "pages/khamBenh/configs";
import ModalChiDinhDichVu from "pages/khamBenh/ChiDinhDichVu/ModalChiDinhDichVu";
import { useStore } from "hook";
import DichVuDaChiDinh from "pages/khamBenh/ChiDinhDichVu/DichVuDaChiDinh";
import { LOAI_DICH_VU } from "constants/index";

const DichVuKyThuat = (props) => {
  const refModalChiDinhDichVu = useRef(null);
  const { isReadonly } = props;
  const { t } = useTranslation();

  const {
    chiDinhKhamBenh: { updateConfigData },
    benhPham: { getListAllBenhPham },
    loaiDoiTuongLoaiHinhTT: { getListLoaiDoiTuongTT },
  } = useDispatch();

  const currentToDieuTri = useStore("toDieuTri.currentToDieuTri", {});
  const infoPatient = useStore("danhSachNguoiBenhNoiTru.infoPatient", {});
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
    if (infoPatient?.loaiDoiTuongId)
      getListLoaiDoiTuongTT({
        page: "",
        size: "",
        loaiDoiTuongId: infoPatient?.loaiDoiTuongId,
        active: true,
      });
  }, [infoPatient]);

  const onChiDinhDichVu = () => {
    refModalChiDinhDichVu.current &&
      refModalChiDinhDichVu.current.show({
        loaiDichVu: state.loaiDichVu,
        dsDoiTuongSuDung: [30],
        nbThongTinId: infoPatient.nbThongTinId,
        nbDotDieuTriId: currentToDieuTri.nbDotDieuTriId,
        khoaChiDinhId: currentToDieuTri.khoaChiDinhId,
        chiDinhTuDichVuId: currentToDieuTri.id,
        chiDinhTuLoaiDichVu: 210,
        disableChiDinh: false,
        isHiddenTyLett: true,
        isPhauThuat: currentToDieuTri.phauThuat,
        listLoaiChiDinhDV: listLoaiChiDinhDV,
        doiTuong: infoPatient?.doiTuong
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
      getListAllBenhPham({active: true, page: "", size: ""})
    }
  }, [configData]);
  useEffect(() => {
    return () => {
      updateConfigData({
        configData: null,
      });
    };
  }, []);

  useEffect(() => {
    if (
      infoPatient.id == currentToDieuTri.nbDotDieuTriId &&
      currentToDieuTri.id
    ) {
      updateConfigData({
        configData: {
          chiDinhTuDichVuId: currentToDieuTri.id,
          nbDotDieuTriId: currentToDieuTri.nbDotDieuTriId,
          nbThongTinId: infoPatient.nbThongTinId,
          chiDinhTuLoaiDichVu: 210,
          dsChiDinhTuLoaiDichVu: 210,
          khoaChiDinhId: currentToDieuTri.khoaChiDinhId,
          thongTinNguoiBenh: infoPatient,
        },
      });
    }
  }, [currentToDieuTri, infoPatient]);

  const listLoaiChiDinhDV = useMemo(() => {
    const list = LOAI_DICH_VU_CHI_DINH.filter((x) => x.id !== LOAI_DICH_VU.NGOAI_DIEU_TRI).map(
      (item) => {
        item.ten = t(item.i18n);
        return item;
      }
    );
    return list;
  }, [t]);

  return (
    <Main>
      <div>
        <h1>{t("common.chiDinhDichVu")}</h1>
      </div>
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
              data={listLoaiChiDinhDV}
              onChange={onChangeInput("loaiDichVu")}
              value={state?.loaiDichVu}
            />
          </div>
          <div>&nbsp;&nbsp;&nbsp;</div>
          <div>
            <div className="input-box">
              <img src={IconSearch} alt="IconSearch" className="ic-down" />
              <Input
                placeholder={t("common.timKiem")}
                onClick={onChiDinhDichVu}
              />
            </div>
          </div>
        </div>
      )}

      <DichVuDaChiDinh
        isHiddenTyLett={true}
        isDisplayLoaiPttt={true}
        isDisplayIconHoan={false}
        isReadonly={isReadonly}
      />

      <ModalChiDinhDichVu ref={refModalChiDinhDichVu} />
    </Main>
  );
};

export default DichVuKyThuat;
