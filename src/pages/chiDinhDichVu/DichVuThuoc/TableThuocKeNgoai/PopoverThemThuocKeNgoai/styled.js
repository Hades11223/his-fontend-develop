import styled from "styled-components";

export const Main = styled("div")`
  position: relative;
  z-index: 1001;
  background-color: white;
  & .title-popup {
    background: linear-gradient(
        0deg,
        rgba(23, 43, 77, 0.1),
        rgba(23, 43, 77, 0.1)
      ),
      linear-gradient(0deg, rgb(255, 255, 255), rgb(255, 255, 255));
    font-family: "Nunito Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0px;
    text-align: left;
    padding: 8px 16px;
  }
  .popover-btn-list {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    margin: 0 12px;
  }
  .ant-form-item {
    padding-right: 0 !important;
    .ant-select {
      border: 1px solid #d9d9d9 !important;
      border-radius: 0px !important;
      .ant-select-selection-item {
        font-size: 14px !important;
        font-weight: normal !important;
      }
      .ant-select-selection-placeholder {
        font-size: 14px !important;
        font-weight: normal !important;
        color: #bfbfbf !important;
      }
    }
  }
`;
