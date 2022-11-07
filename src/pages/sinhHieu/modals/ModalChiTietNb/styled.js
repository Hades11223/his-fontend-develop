import styled from "styled-components";

export const Main = styled.div`
  .content {
    padding: 16px;

    &-tt-nb {
      background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.9),
          rgba(255, 255, 255, 0.9)
        ),
        #a8c4f1;
      border-radius: 16px;

      padding: 16px;
    }

    &-form {
      padding: 20px 40px 20px 0;
      .ant-form-item {
        .ant-input-number {
          width: 100%;
        }
      }

      &-item {
        &-huyet-ap {
          display: flex;
          justify-content: center;
          align-items: center;

          .ant-form-item {
            flex: 2;
          }

          div {
            flex: 1;
            text-align: center;
          }
        }
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

  .ant-input-affix-wrapper {
    background-color: unset !important;
    border: none;
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
