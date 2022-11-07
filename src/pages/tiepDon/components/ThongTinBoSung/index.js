import React, { memo, useEffect, useRef, useMemo } from "react";
import { Row, Col, Button } from "antd";
import Select from "components/Select";
import { useDispatch, useSelector } from "react-redux";
import { openInNewTab } from "utils";
import Box from "../Box";
import InputTimeout from "components/InputTimeout";
import { useTranslation } from "react-i18next";
import ModalThemNguoiGioiThieu from "./ModalThemNguoiGioiThieu/ModalThemNguoiGioiThieu";

const ThongTinBoSung = ({ layerId, ...props }) => {
  const { t } = useTranslation();
  const { onCheckTrungThongTin } = props;
  const {
    nbNguoiBaoLanh,
    nbMienGiam,
    tuoi,
    checkValidate,
    disableTiepDon,
    nbNguonNb,
  } = useSelector((state) => state.tiepDon);
  const { listloaiMienGiam } = useSelector((state) => state.utils);
  const { listAllNhanVien } = useSelector((state) => state.nhanVien);
  const { listAllQuanHe } = useSelector((state) => state.moiQuanHe);
  const { listAllNguoiGioiThieu, listNguoiGioiThieu } = useSelector(
    (state) => state.nguoiGioiThieu
  );
  const { listAllNguonNguoiBenh } = useSelector(
    (state) => state.nguonNguoiBenh
  );
  const {
    moiQuanHeId,
    hoTen = "",
    soDienThoai,
    soCanCuoc,
  } = nbNguoiBaoLanh || {};
  const { loaiMienGiam, nguoiDuyetId } = nbMienGiam || {};
  const { nguonNbId, nguoiGioiThieuId, ghiChu } = nbNguonNb || {};

  const {
    tiepDon: { updateThongTinNb },
    nhanVien: { getListAllNhanVien },
    moiQuanHe: { getListAllQuanHe },
    nguoiGioiThieu: { getListAllNguoiGioiThieu, search },
    nguonNguoiBenh: { getListAllNguonNguoiBenh },
    phimTat: { onRegisterHotkey },
  } = useDispatch();

  const refHoTen = useRef(null);
  const refModal = useRef(null);

  const OnModalClick = () => {
    refModal && refModal.current.show();
  };

  const requiredNguoiGioiThieu = useMemo(() => {
    return listAllNguonNguoiBenh?.find((nb) => nb.id == nguonNbId)
      ?.nguoiGioiThieu;
  }, [listAllNguonNguoiBenh, nguonNbId]);

  useEffect(() => {
    let param = { active: true, page: "", size: "" };
    getListAllNhanVien(param);
    getListAllQuanHe(param);
    getListAllNguoiGioiThieu(param);
    getListAllNguonNguoiBenh(param);
    onRegisterHotkey({
      layerId: layerId,
      hotKeys: [
        {
          keyCode: 119, //F8
          onEvent: () => {
            refHoTen.current && refHoTen.current.focus();
          },
        },
      ],
    });
  }, []);

  const onChange = (value, variables) => {
    if (variables === "loaiMienGiam" || variables === "nguoiDuyetId") {
      updateThongTinNb({ [variables]: value }, "nbMienGiam");
    }
    if (
      variables === "moiQuanHeId" ||
      variables === "hoTen" ||
      variables === "soDienThoai" ||
      variables === "soCanCuoc"
    ) {
      updateThongTinNb({ [variables]: value }, "nbNguoiBaoLanh");
    }
    if (
      variables === "nguonNbId" ||
      variables === "nguoiGioiThieuId" ||
      variables === "ghiChu"
    ) {
      let newState = { [variables]: value };
      if (variables === "nguonNbId") {
        newState.nguoiGioiThieuId = "";
      }

      updateThongTinNb(newState, "nbNguonNb");
    }
    if (variables === "soDienThoai" && value.length === 10) {
      onCheckTrungThongTin(value, "sdtNguoiBaoLanh");
    }
  };

  useEffect(() => {
    if (nguonNbId) search({ dsNguonNbId: nguonNbId, active: true });
  }, [nbNguonNb]);

  return (
    <>
      <Box
        title={t("tiepDon.thongTinBoSung")}
        titleRight={
          <div>
            {t("common.nhan")} <span>[F8] </span>
            {t("tiepDon.nhanDeThemThongTinKhac")}
          </div>
        }
      >
        <Row className="info-main-bottom-mini">
          <Col md={12} xl={12} xxl={12}>
            <div className="item-input">
              <label
                className={
                  !hoTen && tuoi < 6 ? `title label label-error` : "title label"
                }
              >
                {t("tiepDon.hoTenNguoiBaoLanh")}
                {tuoi < 6 ? <span style={{ color: "red" }}> *</span> : ""}
              </label>

              <InputTimeout
                ref={refHoTen}
                style={{ textTransform: "uppercase" }}
                className="input"
                placeholder={t("tiepDon.nhapHoTenNguoiBaoLanh")}
                value={hoTen}
                onChange={(e) => {
                  console.log(e);
                  onChange(e, "hoTen");
                }}
                disabled={disableTiepDon}
              />
              {checkValidate && tuoi < 6 && !hoTen && (
                <div className="error">
                  {t("tiepDon.vuiLongNhapHoTenNguoiBaoLanh")}
                </div>
              )}
            </div>
          </Col>
          <Col md={12} xl={12} xxl={12}>
            <div className="item-select">
              <label
                onClick={() => openInNewTab("/danh-muc/moi-quan-he")}
                className={
                  !moiQuanHeId && tuoi < 6
                    ? `label label-error pointer`
                    : " pointer label"
                }
              >
                {t("tiepDon.moiQhVoiNguoiBenh")}
                {tuoi < 6 ? <span style={{ color: "red" }}> *</span> : ""}
              </label>
              <Select
                onChange={(e) => onChange(e, "moiQuanHeId")}
                value={moiQuanHeId}
                className="select"
                placeholder={t("tiepDon.chonMoiQlVoiNguoiBenh")}
                data={listAllQuanHe || []}
                disabled={disableTiepDon}
              />
              {checkValidate && tuoi < 6 && !moiQuanHeId && (
                <div className="error">
                  {t("tiepDon.vuiLongChonMoiQuanHeVoiNguoiBenh")}
                </div>
              )}
            </div>
          </Col>
          <Col md={12} xl={12} xxl={12}>
            <div className="item-input">
              <label
                className={
                  !soDienThoai && tuoi < 6
                    ? `title label label-error`
                    : "label title"
                }
              >
                {t("common.sdtNguoiBaoLanh")}
                {tuoi < 6 ? <span style={{ color: "red" }}> *</span> : ""}
              </label>
              <InputTimeout
                className="input"
                placeholder={t("common.nhapSdtNguoiBaoLanh")}
                value={soDienThoai}
                onChange={(e) => onChange(e, "soDienThoai")}
                disabled={disableTiepDon}
              />
              {checkValidate && tuoi < 6 && !soDienThoai ? (
                <div className="error">
                  {t("common.vuiLongNhapSdtNguoiBaoLanh")}
                </div>
              ) : soDienThoai &&
                !soDienThoai.replaceAll(" ", "").isPhoneNumber() ? (
                <div className="error">
                  {t("tiepDon.soDienThoaiSaiDinhDang")}
                </div>
              ) : null}
            </div>
          </Col>
          <Col md={12} xl={12} xxl={12}>
            <div className="item-input">
              <label className="title label">
                {t("tiepDon.cmndNguoiBaoLanh")}
              </label>
              <InputTimeout
                className="input"
                placeholder={t("tiepDon.nhapCMNDNguoiBaoLanh")}
                value={soCanCuoc}
                onChange={(e) => onChange(e, "soCanCuoc")}
                disabled={disableTiepDon}
              />
            </div>
          </Col>
          <Col md={12} xl={12} xxl={12}>
            <div className="item-select">
              <label
                className="title label pointer"
                onClick={() => openInNewTab("/danh-muc/nguon-nguoi-benh?tab=2")}
              >
                {t("tiepDon.nguonNguoiBenh")}
              </label>
              <Select
                onChange={(e) => onChange(e, "nguonNbId")}
                value={nguonNbId}
                className="select"
                placeholder={t("tiepDon.chonNguonNguoiBenh")}
                data={listAllNguonNguoiBenh || []}
                disabled={disableTiepDon}
              />
            </div>
          </Col>
          <Col md={12} xl={12} xxl={12}>
            <div className="item-select">
              {requiredNguoiGioiThieu ? (
                <label
                  onClick={() =>
                    openInNewTab("/danh-muc/nguon-nguoi-benh?tab=1")
                  }
                  className={
                    !nguoiGioiThieuId
                      ? `label label-error pointer`
                      : "label pointer"
                  }
                >
                  {" "}
                  {t("tiepDon.nguoiGioiThieu")}
                  <span style={{ color: "red" }}> *</span>
                </label>
              ) : (
                <label
                  className="title label pointer"
                  onClick={() =>
                    openInNewTab("/danh-muc/nguon-nguoi-benh?tab=1")
                  }
                >
                  {t("tiepDon.nguoiGioiThieu")}
                </label>
              )}
              <div>
                <Select
                  onChange={(e) => onChange(e, "nguoiGioiThieuId")}
                  value={nguoiGioiThieuId}
                  className="select"
                  placeholder={t("tiepDon.chonNguoiGioiThieu")}
                  data={
                    listNguoiGioiThieu
                      ? listNguoiGioiThieu
                      : listAllNguoiGioiThieu || []
                  }
                  disabled={disableTiepDon}
                  listHeight={156}
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Button block type="primary" onClick={OnModalClick}>
                        Thêm người giới thiệu
                      </Button>
                    </>
                  )}
                />
              </div>
              {requiredNguoiGioiThieu && checkValidate && !nguoiGioiThieuId ? (
                <div className="error">
                  {t("tiepDon.vuiLongChonNguoiGioiThieu")}
                </div>
              ) : null}
            </div>
          </Col>
          <Col md={24} xl={24} xxl={24}>
            <div className="item-input">
              <label className="title label">{t("common.ghiChu")}</label>
              <InputTimeout
                rows={6}
                className="input"
                placeholder={t("common.nhapGhiChu")}
                value={ghiChu}
                onChange={(e) => onChange(e, "ghiChu")}
                disabled={disableTiepDon}
                maxLength={256}
              />
              {ghiChu?.length > 256 ? (
                <div className="error">{t("tiepDon.nhapQuaSoKyTuChoPhep")}</div>
              ) : null}
            </div>
          </Col>
          <Col md={12} xl={12} xxl={12}>
            <div className="item-select">
              <label className="title label">{t("tiepDon.loaiMienGiam")}</label>
              <Select
                onChange={(e) => onChange(e, "loaiMienGiam")}
                value={loaiMienGiam}
                className="select"
                placeholder={t("tiepDon.chonLoaiMienGiam")}
                data={listloaiMienGiam || []}
                disabled={disableTiepDon}
              />
            </div>
          </Col>
          <Col md={12} xl={12} xxl={12}>
            <div className="item-select">
              <label
                onClick={() => openInNewTab("/quan-tri/danh-muc-tai-khoan")}
                className="label pointer"
              >
                {t("tiepDon.nguoiDuyetMienPhi")}
              </label>
              <Select
                className="select"
                placeholder={t("tiepDon.chonNguoiDuyetMienPhi")}
                data={listAllNhanVien || []}
                onChange={(e) => onChange(e, "nguoiDuyetId")}
                value={nguoiDuyetId || null}
                valueText={nguoiDuyetId || null}
                disabled={disableTiepDon}
              />
            </div>
          </Col>
        </Row>
      </Box>
      <ModalThemNguoiGioiThieu
        width={442}
        title="Thêm người giới thiệu"
        ref={refModal}
      />
    </>
  );
};

export default memo(ThongTinBoSung);
