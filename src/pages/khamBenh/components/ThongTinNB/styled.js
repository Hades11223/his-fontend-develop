import { Row } from "antd";
import styled from "styled-components";

export const Main = styled.div`
  font-family: Nunito Sans, sans-serif;
  background: #ffffff;
  box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
  border-radius: 16px;
  padding: 16px;
`;
export const MainStep = styled(Row)`
  font-size: 14px;
  line-height: 19px;
  color: #172b4d;
  align-items: flex-start;
  .ant-col-xs-1 {
    flex: 0 0 25px;
    max-width: 6%;
    &:nth-child(4) {
      margin-left: auto;
    }
    &.sync-icon {
      svg {
        path {
          fill: #0762f7;
        }
      }
    }
  }
  .ant-col-xs-7 {
    max-width: 27%;
    display: flex;
    img {
      padding-right: 0;
      margin-right: 5px;
      align-self: flex-start;
    }
  }
`;
export const MainInfo = styled.div`
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.95),
      rgba(255, 255, 255, 0.95)
    ),
    #0762f7;
  box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
  border-radius: 16px;
  margin: 16px 0 0;
  padding: 16px;
  .info-partient {
    padding-bottom: 4px;
    display: flex;
    align-items: center;
    &__index {
      white-space: nowrap;
      display: inline-block;
      font-weight: 900;
      font-size: 16px;
      line-height: 22px;
      color: #0762f7;
      border: 1px dashed #0762f7;
      padding: 8px;
    }
    &__name {
      padding-left: 21px;
      display: inline-block;
      font-size: 16px;
      line-height: 22px;
      color: #172b4d;
      span {
        font-weight: 900;
      }
    }
    &__mhs {
      font-size: 15px;
    }
  }
  .info-price {
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
  }
`;
