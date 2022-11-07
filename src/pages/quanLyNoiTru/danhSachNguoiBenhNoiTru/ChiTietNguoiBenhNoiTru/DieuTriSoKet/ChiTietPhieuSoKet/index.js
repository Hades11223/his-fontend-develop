import React, { memo, useEffect, useMemo, useState } from "react";
import { Row, Col } from "antd";
import { Main } from "./styled";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import TextField from "components/TextField";
import ThongTinBenhNhan from "../../ThongTinBenhNhan";
import { Button, DatePicker, HomeWrapper } from "components";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import printProvider from "data-access/print-provider";
import { FORMAT_DATE, ROLES, TRANG_THAI_NB } from "constants/index";
import cacheUtils from "utils/cache-utils";
import { checkRole } from "utils/role-utils";

const ChiTietPhieuSoKet = (props) => {
  const { infoPatient } = useSelector((state) => state.danhSachNguoiBenhNoiTru);
  const { nbPhieuSoKet } = useSelector((state) => state.nbDieuTriSoKet);
  const { getNbNoiTruById } = useDispatch().danhSachNguoiBenhNoiTru;
  const { createOrEdit, getById, phieuSoKet } = useDispatch().nbDieuTriSoKet;
  const { updateData } = useDispatch().toDieuTri;
  const { t } = useTranslation();
  const { id } = useParams();
  const history = useHistory();
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const paramCheck = window.location.pathname.indexOf("chinh-sua") === -1;
  useEffect(() => {
    if (id) {
      getById(id);
    }
  }, [id]);

  useEffect(() => {
    if (nbPhieuSoKet) {
      getNbNoiTruById(nbPhieuSoKet?.nbDotDieuTriId);
      setState({
        dienBien: nbPhieuSoKet.dienBien,
        canLamSang: nbPhieuSoKet.canLamSang,
        quaTrinhDieuTri: nbPhieuSoKet.quaTrinhDieuTri,
        danhGiaKetQua: nbPhieuSoKet.danhGiaKetQua,
        huongDieuTri: nbPhieuSoKet.huongDieuTri,
        tuNgay: nbPhieuSoKet.tuNgay,
        denNgay: nbPhieuSoKet.denNgay,
      });
    }
  }, [nbPhieuSoKet]);

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

  const onChange = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else if (e?._d) value = e.format("YYYY-MM-DD");
    else value = e;
    setState({ [key]: value });
  };

  const onCreateOrEdit = () => {
    const {
      dienBien,
      canLamSang,
      quaTrinhDieuTri,
      danhGiaKetQua,
      huongDieuTri,
      tuNgay,
      denNgay,
    } = state;
    createOrEdit({
      dienBien,
      canLamSang,
      quaTrinhDieuTri,
      danhGiaKetQua,
      huongDieuTri,
      nbDotDieuTriId: nbPhieuSoKet?.nbDotDieuTriId,
      tuNgay: tuNgay && moment(tuNgay).format("YYYY-MM-DD"),
      denNgay: denNgay && moment(denNgay).format("YYYY-MM-DD"),
      id: id,
    });
  };
  const onBack = () => {
    setState({
      dienBien: nbPhieuSoKet.dienBien,
      canLamSang: nbPhieuSoKet.canLamSang,
      quaTrinhDieuTri: nbPhieuSoKet.quaTrinhDieuTri,
      danhGiaKetQua: nbPhieuSoKet.danhGiaKetQua,
      huongDieuTri: nbPhieuSoKet.huongDieuTri,
      tuNgay: nbPhieuSoKet.tuNgay,
      denNgay: nbPhieuSoKet.denNgay,
    });
    updateData({ activeKey: "4" });
    history.push(
      `/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru/${infoPatient?.id}`
    );
  };
  const onInPhieu = () => {
    phieuSoKet(id).then((s) => {
      printProvider.printMergePdf([s.file.pdf]);
    });
  };

  return (
    <Main>
      <HomeWrapper
        title={t("quanLyNoiTru.chiTietNguoiBenhNoiTru")}
        listLink={[
          { link: "/quan-ly-noi-tru", title: t("quanLyNoiTru.quanLyNoiTru") },
          {
            link: "/quan-ly-noi-tru/danh-sach-nguoi-benh-noi-tru",
            title: t("quanLyNoiTru.danhSachNguoiBenhNoiTru"),
          },
        ]}
      >
        <fieldset disabled={isReadonly} style={{ width: "100%" }}>
          <Row>
            <h1>{t("quanLyNoiTru.dieuTriNoiTru")}</h1>
            <span style={{ flex: 1, textAlign: "right" }}>
              <img src={require("assets/images/utils/location.png")} alt="" />
              {infoPatient?.maKhoaNb && infoPatient?.tenKhoaNb && (
                <b>
                  {infoPatient?.maKhoaNb} - {infoPatient?.tenKhoaNb}
                </b>
              )}
            </span>
          </Row>
          <Row>
            <Col className="header-left" span={24}>
              <ThongTinBenhNhan></ThongTinBenhNhan>
            </Col>
          </Row>

          <Row className="content">
            <div className="title">
              <div className="left">
                <h1>{t("quanLyNoiTru.phieuSoKetDieuTri15Ngay")}</h1>
                <div className="date">
                  <label className="title">{t("common.tuNgay")}:</label>
                  <DatePicker
                    onChange={onChange("tuNgay")}
                    value={state?.tuNgay && moment(state?.tuNgay)}
                    disabled={paramCheck || isReadonly}
                    format={FORMAT_DATE}
                  ></DatePicker>
                </div>
                <div className="date">
                  <label className="title">{t("common.denNgay")}:</label>
                  <DatePicker
                    onChange={onChange("denNgay")}
                    value={state?.denNgay && moment(state?.denNgay)}
                    disabled={paramCheck || isReadonly}
                    format={FORMAT_DATE}
                  ></DatePicker>
                </div>
              </div>
              <div className="right">
                <img
                  style={{ width: 15, height: 15, cursor: "pointer" }}
                  src={require("assets/images/utils/x-gray.png")}
                  alt=""
                  onClick={() => {
                    onBack();
                  }}
                />
              </div>
            </div>
            <div className="info">
              <Col>
                <TextField
                  label={t("quanLyNoiTru.dienBienLamSangTrongDotDieuTri")}
                  className="input_custom"
                  marginTop={5}
                  onChange={onChange("dienBien")}
                  html={state?.dienBien}
                  maxLine={1}
                  readOnly={paramCheck}
                />
              </Col>

              <Col>
                <TextField
                  label={t("quanLyNoiTru.xetNghiemCanLamSang")}
                  className="input_custom"
                  marginTop={5}
                  onChange={onChange("canLamSang")}
                  html={state?.canLamSang}
                  maxLine={1}
                  readOnly={paramCheck}
                />
              </Col>
              <Col>
                <TextField
                  label={t("quanLyNoiTru.quaTrinhDieuTri")}
                  className="input_custom"
                  marginTop={5}
                  onChange={onChange("quaTrinhDieuTri")}
                  html={state?.quaTrinhDieuTri}
                  maxLine={1}
                  readOnly={paramCheck}
                />
              </Col>
              <Col>
                <TextField
                  label={t("quanLyNoiTru.danhGiaKetQua")}
                  className="input_custom"
                  marginTop={5}
                  onChange={onChange("danhGiaKetQua")}
                  html={state?.danhGiaKetQua}
                  maxLine={1}
                  readOnly={paramCheck}
                />
              </Col>
              <Col>
                <TextField
                  label={t("quanLyNoiTru.huongDieuTriVaTienLuong")}
                  className="input_custom"
                  marginTop={5}
                  onChange={onChange("huongDieuTri")}
                  html={state?.huongDieuTri}
                  maxLine={1}
                  readOnly={paramCheck}
                />
              </Col>
            </div>
          </Row>
        </fieldset>
      </HomeWrapper>
      <Row className="footer">
        <Button
          minWidth={100}
          onClick={() => {
            onInPhieu();
          }}
        >
          {t("common.inPhieu")}
        </Button>
        <Button
          minWidth={100}
          onClick={() => {
            onBack();
          }}
        >
          {t("common.quayLaiEsc")}
        </Button>
        {!paramCheck && !isReadonly && (
          <Button
            type="primary"
            minWidth={100}
            onClick={() => onCreateOrEdit()}
          >
            {t("common.luu")} [F4]
          </Button>
        )}
      </Row>
    </Main>
  );
};
export default memo(ChiTietPhieuSoKet);
