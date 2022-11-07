import styled from "styled-components";
import { Card } from "components";
export const Main = styled(Card)`
  flex: 1;
  display: flex;
  flex-direction: column;

  & .header-setting {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > div {
      display: flex;
      align-items: center;
      & svg.icon {
        width: 20px;
        height: 20px;
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
`;
