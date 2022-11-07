import styled from "styled-components";
import bgPageTop from "assets/images/kiosk/deco-top.png";
import bgPageBottom from "assets/images/kiosk/deco-bottom.png";

export const Main = styled("div")`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    #0762f7;
  font-family: Nunito Sans, sans-serif !important;
  box-shadow: inset 0px 0px 250px #172b4d;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  font-size: 40px;
  letter-spacing: 0.01em;
  line-height: 55px;
  font-weight: bold;
  color: #7a869a;
  @media (max-width: 1079px) {
    height: unset;
    min-height: 50vh;
  }
  @media (min-width: 1081px) {
    height: 100%;
    min-height: 50vh;
  }
`;

export const HeaderWrapper = styled("div")`
  flex-grow: 1;
  color: #ffffff;
  padding: 40px;
  .customer-name {
    font-weight: bold;
    font-size: 40px;
    line-height: 55px;
    text-transform: capitalize;
  }
  .logo-customer {
    width: 125px;
    height: 125px;
    object-fit: contain;
  }
  background-image: url(${bgPageTop});
  background-repeat: no-repeat;
  max-height: 180px;
  @media (max-width: 765px) {
    padding: 10px;
    .customer-name {
      font-size: 14px;
    }
    .logo-customer {
      width: 60px;
      height: 60px;
    }
  }
`;

export const ContentWrapper = styled("div")`
  position: relative;
  background: #e9eef1;
  box-shadow: 0px 3px 5px rgba(9, 30, 66, 0.2),
    0px 0px 1px rgba(9, 30, 66, 0.31);
  border-radius: 32px;
  flex-grow: 5;
`;

export const FooterWrapper = styled("div")`
  position: relative;
  flex-grow: 1;
  max-height: 130px;
  padding: 20px 40px 40px 40px;
  color: #ffffff;
  .timer {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 32px;
    line-height: 55px;
    padding-top: 20px;
    span {
      margin-left: 20px;
    }
  }
  .info-msg {
    font-size: 32px;
    background-image: linear-gradient(41.51deg, #fe8803 -0.1%, #fed603 101.9%);
    -webkit-background-clip: text; // bat buoc phai co
    -webkit-text-fill-color: transparent;
    line-height: 40px;
    margin: -10px 10px 0 10px;
  }
  background-image: url(${bgPageBottom});
  background-position: right bottom;
  background-repeat: no-repeat;
  .thuongHieu {
    max-width: 160px;
    max-height: 5vh;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .back {
    font-size: 32px;
    padding: 15px 35px;
    color: black;
    position: absolute;
    background: #ffffff;
    mix-blend-mode: normal;
    box-shadow: 0px 6px 0px #2f5888;
    border-radius: 32px;
    width: 286px;
    height: 81px;
    top: -130px;
    img {
      margin-right: 10px;
    }
  }
  @media (max-width: 756px) {
    padding: 0px;
    padding-left: 10px;
    .back {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 200px;
      height: 50px;
      padding: 0px;
      font-size: 14px;
      img {
        width: 20px;
        height: 20px;
      }
    }
    .timer {
      span {
        font-size: 12px;
        margin-left: 0px;
      }
    }
  }
`;
