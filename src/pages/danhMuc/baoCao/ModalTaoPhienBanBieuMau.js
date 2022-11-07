import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { useTranslation } from "react-i18next";
import { ModalTemplate } from "components";
import Button from "pages/kho/components/Button";
import { TaoPhienBanBieuMauStyled } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import IcSave from "assets/svg/ic-save.svg";

const ModalTaoPhienBanBieuMau = (props, ref) => {
  const { t } = useTranslation();
  const [state, _setState] = useState({ show: false, tenTep: "" });
  const setState = (data = {}) => {
    _setState((state) => ({ ...state, ...data }));
  };
  const {
    auth: {
      auth: { nhanVienId },
    },
  } = useSelector((state) => state);
  const {
    baoCao: { createLichSuBaoCao },
  } = useDispatch();

  const refModal = useRef(null);
  useImperativeHandle(ref, () => ({
    show: (data) => {
      const tenTep = data.mauBaoCao.split("/") || [];
      setState({ show: true, tenTep: tenTep[tenTep.length - 1], data });
    },
  }));
  const onOK = (isOk) => () => {
    if (isOk) {
    } else {
    }
    setState({ show: false });
  };
  useEffect(() => {
    if (state.show) {
      refModal.current.show();
    } else {
      refModal.current.hide();
    }
  }, [state.show]);
  const onSave = () => {
    if (state.data) {
      createLichSuBaoCao({
        baoCaoId: state.data.id,
        mauBaoCao: state.data.mauBaoCao,
        nguoiThucHienId: nhanVienId,
      }).then((s) => {
        setState({
          show: false,
        });
      });
    }
  };
  return (
    <ModalTemplate
      ref={refModal}
      onCancel={onOK(false)}
      title={t("danhMuc.taoPhienBanBieuMau")}
      width={520}
      actionLeft={
        <Button.Text
          type="primary"
          leftIcon={<IcArrowLeft />}
          onClick={onOK(false)}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        <Button
          type="primary"
          height={30}
          minWidth={60}
          onClick={onSave}
          rightIcon={<IcSave />}
        >
          <span> {t("common.luu")}</span>
        </Button>
      }
    >
      <TaoPhienBanBieuMauStyled>
        <div>
          {t("danhMuc.tepBieuMau")}: <span>{state.tenTep}</span>
        </div>
      </TaoPhienBanBieuMauStyled>
    </ModalTemplate>
  );
};
export default forwardRef(ModalTaoPhienBanBieuMau);
