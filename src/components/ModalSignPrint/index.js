import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import { Main } from "./styled";
import { Col } from "antd";
import { useDispatch } from "react-redux";
import DanhSachPhieu from "./DanhSachPhieu";
import XemTruoc from "./XemTruoc";
import { useTranslation } from "react-i18next";
import { ModalTemplate } from "components";

const ModalSignPrint = (props, ref) => {
  const refModal = useRef(null);
  const { t } = useTranslation();
  const { getPhieuIn, updateData } = useDispatch().phieuIn;
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: (payload) => {
      getPhieuIn(payload);
      setState({
        show: true,
        data: payload,
      });
    },
  }));

  const onOK = (isOk, type) => (e) => {
    if (!isOk) {
      updateData({ listPhieu: [], selectedIds: "" });
      setState({ show: false });
    }
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
      onCancel={onOK(false, null)}
      title={t("phieuIn.kyVaIn")}
      centered={true}
    >
      <Main className="modal-content" gutter={[8, 8]}>
        <Col md={16} xl={16} xxl={16}>
          <XemTruoc data={state.data} />
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <DanhSachPhieu showButtonPrint={true} data={state.data} />
        </Col>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalSignPrint);
