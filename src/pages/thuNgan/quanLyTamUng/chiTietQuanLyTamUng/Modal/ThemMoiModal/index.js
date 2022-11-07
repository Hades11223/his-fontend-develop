import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Main } from "./styled";
import { Col, Row, Input } from "antd";
import Select from "components/Select";
import { useTranslation } from "react-i18next";
import { useQueryString, useThietLap } from "hook";
import { isObject } from "lodash";
import { InputNumberFormat } from "components/common";
import IconSuccess from "assets/images/welcome/success.png";
import { Button, ModalTemplate } from "components";
import { THIET_LAP_CHUNG } from "constants/index";

const ThemMoiModal = (props, ref) => {
  const { t } = useTranslation();
  const { _listDataTongHop } = useSelector((state) => state.lyDoTamUng);

  const { thongTinBenhNhan } = useSelector((state) => state.nbDotDieuTri);
  const { listAllPhuongThucThanhToan } = useSelector(
    (state) => state.phuongThucTT
  );
  const { tongTienDieuTri } = useDispatch().nbDotDieuTri;
  const [dataLY_DO_TAM_UNG] = useThietLap(THIET_LAP_CHUNG.LY_DO_TAM_UNG);
  const [HINH_THUC_THANH_TOAN] = useThietLap(
    THIET_LAP_CHUNG.HINH_THUC_THANH_TOAN
  );
  const refModal = useRef(null);
  const refCallBack = useRef(null);
  const [nhaTamUngId] = useQueryString("nhaTamUngId", 0);
  const { tab, post } = props;
  const [state, _setState] = useState({
    isModalVisible: false,
    discount: 1,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const submitHandler = () => {
    const { tongTien, phuongThucTtId, maChuanChi, lyDoTamUngId, ghiChu } =
      state || {};
    post({
      tongTien,
      phuongThucTtId,
      maChuanChi,
      lyDoTamUngId,
      ghiChu,
      nbDotDieuTriId: thongTinBenhNhan?.id,
      id: state?.id,
      nhaTamUngId: tab === "thuTamUng" ? nhaTamUngId : "",
    }).then((s) => {
      refCallBack.current(s?.data.id);
      tongTienDieuTri({ id: thongTinBenhNhan?.id });
    });
  };
  const onChange = (key) => (e) => {
    let value = "";
    if (e?.target) {
      value = e?.target?.value || e?.floatValue;
    } else if (isObject(e)) {
      value = e?.floatValue || "";
    } else {
      value = e;
    }
    setState({ [key]: value });
  };

  useImperativeHandle(ref, () => ({
    show: (data = {}, callback) => {
      setState({
        tongTien: data?.tongTien,
        phuongThucTtId:
          data?.phuongThucTtId ||
          (listAllPhuongThucThanhToan || []).find(
            (item) => item.ma === HINH_THUC_THANH_TOAN
          )?.id,
        maChuanChi: data?.maChuanChi,
        ghiChu: data?.ghiChu,
        lyDoTamUngId:
          data?.lyDoTamUngId ||
          (_listDataTongHop || []).find((item) => item.ma === dataLY_DO_TAM_UNG)
            ?.id,
        id: data?.id,
      });
      refModal.current && refModal.current.show();
      refCallBack.current = callback;
    },
  }));
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  const handleClickBack = () => {
    setState({
      tongTien: 0,
      phuongThucTtId: null,
      maChuanChi: null,
      ghiChu: null,
      lyDoTamUngId: null,
    });
    refModal.current && refModal.current.hide();
  };
  const handleClickNext = () => {
    submitHandler();
    handleClickBack();
  };

  return (
    <ModalTemplate
      width={752}
      ref={refModal}
      closable={false}
      onCancel={handleClickBack}
      title={
        tab === "thuTamUng"
          ? t("thuNgan.quanLyTamUng.phieuThuTamUng")
          : t("thuNgan.quanLyTamUng.phieuDeNghiTamUng")
      }
      rightTitle={
        <span>
          {thongTinBenhNhan?.tenNb && thongTinBenhNhan?.tenNb}
          {thongTinBenhNhan?.tuoi
            ? ` - ${thongTinBenhNhan?.tuoi} tuổi`
            : thongTinBenhNhan?.thangTuoi
            ? ` - ${thongTinBenhNhan?.thangTuoi} tháng`
            : ""}
        </span>
      }
    >
      <Main>
        <Row>
          <Col span={24}>
            <Col span={6}>
              <span>
                {tab === "thuTamUng"
                  ? t("thuNgan.quanLyTamUng.soTienTamUng")
                  : t("thuNgan.quanLyTamUng.soTienDeNghi")}{" "}
                <b style={{ color: "red" }}>*</b>
              </span>
            </Col>
            <Col span={18}>
              <InputNumberFormat
                onKeyDown={blockInvalidChar}
                onValueChange={onChange("tongTien")}
                min={0}
                value={state.tongTien}
                style={{
                  textAlign: "right",
                  fontWeight: "bold",
                }}
                // defaultValue={infoPatient?.phieuThu?.tienMienGiam}
                placeholder={t("thuNgan.nhapSoTien")}
                decimalScale={0}
              />
            </Col>
          </Col>
          {tab === "thuTamUng" && (
            <Col span={14} style={{ marginTop: 38 }}>
              <Col span={10}>
                {" "}
                <span>
                  {" "}
                  {t("thuNgan.quanLyTamUng.hinhThucTT")}{" "}
                  <b style={{ color: "red" }}>*</b>
                </span>
              </Col>
              <Col span={13}>
                <Select
                  data={listAllPhuongThucThanhToan}
                  value={state.phuongThucTtId}
                  onChange={onChange("phuongThucTtId")}
                  className="input-option"
                  placeholder={t("thuNgan.nhapPhuongThucThanhToan")}
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
                  placeholder={t("thuNgan.nhapMaChuanChi")}
                />
              </Col>
            </Col>
          )}
          <Col span={24} style={{ marginTop: 38 }}>
            <Col span={6}>
              <span>
                {tab === "thuTamUng"
                  ? t("thuNgan.quanLyTamUng.lyDoTamUng")
                  : t("thuNgan.quanLyTamUng.lyDoDeNghi")}
                {""}
                <b style={{ color: "red" }}> *</b>
              </span>
            </Col>
            <Col span={18}>
              <Select
                data={_listDataTongHop}
                value={state.lyDoTamUngId}
                onChange={onChange("lyDoTamUngId")}
                className="input-option"
                placeholder={
                  tab === "thuTamUng"
                    ? t("thuNgan.nhapLyDoTamUng")
                    : t("thuNgan.nhapLyDoDeNghi")
                }
                disabled={true}
              />
            </Col>
          </Col>
          <Col span={24} style={{ marginTop: 38 }}>
            <Col span={6}> {t("thuNgan.quanLyTamUng.ghiChu")}</Col>
            <Col span={18}>
              <Input
                value={state.ghiChu}
                onChange={onChange("ghiChu")}
                className="input-option"
                placeholder={t("common.nhapGhiChu")}
              />
            </Col>
          </Col>
        </Row>
        <div className="footer-btn">
          <Button minWidth={100} type="default" onClick={handleClickBack}>
            {t("common.quayLaiEsc")}
          </Button>
          <Button
            minWidth={100}
            type="primary"
            onClick={handleClickNext}
            iconHeight={20}
            rightIcon={<img src={IconSuccess} alt={IconSuccess} />}
          >
            {t("thuNgan.quanLyTamUng.xacNhan")}
          </Button>
        </div>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ThemMoiModal);
