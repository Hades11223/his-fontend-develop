import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  background: #ffffff;
  padding-bottom: 20px;
  padding: 16px;
  height: 100%;
  overflow: auto;
  padding-bottom: 0;
  max-height: 100%;
  & > div {
    margin-bottom: 16px;
    min-height: 200px;
  }
  & .ant-table-wrapper {
    & .custome-header {
      & .title-box {
        border-bottom: none !important;
        min-height: 30px !important;
      }
    }
  }
  & .ant-input-affix-wrapper {
    padding: 2px 11px;
  }
  & .btn-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .title {
      color: #172b4d;
      font-size: 16px;
      font-weight: 700;
    }
    .content-thu-gon {
      color: #0762f7;
      font-size: 16px;
      font-weight: 700;
      display: flex;
      align-items: center;
      span {
        margin-right: 5px;
      }
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
`;
