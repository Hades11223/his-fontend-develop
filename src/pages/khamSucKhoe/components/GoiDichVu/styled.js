import styled from "styled-components";
export const Main = styled.div`
  margin: 10px;

  .goidv-title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: #172b4d;
    margin-bottom: 16px;

    label {
      font-size: 20px;
    }

    .button-header {
      background: #049254;
      border-radius: 8px;
      border: none;
      display: flex;
      align-items: center;
      padding: 5px 15px;
      margin: 5px 0px;
      height: auto;
      font-weight: 600;
      font-size: 16px;
      color: #ffffff;

      img {
        margin-left: 5px;
      }
    }
  }

  /* .goidv-panel {
    margin: 10px;
  } */

  .ant-collapse {
    margin: 5px 0;
  }

  .ant-collapse-header {
    font-weight: 700;
    font-size: 20px;
    line-height: 27px;
    color: #172b4d;

    .uppper-text {
      text-transform: uppercase;
    }

    img {
      margin-left: 10px;
    }
  }

  .anticon {
    color: #0762f7;
    font-size: 16px;
    padding: 0 4px;
  }

  .empty-list {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    flex-direction: column;
    align-items: center;

    .ant-btn {
      border-radius: 8px;
      background: #0762f7;
    }

    .anticon {
      font-size: 100px;
      color: #838e9f;
    }
  }
`;
