import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  height: 100%;
  .row-actived {
    background: #c1f0db !important;
  }
  font-family: Nunito Sans;
  .ant-popover {
    z-index: 9999;
  }
  .permission-action {
    background: linear-gradient(
        0deg,
        rgba(23, 43, 77, 0.1),
        rgba(23, 43, 77, 0.1)
      ),
      #ffffff;
    border-radius: 20px 0px 0px 0px;
    width: 100%;
    .header-permission {
      padding: 10px 30px;
      color: #172b4d;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
    }

    .content-permission {
      background-color: #ffffff;
      .action-filter {
        padding: 5px 11px;
        display: flex;
        align-items: center;
        .check {
          flex-basis: 20%;
          span {
            font-style: normal;
            font-weight: bold;
            font-size: 16px;
            line-height: 115%;
          }
          .ant-checkbox-wrapper {
            margin-right: 10px;
          }
        }
        .select {
          flex-basis: 25%;
          padding: 0 8px;
        }

        .addition-box {
          padding: 0 5px;
          margin: 3px 0;
          min-height: 33px;
          background: #ffffff;
          .ant-picker {
            border: 2px solid #dfe1e6;
            border-radius: 17px;
            position: relative;
            height: 34px;
          }
          .input-box {
            border: 2px solid #dfe1e6;
            border-radius: 17px;
            position: relative;
            height: 34px;

            img {
              position: absolute;
              top: 29%;
              left: 0;
              z-index: 1;
              padding: 0 8px;
            }
            input {
              position: absolute;
              border: none;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              border-radius: 17px;
              padding-left: 24px;
              font-weight: 600;
              color: #172b4d;
              font-size: 14px;
              &:placeholder-shown {
                font-weight: 600;
                font-size: 14px;
                color: #7a869a;
              }
            }
            .ant-input-number {
              display: block !important;
              border: none !important;
              position: initial !important;
              .ant-input-number-handler-wrap {
                display: none;
              }
            }
            .ant-input-number-focused {
              box-shadow: none !important;
            }
          }
          .ant-select {
            width: 100%;
            &.ant-select-open {
              .ant-select-selection-item {
                color: #7a869a;
              }
            }
            .ant-select-selector {
              text-align: center;
              border-radius: 17px;
              border: 2px solid #dfe1e6;
            }
            .ant-select-selection-placeholder {
              font-style: normal;
              font-weight: 600;
              font-size: 14px;
              color: #7a869a;
            }
            .ant-select-selection-item {
              font-style: normal;
              font-weight: 600;
              font-size: 14px;
              color: #172b4d;
            }
          }
        }
      }
      .list-func {
        overflow: auto;
        max-height: 450px;
        &__title {
          background: #e6effe;
          padding: 15px 11px;
          font-style: normal;
          font-weight: bold;
          font-size: 16px;
          line-height: 115%;
          color: #172b4d;
        }
        &__content {
          padding: 10px;
          .grid-container {
            display: grid;
            grid-gap: 20px 40px;
            grid-template-columns: auto auto auto;
          }
        }
      }
    }
  }
  .h-100 {
    height: 100%;
  }
`;
