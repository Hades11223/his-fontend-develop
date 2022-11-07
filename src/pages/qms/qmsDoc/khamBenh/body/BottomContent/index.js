import React, { useEffect, useRef } from "react";
import SlideText from "pages/qms/components/SlideText";
import { Carousel } from "antd";
import fileUtils from "utils/file-utils";
import { TRANG_THAI_HIEN_THI } from "pages/qms/qmsDoc/config";

function BottomContent(props) {
  const { dsDaXacNhan, dsChoXacNhan, currentKiosk } = props;
  const refVideo = useRef(null);
  const render = (data, key) => {
    return (data || []).map((nb) => {
      const { id, stt, tenNb, tuoi } = nb || {};
      return (
        <div className="box-item" key={id}>
          <div className="box-item__left">
          {!key &&  <div className="box-item__number">
              <span>{stt}</span>
            </div> }
            <SlideText className="box-item__name">
              <span>{tenNb}</span>
            </SlideText>
          </div>
          <SlideText className="box-item__old">
            <span>{tuoi && `${tuoi} tuổi`}</span>
          </SlideText>
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
      {currentKiosk?.dsTrangThai?.includes(TRANG_THAI_HIEN_THI.DA_XAC_NHAN) ? (
        <div className="bottom-box">
          <div className="bottom-box__header">
            <div className="bottom-box__title">{`ĐÃ XÁC NHẬN - ${dsDaXacNhan?.length} NB`}</div>
          </div>

          {dsDaXacNhan && dsDaXacNhan.length > 4 ? (
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
            <div className="bottom-box__body"> {render(dsDaXacNhan)}</div>
          )}
        </div>
      ) : (
        <div className="bottom-box" style={{background:"#fff"}}> 
        <video width="100%" height="100%" ref={refVideo} controls autoplay="autoplay" loop></video>
        </div>
      )}
      {currentKiosk?.dsTrangThai?.includes(TRANG_THAI_HIEN_THI.CHO_XAC_NHAN) ? (
      <div className="bottom-box bottom-box--bg">
        <div className="bottom-box__header">
          <div className="bottom-box__title">{`CHỜ XÁC NHẬN - ${dsChoXacNhan?.length || 0} NB`}</div>
        </div>
        {dsChoXacNhan && dsChoXacNhan.length > 4 ? (
          <Carousel
            className="bottom-box__body"
            autoplay
            dotPosition={"left"}
            autoplaySpeed={10000}
            pauseOnHover={false}
            pauseOnFocus={false}
          >
            {render(dsChoXacNhan,"ChoXacNhan")}
          </Carousel>
        ) : (
          <div className="bottom-box__body">{render(dsChoXacNhan,"ChoXacNhan")}</div>
        )}
      </div> ) : 
      <div className="bottom-box bottom-box--bg" style={{background:"#fff"}}> 
      <video width="100%" height="100%" ref={refVideo} controls autoplay="autoplay" loop></video>
      </div>
      } 
    </div>
  );
}
export default BottomContent;
