import styled from "styled-components";
import { Popover } from "antd";

export const PopoverWrapper = styled(Popover)``;

export const Main = styled.div`
  &.them-moi {
    display: flex;
    .form-item {
      margin-bottom: 20px;
      &_address {
        width: 100%;
      }
      input {
        outline: 0;
        border-width: 0 0 1px;
        padding: 0 1em 0 8.5px !important;
        font-weight: 600;
        font-size: 14px;
        line-height: 19px;
        color: #172b4d;
        &::placeholder {
          color: black;
        }
        &:hover {
          border-color: unset;
          border-right-width: 0px !important;
        }
        &:focus {
          outline: 0;
          border-color: unset;
          border-right-width: 0px !important;
          box-shadow: 0px;
        }
        /* &:not(:focus):valid{
                    &~ .floating-label{
                        top: 8px;
                        bottom: 10px;
                        left: 20px;
                        font-size: 11px;
                        opacity: 1;
                    }
                } */
      }
      /* .inputText {
            font-size: 14px;
            width: 200px;
            height: 35px;
            }

            .floating-label {
            position: absolute;
            pointer-events: none;
            left: 20px;
            top: 18px;
            transition: 0.2s ease all;
            } */
    }
  }
    .doctor{
      width: 100%;
      .ant-col{
        display: flex;
        .detail-last{
          width: 100%;
        }
      }
  }
`;
