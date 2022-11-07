import styled from "styled-components";
import { Button } from "antd";

export const Main = styled(Button)`
  margin-top: 5px;
  @media print {
    display: none;
  }
`;
