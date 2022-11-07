import styled from "styled-components";

export const Main = styled.div`
  height: 100%;
  margin: 10px;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 16px;
    font-weight: 700;
    font-size: 16px;
    color: #172b4d;

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

  .table-content {
    height: calc(100% - 80px);
  }
`;
