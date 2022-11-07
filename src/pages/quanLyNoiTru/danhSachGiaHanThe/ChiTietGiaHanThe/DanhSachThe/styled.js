import styled from "styled-components";
import { Card } from "components";
export const Main = styled(Card)`
  flex: 1;
  display: flex;
  flex-direction: column;
  .capNhatThe {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      margin-left: 5px;
    }
  }
  .themMoi {
    display: flex;
    justify-content: end;
    margin-bottom: 10px;
  }
`;
