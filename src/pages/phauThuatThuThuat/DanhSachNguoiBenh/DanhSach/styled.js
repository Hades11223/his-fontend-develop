import styled from "styled-components";
import { Card } from "components";
export const Main = styled(Card)`
  flex: 1;
  display: flex;
  flex-direction: column;
  & svg.ic-action {
    width: 20px;
    height: 20px;
  }
`;
