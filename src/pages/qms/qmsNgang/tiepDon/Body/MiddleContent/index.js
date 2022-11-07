import React from "react";
import { Carousel } from "antd";
import { addPrefixNumberZero } from "utils/index";
import SlideText from "pages/qms/components/SlideText";

function MiddleContent(props) {
  const { dsDangThucHien } = props;
  const { stt, tenNb, diaChi, tuoi } =
    (dsDangThucHien && dsDangThucHien.length && dsDangThucHien[0]) || {};

  const slideTopBlockAuto = () => {
    return (
      <div className="middle-content__box">
        <div className="title">
          {addPrefixNumberZero(stt)} - {tenNb}
        </div>
        <div className="address">
          <SlideText className="province">{diaChi}</SlideText>
          <SlideText className="old">{tuoi}</SlideText>
        </div>
      </div>
    );
  };
  return (
    <div className="middle-content">
      <div className="middle-content-title">
        <span>ĐANG TIẾP ĐÓN</span>
      </div>

      {dsDangThucHien && dsDangThucHien.length ? (
        <div className="carousel">
          <Carousel
            dots={false}
            autoplaySpeed={10000}
            autoplay
            lazyLoad
            pauseOnHover={false}
            pauseOnFocus={false}
          >
            {dsDangThucHien.map((item2, index2) => {
              return (
                <div className="middle-content__box" key={index2}>
                  <div className="title">
                    {addPrefixNumberZero(item2?.stt)} - {item2.tenNb}
                  </div>
                  <div className="address">
                    <SlideText className="province">{item2.diaChi}</SlideText>
                    <SlideText className="old">
                      {item2.tuoi && `${item2.tuoi} tuổi`}
                    </SlideText>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      ) : (
        <div className="carousel carousel-right">
          <div className="slick-list">{slideTopBlockAuto()}</div>
        </div>
      )}
    </div>
  );
}
export default MiddleContent;
