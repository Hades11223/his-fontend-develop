import { Page } from "components";
import styled from "styled-components";
export const MainPage = styled(Page)`
  font-family: "Nunito Sans";
  font-size: 14px;
  background-color: #f3f4f7;
  display: flex;
  flex-direction: column;
  height: 100%;

  & .main-page .page-body.ant-row {
    flex-direction: column;
    flex: 1;
    width: 100%;
    margin-top: 16px;
  }

  .mn-card {
    width: 100%;
    &:nth-child(2) {
      flex: 1;
    }
  }

  & .action {
    margin: 0 !important;
    justify-content: end;
  }

  & .header-action {
    display: inline-block;
    margin-left: 5px;
    & .action-btn {
      cursor: pointer;
      display: flex;
      align-items: center;
      & svg {
        width: 20px;
        height: 20px;
        margin-left: 10px;
        transform: translateY(3px);
      }
    }
  }
`;
