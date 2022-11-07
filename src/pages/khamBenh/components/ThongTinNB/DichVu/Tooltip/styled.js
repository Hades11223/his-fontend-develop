import { Row } from "antd";
import styled from "styled-components";

export const Main = styled.div`
  & .tooltip-item {
    display: flex;
    & label {
      margin-right: 5px;
      font-weight: bold;
    }
    & ul {
      margin-bottom: 0px;
    }
    & p {
      margin-bottom: 0px;
    }
  }
`;
