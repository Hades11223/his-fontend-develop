import { Card } from "components";
import styled from "styled-components";

export const Main = styled(Card)`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    #0762f7;
  border-radius: 16px;
  margin-top: 10px;
  .main__container {
    margin: 0px;
  }

  .row-actived {
    background: #c1f0db !important;
  }
  .main-table-wrapper {
    height: calc(100vh - 465px);
    @media (min-width: 1440px) {
      height: 235px;
    }
    @media (min-width: 1680px) {
      height: 313px;
    }
  }
  & svg.ic-action {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;
