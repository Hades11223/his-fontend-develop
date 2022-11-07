import styled, { createGlobalStyle } from "styled-components";
export const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  & .thong-tin-goi {
    & > .ant-row {
      margin-bottom: 8px;
    }
    & .item {
      display: flex;
      align-items: center;
      font-family: "Nunito Sans";
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 18px;
      & .label {
        margin-right: 5px;
      }
      & .text-content {
        font-weight: 700;
        font-size: 13px;
        flex: 1;
      }
    }

    & .title-goidv {
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > a.action-chinh-sua-goi {
        display: flex;
      }
    }
  }
  & .dich-vu-trong-goi {
    font-weight: 700;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
    & > div {
      display: flex;
    }
  }
  & .main-table-wrapper {
    overflow: inherit;
  }
  & svg.ic-action {
    height: 20px;
    width: 20px;
    cursor: pointer;
    margin-left: 10px;
  }
`;

export const GlobalStyle = createGlobalStyle`
& .popover-tong-tien-mien-giam{
  & .ant-popover-inner-content{
    padding-top:5px;
  }
  & .item {
      display: flex;
      align-items: center;
      font-family: "Nunito Sans";
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 18px;
      & .label {
        margin-right: 5px;
        min-width: 200px;
      }
      & .text-content {
        font-weight: 700;
        font-size: 13px;
        flex: 1;
      }
      min-height: 40px;
      border-bottom: 1px solid #bababa;
    }

}
`;
