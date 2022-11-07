import styled from "styled-components";
import { select, input } from "components/mixin";

export const Main = styled.div`
  margin-bottom: 20px;
  .disable-button {
    background-color: #909090;
    box-shadow: 0 3px 0 #444;
  }
  &.container {
    & .first-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 10px 0px 10px;
    }
    font-family: "Nunito Sans" !important;
    .second-row {
      position: relative;
      padding: 10px;
      width: 100%;
      &:last-of-type {
        padding: 0 10px;
        display: flex;
        align-items: center;
      }
      .ant-col {
        padding: 0;
        padding-right: 5px;
        &:first-of-type {
          padding-right: 5px;
        }
        &:last-of-type {
          padding-left: 5px;
          padding-right: 0px;
        }
        .item-select {
          ${select};
          margin-bottom: 10px;
        }
        .item-input {
          ${input}
          .ant-input {
            margin-top: 0;
            border-radius: 4px;
          }
        }
        & .mt-10 {
          margin-top: 10px;
        }
        & .close {
          box-shadow: 0px 3px 0px #03317c;
          border: 1px solid #03317c;
          color: #000;
          font-weight: 600;
          :hover {
            background: linear-gradient(
                0deg,
                rgba(255, 255, 255, 0.9),
                rgba(255, 255, 255, 0.9)
              ),
              #0762f7;
          }
          :active {
            background: linear-gradient(
                0deg,
                rgba(0, 0, 0, 0.25),
                rgba(0, 0, 0, 0.25)
              ),
              #0762f7;
            color: #fff;
          }
        }
        .elipsis {
          color: #7a869a;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
    .btn-thong-ke {
      font-weight: 600;
      font-size: 16px;
      color: #0762f7;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
      svg {
        margin-left: 10px;
      }
    }
    .label {
      font-weight: 600;
      font-size: 16px;
      color: #172b4d;
    }
  }
  & .btn-dong-quay {
    margin: 0;
    & .button-content {
      color: #000;
      text-align: left;
      text-overflow: ellipsis;
      font-weight: 600;
      font-size: 18px;
    }
  }
  & .btn-nb-tiep-theo {
  }
  @media (max-width: 1280px) {
    & .btn-dong-quay,
    & .btn-nb-tiep-theo {
      & .button-content {
        font-weight: 600;
        font-size: 10pt;        
      }
      height: 30px;
    }
  }
`;
