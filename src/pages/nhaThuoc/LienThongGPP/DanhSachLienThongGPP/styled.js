import styled from "styled-components";
import { Card } from "components";
export const Main = styled(Card)`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  .home-title label {
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    color: #172b4d;
    padding: 10px 0;
  }
`;
