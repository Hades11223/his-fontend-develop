import { Page } from "components";
import styled from "styled-components";
export const MainPage = styled(Page)`
  font-family: "Nunito Sans";
  font-size: 14px;
  background-color: #f3f4f7;
  display: flex;
  flex-direction: column;
  height: 100%;

  & .main-page {
    overflow: auto;
  }

  & .main-page .page-body.ant-row {
    flex-direction: column;
    width: 100%;
    overflow: visible;
    padding: 0;
  }

  .mn-card {
    width: 100%;
  }
`;
