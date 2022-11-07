import styled from "styled-components";

const Main = styled("div")`
  & .patient-paging {
    display: flex;
    justify-content: flex-end;
  }
  margin: -10px;
  & .item {
    border-bottom: 1px solid gray;
    padding: 10px 10px;
    cursor: pointer;
    &.selected {
      background-color: #dbeaf7;
    }
    &:hover {
      background-color: #dbeaf7;
    }
    & .time {
      font-weight: bold;
      color: #000;
      margin-bottom: 10px;
      display: flex;
      & > div {
        flex: 1;
      }
    }
    & .chiso {
      color: #4f89e7;
      display: flex;
      & .label {
        font-weight: bold;
        margin-bottom: 0 !important;
      }
      & .value {
        margin-left: 5px;
        font-weight: bold;
      }
    }
  }
`;

export { Main };
