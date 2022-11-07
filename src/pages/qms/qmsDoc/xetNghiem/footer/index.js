import React from "react";
import { StyleFooter } from "./footerStyles";
import { isArray } from "lodash";
// import SlideText from "@admin/components/admin/SlideText";
import { Carousel } from "antd";
import SlideText from "pages/qms/components/SlideText";

function Footer(props) {
  const { dsGoiNho } = props;

  const render = (first, last) => {
    const goiNhoSlice = isArray(dsGoiNho) ? dsGoiNho.slice(first, last) : [];
    return goiNhoSlice.map((nb) => {
      const { id, stt, tenNb, tuoi } = nb || {};
      return (
        <div className="footer-box__item" key={id}>
          <div className="footer-box__left">
            {/* <div className="footer-box__number">
              <span>{stt}</span>
            </div> */}
            <SlideText className="footer-box__name">
              <span>{tenNb}</span>
            </SlideText>
          </div>
          <div className="footer-box__old">
            {tuoi && <span>{tuoi} tuổi</span>}
          </div>
        </div>
      );
    });
  };
  return (
    <StyleFooter>
      <div className="footer-header">
        <div className="footer-header__title">
          <span>BỆNH NHÂN GỌI NHỠ - 3NB</span>
        </div>
      </div>
      <div className="footer-body">
        {dsGoiNho && dsGoiNho.length > 4 ?
      <Carousel
            className="footer-box"
            autoplay
            dotPosition={"left"}
            autoplaySpeed={10000}
            pauseOnHover={false}
            pauseOnFocus={false}
          >
           {render(0, Math.ceil(dsGoiNho.length/2))}
           </Carousel>
           : <div className="footer-box">{render(0, Math.ceil(dsGoiNho?.length/2))}</div>
           }
          {dsGoiNho && dsGoiNho.length > 4 ? 
          <Carousel
            className="footer-box"
            autoplay
            dotPosition={"left"}
            autoplaySpeed={10000}
            pauseOnHover={false}
            pauseOnFocus={false}
          >
          {render(Math.ceil(dsGoiNho.length/2), dsGoiNho.length)}
          </Carousel>
          : <div className="footer-box">{render(Math.ceil(dsGoiNho?.length/2), dsGoiNho?.length)}</div>
          }
      </div>
    </StyleFooter>
  );
}

export default Footer;