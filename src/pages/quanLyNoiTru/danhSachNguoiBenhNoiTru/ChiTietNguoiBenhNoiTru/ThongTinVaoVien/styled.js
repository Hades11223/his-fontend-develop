import styled from "styled-components";
export const Main = styled.div`
  width: 100%;
  .ant-row {
    width: 100%;
  }

  .content-tab {
    .item-sub {
      margin-bottom: 10px;
    }
  }
  .info {
    padding-bottom: 10px;
    .title {
      background: #e6effe;
      border-radius: 4px 4px 0px 0px;
      width: 100%;
      font-weight: 700;
      font-size: 16px;
      line-height: 22px;
      color: #172b4d;
      height: 40px;
      align-items: center;
      display: flex;
      flex: none;
      order: 0;
      align-self: stretch;
      flex-grow: 0;
      margin: -1px 0px;
      padding-left: 10px;
      img {
        padding-left: 10px;
      }
      svg {
        margin-left: 10px;
        path {
          fill: #0762f7;
        }
        :hover {
          cursor: pointer;
        }
      }
    }
    .content-tab {
      width: 100%;
      border: 1px solid #e6effe;
      padding: 10px 0px 0px 10px;
    }
  }
`;
