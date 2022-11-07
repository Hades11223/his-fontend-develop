import styled from "styled-components";
import { Checkbox } from "antd";

export const Main = styled(Checkbox)`
  .ant-checkbox {
    & + span {
      font-family: Nunito Sans, sans-serif;
      font-style: normal;
      font-weight: ${(props) => (props.style && props.style) || "normal"};
      font-size: 14px;
      color: #172b4d;
    }
  }
  .ant-checkbox-checked {
    .ant-checkbox-inner {
      background-color: #0762f7;
      border-color: #0762f7;
    }
    &::after {
      border: 1px solid #0762f7;
    }
  }

  &:hover {
    .ant-checkbox-inner {
      border-color: #0762f7;
    }
  }
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: #0762f7;
  }
`;
