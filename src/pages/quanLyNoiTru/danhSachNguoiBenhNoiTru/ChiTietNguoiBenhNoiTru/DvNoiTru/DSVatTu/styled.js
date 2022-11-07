import styled from "styled-components";
import { Card } from "components";
export const Main = styled(Card)`
  margin-top: 10px;
  flex: 1;
  display: flex;
  flex-direction: column;

  & .ic-action {
    font-size: 24px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;
