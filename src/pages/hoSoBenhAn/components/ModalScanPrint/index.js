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
import stringUtils from "mainam-react-native-string-utils";
import { debounce } from "lodash";
const ModalScanPrint = (props, ref) => {
  const refModal = useRef(null);
  const { t } = useTranslation();
  const [state, _setState] = useState({
    listPhieu: [],
    selectedIds: [],
    elementScrollingPdfKey: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: async (payload) => {
      const listPhieu = payload.map((item) => {
        let ten = item.split("/");
        ten = ten[ten.length - 1];
        return {
          key: stringUtils.guid(),
          data: {
            filePdf: item,
          },
          ten,
        };
      });
      setState({
        elementScrollingPdfKey: listPhieu.map((item) => item.key)[0],
        selectedIds: listPhieu.map((item) => item.key),
        show: true,
        data: listPhieu,
        listPhieu: listPhieu,
      });
    },
  }));

  const onOK = (isOk, type) => (e) => {
    if (!isOk) {
      setState({
        show: false,
        data: [],
        listPhieu: [],
        selectedIds: [],
        elementScrollingPdfKey: "",
      });
    }
  };
  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);
  const onChangeKey = debounce((key) => {
    setState({
      elementScrollingPdfKey: key,
    });
  }, 500);
  const setSelectId = (selectedIds) => {
    setState({
      selectedIds,
    });
  };
  return (
    <ModalTemplate
      ref={refModal}
      onCancel={onOK(false, null)}
      title={t("phieuIn.kyVaIn")}
      centered={true}
    >
      <Main className="modal-content" gutter={[8, 8]}>
        <Col md={16} xl={16} xxl={16}>
          <XemTruoc
            data={state.data}
            selectedIds={state.selectedIds}
            listPhieu={state.listPhieu}
            onChangeKey={onChangeKey}
            elementScrollingPdfKey={state.elementScrollingPdfKey}
            setSelectId={setSelectId}
          />
        </Col>
        <Col md={8} xl={8} xxl={8}>
          <DanhSachPhieu
            showButtonPrint={true}
            data={state.data}
            selectedIds={state.selectedIds}
            listPhieu={state.listPhieu}
            onChangeKey={onChangeKey}
            elementScrollingPdfKey={state.elementScrollingPdfKey}
            setSelectId={setSelectId}
          />
        </Col>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalScanPrint);
