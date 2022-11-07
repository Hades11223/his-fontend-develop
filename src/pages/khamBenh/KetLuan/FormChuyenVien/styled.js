import styled, {createGlobalStyle} from "styled-components";
import { PhieuChiDinhWrapper } from "../styled";

export const Main = styled(PhieuChiDinhWrapper)`
  & .group-kinh-gui {
    width: 60%;
    margin-bottom: 30px;
    & .kinh-gui {
      color: red;
    }
  }
  & .red {
    color : #FF0000
  }
  & .width300 {
    width: 300px;
  }
  & .width250 {
    width: 250px;
  }
  & .width200 {
    width: 200px;
  }
  & .width180 {
    width: 180px;
  }
  & .width150 {
    width: 150px;
  }
  & .width110 {
    width: 110px;
  }
  & .width100 {
    width: 100px;
  }
  & .max-width {
    width: 100%;
  }
  & .p-0 {
    padding: 0;
  }
  & .p-5 {
    padding: 0 5px;
  }
  & .mr-0 {
    margin: 0;
  }
  & .mrr-20 {
    margin-right: 20px;
  }
  & .mrh-5 {
    margin-left: 5px;
    margin-right: 5px;
  }
  & .ly-do-chuyen-tuyen {
    margin: 5px 0;
    display: flex;
    align-items: center;
    & .checkbox-panel {
      width: 50px;
      height: 30px;
      border: 2px solid #acacac;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 5px;
      & i {
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 7.5px;
        border: 1px solid blue;
      }
    }
  }
`;
export const SelectGroupChuyenVien = styled.div`
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
        /* height: ${(props) => (props.dimension?.firstHeight ? props.dimension?.firstHeight + "px" : "auto")}; */
        /* height: ${(props) => (props.dataHeight ? props.dataHeight + "px" : "auto")}; */
    }
    .select-box {
        display: inline-block;
    .ant-select-selector {
        margin-top: -13px;
        background: none;
        border: 0;
    }
    }
    .red-text {
        color: #ef4066;
    }
    .select-box {
        display: inline-block;
        & .ant-select {
            width: 100%;
            & .ant-select-selector {
            margin-top: -13px;
            background: none;
            border: 0;
            }
        }
    }
    .select-box-chuyen-vien {
        display: inline-block;
        width: 100%;
        & .ant-select .ant-select-multiple .ant-select-allow-clear .ant-select-show-search{
            width: auto
        }
        & .ant-select {
            width: 100%;
            &.ant-select-show-search {
                width: auto
            }
            & .ant-select-selector {
            margin-top: -13px;
            background: none;
            border: 0;
              & .ant-select-selection-overflow {
                width: 380px
              }
            }
        }
    }
`;
export const GlobalStyle = createGlobalStyle`
    .date-custom-kham-benh-chuyen-vien {
        .ant-picker-header-super-prev-btn{
            display: none;
        }
        /* .ant-picker-header-prev-btn{
            margin-left: 15px !important;
        } */
        .ant-picker-header-super-next-btn{
            display: none;
        }
        /* .ant-picker-header-next-btn{
            margin-right: 15px !important;
        } */
    }
`;
