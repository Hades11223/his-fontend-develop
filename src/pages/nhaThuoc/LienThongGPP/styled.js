import styled from "styled-components";
import { Page } from "components";

export const MainPage = styled(Page)`
  .main-page {
    .page-body {
      padding: 0;
    }
  }
`;

export const Main = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const WrapButtonRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;
