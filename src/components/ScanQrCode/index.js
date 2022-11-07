import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Main } from "./styled";
import QrReader from "react-qr-reader";
import ButtonClose from "assets/svg/camera-close.svg";

function ScanQrCode(props, ref) {
  const refCallback = useRef(null);

  const [state, _setState] = useState({});
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
      refCallback.current = callback;
    },
  }));

  const handleScan = (data) => {
    if (data) {
      setState({ show: false });
      if (refCallback.current) refCallback.current(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };
  const onCancel = () => {
    // navigator && navigator.getUserMedia({ audio: false, video: true },
    //   function (stream) {
    //     var track = stream.getTracks()[0];
    //     track.stop();
    setState({ show: false });
    if (refCallback.current) refCallback.current();
    // },
    // function (error) {
    //   console.log('getUserMedia() error', error);
    // });
  };
  return (
    <Main
      visible={true}
      visible={state.show}
      footer={null}
      onCancel={onCancel}
      closable={false}
    >
      <QrReader onError={handleError} onScan={(e) => handleScan(e)} />
      <div className="camera-footer">
        <span className="tip">Di chuyển Camera đến khu vực cần quét</span>
        <div style={{ cursor: "pointer" }}>
          <ButtonClose
            width={40}
            height={40}
            className="button-close"
            onClick={onCancel}
          />
        </div>
      </div>
    </Main>
  );
}

export default forwardRef(ScanQrCode);
