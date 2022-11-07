import styled from "styled-components";
import { Card } from "components";
export const Main = styled(Card)`
  flex: 1;
  display: flex;
  flex-direction: column;
  & .tab-content-header {
    margin-top: 2px;
    margin-bottom: 5px;
    margin-right: 5px;
    justify-content: space-between;
    & button {
    }
  }
  & .ant-table-row-expand-icon {
    display: none;
  }
  & .row-parent {
    & .ant-table-row-expand-icon {
      display: block;
    }
  }
  & svg {
    height: 20px !important;
    width: 20px !important;
    margin: 0 5px;
  }
  & .header-row {
    text-align: left;
    font-weight: bold;
  }
  & .row-action {
    margin-right: 30px;
  }
`;
