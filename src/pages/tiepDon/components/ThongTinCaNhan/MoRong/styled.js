import styled from "styled-components";
import { checkbox, input, date, select } from "components/mixin";

export const Main = styled.div`
  padding: 10px;
  .ant-col {
    padding: 0;
    padding-right: 5px;
    margin-bottom: 0;
    &:last-of-type {
      padding-right: 0;
    }
  }
  .row-name {
    padding: 0 8px;
    .ant-col {
      padding: 0;
      padding-right: 5px;
      margin-bottom: 0;
      &:last-of-type {
        padding-right: 0;
      }
      .checkbox {
        ${checkbox};
        margin-bottom: 29px;
      }
      .optimize {
        position: relative;
        .icon {
          position: absolute;
          right: -5px;
          bottom: 49px;
          width: 44px;
          height: 44px;
        }
        .text {
          margin-top: 8px;
          font-weight: bold;
          font-size: 16px;
          line-height: 22px;
          text-align: center;
          color: #172b4d;
        }
        .image {
          height: 150px;
          width: 100%;
          object-fit: cover;
          border-radius: 10px;
          @media (max-width: 1440px) {
            height: 125px;
          }
          @media (max-width: 1024px) {
            height: 220px;
          }
          @media (max-width: 768px) {
            height: 180px;
          }
        }
      }
      .avatar-no-drop {
        cursor: no-drop;
      }
    }
  }

  .ant-col {
    padding: 0 6px;
    margin-bottom: 20px;
    &:first-of-type {
      /* padding-left: 10px; */
    }
    &:last-of-type {
      /* padding-right: 10px; */
    }
    .item-input {
      ${input}
      margin-bottom: 18px;
    }
    .item-date {
      ${date};
      margin-bottom: 18px;
    }
    .item-select {
      ${select};
      margin-bottom: 18px;
    }
  }
`;
export const ActionBottom = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  & > div {
    display: flex;
    align-items: center;
    cursor: pointer;
    & svg.icon {
      width: 20px;
      height: 20px;
      margin-left: 5px;
      transform: rotate(180deg);
    }
  }
`;
