import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Main } from "./styled";
import { useState } from "react";
import TextArea from "antd/lib/input/TextArea";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
const ModalDeleteHoaDon = (props, ref) => {
  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { t } = useTranslation();
  const refCallback = useRef(null);
  useImperativeHandle(ref, () => ({
    show: (data = {}, callback) => {
      setState({
        show: true,
        thongTinHoaDon: data,
      });
      refCallback.current = callback;
    },
  }));
  const handleOk = () => {
    refCallback.current(state.lyDo);
    setState({ show: false });
  };

  const handleChangeLiDo = (e) => {
    setState({
      lyDo: e.target.value,
    });
  };
  const handleCancel = () => {
    setState({
      show: false,
    });
  };
  return (
    <Main
      title={t("thuNgan.xacNhanXoaBoHoaDonDaPhatHanh")}
      visible={state.show}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      closable={false}
    >
      <div className="body">
        <div>
          <span className="f-w-600"> {t("thuNgan.nguoiBenh")} : </span>
          <span className="f-w-700">{state.thongTinHoaDon?.tenNb}</span>
        </div>
        <div className="pd-tb-10">
          <span>
            <span className="f-w-600">{t("thuNgan.tongTienHoaDon")}</span> :{" "}
            <span className="f-w-700">
              {state.thongTinHoaDon?.thanhTien?.formatPrice() || 0}
            </span>
          </span>
          <span style={{ marginLeft: 35 }}>
            <span className="f-w-600">{t("thuNgan.soHoaDon")} :</span>
            <span className="f-w-700">{state.thongTinHoaDon?.soHoaDon}</span>
          </span>
        </div>
        <div>
          <div className="f-w-600">{t("thuNgan.liDoXoaBo")}</div>
          <TextArea
            onChange={handleChangeLiDo}
            placeholder={t("thuNgan.nhapLiDoXoaBo")}
          ></TextArea>
        </div>
        <div className="footer">
          <Button className="btn btn-cancel" onClick={handleCancel}>
            {t("common.huy")}
          </Button>
          <Button className="btn btn-ok" onClick={handleOk}>
            {t("common.xoa")}
          </Button>
        </div>
      </div>
    </Main>
  );
};

export default forwardRef(ModalDeleteHoaDon);
