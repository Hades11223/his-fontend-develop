import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useSelector } from "react-redux";
import ReactJson from "react-json-view";
import { Modal } from "antd";
import appUtils from "utils/app-utils";
const ReduxViewer = ({}, ref) => {
  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const model = useSelector((state) => state || {});

  useImperativeHandle(ref, () => ({
    show: () => {
      setState({ show: true });
    },
  }));
  useEffect(() => {
    if (state.show) {
      appUtils.getBuildInfo().then((s) => {
        console.log(s);
      });
    }
  }, [state.show]);
  return (
    <Modal
      visible={state.show}
      onCancel={() => {
        setState({ show: false });
      }}
      onOk={() => {
        setState({ show: false });
      }}
    >
      {state.show && (
        <ReactJson
          src={model}
          collapsed={true}
          style={{ maxHeight: "calc(100vh - 300px)", overflow: "auto" }}
        />
      )}
    </Modal>
  );
};

export default forwardRef(ReduxViewer);
