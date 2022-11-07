import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { Button, ModalTemplate, Select } from "components";
import { useDispatch, useSelector } from "react-redux";
import IconSuccess from "assets/svg/ic-check-circle-white.svg";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { Main } from "./styled";
const ModalChonToaNha = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const refCallback = useRef(null);

  const { listNhaTheoTaiKhoan } = useSelector((state) => state.toaNha);
  const {
    toaNha: { getNhaTheoTaiKhoan },
  } = useDispatch();

  const [state, _setState] = useState({ show: false });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: (data = {}, onOk) => {
      refCallback.current = onOk;
      setState({ show: true, nhaTamUng: data });
    },
  }));

  useEffect(() => {
    if (state?.show) {
      refModal.current && refModal.current.show();
      getNhaTheoTaiKhoan({});
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state?.show]);
  const onChangeSelect = (e) => {
    setState({ nhaTamUng: e });
  };

  const onCancel = () => {
    setState({ show: false });
  };

  const onSave = () => {
    refCallback.current(state?.nhaTamUng);
    onCancel();
  };
  return (
    <ModalTemplate
      width={400}
      ref={refModal}
      title={t("thuNgan.quanLyTamUng.chonToaNha")}
      onCancel={onCancel}
      actionLeft={
        <Button.Text
          type="primary"
          minWidth={100}
          onClick={onCancel}
          iconHeight={15}
          leftIcon={<IcArrowLeft />}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        <Button
          type="primary"
          minWidth={100}
          onClick={onSave}
          iconHeight={20}
          rightIcon={<IconSuccess />}
        >
          {t("common.luu")}
        </Button>
      }
    >
      <Main>
        <Select
          onChange={onChangeSelect}
          data={listNhaTheoTaiKhoan}
          style={{ width: "100%" }}
          value={state?.nhaTamUng}
        />
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalChonToaNha);
