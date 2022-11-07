import React, { useEffect, useState } from "react";
import { Page } from "components";
import Button from "pages/kho/components/Button";
import { Main, WrapButtonRight } from "./styled";
import { Col, Row } from "antd";
import { connect } from "react-redux";
import { InputNumberFormat } from "components/common";
import { useTranslation } from "react-i18next";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";

const ThietLapTichDiem = ({
  //state
  dataEditDefault,
  //dispacth
  getTichDiem,
  tichDiem,
  updateData,
  ...props
}) => {
  const { t } = useTranslation();
  const [state, _setState] = useState({ disableSave: true });
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }))
  };
  const onChange = (type) => (e) => {
    const newState = { ...state, [type]: e?.floatValue};

    setState({
      [type]: e?.floatValue,
      disableSave: Object.keys(dataEditDefault).reduce(
        (a, b) => a && newState[b] === dataEditDefault[b],
        true
      ),
    })
  }
  const onSave = () => {
    const payload = {
      ...state,
    };
    tichDiem(payload);
  }
  const onCancel = () => {
    setState({ ...dataEditDefault, disableSave: true });
    updateData({ dataEditDefault: {} });
  }

  useEffect(() => {
    if (dataEditDefault) {
      setState({
        chiPhiKcb: dataEditDefault?.chiPhiKcb,
        diemKcb: dataEditDefault?.diemKcb,
        diemLanGioiThieu: dataEditDefault?.diemLanGioiThieu,
        diemLanKham: dataEditDefault?.diemLanKham,
        diemQuyDoi: dataEditDefault?.diemQuyDoi,
        soLanGioiThieu: dataEditDefault?.soLanGioiThieu,
        soLanKham: dataEditDefault?.soLanKham,
        tienTuongDuong: dataEditDefault?.tienTuongDuong,
      });
    }
  }, [dataEditDefault]);

  useEffect(() => {
    getTichDiem();
  }, []);

  return (
  <Page
    breadcrumb={[
      { title: t("thietLap.thietLap"), link: "/thiet-lap" },
      {
        title: t("thietLap.thietLapTichDiem"),
        link: "/thiet-lap/tich-diem",
      },
    ]}
    title={t("thietLap.thietLapTichDiem")}
    titleRight={ 
      <WrapButtonRight>
        <Button 
          className="button-ok"
          onClick={onSave}
          type="primary"
          rightIcon={<SaveOutlined />}
          iconHeight={18}
          minWidth={100}
          disabled={state.disableSave}>
            <span className="label-btn">{t("common.luu")}</span>
        </Button>
        <Button
          className="button-cancel"
          rightIcon={<CloseOutlined />}
          iconHeight={15}
          minWidth={100}
          onClick={onCancel}>
            <span className="label-btn">{t("common.huy")}</span>
        </Button>
      </WrapButtonRight>}
  >
    <Main noPadding={true}>
      <Row>
        <Col className="body">
          <div className="main">
            <div className="text text-bold">
              {t("thietLap.quyTacDoiDiem")}
            </div>
            <div className="ml-3 line">
              <span className="text">
                {t("thietLap.chiPhiKhamChuaBenh")}
              </span>
              <div className="item-input-numer mr-1">
                <InputNumberFormat
                  min={0}
                  onValueChange={onChange("chiPhiKcb")}
                  value={state.chiPhiKcb}
                />
              </div>
              <span className="text mw-50">{t("common.vnd")}</span>
              <span className="text mw-50">=</span>
              <div className="item-input-numer mr-1">
                <InputNumberFormat
                  min={0}
                  onValueChange={onChange("diemKcb")}
                  value={state.diemKcb}
                />
              </div>
              <div className="text mw-50">{t("common.diem")}</div>
            </div>
            <div className="ml-3 line">
              <span className="text">
              {t("thietLap.soLanKham")}
              </span>
              <div className="item-input-numer mr-1">
                <InputNumberFormat
                  min={0}
                  onValueChange={onChange("soLanKham")}
                  value={state.soLanKham}
                />
              </div>
              <span className="text mw-50">{t("common.lan")}</span>
              <span className="text mw-50">=</span>
              <div className="item-input-numer mr-1">
                <InputNumberFormat
                  min={0}
                  onValueChange={onChange("diemLanKham")}
                  value={state.diemLanKham}
                />
              </div>
              <div className="text mw-50">{t("common.diem")}</div>
            </div>
            <div className="ml-3 line">
              <span className="text">
                {t("thietLap.soLuotGioiThieu")}
              </span>
              <div className="item-input-numer mr-1">
                <InputNumberFormat
                  min={0}
                  onValueChange={onChange("soLanGioiThieu")}
                  value={state.soLanGioiThieu}
                />
              </div>
              <span className="text mw-50">{t("common.luot")}</span>
              <span className="text mw-50">=</span>
              <div className="item-input-numer mr-1">
                <InputNumberFormat
                  min={0}
                  onValueChange={onChange("diemLanGioiThieu")}
                  value={state.diemLanGioiThieu}
                />
              </div>
              <div className="text mw-50">{t("common.diem")}</div>
            </div>
            <div className="text text-bold mr-3">
              {t("thietLap.thanhToanBangDiem")}
            </div>
            <div className="ml-3 line">
              <div className="text">
                {t("thietLap.soDiem")}
              </div>
              <div className="item-input-numer mr-1">
                <InputNumberFormat
                  min={0}
                  onValueChange={onChange("diemQuyDoi")}
                  value={state.diemQuyDoi}
                />
              </div>
              <span className="text mw-50">{t("common.diem")}</span>
              <span className="text mw-50">=</span>
              <div className="item-input-numer mr-1">
                <InputNumberFormat
                  min={0}
                  onValueChange={onChange("tienTuongDuong")}
                  value={state.tienTuongDuong}
                />
              </div>
              <span className="text mw-50">{t("common.vnd")}</span>
            </div>
          </div>
        </Col>
      </Row>
    </Main>
  </Page>
  );
};

export default connect(
  (state) => ({
    dataEditDefault: state.thietLapTichDiem.dataEditDefault,
  }),
  ({
    thietLapTichDiem: {
      post: tichDiem,
      get: getTichDiem,
      updateData,
    }
  }) => ({
    tichDiem,
    getTichDiem,
    updateData,
  })
)(ThietLapTichDiem);