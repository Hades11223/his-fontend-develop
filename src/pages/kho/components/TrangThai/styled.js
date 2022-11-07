import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  &.progress-step {
    text-align: center;
    & .node {
      position: relative;
      &:before,
      &:after {
        content: "";
        position: absolute;
        top: 9px;
        width: 10px;
        height: 1px;
        background: gray;
      }
      &:before {
        left: -11px;
      }
      &:after {
        right: -11px;
      }
      &:first-of-type {
        &:before {
          display: none;
        }
      }
      &:last-of-type {
        &:after {
          display: none;
        }
      }

      margin: 0px 10px;
      background: #ffffff;
      border-radius: 12px;
      border: 1px solid gray;
      height: 20px;
      min-width: 120px;
      .step-text {
        font-size: 13px;
        line-height: 18px;
        color: #172b4d;
        text-align: center;
        & .anticon {
          display: none;
        }
      }
      & .step-desc {
        color: #7a869a;
        font-style: italic;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
        margin-top: 4px;
      }
      &.disable {
        background: linear-gradient(
            0deg,
            rgba(23, 43, 77, 0.1),
            rgba(23, 43, 77, 0.1)
          ),
          #ffffff;
        & .step-text {
          color: #7a869a;
        }
      }
      &.finish {
        border: 1px solid #049254;
        & .step-text {
          color: #7a869a;
          & .anticon {
            display: inline-block;
            margin-left: 5px
          }
        }
      }
    }
  }
`;
