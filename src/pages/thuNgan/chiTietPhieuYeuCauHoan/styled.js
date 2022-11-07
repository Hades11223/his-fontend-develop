import { Page } from "components";
import styled from "styled-components";
export const MainPage = styled(Page)`
  background: #f4f5f7;
  min-height: 480px;

  & .main-page .page-body {
    display: flex;
    flex-direction: column;
    & > .ant-col {
      flex: 1;
    }
  }

  & .thong-tin-benh-nhan {
    overflow: hidden;
    & .info-patient {
      overflow: hidden;
      & .info-detail {
        display: flex;
        flex-direction: column;
        overflow: auto;
        flex-flow: unset;
      }
    }
  }

  & .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    p {
      color: #172b4d;
      font-size: 24px;
      font-weight: 700;
      line-height: 24px;
      margin-bottom: 0px;
      margin-right: 10px;
    }
    .action {
      .icon-search {
        margin-right: 10px;
      }
    }
  }
  & .thong-tin-so-tien {
    background: #f3f7ff;
    box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
    border-radius: 8px;
  }

  & .thong-tin-phieu {
    background: #fff;
    overflow: auto;
    margin-top: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
    padding: 0 !important;
    & > div {
      padding: 10px 20px;
    }
  }

  .icon-list {
    margin-left: 5px;
    svg {
      width: 20px;
      height: 20px;
    }
  }
  .button-footer {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    margin: 10px -20px 0;
  }
`;
export const InputSearch = styled("div")`
  box-sizing: border-box;
  margin-right: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 3px 8px;
  width: 400px;
  position: relative;
  background: #fff;
  box-shadow: ${(props) =>
    props.focus ? "0 0 0 3px #0062ff47 !important" : null};
  border: ${(props) =>
    !props.focus ? "2px solid #dfe1e6;" : "1px solid #0762f7 !important"};
  :hover {
    border: 1px solid #0762f7 !important;
    box-shadow: 0 0 0 3px #0062ff47;
  }
  .anticon-search {
    margin: 0 10px;
  }
  img {
    margin: 0 10px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  input {
    border: none !important;
    box-shadow: none !important;
    :hover {
      border: none !important;
      box-shadow: none !important;
    }
    :focus {
      border: none !important;
      box-shadow: none !important;
    }
  }
`;
