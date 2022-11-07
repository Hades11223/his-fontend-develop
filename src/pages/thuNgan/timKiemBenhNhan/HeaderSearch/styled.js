import styled from "styled-components";
export const Main = styled.div`
  padding: 16px;
  font-family: Nunito Sans, sans-serif;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.95),
      rgba(255, 255, 255, 0.95)
    ),
    #0762f7;
  box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
  .input-search {
    background: #ffffff;
    border: 2px solid #049254;
    box-sizing: border-box;
    border-radius: 50px;
    display: flex;
    align-items: center;
    padding: 8px 14px 8px 12px;
    box-shadow: ${(props) =>
      props.focusInput ? "0px 0px 0px 3px #01955447" : null};
    input {
      padding: 0 1em 0 0 !important;
      border: none;
      /* border-radius: 50px; */
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      padding-right: 1em;

      &:hover {
        border: none !important;
        box-shadow: none !important;
      }
      &:focus {
        border: none !important;
        box-shadow: none !important;
      }
      &::placeholder {
        color: #7a869a;
      }
    }
    img {
      height: 18px;
    }
  }
  .next-partient {
    display: flex;
    justify-content: end;
    align-items: center;
    .boLoc {
      .ant-select {
        min-width: 200px;
        .ant-select-selector {
          padding-left: 20px;
          .ant-select-selection-search {
            padding-left: 10px;
          }
        }
      }
      img {
        position: absolute;
        z-index: 1;
        padding-top: 5px;
      }
    }
    & .item {
      box-shadow: 0px 0px 15px rgb(9 30 66 / 7%);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 5px;
      margin-left: 10px;
      cursor: pointer;
      svg {
        height: 44px;
        width: 44px;
        rect {
          fill: #0762f7 !important;
        }
      }
      rect:hover {
        fill: #032254 !important;
      }
    }
  }
  & .button-gopage {
    padding-left: 5px;
  }
`;
export const TitleSearch = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: #172b4d;
  padding-bottom: 4px;
`;
