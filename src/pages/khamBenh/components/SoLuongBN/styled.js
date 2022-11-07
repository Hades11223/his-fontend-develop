import styled from "styled-components";

export const Main = styled.div`
  height: 40px;
  font-family: Nunito Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  text-align: right;
  > svg {
    height: 40px;
    width: 40px;
    vertical-align: middle;
  }
  .info {
    display: inline-block;
    margin-left: 10px;
    padding: 10px 6px;
    border-radius: 8px;
    &--bold {
      font-weight: bold;
    }
  }
`;
