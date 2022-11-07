import React from "react";
import { Carousel } from "antd";
import ProgressCircle from "pages/qms/components/ProgressCircle";
import { addPrefixNumberZero } from "utils/index";
import IcExamination from "assets/images/qms/icExamination.png";
import IcTime from "assets/images/qms/icTime.png";
import SlideText from "pages/qms/components/SlideText";
function MiddleContent(props) {
  const {
    dsDangThucHien,
    dsTiepTheo,
    thoiGianTb,
    isUpdateNBCurrent,
    isUpdateNBNext,
    linkRoom,
  } = props;
  const { stt, tenNb, diaChi, tuoi } =
    (dsDangThucHien && dsDangThucHien.length && dsDangThucHien[0]) || {};
  const {
    stt: sttNext,
    tenNb: tenNbNext,
    diaChi: diaChiNext,
    tuoi: tuoiNext,
  } = (dsTiepTheo && dsTiepTheo.length && dsTiepTheo[0]) || {};
  const slideTopBlockAuto = () => {
    return (
      <div className="middle-content__box">
        <div className="title">
          <span className="sub-title">
          ĐANG <br/> THỰC HIỆN <br />({`${dsDangThucHien?.length || 0 } NB`})
          </span>
          <span className="stt"> {addPrefixNumberZero(stt)}</span>
        </div>
        <div className="box-child box-child__Nodata">
          <div className="box-child__wrap">
            <ProgressCircle
              srcPath={IcExamination}
              timeRotate={thoiGianTb}
              strokeColor="#E02C4C"
              isResetPercent={isUpdateNBCurrent}
              strokeWidth={2.88509}
            />
          </div>
          <div className="box-child__infor">
            <SlideText className="box-child__first-infor">{tenNb}</SlideText>
            <div className="box-child__second-infor">
              <SlideText className="province">{diaChi}</SlideText>
              <SlideText className="old">{tuoi}</SlideText>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const slideBottomBlockAuto = () => {
    return (
      <div className="middle-content__box middle-content__box--margin">
        <div className="title">
          <span className="sub-title">TIẾP <br/> THEO <br/>{(`${dsTiepTheo?.length || 0 } NB`)}</span>
          <span className="stt">
            {addPrefixNumberZero(sttNext)}
          </span>
        </div>
        <div className="box-child box-child__Nodata--margin box-child__Nodata">
          <div className="box-child__wrap">
            <ProgressCircle
              srcPath={IcTime}
              timeRotate={thoiGianTb}
              isResetPercent={isUpdateNBNext}
              strokeColor="#193D6B"
              strokeWidth={2.88509}
            />
          </div>
          <div className="box-child__infor">
            <SlideText className="box-child__first-infor">{tenNbNext}</SlideText>
            <div className="box-child__second-infor">
              <SlideText className="province">{diaChiNext}</SlideText>
              <SlideText className="old">{tuoiNext}</SlideText>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="middle-content">
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
                <div
                  className="middle-content__box"
                  key={index2}
                >
                  <div className="title">
                    <span className="sub-title">
                    ĐANG <br/> THỰC HIỆN <br />({`${dsDangThucHien?.length || 0} NB`})
                    </span>
                    <span className="stt">{addPrefixNumberZero(item2?.stt)}</span>
                  </div>
                  <div className="box-child">
                    <div className="box-child__wrap">
                      <ProgressCircle
                        srcPath={IcTime}
                        timeRotate={thoiGianTb}
                        isResetPercent={isUpdateNBCurrent}
                        strokeColor="#193D6B"
                        strokeWidth={2.88509}
                      />
                    </div>
                    <div className="box-child__infor">
                     <SlideText className="box-child__first-infor">
                        <span>{item2.tenNb}</span>
                      </SlideText>
                      <div className="box-child__second-infor">
                        <SlideText className="province">
                        <span >{item2.diaChi}</span>
                        </SlideText>
                        <span className="old">
                          {item2.tuoi && `${item2.tuoi} tuổi`}
                        </span>
                      </div>
                    </div>
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
      {dsTiepTheo && dsTiepTheo.length ? (
        <div className="carousel carousel-right">
          <Carousel
            dots={false}
            autoplaySpeed={10000}
            autoplay
            lazyLoad
            pauseOnHover={false}
            pauseOnFocus={false}
          >
            {dsTiepTheo.map((item2, index2) => {
              return (
                <div
                  className="middle-content__box middle-content__box--margin"
                  key={index2}
                >
                  <div className="title">
                    <span className="sub-title">
                      TIẾP <br /> THEO <br />
                      ({`${dsTiepTheo?.length || 0} NB`})
                    </span>
                    <span className="stt">
                      {addPrefixNumberZero(item2.stt)}
                    </span>
                  </div>
                  <div className="box-child">
                    <div className="box-child__wrap">
                      <ProgressCircle
                        srcPath={IcTime}
                        timeRotate={thoiGianTb}
                        isResetPercent={isUpdateNBNext}
                        strokeColor="#193D6B"
                        strokeWidth={2.88509}
                      />
                    </div>
                    <div className="box-child__infor">
                      <SlideText className="box-child__first-infor">
                        <span>{item2.tenNb}</span>
                      </SlideText>
                      <div className="box-child__second-infor">
                        <SlideText className="province">
                        <span >{item2.diaChi}</span>
                        </SlideText>
                        <span className="old">
                          {item2.tuoi && `${item2.tuoi} tuổi`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      ) : (
        <div className="carousel carousel-right">
          <div className="slick-list">{slideBottomBlockAuto()}</div>
        </div>
      )}
    </div>
  );
}
export default MiddleContent;
