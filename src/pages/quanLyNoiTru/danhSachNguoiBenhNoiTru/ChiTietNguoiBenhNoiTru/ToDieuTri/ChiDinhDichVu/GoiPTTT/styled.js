import styled from "styled-components";

export const Main = styled.div`
  .header {
    background: linear-gradient(
        0deg,
        rgba(23, 43, 77, 0.1),
        rgba(23, 43, 77, 0.1)
      ),
      #ffffff;
    height: 36px;
    width: 100%;
    text-transform: uppercase;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .anticon {
      font-size: 20px;
      margin: 0 10px;
    }

    label {
      color: #172b4d;
      font-weight: 700;
      font-size: 16px;
    }
  }

  .content {
    &-them-moi {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-bottom: 10px;

      .ant-input {
        margin-left: 20px;
        width: 250px;
      }
    }

    &-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;

      .anticon {
        font-size: 110px;
      }
    }

    &-table {
      .ten-dv {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .anticon {
          margin-right: 10px;
        }

        .ic-arrow {
          font-size: 10px;
        }

        .ic-check {
          font-size: 20px;
        }
      }

      .ic-delete,
      .ic-edit {
        font-size: 18px;
        padding: 0 2px;
      }
    }
  }
`;
