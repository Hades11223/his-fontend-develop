import styled, { createGlobalStyle } from "styled-components";
export const Main = styled.div`
  height: 100%;
  padding: 16px;
  .dieuTriSoKet {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 80%;
    justify-content: center;
  }
  .image {
    display: flex;
    justify-content: center;
    img {
      margin-left: 10px;
    }
  }
  .title {
    display: flex;
    .right {
      margin-left: auto;
    }
  }
  .item {
    display: flex;
    overflow: hidden;
  }
`;

export const SelectGroup = styled.div`
  line-height: 25px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 6 6"><circle cx="3" cy="3" r="0.4" fill="black" /></svg>')
    20px;
  background-position-y: 12px;
  background-size: 5px 28px;
  margin-top: 10px;
  display: flex;
  > span {
    display: inline-block;
    padding-right: 5px;
    background: #ffffff;
    vertical-align: sub;
    flex: 1 0 auto;
    /* height: ${(props) =>
      props.dataHeight ? props.dataHeight + "px" : "auto"}; */
  }
  .red-text {
    color: #ef4066;
  }
  .select-box {
    display: inline-block;
    width: 100%;
    &
      .ant-select
      .ant-select-multiple
      .ant-select-allow-clear
      .ant-select-show-search {
      width: auto;
    }
    & .ant-select {
      width: 100%;
      &.ant-select-show-search {
        width: auto;
      }
    }
    & .ant-select-selector {
      background: none;
      border: 0;
    }
  }
  & .ant-select-single {
    & .ant-select-selection-item {
      line-height: 38px;
    }
  }
`;
export const GlobalStyle = createGlobalStyle`
.popover-list-giay-in{
  .ant-popover-inner-content{
    padding: 0;
    .item-file{
      padding: 10px;
      :hover{
        cursor: pointer;
        background: #dedede;
      }
    }
  }
  }
`;

export const MainBienBanHoiChan = styled.div`
  background: #f4f5f7;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  fieldset {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }
  .container {
    padding: 0 8px !important;
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
    flex: 1;
    overflow-y: scroll;
    margin-top: 16px;
    margin-bottom: 16px;
    .date {
      display: flex;
      padding-left: 20px;
      align-items: center;
      padding-bottom: 20px;
      .left {
        display: flex;
        align-items: center;
        .title {
          padding-right: 7px;
        }
      }
      .right {
        margin-left: auto;
      }
    }
    .info {
      height: calc(100vh - 360px);
      overflow: auto;
    }
    .table-content {
      display: flex;
      flex-direction: column;
      .table-header {
        display: flex;
        margin-bottom: 10px;
        .left {
          border-radius: 4px;
          border: 3px solid #cdddfe;
          width: 200px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;
          cursor: pointer;
          img {
            object-fit: none;
          }
        }
        .right {
          position: relative;
          width: 275px;
          margin-left: auto;
          > img {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 0;
            z-index: 1;
            padding: 0 8px;
            width: 30px;
          }
          input {
            padding-left: 25px;
          }
        }
      }
    }
  }
  h1 {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
  }

  .action-bottom {
    display: flex;
    .button-left {
      display: flex;
    }
    .button-right {
      margin-left: auto;
      display: flex;
    }
  }

  .footer {
    margin-top: 16px;
    display: flex;
    justify-content: end;
  }

  ul > li {
    list-style-type: disc;
    margin-left: 20px;
  }
`;
