import styled from "styled-components";
export const Main = styled.div`
  .header {
    padding: 8px 17px 8px 30px;
    flex-flow: initial;
    align-items: center;
    &__left {
      padding-right: 16px;
      white-space: nowrap;
      font-size: 18px;
    }
    &__right {
      padding-left: 16px;
      font-size: 18px;
      overflow: hidden;
      max-width: 100%;
      white-space: nowrap;
      margin-left: auto;
    }
  }
  & svg.ic-drag {
    width: 20px;
    height: 20px;
  }
`;
