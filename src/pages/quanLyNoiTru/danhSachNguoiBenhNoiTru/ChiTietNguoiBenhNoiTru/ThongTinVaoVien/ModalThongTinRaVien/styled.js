import styled from "styled-components";

export const Main = styled.div`
  padding: 20px;
  .date {
    display: flex;
    padding-top: 5px;
    .title {
      display: flex;
      flex: 1 0 auto;
      width: 150px;
    }
    .ant-picker {
      width: 100%;
    }
  }
  .title-error {
    font-size: small;
    font-style: italic;
    color: red;
  }
  .flex {
    display: flex;
  }

  .more-info {
    width: 100%;
    .ant-collapse {
      border: none;

      .ant-collapse-header-text {
        font-weight: bold;
      }

      .ant-collapse-content {
        border: none;
      }
      .ant-collapse-item {
        background: #ffffff;
        border: none;
      }
    }
  }
`;
