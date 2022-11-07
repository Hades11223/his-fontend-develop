import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, Spin } from "antd";
import { GlobalStyle } from "./styled";
import { useTranslation } from "react-i18next";

const ModalLoading = (props, ref) => {
  const { t } = useTranslation();
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: (payload) => {
      const { title = t("common.vuiLongCho"), width = 200 } = payload || {};
      setState({
        show: true,
        title,
        width,
      });
    },
    hide: () => {
      setTimeout(() => {
        setState({
          show: false,
        });
      }, 300);
    },
  }));
  return (
    <>
      <GlobalStyle />
      <Modal
        wrapClassName="modal-loading"
        visible={state.show}
        width={state.width}
        closable={false}
        footer={null}
        centered={true}
      >
        <Spin spinning={true} size="large"></Spin>
        <div className="loading-text">{state.title}</div>
      </Modal>
    </>
  );
};

export default forwardRef(ModalLoading);
