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
  .ellipsisTxt {
    overflow: hidden;
    text-overflow: ellipsis;
  }

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
    margin: 8px;
    text-align: left;

    .item {
      padding-bottom: 5px;
      overflow: hidden;
      text-overflow: ellipsis;

      display: flex;
      label {
        width: 140px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }
  }

  .tt-bg {
    white-space: pre;
    padding: 2px 10px;
    margin: 8px;
    text-align: right;

    .anticon {
      padding-left: 10px;
      font-size: 16px;
      color: #0762f7;
    }
  }

  .company-more-info {
    .info {
      padding-right: 10px;

      .title {
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .detail {
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .ant-input {
    width: 80%;
  }

  .ant-select {
    width: 80%;
  }
`;
