import styled from "styled-components";

export const WrapperStyled = styled.div`
  width: 100%;
  height: 100%;
  padding: 100px;
  overflow-y: scroll;
  .bor-dot {
    border-bottom: 1px dotted #000;
  }
  .bkcp-header {
    .bkcp-header-name {
      text-align: center;
      font-size: 18px;
    }
    .bkcp-header-description {
      text-align: center;
      font-style: italic;
    }
    .bkcp-header-departments {
      display: flex;
      justify-content: space-between;
      .department-left {
        width: 50%;
      }
      .department-right {
        width: 30%;
        .line-info-title {
          font-weight: bold;
        }
      }
      .line-info {
        display: flex;
        .line-info-title {
          margin-right: 15px;
          font-weight: bold;
        }
        .line-info-content {
          flex-grow: 1;
          padding-left: 10px;
          margin-left: 5px;
          border-bottom: 1px dotted;
          min-height: 20px;
          margin-right: 20px;
        }
      }
    }
  }

  .box-input {
    display: flex;
    &.w80 {
      width: 80%;
    }
    .box-input-name {
      margin-right: 15px;
    }
    .box-input-text {
      flex-grow: 1;
      margin-left: 5px;
      padding-left: 5px;
      border-bottom: 1px dotted;
      min-height: 20px;
      margin-right: 20px;
      .ant-checkbox-inner {
        border: 1px solid #777;
      }
    }
    .box-input-box {
      flex-grow: 1;
      margin-left: 5px;
      padding-left: 5px;
      border: 1px solid;
      min-height: 25px;
      margin-right: 20px;
      .ant-checkbox-inner {
        border: 1px solid #777;
      }
    }

    .box-input-name,
    b {
      font-weight: 500;
    }
    .box-input-name-n {
      font-weight: normal;
    }
  }
  .bkcp-body {
    padding-top: 30px;
    .bkcp-body-title {
      font-weight: bold;
      text-align: center;
      position: relative;
      .box-input {
        width: 90px;
        height: 35px;
        position: absolute;
        right: 0;
        top: 0;
        border: 1px solid;
      }
    }
    .bkcp-body-header {
      font-weight: bold;
      .bkcp-body-header-note {
        font-weight: normal;
        font-style: italic;
      }
    }
    .box-input {
      padding: 3px 0;
    }
    .bkcp-body-part1 {
      .bkcp-body-content {
        display: flex;
        flex-wrap: wrap;
        .box-input:nth-child(1) {
          width: 50%;
        }
        .box-input:nth-child(2) {
          width: 30%;
        }
        .box-input:nth-child(3) {
          width: 20%;
        }

        .box-input:nth-child(4) {
          width: 50%;
        }
        .box-input:nth-child(5) {
          width: 25%;
        }

        .box-input:nth-child(6) {
          width: 50%;
        }
        .box-input:nth-child(7) {
          width: 20%;
        }
        .box-input:nth-child(8) {
          width: 20%;
        }

        .box-input:nth-child(9) {
          width: 60%;
        }
        .box-input:nth-child(10) {
          width: 20%;
        }

        .box-input:nth-child(11),
        .box-input:nth-child(12) {
          width: 100%;
        }

        .box-input:nth-child(13) {
          width: 50%;
        }
        .box-input:nth-child(14) {
          width: 25%;
        }
        .box-input:nth-child(15) {
          width: 25%;
        }

        .box-input:nth-child(16),
        .box-input:nth-child(17),
        .box-input:nth-child(18),
        .box-input:nth-child(19),
        .box-input:nth-child(20),
        .box-input:nth-child(21) {
          width: 16.5%;
        }

        .box-input:nth-child(22) {
          width: 65%;
        }
        .box-input:nth-child(23) {
          width: 35%;
        }

        .box-input:nth-child(24) {
          width: 100%;
        }

        .box-input:nth-child(26) {
          width: 30%;
        }
        .box-input:nth-child(25),
        .box-input:nth-child(27),
        .box-input:nth-child(28) {
          width: 50%;
        }
      }
    }
    .bkcp-body-part2 {
      .bkcp-body-content {
        display: flex;
        flex-wrap: wrap;
        .box-input:nth-child(1) {
          width: 50%;
        }
        .box-input:nth-child(2) {
          width: 30%;
        }
        .box-input:nth-child(3) {
          width: 20%;
        }
        .table-wrapper {
          th,
          td {
            border: 1px solid;
            margin: 1px;
            .note {
              font-weight: normal;
              font-style: italic;
            }
          }
          td:nth-child(2),
          td:nth-child(3) {
            width: 60px;
          }
          td:nth-child(4),
          td:nth-child(5),
          td:nth-child(7),
          td:nth-child(9) {
            width: 120px;
          }
          td:nth-child(6),
          td:nth-child(8) {
            width: 80px;
          }
          th {
            .unit {
              font-weight: normal;
              font-style: italic;
            }
          }
          .count-top {
            td {
              text-align: center;
            }
          }
          .td-title {
            font-size: 16px;
            font-weight: bold;
          }
          .tr-empty {
            height: 28px;
          }
        }
      }
    }
  }
  .bkcp-footer {
    .bkcp-footer-signature {
      display: flex;
      justify-content: space-around;
      min-height: 220px;
      padding-top: 25px;
      .sign-item {
        text-align: center;
        width: 30%;
        .sign-item-date {
          margin-top: -20px;
        }
        .sign-item-title {
          font-weight: bold;
        }
      }
    }
    .bkcp-footer-note {
      .note-header {
        font-weight: bold;
        font-style: italic;
      }
    }
  }
`;
