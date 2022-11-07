import React, { useEffect, useRef } from "react";
import SlideText from "pages/qms/components/SlideText";
import { Carousel } from "antd";
import fileUtils from "utils/file-utils";
import { TRANG_THAI_HIEN_THI } from "pages/qms/qmsDoc/config";
import { Main } from "./styled";
const Video = (props) => {
  const { currentKiosk } = props;
  const refVideo = useRef(null);

  useEffect(() => {
    if (currentKiosk?.dsVideo)
      fileUtils
        .getFromUrl({ url: fileUtils.absoluteFileUrl(currentKiosk?.dsVideo) })
        .then((s) => {
          const blob = new Blob([new Uint8Array(s)], {
            type: "video/mp4",
          });
          const blobUrl = window.URL.createObjectURL(blob);
          refVideo.current.src = blobUrl;
        })
        .catch((e) => console.log(e));
  }, [currentKiosk]);

  return (
    <Main>
      <div className="left">
        <div className="content">
        <span>Tải ISOFHCARE</span>
        <ul>
          <li>Đặt khám trực tuyến</li>
          <li>Đặt lịch xét nghiệm Covid</li>
          <li>Khám qua video call</li>
        </ul>
      </div>
      </div>
      <div className="right" style={{ background: "#fff" }}>
        <video
          width="80%"
          height="80%"
          ref={refVideo}
          controls
          autoplay="autoplay"
          loop
        ></video>
      </div>
    </Main>
  );
};
export default Video;
