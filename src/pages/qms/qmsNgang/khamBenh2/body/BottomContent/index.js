import React from "react";
// import SlideText from "@admin/components/admin/SlideText";
import { Carousel } from "antd";
import SlideText from "pages/qms/components/SlideText";
import IcNext from "assets/images/qms/icNext.png";
import { TRANG_THAI_HIEN_THI } from "pages/qms/qmsDoc/config";
function BottomContent(props) {
  const { dsTiepTheo, dsGoiNho, currentKiosk } = props;

  const render = (data, key) => {
    return (data || []).map((nb) => {
      const { id, stt, tenNb, tuoi } = nb || {};
      return (
        <div className="box-item" key={id}>
          <div className="box-item__left">
            <div className="box-item__number">
              <span>{stt}</span>
            </div>
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
  console.log("currentKiosk", currentKiosk)
  return (
    <div className="bottom-content">
      <div className="bottom-box">
        <div className="bottom-box__header">
          <div className="bottom-box__title">
            <img src={IcNext} alt="..."></img> NGƯỜI BỆNH TIẾP THEO
          </div>
          <div className="bottom-box__length">
            ({dsTiepTheo?.length || 0} NB)
          </div>
        </div>
        <div className="bottom-box__body">{render(dsTiepTheo)}</div>
      </div>

      {currentKiosk?.dsTrangThai?.includes(TRANG_THAI_HIEN_THI.GOI_NHO) && (
        <div className="bottom-box-ignore bottom-box-ignore--bg">
          <div className="bottom-box-ignore__header">
            <div className="bottom-box-ignore__title">
              <img src={IcNext} alt="..."></img> NGƯỜI BỆNH GỌI NHỠ
            </div>
            <div className="bottom-box-ignore__length">
              ({dsGoiNho?.length || 0} NB)
            </div>
          </div>
          <div className="bottom-box-ignore__body">
              {render(dsGoiNho, "GoiNho")}
            </div>
        </div>
      )}
    </div>
  );
}
export default BottomContent;
