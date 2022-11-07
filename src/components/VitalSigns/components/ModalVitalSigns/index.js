import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { ModalTemplate } from "components";
import { useTranslation } from "react-i18next";
import VitalSigns from "../VitalSigns";
import { useSelector } from "react-redux";
const ModalVitalSigns = (props, ref) => {
  const { t } = useTranslation();
  const [state, _setState] = useState({
    show: false,
  });
  const {
    vitalSigns: { values = [] },
  } = useSelector((state) => state);
  const refModal = useRef(null);
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const refCallback = useRef(null);
  const refCtxBody = useRef();
  const refCtxFooter = useRef();
  useImperativeHandle(ref, () => ({
    show: ({ refCanvas, refCanvasFooter }, callBack) => {
      setState({
        show: true,
      });
      debugger;
      refCtxBody.current = refCanvas;
      refCtxFooter.current = refCanvasFooter;
      refCallback.current = callBack;
    },
  }));

  const onOK = (isOk) => () => {
    if (isOk) {
    } else {
      setState({
        show: false,
      });
    }
  };
  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
      if (refCtxFooter.current) {
        const ctxFooter = refCtxFooter.current.getContext("2d");
        ctxFooter.clearRect(
          0,
          0,
          refCtxFooter.current.width,
          refCtxFooter.current.height
        );
      }
      if (refCtxBody.current) {
        const ctxBody = refCtxBody.current.getContext("2d");
        ctxBody.clearRect(
          0,
          0,
          refCtxBody.current.width,
          refCtxBody.current.height
        );
      }

      refCallback.current && refCallback.current(values, true);
    }
  }, [state.show]);
  const width = useMemo(() => {
    return window.screen.width - 100;
  }, [window.screen.width]);
  return (
    <ModalTemplate
      ref={refModal}
      onCancel={onOK(false)}
      title={t("quanLyNoiTru.chiSoSong.phieuTheoDoiChucNangSong")}
      width={width}
    >
      <VitalSigns isModal={true} />
    </ModalTemplate>
  );
};

export default forwardRef(ModalVitalSigns);
