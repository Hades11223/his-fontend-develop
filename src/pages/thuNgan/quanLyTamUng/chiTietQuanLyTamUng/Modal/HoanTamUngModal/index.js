import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import ModalCheckout from "components/ModalCheckout";
import { Main } from "./styled";
import { Col, Row, Input } from "antd";
import NumberFormat from "react-number-format";
import Select from "components/Select";
import { useTranslation } from "react-i18next";
import { useQueryString, useStore, useThietLap } from "hook";
import { THIET_LAP_CHUNG } from "constants/index";
const HoanTamUngModal = (props, ref) => {
  const { t } = useTranslation();
  const { _listDataTongHop } = useStore("lyDoTamUng", []);
  const thongTinBenhNhan = useStore("nbDotDieuTri.thongTinBenhNhan");
  const refModal = useRef(null);
  const refCallBack = useRef(null);
  const [nhaTamUngId] = useQueryString("nhaTamUngId", 0);
  const { post } = props;
  const [state, _setState] = useState({
    isModalVisible: false,
    discount: 1,
  });
  const [dataLY_DO_HOAN_UNG] = useThietLap(THIET_LAP_CHUNG.LY_DO_HOAN_UNG);

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const submitHandler = () => {
    const { lyDoTamUngId, ghiChu } = state || {};
    post({
      tongTien: state?.tongTien,
      phuongThucTtId: 1,
      lyDoTamUngId,
      ghiChu,
      nbDotDieuTriId: thongTinBenhNhan?.id,
      id: state?.id,
      nhaTamUngId: nhaTamUngId,
    }).then((s) => refCallBack.current(s?.data.id));
  };
  const onChange = (key) => (e) => {
    let obj = {
      [key]: e?.target?.value || e?.floatValue || e,
    };
    setState(obj);
  };

  useImperativeHandle(ref, () => ({
    show: (data = {}, callback) => {
      setState({
        tongTien: data?.tongTien,
        ghiChu: data?.ghiChu,
        lyDoTamUngId: (_listDataTongHop || []).find(
          (item) => item.ma === dataLY_DO_HOAN_UNG
        )?.id,
        id: data?.id,
      });
      refModal.current && refModal.current.show();
      refCallBack.current = callback;
    },
  }));

  const handleClickBack = () => {
    setTimeout(() => refModal.current.close(), 50);
  };
  const handleClickNext = () => {
    submitHandler();
    setTimeout(() => refModal.current.close(), 50);
  };
  return (
    <ModalCheckout
      width={752}
      ref={refModal}
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
      titleHeader={t("thuNgan.quanLyTamUng.phieuHoanTamUng")}
      titleBtnBack={t("common.quayLaiEsc")}
      titleBtnNext={
        <span className="btn-checkout">
          <span className="btn-checkout__text">
            {t("thuNgan.quanLyTamUng.xacNhan")}
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
              <span>{t("thuNgan.quanLyTamUng.soTienHoanUng")}</span>
            </Col>
            <Col span={18}>
              <NumberFormat
                customInput={Input}
                thousandSeparator="."
                decimalSeparator=","
                style={{
                  textAlign: "right",
                }}
                disabled={true}
                value={state?.tongTien}
              />
            </Col>
          </Col>

          <Col span={24} style={{ marginTop: 38 }}>
            <Col span={6}>{t("thuNgan.quanLyTamUng.lyDoHoan")}</Col>
            <Col span={18}>
              <Select
                data={_listDataTongHop}
                value={state.lyDoTamUngId}
                onChange={onChange("lyDoTamUngId")}
                className="input-option"
                placeholder={t("thuNgan.quanLyTamUng.nhapLyDoHoan")}
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
      </Main>
    </ModalCheckout>
  );
};

export default forwardRef(HoanTamUngModal);
