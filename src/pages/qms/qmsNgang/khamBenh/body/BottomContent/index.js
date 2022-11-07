import React, { useEffect, useRef } from "react";
// import SlideText from "@admin/components/admin/SlideText";
import { Carousel } from "antd";
import SlideText from "pages/qms/components/SlideText";
import { TRANG_THAI_HIEN_THI } from "pages/qms/qmsDoc/config";
import fileUtils from "utils/file-utils";
import Video from "../Video";

function BottomContent(props) {
  const { dsDaXacNhan, dsChoXacNhan, dsGoiNho, currentKiosk } = props;
  const refVideo = useRef(null);

  const render = (data, key) => {
    return (data || []).map((nb) => {
      const { id, stt, tenNb, tuoi } = nb || {};
      return (
        <div className="box-item" key={id}>
          <div className="box-item__left">
            {!key && (
              <div className="box-item__number">
                <span>{stt}</span>
              </div>
            )}
            <SlideText className="box-item__name">
              <span>{tenNb}</span>
            </SlideText>
          </div>
          <div className="box-item__old">
            <span>{tuoi && `${tuoi} tuổi`}</span>
          </div>
        </div>
      );
    });
  };

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
    <div className="bottom-content">
      {!currentKiosk?.dsTrangThai?.includes(TRANG_THAI_HIEN_THI.DA_XAC_NHAN) &&
      !currentKiosk?.dsTrangThai?.includes(TRANG_THAI_HIEN_THI.CHO_XAC_NHAN) ? <Video currentKiosk={currentKiosk}/> 
    : 
    <>
      {currentKiosk?.dsTrangThai?.includes(TRANG_THAI_HIEN_THI.DA_XAC_NHAN) ? (
      <div className="bottom-box">
        <div className="bottom-box__header">
          <div className="bottom-box__title">{`ĐÃ XÁC NHẬN - ${dsDaXacNhan?.length}NB`}</div>
        </div>
        {dsDaXacNhan && dsDaXacNhan.length > 3 ? (
          <Carousel
            className="bottom-box__body"
            autoplay
            dotPosition={"left"}
            autoplaySpeed={10000}
            pauseOnHover={false}
            pauseOnFocus={false}
          >
            {render(dsDaXacNhan)}
          </Carousel>
        ) : (
          <div className="bottom-box__body">
            {render(dsDaXacNhan)}
          </div>
        )}
      </div>
    ) : (
      <div className="bottom-box " style={{ background: "#fff" }}>
        <video
          width="100%"
          height="100%"
          ref={refVideo}
          controls
          autoplay="autoplay"
          loop
        ></video>
      </div>
    )}
    {currentKiosk?.dsTrangThai?.includes(TRANG_THAI_HIEN_THI.CHO_XAC_NHAN) ? (
      <div className="bottom-box bottom-box--bg">
        <div className="bottom-box__header">
          <div className="bottom-box__title">{`CHỜ XÁC NHẬN - ${dsChoXacNhan?.length || 0}NB`}</div>
        </div>
        {dsChoXacNhan && dsChoXacNhan.length > 3 ? (
          <Carousel
            className="bottom-box__body"
            autoplay
            dotPosition={"left"}
            autoplaySpeed={10000}
            pauseOnHover={false}
            pauseOnFocus={false}
          >
            {render(dsChoXacNhan, "ChoXacNhan")}
          </Carousel>
        ) : (
          <div className="bottom-box__body">
            {render(dsChoXacNhan, "ChoXacNhan")}
          </div>
        )}
      </div>
    ) : (
      <div className="bottom-box bottom-box--bg" style={{ background: "#fff" }}>
        <video
          width="100%"
          height="100%"
          ref={refVideo}
          controls
          autoplay="autoplay"
          loop
        ></video>
      </div>
    )}
    </>
    }
      
      <div className="bottom-box-ignore bottom-box-ignore--bg">
        <div className="bottom-box-ignore__header">
          <div className="bottom-box-ignore__title">{`BỆNH NHÂN GỌI NHỠ - ${
            dsGoiNho?.length || 0
          }NB`}</div>
        </div>
        {dsGoiNho && dsGoiNho.length > 3 ? (
          <Carousel
            className="bottom-box-ignore__body"
            autoplay
            dotPosition={"left"}
            autoplaySpeed={10000}
            pauseOnHover={false}
            pauseOnFocus={false}
          >
            {render(dsGoiNho, "GoiNho")}
          </Carousel>
        ) : (
          <div className="bottom-box-ignore__body">
            {render(dsGoiNho, "GoiNho")}
          </div>
        )}
      </div>
    </div>
  );
}
export default BottomContent;
