import styled from "styled-components";

export const Main = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  flex-direction: column;

  .pagination {
    padding: 1em;
    margin: 0 1px;
    box-shadow: 0px 3px 5px rgb(9 30 66 / 20%), 0px 0px 1px rgb(9 30 66 / 31%);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`

export const ThongTinDichVuCpn = styled.div`
  margin: 1rem;
 .input-option {
    width: 100%;
    font-weight: 600;
    height: 35px;
    background: #fff0;
    border: 2px solid rgba(23, 43, 77, 0.1);
    box-sizing: border-box;
    border-radius: 4px;
  }
  .ant-select {
      width: 100%;
      background: #fff0;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      .ant-select-selection-placeholder,
      .ant-select-selection-item {
        // color: #172b4d87;
        font-size: 16px;
        font-weight: 600;
      }
    }
    .button-bottom-modal {
      margin-left: auto;
      text-align: right;
      position: absolute;
      bottom: 0;
      right: 0;
      margin: 20px;
      display: flex;
      .button-cancel {
        margin-right: 18px;
        background: #ffffff;
        width: 100px;
        border: 1px solid #7a869a;
        @media (max-width: 1366px) {
          margin-right: 0.5em;
        }
      }
      .button-cancel:hover {
        background: #7a869a;
        color: #fff;
      }
      .button-ok {
        background: #0762f7;
        color: white;
        width: 100px;
      }
      .button-ok:hover {
        background: #054ab9;
      }
      button {
        height: auto;
        padding: 5px 5px;
        border-radius: 8px;
        border: 1px solid #0762f7;
        /* box-shadow: 0px 3px 0px #03317c; */
        font-weight: 600;
        font-size: 16px;
        color: #172b4d;
        @media (max-width: 1366px) {
          font-size: 14px;
          padding: 4px 20px;
        }
      }
      .button-header {
        padding: 20px;
      }
    }
`

export const LoaiDoiTuongCpn = styled.div`
padding: 0 0 2rem;
`

