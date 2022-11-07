import styled from "styled-components";

export const Main = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .btn-custom {
    padding-right: 10px;
  }

  .import-btn {
    margin-right: 10px;
    border-radius: 8px;
    box-shadow: 0px 3px 0px #7a869a;
    border: 1px solid #7a869a;
    height: 35px;

    span {
      margin: 2px;
      color: #172b4d;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
    }
  }

  .title {
    align-items: center;
    margin-bottom: 16px;
    font-weight: 700;
    font-size: 16px;
    color: #172b4d;

    a {
      margin: 0 5px;
      font-size: 14px;
    }
  }

  .anticon {
    color: #0762f7;
    font-size: 16px;
    padding: 0 4px;
  }
  & .pagination {
    margin-top: 10px;
    margin-bottom: 0;
    & .anticon {
      color: rgba(0, 0, 0, 0.85);
    }
  }
`;
