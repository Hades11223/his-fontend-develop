import { Card } from "components";
import styled from "styled-components";

export const Main = styled(Card)`
  & .main-table-wrapper {
    height: 40vh;
  }
  margin-top: 16px;
  .title__warning {
    color: red;
  }
`;
