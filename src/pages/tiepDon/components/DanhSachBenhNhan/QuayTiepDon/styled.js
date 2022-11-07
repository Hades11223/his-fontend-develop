import styled from "styled-components";
import { Row } from "antd";
import { button } from "components/mixin";

export const Main = styled(Row)`
  & .ant-select {
    margin-top: 0 !important;
    & .ant-select-selector {
      /* border: 1px solid #03317c !important; */
      color: #03317c !important;
      background-color: #fff !important;
    }
  }
  .button-close {
    margin-top: 21px;
    width: 100%;
    ${button};
    color: #ffffff;
    background: #fc3b3a;
    box-shadow: 0px 3px 0px #7e1d1d;
    padding-left: 5px;
    padding-right: 5px;
    span {
      margin-right: 10px;
    }
    @media (min-width: 1200px) and (max-width: 1599px) {
      font-size: 11px;
    }
  }
  & .error {
    font-size: 14px !important;
    margin-top: -21px;
  }
`;
