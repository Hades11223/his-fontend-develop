import styled from "styled-components";

export const Main = styled.div`
  .form {
    padding: 10px 20px;
    &-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 5px;

      .label {
        display: flex;
        width: 140px;
      }

      .content {
        flex: 1;
        .ant-select,
        .ant-picker {
          width: 100%;
          margin: 0 5px;
        }

        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
  }

  .footer-action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 16px;
    .selected-item {
      flex: 1;
    }

    .back-text {
      color: #0762f7;
    }
  }
`;
export const MainHeader = styled.div`
  &.header-title {
    display: flex;
    justify-content: space-between;

    .title {
      color: #172b4d;
    }

    .title-goi {
    }
  }
`;
