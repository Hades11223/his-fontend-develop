import styled from "styled-components";
import { Card } from "components";
export const Main = styled(Card)`
  flex: 1;
  display: flex;
  flex-direction: column;
  & svg.ic-detail {
    width: 24px;
    height: 24px;
  }
`;
