import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import fileUtils from "utils/file-utils";
import { CloseOutlined } from "@ant-design/icons";

const LayerPlay = ({}, ref) => {
  const refVideo = useRef();
  const [state, _setState] = useState({ visible: false });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  useImperativeHandle(ref, () => ({
    show: (data) => {
      setState({ data, visible: true });
      fileUtils
        .getFromUrl({ url: fileUtils.absoluteFileUrl(data) })
        .then((s) => {
          const blob = new Blob([new Uint8Array(s)], {
            type: "video/mp4",
          });
          const blobUrl = window.URL.createObjectURL(blob);
          refVideo.current.src = blobUrl;
        })
        .catch((e) => console.log(e));
    },
  }));

  const onClose = () => {
    setState({ visible: false });
    refVideo.current.src = "";
  };

  return (
    <div
      className={`layer-video ${state.visible ? "layer-video-visible" : ""}`}
    >
      <video ref={refVideo} autoPlay controls></video>
      <div className="layer-video-close-icon" onClick={onClose}>
        <CloseOutlined />
      </div>
    </div>
  );
};

export default forwardRef(LayerPlay);
