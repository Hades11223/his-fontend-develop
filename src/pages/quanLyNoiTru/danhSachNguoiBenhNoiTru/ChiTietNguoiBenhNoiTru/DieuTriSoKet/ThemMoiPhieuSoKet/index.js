import React, { memo, useEffect, useState } from "react";
import { Row, Col } from "antd";
import { Main } from "./styled";
import { useSelector, useDispatch } from "react-redux";
import TextField from "components/TextField";
import ThongTinBenhNhan from "../../ThongTinBenhNhan";
import { Button, DatePicker, HomeWrapper } from "components";
import { useQueryString } from "hook";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import printProvider from "data-access/print-provider";
import moment from "moment";
import { FORMAT_DATE } from "constants/index";

const ThemMoiPhieuSoKet = (props) => {
  const { infoPatient } = useSelector((state) => state.danhSachNguoiBenhNoiTru);
  const { getNbNoiTruById } = useDispatch().danhSachNguoiBenhNoiTru;
  const { createOrEdit, phieuSoKet } = useDispatch().nbDieuTriSoKet;
  const { updateData } = useDispatch().toDieuTri;

  const { t } = useTranslation();
  const [nbDotDieuTriId] = useQueryString("nbDotDieuTriId", 0);
  const history = useHistory();
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    if (nbDotDieuTriId) getNbNoiTruById(nbDotDieuTriId);
  }, [nbDotDieuTriId]);

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
      nbDotDieuTriId: nbDotDieuTriId,
      tuNgay: tuNgay && moment(tuNgay).format("YYYY-MM-DD"),
      denNgay: denNgay && moment(denNgay).format("YYYY-MM-DD"),
    }).then((s) => {
      phieuSoKet(s?.id).then((s) => {
        printProvider.printMergePdf([s.file.pdf]);
      });
      history.push(
        `/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru/phieu-so-ket/chinh-sua/${s?.id}`
      );
    });
  };

  const onBack = () => {
    setState({
      dienBien: null,
      canLamSang: null,
      quaTrinhDieuTri: null,
      danhGiaKetQua: null,
      huongDieuTri: null,
      tuNgay: null,
      denNgay: null,
    });
    updateData({ activeKey: "4" });
    history.push(
      `/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru/${infoPatient?.id}`
    );
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
                <DatePicker onChange={onChange("tuNgay")} format={FORMAT_DATE}></DatePicker>
              </div>
              <div className="date">
                <label className="title">{t("common.denNgay")}:</label>
                <DatePicker onChange={onChange("denNgay")} format={FORMAT_DATE}></DatePicker>
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
              />
            </Col>
            <Col>
              <TextField
                label={t("quanLyNoiTru.danhGiaKetQua")}
                className="input_custom"
                marginTop={5}
                onChange={onChange("quaTrinhDieuTri")}
                html={state?.quaTrinhDieuTri}
                maxLine={1}
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
              />
            </Col>
          </div>
        </Row>
      </HomeWrapper>
      <Row className="footer">
        <Button
          minWidth={100}
          onClick={() => {
            onBack();
          }}
        >
          {t("common.quayLaiEsc")}
        </Button>
        <Button type="primary" minWidth={100} onClick={() => onCreateOrEdit()}>
          {t("common.luu")} [F4]
        </Button>
      </Row>
    </Main>
  );
};
export default memo(ThemMoiPhieuSoKet);
