import styled, { createGlobalStyle } from "styled-components";
import { Popover } from "antd";
export const Main = styled.div``;
export const PopoverStyled = styled(Popover)``;
export const SearchDate = styled.div`
  display: inline-block;
  position: relative;
  input {
    color: #7a869a;
    font-family: Nunito Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    width: 205px;
  }
`;

export const GlobalStyles = createGlobalStyle`
  & .ds-nb-select-phong-kham {
      &.ant-select-dropdown {
        min-width: 320px !important;
        width :320px !important;
      }
  }

  & .ds-nb-select-trang-thai {
      &.ant-select-dropdown {
        min-width: 150px !important;
        width :150px !important;
      }
  }

  & .ds-nb-select-bac-si {
      &.ant-select-dropdown {
        min-width: 200px !important;
        width :200px !important;
      }
  }

  .popover-modal-date-custom{
    width: ${(props) => props.width + "px"};
    height: ${(props) =>
      props.height === "auto" ? props.height : props.height + "px"};
      & .optional{
        height: 460px;
        border-radius: 8px;
        border: 1px solid #172b4d30;
        padding: 0px !important;
        display: flex;
        flex-direction: column; 
        overflow: hidden;
        & .date-content{
          padding: 0px 16px;
          flex: 1;
          overflow: hidden;
          & .select-date{
            & > div:last-of-type{
              position: unset !important;
              margin-top: 16px;
            }
            & .ant-picker-dropdown{
              position: unset !important;

            }
            & .ant-picker{
              width: 100%;
            }
          }
        }
      }
    .footer{
      justify-content: flex-end;
      margin: 16px;
    }
    .ant-picker-dropdown{
      top: 75px !important;
      .ant-picker-panel-container{
        box-shadow: none;
        border: 1px solid #0000000d
      }
    }
    .title-dropdow{
      font-family: Nunito Sans;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      padding: 8px 16px;
      background: linear-gradient(0deg, rgba(23, 43, 77, 0.1), rgba(23, 43, 77, 0.1)), #FFFFFF;
    }
    .ant-popover-inner-content{
      height: ${(props) =>
        props.height === "auto" ? props.height : props.height + "px"};
      padding : 6px ;
    }
    .ant-popover-arrow{
      display: none;
    }
    .content-popover{
      &_button {
        background: linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #0762F7; border-radius: 4px;
        margin-bottom: 6px;
        padding: 6px;
        cursor: pointer;
        font-family: Nunito Sans;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 19px;
        letter-spacing: 0px;
        text-align: left;
        &.active{
          background: #0762F7;
          color: white;
          &:hover{
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), #0762F7;
          }
          &:active {
            background: #0762F7;
          }
        }
      }
    }
  }
`;
