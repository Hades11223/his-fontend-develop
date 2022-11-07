import styled from "styled-components";
import { Button } from "components";

export const Main = styled(Button)`
  margin: 0;
  & .button-content {
    color: #000;
    text-align: left;
    text-overflow: ellipsis;
    font-weight: 600;
    font-size: 18px;
  }
  & img {
    width: 10px;
  }
  & .phim-tat {
    display: inline-block;
    margin-left: 5px;
  }
  &.disable-button {
    font-weight: bold !important;
    color: #172b4d !important;
    cursor: not-allowed;
  }
`;
