import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import { Row, Form } from "antd";
import { Main, ModalStyled } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import IcClose from "assets/images/kho/icClose.png";
import DanhSachDichVu from "../DanhSachDichVu";
import { useTranslation } from "react-i18next";
import { Button } from "components";
import { useEnum } from "hook";
import { ENUM } from "constants/index";

const ModalDichVu = (props, ref) => {
  const { t } = useTranslation();

  const [form] = Form.useForm();
  const history = useHistory();
  const [listGioiTinh] = useEnum(ENUM.GIOI_TINH);
  const {
    danhSachDichVuNbTiepDon: { onSizeChange },
    khoa: { getListAllKhoa },
  } = useDispatch();

  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useEffect(() => {
    if (state?.currentItem) {
      onSizeChange({ size: 10, nbDotDieuTriId: state?.currentItem?.id });
    }
    getListAllKhoa({});
  }, [state?.currentItem]);
  const onClose = () => {
    form.resetFields();
    setState({ show: false });
  };

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({
        show: true,
        currentItem: data,
      });
    },
  }));

  const onCreate = () => {
    if (state?.currentItem?.id)
      history.push("/tiep-don/dich-vu/" + state?.currentItem?.id);
  };

  return (
    <ModalStyled
      width={1840}
      visible={state.show}
      footer={null}
      closable={false}
      onCancel={onClose}
    >
      <Main>
        <Row className="header">
          <div className="header__left">
            <span>{t("tiepDon.danhSachDichVuDaChiDinh")} </span>
            <span style={{ fontWeight: "bold" }}>{state.item?.tenDichVu}</span>
          </div>
          <div className="header__right" onClick={onClose}>
            <img src={IcClose} alt="..." />
          </div>
        </Row>
        <Row className="content">
          <div className="info">
            <label style={{ padding: "20px" }}>
              {`${state?.currentItem?.tenNb} (${
                (listGioiTinh || []).find(
                  (x) => x.id === state?.currentItem?.gioiTinh
                )?.ten
              } - ${state?.currentItem?.tuoi} ${t("common.tuoi")}) - ${t(
                "common.sdt"
              )}:${state?.currentItem?.soDienThoai || ""} - ${t("common.maNb")}:
            ${state?.currentItem?.maNb} - ${t("common.maHs")}: ${
                state?.currentItem?.maHoSo
              }`}
            </label>
            <DanhSachDichVu nbDotDieuTriId={state?.currentItem?.id} />
          </div>
          <div className="footer">
            <Button type="primary" onClick={() => onCreate()}>
              {t("tiepDon.keThemDichVu")}
            </Button>
          </div>
        </Row>
      </Main>
    </ModalStyled>
  );
};

export default forwardRef(ModalDichVu);
