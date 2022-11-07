import styled from "styled-components";
export const Main = styled.div`
  height: 100%;
  padding: 16px 32px 32px 32px;
  font-size: 16px;

  .tenDv {
    margin-bottom: 10px;
  }

  .ttDv {
    font-size: 14px;
  }

  .item {
    display: flex;
    justify-content: flex-start;

    .label {
      margin-right: 5px;
    }

    .content {
      flex: 1;
      font-weight: 700;
    }
  }

  .footer-btn {
    display: flex;
    padding-top: 20px;
    justify-content: end;
  }
  li {
    list-style-type: disc;
    margin-left: 20px;
  }
  .page-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    border: 3px solid #cdddfe;
    margin-top: 15px;
    .ant-card-head {
      min-height: 0;
      padding: 0 5px;
      .ant-card-head-wrapper {
        .ant-card-head-title {
          font-weight: bold;
          padding: 5px 0;
        }
      }
    }
    .ant-card-body {
      padding: 0px;
      .ant-row {
        padding-top: 0px;
      }
    }
  }
`;
