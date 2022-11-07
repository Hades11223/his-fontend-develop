import styled from "styled-components";

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin-left: 10px;
  }
`;

export const Main = styled.div`
  padding: 10px;
  font-family: Nunito Sans;
  .text-bold {
    color: #172b4d;
    font-weight: bold;
  }
  .text-bolder {
    color: #172b4d;
    font-size: 18px;
    font-weight: bold;
  }
  .type-discount {
    .main__container {
      margin-top: 0;
      border-radius: 16px 0px 0px 0px;
      .ant-table-header {
        padding: 8px 0 8px 0;
        .title-box {
          min-height: 31px;
        }
      }
      .ant-table-body {
        min-height: auto;
      }
    }
    .item-row {
      margin: 15px auto;
      display: flex;
      align-items: center;
      .title {
        flex: 1;
      }
      .num {
        flex: 2;
      }
      .ant-input-number {
        width: 240px;
      }
    }
    .item-row-voucher {
      margin: 10px auto 5px auto;
      display: flex;
      align-items: center;
      .title {
        flex: 1;
      }
      .num {
        flex: 2;
      }
      .ant-input-number {
        width: 240px;
      }
    }

    .describe {
      font-style: italic;
      font-weight: normal;
      font-size: 14px;
      line-height: 19px;
      color: #14142b;
      margin-top: 5px;
      margin-bottom: 20px;
    }
    .receipt {
      .num {
        flex: 2;
      }

      .miengiam-noidung {
        background: linear-gradient(
            0deg,
            rgba(23, 43, 77, 0.05),
            rgba(23, 43, 77, 0.05)
          ),
          #ffffff;

        box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
        border-radius: 16px;
        .title {
          padding: 10px 20px;
        }
        .title-2 {
          margin: 8px 20px;
          font-style: italic;
          font-weight: bold;
          font-size: 16px;
          line-height: 24px;
          color: #049254;
        }
        .subtitle {
          padding: 10px auto;
        }
        .text-center {
          text-align: center;
        }
      }
    }
  }
`;
