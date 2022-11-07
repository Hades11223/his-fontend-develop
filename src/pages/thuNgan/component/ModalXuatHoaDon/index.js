import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import { Main } from "./styled";
import Icon1Nguoi from "assets/svg/thuNgan/icon1Nguoi.svg";
import IconNhieuNguoi from "assets/svg/thuNgan/iconNhieuNguoi.svg";
import IconPencel from "assets/svg/thuNgan/iconPencel.svg";
import Icon from "@ant-design/icons";
import { t } from "i18next";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
const ModalXuatHoaDon = (props, ref) => {
  const refCallBack = useRef(null);
  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: (callback) => {
      setState({
        show: true,
      });
      refCallBack.current = callback;
    },
  }));
  const handleCancel = () => {
    setState({
      show: false,
    });
  };
  const handleClick = (value) => {
    setState({
      show: false,
    });
    refCallBack.current(value);
  };
  return (
    <Main
      title={t("thuNgan.chonCachXuatHoaDonDienTu")}
      visible={state.show}
      onCancel={handleCancel}
      footer={null}
    >
      {checkRole([ROLES["THU_NGAN"].THEM_HOA_DON_DIEN_TU]) && (
        <div className="row" onClick={() => handleClick(1)}>
          <div className="col-1">
            <Icon component={Icon1Nguoi}></Icon>
          </div>
          <div className="col-2">
            <div className="title">{t("thuNgan.taoHoaDonCho1Nguoi")}</div>
            <div className="content">
              {t("thuNgan.xuatHoaDonDienTuCacDichVuCua1NguoiBenhTrong1HoaDon")}
            </div>
          </div>
        </div>
      )}
      {checkRole([ROLES["THU_NGAN"].THEM_HOA_DON_DIEN_TU_NHIEU_NGUOI]) && (
        <div className="row row-center" onClick={() => handleClick(2)}>
          <div className="col-1">
            <Icon component={IconNhieuNguoi}></Icon>
          </div>
          <div className="col-2">
            <div className="title">{t("thuNgan.taoHoaDonChoNhieuNguoi")}</div>
            <div className="content">
              {t("thuNgan.xuatHoaDonDienTuCacDichVuCua1NguoiBenhTrong1HoaDon")}
            </div>
          </div>
        </div>
      )}

      <div className="row" onClick={() => handleClick(3)}>
        <div className="col-1">
          <Icon component={IconPencel}></Icon>
        </div>
        <div className="col-2">
          <div className="title">{t("thuNgan.taoHoaDonNhapTay")}</div>
          <div className="content">{t("thuNgan.nhapTayCacThongTinHoaDon")}</div>
        </div>
      </div>
    </Main>
  );
};

export default forwardRef(ModalXuatHoaDon);
