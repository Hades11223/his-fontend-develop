import styled from "styled-components";

const Main = styled("div")`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  & .input-date {
    /* position: absolute;
    left: 0;
    top: 0;
    right: 0;
    left: 0; */
    z-index: 1;
    padding-right: 25px;
  }

  & .calendar-icon {
    position: absolute;
    right: 12px;
    margin-top: 5px;
    z-index: 2;
    svg {
      font-size: 20px !important;
      fill: #7a869a;
    }
  }
  & .date-display {
    position: absolute;
    left: 6px;
    z-index: 1;
  }

  & .date-hide {
    visibility: hidden;
  }

  & .ant-picker {
    border: 0 !important;
    box-shadow: none !important;
    position: absolute;
    & .ant-picker-input {
      outline: none;
      pointer-events: none;
      &:focus {
        outline: none !important;
      }
    }
  }
`;

export { Main };
