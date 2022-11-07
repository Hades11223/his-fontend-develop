import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Row, Checkbox, Input } from "antd";
import IconExclam from "assets/images/xetNghiem/icExclam.png";
import ThongTinBenhNhan from "../../../chanDoanHinhAnh/components/ThongTinBenhNhan";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import IconQR from "assets/images/xetNghiem/icQR.png";
import { Main, InputSearch } from "./styled";
import IconArrowTop from "assets/images/xetNghiem/icArrowTop.png";
import { checkRole } from "utils/role-utils";
import { ENUM, ROLES } from "constants/index";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";

function ThongTinBN({ layerId }) {
  const { t } = useTranslation();
  const refInputSearch = useRef(null);
  const location = useLocation();
  const { nbDotDieuTriId: nbDotDieuTriIdTiepNhanMau } = useSelector(
    (state) => state.layMauXN
  );
  const { nbDotDieuTriId: nbDotDieuTriIdHHSH } = useSelector(
    (state) => state.xnHuyetHocSinhHoa
  );
  const { nbDotDieuTriId: nbDotDieuTriIdGPB } = useSelector(
    (state) => state.xnGiaiPhauBenhViSinh
  );
  const { thongTinBenhNhan } = useSelector((state) => state.nbDotDieuTri);
  const {
    nbDotDieuTri: { getById },
    layMauXN: { updateData: updateDataTiepNhanXN },
    xnHuyetHocSinhHoa: { updateData: updateDataHHSH },
    xnGiaiPhauBenhViSinh: { updateData: updateDataGPB },
    phimTat: { onRegisterHotkey },
    nbXetNghiem: { onChangeInputSearch },
  } = useDispatch();
  const listGioiTinh = useEnum(ENUM.GIOI_TINH);

  const [state, _setState] = useState({ show: false });
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    onRegisterHotkey({
      layerId: layerId,
      hotKeys: [
        {
          keyCode: 117, //F6
          onEvent: () => {
            refInputSearch.current.focus();
          },
        },
        {
          keyCode: 112, //F1
          onEvent: () => {
            onToggleModal()();
          },
        },
      ],
    });
  }, []);

  useEffect(() => {
    const { pathname } = location;
    if (pathname.includes("/lay-mau") && nbDotDieuTriIdTiepNhanMau) {
      getById(nbDotDieuTriIdTiepNhanMau);
    }
    if (pathname.includes("/sinh-hoa-huyet-hoc") && nbDotDieuTriIdHHSH) {
      getById(nbDotDieuTriIdHHSH);
    }
    if (pathname.includes("/giai-phau-benh-vi-ky-sinh") && nbDotDieuTriIdGPB) {
      getById(nbDotDieuTriIdGPB);
    }
  }, [
    location.pathname,
    nbDotDieuTriIdTiepNhanMau,
    nbDotDieuTriIdHHSH,
    nbDotDieuTriIdGPB,
  ]);

  const updateNbDieuTriId = (data, str) => {
    const { pathname } = location;
    if (pathname.includes("/lay-mau")) {
      updateDataTiepNhanXN({
        nbDotDieuTriId: data,
        checkSearchQR: str,
      });
    }
    if (pathname.includes("/sinh-hoa-huyet-hoc")) {
      updateDataHHSH({
        nbDotDieuTriId: data,
        checkSearchQR: str,
      });
    }
    if (pathname.includes("/giai-phau-benh-vi-ky-sinh")) {
      updateDataGPB({
        nbDotDieuTriId: data,
        checkSearchQR: str,
      });
    }
  };

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
        updateNbDieuTriId(s[0]?.id);
      });
    } else {
      onChangeInputSearch({ maHoSo: "", soPhieuId: "" });
      updateNbDieuTriId(null);
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
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchBN();
    }
  };

  const gioiTinh =
    listGioiTinh.find((item) => item.id === thongTinBenhNhan?.gioiTinh) || {};
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
            ref={refInputSearch}
            placeholder={t("xetNghiem.quetMaQRNguoiBenh")}
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
          {t("xetNghiem.timKiemTheoSoPhieu")}
        </Checkbox>
      </Row>
      <Row className="info-partinent">
        <div className="info-partinent__index">BNS-0004</div>
        <div className="info-partinent__name">
          <span>{thongTinBenhNhan?.tenNb}</span>
          {gioiTinh.ten &&
            age &&
            ` (${gioiTinh.ten && `${gioiTinh.ten} - `} ${age})`}
        </div>
        {checkRole([ROLES["XET_NGHIEM"].THONG_TIN_NB]) && thongTinBenhNhan?.id && (
          <div className="info-partinent__detail" onClick={onToggleModal()}>
            {t("xetNghiem.xemThongTinDayDu")}
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
}

export default ThongTinBN;
