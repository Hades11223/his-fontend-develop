import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import ModalWebcam from "components/ModalWebcam";
import { message } from "antd";
import { Html5Qrcode } from "html5-qrcode";
const Camera = (props, ref) => {
  const refCallback = useRef(null);
  const refUpload = useRef(null);
  const refIndex = useRef(0);
  const refListCamera = useRef([]);
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const getCameras = () => {
    return new Promise((resolve, reject) => {
      Html5Qrcode.getCameras()
        .then((devices) => {
          if (devices && devices.length) {
            resolve(devices);
          } else {
            resolve([]);
          }
        })
        .catch((err) => {
          reject([]);
        });
    });
  };
  useImperativeHandle(ref, () => ({
    show: async (data = {}, upload, callback) => {
      const show = (listDevice) => {
        setState({
          title: data.title,
          show: data.disabled ? false : true,
          propSelect: data.propSelect,
        });
        refUpload.current = upload;
        refCallback.current = callback;
        refListCamera.current = listDevice;
        refIndex.current = 0;
        showWebcame(refListCamera.current[0].id);
      };
      let listDevice = [];
      try {
        listDevice = await getCameras();
      } catch (error) {}
      show(listDevice);
    },
  }));

  const onTakePicture = async (file, base64) => {
    if (refUpload.current) {
      const image = await refUpload.current(file, base64);
      if (image) {
        onClose(false, image);
      }
    }
  };

  const onClose = (show, data) => {
    releaseWebcame();
    setState({ show });
    if (refCallback.current) refCallback.current(data);
  };

  const showWebcame = (deviceId) => {
    var video = document.querySelector("#videoElement");
    if (navigator?.mediaDevices?.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            deviceId: { exact: deviceId },
          },
        })
        .then(function (stream) {
          video.srcObject = stream;
        })
        .catch(function (errr) {
          message.error(errr);
        });
    }
  };

  const releaseWebcame = async () => {
    try {
      var video = document.querySelector("#videoElement");
      if (video) {
        const stream = video?.srcObject;
        const tracks = stream?.getTracks() || [];

        tracks.forEach(function (track) {
          track.stop();
        });
        video.srcObject = null;
      }
    } catch (error) {
      message.error(error);
    }
  };
  const onChangeCamera = () => {
    if (refListCamera.current.length > 1) {
      releaseWebcame();
      if (refIndex.current < refListCamera.current.length - 1) {
        refIndex.current = refIndex.current + 1;
        showWebcame(refListCamera.current[refIndex.current]?.id);
      } else {
        refIndex.current = 0;
        showWebcame(refListCamera.current[0]?.id);
      }
    }
  };
  const reTakePhoto = () => {
    setTimeout(() => {
      showWebcame(refListCamera.current[refIndex.current]?.id);
    }, 500);
  };
  return (
    <>
      {state.show && (
        <ModalWebcam
          show={state.show}
          title={state.title}
          modalActions={onTakePicture}
          onClose={onClose}
          disabled={state.disabled}
          propSelect={state.propSelect}
          onChangeCamera={onChangeCamera}
          releaseWebcame={releaseWebcame}
          onreTakePhoto={reTakePhoto}
        />
      )}
    </>
  );
};

export default forwardRef(Camera);
