import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ModalCheckout from "components/ModalCheckout";
import { Main } from "./styled";
import { Col, Row, Input } from "antd";
import NumberFormat from "react-number-format";
import Select from "components/Select";
import { useTranslation } from "react-i18next";
const XemPhieuThuModal = (props) => {
  const { t } = useTranslation();
  const { _listDataTongHop } = useSelector((state) => state.lyDoTamUng);
  const { thongTinBenhNhan } = useSelector((state) => state.nbDotDieuTri);
  const { listAllPhuongThucThanhToan } = useSelector(
    (state) => state.phuongThucTT
  );
  const {
    lyDoTamUng: { _getList },
  } = useDispatch();
  const { modalXemPhieuThuRef, tab, data = null } = props;
  const [state, _setState] = useState({
    isModalVisible: false,
    discount: 1,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const onChange = (key) => (e) => {
    let obj = {
      [key]: e?.target?.value || e?.floatValue || e,
    };
    setState(obj);
  };
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
  useEffect(() => {
    _getList({ page: 0, size: null });
  }, []);
  const handleClickBack = () => {
    setTimeout(() => modalXemPhieuThuRef.current.close(), 50);
  };
  const handleClickNext = () => {
    setTimeout(() => modalXemPhieuThuRef.current.close(), 50);
  };
  useEffect(() => {
    if (data) {
      setState({
        tongTien: data?.tongTien,
        phuongThucTtId: data?.phuongThucTtId,
        maChuanChi: data?.maChuanChi,
        lyDoTamUngId: data?.lyDoTamUngId,
        ghiChu: data?.ghiChu,
      });
    }
  }, [data]);
  return (
    <ModalCheckout
      width={752}
      ref={modalXemPhieuThuRef}
      subTitleHeader={
        <span>
          {thongTinBenhNhan?.tenNb && thongTinBenhNhan?.tenNb}
          {thongTinBenhNhan?.tuoi
            ? ` - ${thongTinBenhNhan?.tuoi} tuổi`
            : thongTinBenhNhan?.thangTuoi
            ? ` - ${thongTinBenhNhan?.thangTuoi} tháng`
            : ""}
        </span>
      }
      titleHeader={
        tab === "thuTamUng"
          ? t("thuNgan.quanLyTamUng.phieuThuTamUng")
          : t("thuNgan.quanLyTamUng.phieuDeNghiTamUng")
      }
      titleBtnBack={
        tab === "thuTamUng" ? t("common.quayLaiEsc") : t("common.huy")
      }
      titleBtnNext={
        <span className="btn-checkout">
          <span className="btn-checkout__text">
            {tab === "thuTamUng"
              ? t("thuNgan.quanLyTamUng.xacNhan")
              : t("common.luu")}
          </span>
        </span>
      }
      onClickBack={handleClickBack}
      onClickNext={handleClickNext}
    >
      <Main>
        <Row>
          <Col span={24}>
            <Col span={6}>
              <span>
                {tab === "thuTamUng"
                  ? t("thuNgan.quanLyTamUng.soTienTamUng")
                  : t("thuNgan.quanLyTamUng.soTienDeNghi")}
              </span>
            </Col>
            <Col span={18}>
              <NumberFormat
                customInput={Input}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                onKeyDown={blockInvalidChar}
                onValueChange={onChange("tongTien")}
                min={0}
                value={state.tongTien}
                style={{
                  textAlign: "right",
                }}
                // defaultValue={nbTamUng?.phieuThu?.tienMienGiam}
                disabled={true}
              />
            </Col>
          </Col>
          {tab === "thuTamUng" && (
            <Col span={14} style={{ marginTop: 38 }}>
              <Col span={10}> {t("thuNgan.quanLyTamUng.hinhThucTT")}</Col>
              <Col span={13}>
                <Select
                  data={listAllPhuongThucThanhToan}
                  value={state.phuongThucTtId}
                  onChange={onChange("phuongThucTtId")}
                  className="input-option"
                  disabled={true}
                />
              </Col>
            </Col>
          )}
          {state?.phuongThucTtId === 102 && tab === "thuTamUng" && (
            <Col span={10} style={{ marginTop: 38 }}>
              <Col span={10}> {t("thuNgan.quanLyTamUng.maChuanChi")}</Col>
              <Col span={14}>
                <Input
                  value={state.maChuanChi}
                  onChange={onChange("maChuanChi")}
                  style={{
                    textAlign: "left",
                  }}
                  className="input-option"
                  disabled={true}
                />
              </Col>
            </Col>
          )}
          <Col span={24} style={{ marginTop: 38 }}>
            <Col span={6}>
              {" "}
              {tab === "thuTamUng"
                ? t("thuNgan.quanLyTamUng.lyDoTamUng")
                : t("thuNgan.quanLyTamUng.lyDoDeNghi")}
            </Col>
            <Col span={18}>
              <Select
                data={_listDataTongHop}
                value={state.lyDoTamUngId}
                onChange={onChange("lyDoTamUngId")}
                className="input-option"
                defaultValue={
                  (_listDataTongHop || []).find((item) => item.ma === "TUVP")
                    ?.id
                }
                disabled={true}
              />
            </Col>
          </Col>
          <Col span={24} style={{ marginTop: 38 }}>
            <Col span={6}> {t("thuNgan.quanLyTamUng.ghiChu")}</Col>
            <Col span={18}>
              <Input
                value={state.nhapGhiChu}
                onChange={onChange("ghiChu")}
                className="input-option"
                disabled={true}
              />
            </Col>
          </Col>
        </Row>
      </Main>
    </ModalCheckout>
  );
};

export default XemPhieuThuModal;
