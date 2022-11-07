import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Main } from "./styled";
import fileUtils from "utils/file-utils";
const Index = (props) => {
  const { data, height } = props;
  return (
    <Main>
      <Carousel autoPlay>
        {(data || []).map((item) => {
          return ( item &&
            <div key={item}>
              <p>{item?.ten}</p>
              <img
                style={{height:`${props.height || "156px"}`}}
                src={`${fileUtils.absoluteFileUrl(item?.anhDaiDien)}`}
                alt=""
              />
            </div>
          );
        })}
      </Carousel>
    </Main>
  );
};

export default Index;
