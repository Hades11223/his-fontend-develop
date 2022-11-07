import styled from "styled-components";
export const Main = styled.div`
  background: #f4f5f7;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: -webkit-fill-available;

  & .ant-tabs-content {
    overflow: hidden !important;

    &
      .main__container
      .ant-table-wrapper
      .ant-spin-nested-loading
      .ant-spin-container
      .ant-table
      .ant-table-container
      .ant-table-body {
      height: calc(100vh - 533px) !important;
      min-height: calc(100vh - 533px) !important;
      max-height: calc(100vh - 533px) !important;
    }
  }

  .text-tab {
    display: inline-block;
    text-transform: lowercase;
    &::first-letter {
      text-transform: uppercase;
    }
  }
  .icon-tab {
    margin-right: 10px;
  }
  .ant-row {
    width: 100%;
  }
  .header-left {
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.95),
        rgba(255, 255, 255, 0.95)
      ),
      #0762f7;
    /* shadow-khung */

    box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
    border-radius: 8px;
  }
  .content {
    background: #fff;
    margin-top: 20px;
    height: calc(100vh - 320px);
    display: flex;
    flex-direction: column;
    img {
      object-fit: none;
    }
  }

  .ant-tabs-content {
    height: 100%;
    overflow-y: scroll;
  }
  .ant-tabs-content-holder {
    border: 3px solid #cdddfe;
  }
  h1 {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
  }

  .footer {
    display: flex;
    justify-content: end;
  }
`;
