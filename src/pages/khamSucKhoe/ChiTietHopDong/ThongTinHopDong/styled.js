import styled from "styled-components";

export const Main = styled.div`
  width: 100%;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.95),
      rgba(255, 255, 255, 0.95)
    ),
    #0762f7;

  box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
  border-radius: 8px;

  .ma-bg {
    white-space: pre;
    border: 2px dashed #0762f7;
    padding: 2px 10px;
    margin: 8px;
    text-align: center;

    .value {
      font-weight: 900;
      color: #0762f7;
      font-size: 18px;
    }
  }

  .ten-bg {
    white-space: pre;
    padding: 2px 10px;
    margin: 8px 8px 0 8px;
    text-align: left;

    .item {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      label {
        width: auto;
        min-width: 100px;
      }

      span {
        padding: 0 5px;
        font-weight: bold;
      }

      .ellipsisTxt {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .tt-bg {
    white-space: pre;
    padding: 2px 5px;
    margin: 5px;
    text-align: right;

    .anticon {
      padding-left: 10px;
      font-size: 16px;
      color: #0762f7;
    }
  }

  .company-more-info {
    margin: 0px 8px 0px 8px;
    padding: 0px 10px;
    .info {
      padding-right: 30px;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .title {
        /* font-weight: bold; */
        overflow: hidden;
        text-overflow: ellipsis;
        width: auto;
        min-width: 100px;
      }

      .detail {
        flex: 1;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 5px;
      }
    }
  }

  .alignRightTxt {
    /* text-align: right; */
  }

  .ant-input {
    width: 80%;
  }

  .ant-select {
    width: 80%;
  }
`;
