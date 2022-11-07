import styled from "styled-components";
export const Main = styled.div`
  .ant-input {
    outline: none;
  }
  .ant-input:hover {
    border: 0px !important;
  }
  .ant-input:focus {
    border: 0px !important;
  }
  .content {
    overflow-y: auto;
    height: 415px;
    @media (max-width: 1368px) {
      height: 308px;
    }
    .item {
      background: linear-gradient(
          0deg,
          rgba(23, 43, 77, 0.05),
          rgba(23, 43, 77, 0.05)
        ),
        #ffffff;
      border-radius: 4px;
      align-items: center;
      height: 40px;
      display: flex;
      width: 100%;
      margin-top: 10px;
      padding: 0px 10px;
      .columns {
        flex: 1;
        padding-left: 10px;
      }
    }
  }
  .footer-action {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 15px;
    background: #fff;
    border-radius: 8px;
    .btn-default {
      background: #ffffff;
      mix-blend-mode: normal;
      border-radius: 8px;
      height: 40px;
      margin-right: 15px;
      border-color: #0762f7;
      img {
        padding-left: 5px;
      }
    }
    .btn-save {
      background: #0762f7;
      mix-blend-mode: normal;
      border-radius: 8px;
      height: 40px;
    }
  }
`;
