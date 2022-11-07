import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import { Main } from "./styled";
import { ModalTemplate } from "components";
import { useTranslation } from "react-i18next";
import PdfView from "components/Pdf";
import { A4 } from "constants/index";

const ModalPdfView = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  //state
  const [state, _setState] = useState({
    show: false,
    currentItem: {},
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({
        show: true,
        currentItem: data,
      });
    },
  }));

  //function
  const onClose = () => {
    setState({ show: false, currentItem: {} });
  };

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  return (
    <ModalTemplate
      ref={refModal}
      width={A4.width}
      onCancel={onClose}
      title={state?.currentItem?.ten}
      closable={true}
    >
      <Main>
        <PdfView src={state?.currentItem?.srcPdf} />
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalPdfView);
