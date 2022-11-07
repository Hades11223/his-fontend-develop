import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Col, Row, Input, message } from "antd";
import { Main, InputSearch } from "./styled";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { GIOI_TINH_BY_VALUE } from "constants/index";
import thuocProvider from "data-access/kho/thuoc-provider";
import { Card, Select } from "components";
import { useTranslation } from "react-i18next";
import { useStore } from "hook";

const ThongTinNguoiBenh = ({ layerId, ...props }) => {
  const { onRegisterHotkey } = useDispatch().phimTat;
  const refThongTin = useRef();
  const { t } = useTranslation();

  const [state, _setState] = useState({ isBsChiDinhNgoaiVien: false });
  const setState = (newState) => {
    _setState((state) => {
      return { ...state, ...newState };
    });
  };

  const history = useHistory();
  const { infoPatient } = useSelector((state) => state.thuocChiTiet);
  const { listAllBacSiNgoaiVien = [] } = useSelector(
    (state) => state.bacSiNgoaiVien
  );
  const listBacSi = useStore("nhanVien.listNhanVien", []);
  const { phieuXuat } = infoPatient;

  const {
    thuocChiTiet: { updateData },
  } = useDispatch();

  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 114, //F3
          onEvent: () => {
            refThongTin.current && refThongTin.current.focus();
          },
        },
      ],
    });
  }, []);

  const isVangLai = useMemo(() => {
    return !phieuXuat?.bacSiChiDinhId;
  }, [phieuXuat]);

  useEffect(() => {
    if (isVangLai) {
      //mặc định check
      setState({ isBsChiDinhNgoaiVien: true });
    }
  }, [isVangLai]);
  const onChange = (key, needEnter) => (e, item) => {
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
      const { qrBN = "" } = state;
      let isNumber = /^[0-9]+$/.test(qrBN);
      let str = qrBN.trim() || qrBN || "";
      let param = { maHoSo: isNumber ? qrBN : "" };
      let arr = (str && str.split(",")) || [];
      let children = [];
      children = arr.filter((el) => {
        let convertEl = el.includes("”") ? el.split("”") : el.split('"');
        return convertEl.some((et) => et === "maHoSo");
      });
      children = (children.length && children[0]) || "";
      let res = children
        ? children.includes("”")
          ? children.split("”")
          : children.split('"')
        : [];
      res = res.filter((et) => /^[0-9]+$/.test(et));
      if (res[0]?.length >= 10) {
        param = { maHoSo: Number(res[0]) };
      }
      if (param?.maHoSo) {
        // Search info nb
        param.khoId = infoPatient.khoId;
        param.loaiNhapXuat = 120;
        let payload = {
          khoId: param.khoId,
          nbDotDieuTri: { maHoSo: param.maHoSo },
        };
        thuocProvider
          .post(payload)
          .then((s) => {
            if (!s.data) {
              message.error(`Không tồn tại người bệnh!`);
            } else {
              history.push(`/nha-thuoc/chi-tiet/${s.data.phieuXuatId}`);
            }
          })
          .catch((e) => {});
      }
    }
  };
  const handleChange = (key) => (value) => {
    if (key === "dsBacSiNgoaiVienId") {
      infoPatient.phieuXuat.dsBacSiNgoaiVienId = value;
    } else {
      infoPatient.phieuXuat.bacSiChiDinhId = value;
    }
    updateData({
      infoPatient: { ...infoPatient },
    });
  };
  const renderBsChiDinh = () => {
    let trangThai = infoPatient?.phieuXuat?.trangThai;
    if (isVangLai) {
      if (state.isBsChiDinhNgoaiVien) {
        return (
          <Col span={18}>
            <Row>
              <div className="title last" style={{ marginRight: 5 }}>
                {t("nhaThuoc.bsChiDinhNgoaiVien")}:{" "}
              </div>
              <div className="detail last" style={{ flex: 2, marginRight: 5 }}>
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder={t("nhaThuoc.vuiLongNhapBsChiDinh")}
                  onChange={handleChange("dsBacSiNgoaiVienId")}
                  value={infoPatient?.phieuXuat?.dsBacSiNgoaiVienId}
                  disabled={trangThai === 30}
                  data={listAllBacSiNgoaiVien}
                />
              </div>
            </Row>
          </Col>
        );
      }
    } else {
      return (
        <Col span={18}>
          <Row>
            <div className="title last" style={{ marginRight: 5 }}>
              {t("nhaThuoc.bsChiDinh")}:{" "}
            </div>
            <div className="detail last" style={{ flex: 2, marginRight: 5 }}>
              <Select
                style={{ width: "100%" }}
                placeholder={t("nhaThuoc.vuiLongNhapBsChiDinh")}
                onChange={handleChange("bacSiChiDinhId")}
                value={infoPatient?.phieuXuat?.bacSiChiDinhId}
                disabled={trangThai === 30}
                data={listBacSi}
              />
            </div>
          </Row>
        </Col>
      );
    }
    return <div></div>;
  };
  return (
    <Card>
      <Main className="info">
        <div className="body-info">
          <Row className="info-full">
            <div style={{ display: "table" }}>
              <div className="title">{t("nhaThuoc.thongTinKhachHang")}: </div>
            </div>
            <div className="paddingLeft" style={{ marginLeft: 10 }}>
              <InputSearch>
                <img
                  src={IconSearch}
                  alt="IconSearch"
                  className="icon-search"
                />
                <Input
                  ref={refThongTin}
                  placeholder={t(
                    "nhaThuoc.quetQrNguoiBenhHoacNhapMaHoSoDeTimDonMoi"
                  )}
                  autoFocus
                  onChange={onChange("qrBN", true)}
                  onKeyDown={onKeyDown}
                />
                {/* <img src={IconQR} alt="IconQrCode" className="qr-search" /> */}
              </InputSearch>
            </div>
            <Col sm={18} md={18} xl={18} xxl={18} className="info">
              <Row className="">
                <div className="title" style={{ marginRight: 90 }}>
                  {t("common.hoVaTen")}:
                </div>
                <div className="detail">
                  <b>
                    {infoPatient?.nbDotDieuTri?.tenNb}
                    {` (${
                      infoPatient?.nbDotDieuTri?.ngaySinh
                        ? `${moment(infoPatient?.nbDotDieuTri?.ngaySinh).format(
                            "DD/MM/YYYY"
                          )} - `
                        : ""
                    } ${
                      infoPatient?.nbDotDieuTri?.ngaySinh
                        ? infoPatient?.nbDotDieuTri?.thangTuoi > 36 ||
                          infoPatient?.nbDotDieuTri?.tuoi
                          ? `${infoPatient?.nbDotDieuTri?.tuoi} ${t(
                              "common.tuoi"
                            )} - `
                          : `${infoPatient?.nbDotDieuTri?.thangTuoi} ${t(
                              "common.thang"
                            )} - `
                        : ""
                    }
                    ${
                      infoPatient?.nbDotDieuTri?.gioiTinh
                        ? GIOI_TINH_BY_VALUE[
                            infoPatient?.nbDotDieuTri?.gioiTinh
                          ]
                        : ""
                    })`}
                  </b>
                </div>
              </Row>
            </Col>
            <Col sm={6} md={6} xl={6} xxl={6} className="info">
              <Row className="">
                <div className="title" style={{ marginRight: 35 }}>
                  {t("common.sdt")} :{" "}
                </div>
                <div className="detail">
                  {infoPatient?.nbDotDieuTri?.soDienThoai}
                </div>
              </Row>
            </Col>
            <Col sm={18} md={18} xl={18} xxl={18} className="info">
              <Row className="">
                <div className="title last" style={{ marginRight: 102 }}>
                  {t("common.diaChi")} :{" "}
                </div>
                <div className="detail last">
                  {infoPatient?.nbDotDieuTri?.nbDiaChi?.diaChi}
                </div>
              </Row>
            </Col>
            <Col sm={6} md={6} xl={6} xxl={6} className="info">
              <Row className="">
                <div className="title last" style={{ marginRight: 20 }}>
                  {t("common.maNb")}:{" "}
                </div>
                <div className="detail last">
                  {infoPatient?.nbDotDieuTri?.maNb}
                </div>
              </Row>
            </Col>
            <Col sm={18} md={18} xl={18} xxl={18} className="info">
              <Row className="">
                <div className="title last" style={{ marginRight: 8 }}>
                  {t("nhaThuoc.nguoiBaoLanhSdt")}:{" "}
                </div>
                <div className="detail last">
                  {`${
                    infoPatient?.nbDotDieuTri?.nbNguoiBaoLanh?.hoTen
                      ? infoPatient?.nbDotDieuTri?.nbNguoiBaoLanh?.hoTen
                      : ""
                  }${
                    infoPatient?.nbDotDieuTri?.nbNguoiBaoLanh?.soDienThoai
                      ? ` - ${infoPatient?.nbDotDieuTri?.nbNguoiBaoLanh?.soDienThoai}`
                      : ""
                  }`}
                </div>
              </Row>
            </Col>
            <Col sm={6} md={6} xl={6} xxl={6} className="info">
              <Row className="">
                {isVangLai ? (
                  <div>
                    <Checkbox
                      checked={true}
                      // onChange={(e) => {
                      //   setState({ ...state, detachLine: e.target.checked });
                      // }}
                    >
                      {t("nhaThuoc.khachVangLai")}
                    </Checkbox>
                  </div>
                ) : (
                  <>
                    <div className="title last" style={{ marginRight: 20 }}>
                      {t("common.maHs")} :{" "}
                    </div>
                    <div className="detail last">
                      {infoPatient?.nbDotDieuTri?.maHoSo}
                    </div>
                  </>
                )}
              </Row>
            </Col>
            {renderBsChiDinh()}
            {isVangLai && (
              <Col span={6} className="info">
                <Row className="">
                  <div>
                    <Checkbox
                      checked={state.isBsChiDinhNgoaiVien}
                      onChange={(e) => {
                        setState({
                          isBsChiDinhNgoaiVien: !state.isBsChiDinhNgoaiVien,
                        });
                      }}
                    >
                      {t("nhaThuoc.donBsNgoaiVienChiDinh")}
                    </Checkbox>
                  </div>
                </Row>
              </Col>
            )}
          </Row>
        </div>
      </Main>
    </Card>
  );
};

export default memo(ThongTinNguoiBenh);
