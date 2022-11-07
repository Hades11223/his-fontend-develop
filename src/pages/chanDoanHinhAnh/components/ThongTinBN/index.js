import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Row, Checkbox, Input } from "antd";
import IconExclam from "assets/images/xetNghiem/icExclam.png";
import ThongTinBenhNhan from "../ThongTinBenhNhan";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import IconQR from "assets/images/xetNghiem/icQR.png";
import { Main, InputSearch } from "./styled";
import IconArrowTop from "assets/images/xetNghiem/icArrowTop.png";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
import { useTranslation } from "react-i18next";

const ThongTinBN = ({ layerId }) => {
  const { t } = useTranslation();
  const { nbDotDieuTriId } = useSelector((state) => state.choTiepDonDV);
  const { thongTinBenhNhan } = useSelector((state) => state.nbDotDieuTri);
  const { listgioiTinh = [] } = useSelector((state) => state.utils);

  const {
    nbDotDieuTri: { getById },
    utils: { getUtils },
    choTiepDonDV: { updateData: updateDataNb, getTongHopDichVu },
    phimTat: { onRegisterHotkey },
    dsBenhNhan: { onChangeInputSearch },
  } = useDispatch();

  const location = useLocation();

  const [state, _setState] = useState({ show: false, focusInput: false });
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refInput = useRef(null);
  const paramCheck = ["/chan-doan-hinh-anh/tiep-nhan"].includes(
    window.location.pathname
  );

  useEffect(() => {
    if (nbDotDieuTriId) {
      getById(nbDotDieuTriId);
    }
  }, [location.pathname, nbDotDieuTriId]);

  useEffect(() => {
    getUtils({ name: "gioiTinh" });
    onRegisterHotkey({
      layerId: layerId,
      hotKeys: [
        {
          keyCode: 117, //F6
          onEvent: () => {
            refInput.current && refInput.current.focus();
          },
        },
        {
          keyCode: 112, //F1
          onEvent: () => {
            if (thongTinBenhNhan?.id) setState({ show: true });
          },
        },
      ],
    });
  }, [thongTinBenhNhan]);

  const onToggleModal = (key) => () => {
    if (key === "hidden") {
      if (state.show) {
        setState({
          show: false,
        });
      }
    } else {
      setState({
        show: !state.show,
      });
    }
  };

  const handleSearchBN = (value) => {
    const { qrBN = "", timKiemTheoPhieu } = state;
    let str = qrBN.trim() || value || "";
    let param = {};
    if (/^[0-9]+$/.test(str)) {
      if (timKiemTheoPhieu) {
        param = { soPhieu: Number(str) };
      } else param = { maHoSo: Number(str) };
    } else {
      if (str.indexOf("NB|") === 0 && str.indexOf("$") === str.length - 1) {
        let array = str.split("|");
        let maHoSo = array[3] || "";
        let soPhieuId = array[24]?.endsWith("$")
          ? array[24].substring(0, array[24]?.length - 1)
          : array[24] || "";
        if (timKiemTheoPhieu) {
          param = { soPhieuId: soPhieuId, maHoSo: "" };
        } else param = param = { maHoSo: maHoSo, soPhieuId: "" };
      }
    }
    if (param?.maHoSo || param?.soPhieuId) {
      onChangeInputSearch(param).then((s) => {
        updateDataNb({
          nbDotDieuTriId: s[0]?.id,
        });
      });
    } else {
      onChangeInputSearch({ maHoSo: "", soPhieuId: "" });
      updateDataNb({
        nbDotDieuTriId: null,
      });
    }
  };

  const onChange = (key) => (e, item) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    setState({
      [key]: value,
    });

    if (key === "qrBN") {
      if (!/^[0-9]+$/.test(value)) {
        handleSearchBN(value);
      }
    }
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchBN();
    }
  };
  const gioiTinh =
    listgioiTinh.find((item) => item.id === thongTinBenhNhan?.gioiTinh) || {};
  const age = thongTinBenhNhan.tuoi
    ? `${thongTinBenhNhan?.tuoi} ${t("common.tuoi")}`
    : "";

  const onBlur = () => {
    setState({
      focusInput: false,
    });
  };

  return (
    <Main onClick={onToggleModal("hidden")}>
      <Row align="middle">
        <InputSearch focusInput={state.focusInput}>
          <img src={IconSearch} alt="IconSearch" className="icon-search" />
          <Input
            ref={refInput}
            placeholder={t("cdha.quetMaQrNb")}
            autoFocus
            onChange={onChange("qrBN")}
            onKeyDown={onKeyDown}
            onFocus={() =>
              setState({
                focusInput: true,
              })
            }
            onBlur={onBlur}
          />
          <img src={IconQR} alt="IconQrCode" className="qr-search" />
        </InputSearch>
        <Checkbox
          style={{ fontWeight: "600" }}
          onChange={onChange("timKiemTheoPhieu")}
        >
          {t("cdha.timKiemTheoSoPhieu")}
        </Checkbox>
      </Row>
      <Row className="info-partinent">
        <div className="info-partinent__name">
          <span>{thongTinBenhNhan?.tenNb}</span>
          {gioiTinh.ten &&
            age &&
            ` (${gioiTinh.ten && `${gioiTinh.ten} - `} ${age})`}
        </div>
        {checkRole([ROLES["CHAN_DOAN_HINH_ANH"].THONG_TIN_NGUOI_BENH]) &&
          thongTinBenhNhan?.id && (
            <div className="info-partinent__detail" onClick={onToggleModal()}>
              {t("cdha.xemThongTinDayDu")}
              <img src={IconExclam} alt="IconExclam" />
              {state.show && (
                <img
                  src={IconArrowTop}
                  alt="IconArrowTop"
                  className="icon-info"
                />
              )}
            </div>
          )}

        {thongTinBenhNhan?.id && location.pathname.includes("/tiep-nhan") && (
          <div className="info-partinent__history">
            {t("cdha.lichSuKham")}
            <img src={IconExclam} alt="IconExclam" />
            {state.show && (
              <img
                src={IconArrowTop}
                alt="IconArrowTop"
                className="icon-info"
              />
            )}
          </div>
        )}
      </Row>
      {state.show && (
        <ThongTinBenhNhan
          onToggleModal={onToggleModal}
          thongTinBenhNhan={thongTinBenhNhan}
          gioiTinh={gioiTinh}
          age={age}
          className="modalThongTinBN"
        />
      )}
    </Main>
  );
};

export default ThongTinBN;
